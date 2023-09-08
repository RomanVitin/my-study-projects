import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_BASE_URL } from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,
    cartProductsData: [],

    productAddSending: false,
    updateCartStatus: false,

    orderInfo: null,
  },

  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCardProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(
        (item) => item.productId === productId
      );
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.productId !== productId
      );
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
    updateProductAddSending(state, productAddSending) {
      state.productAddSending = productAddSending;
    },
    updateCart(state, updateCartStatus) {
      state.updateCartStatus = updateCartStatus;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find(
          (p) => p.product.id === item.productId
        ).product;
        return {
          ...item,
          product: { ...product, image: product.image.file.url },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0
      );
    },
    numberOfProducts(state) {
      return state.cartProducts.length;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(API_BASE_URL + "/api/orders/" + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey,
        }
      })
        .then(response => {
        context.commit('updateOrderInfo', response.data);
      });
    },

    loadCart(context) {
      this.updateCartStatus = true;
      this.commit("updateCart", this.updateCartStatus);
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        return axios
          .get(API_BASE_URL + "/api/baskets", {
            params: { userAccessKey: context.state.userAccessKey },
          })
          .then((responce) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem(
                "userAccessKey",
                responce.data.user.accessKey
              );
              context.commit(
                "updateUserAccessKey",
                responce.data.user.accessKey
              );
            }
            context.commit("updateCartProductsData", responce.data.items);
            context.commit("syncCartProducts");
            this.updateCartStatus = false;
            this.commit("updateCart", this.updateCartStatus);
          });
      });
    },
    addProductToCart(context, { productId, amount }) {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        return axios
          .post(
            API_BASE_URL + "/api/baskets/products",
            { productId: productId, quantity: amount },
            { params: { userAccessKey: context.state.userAccessKey } }
          )
          .then((responce) => {
            context.commit("updateCartProductsData", responce.data.items);
            context.commit("syncCartProducts");
          });
      });
    },
    updateCardProductAmount(context, { productId, amount }) {
      context.commit("updateCardProductAmount", { productId, amount });
      if (amount < 1) return;
      return axios
        .put(
          API_BASE_URL + "/api/baskets/products",
          {
            productId: productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }
        )
        .then((responce) => {
          context.commit("updateCartProductsData", responce.data.items);
        })
        .catch(() => {
          context.commit("syncCartProducts");
        });
    },
    deleteCartProductItem(context, productId) {
      context.commit("deleteCartProduct", productId);
      return axios
        .delete(API_BASE_URL + "/api/baskets/products", {
          data: { productId },
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((responce) => {
          context.commit("updateCartProductsData", responce.data.items);
        })
        .catch(() => {
          context.commit("syncCartProducts");
        });
    },
  },
});
