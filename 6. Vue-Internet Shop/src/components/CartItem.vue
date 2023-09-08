<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>

    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <div class="product__counter form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        :disabled="item.amount < 2"
        @click.prevent="minusProduct({productId: item.productId, amount: (amount - 1)})"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input
        type="number"
        v-model.number="amount"
        min="1"
        max="20"
        name="count"
      />

      <button
        type="button"
        aria-label="Добавить один товар"
        :disabled="item.amount > 19"
        @click.prevent="plusProduct({productId: item.productId, amount: (amount + 1)} )"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.product.price * item.amount) | numberFormat }} ₽</b
    >

    <button
      class="product__del button-del"
      style="cursor: pointer"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import { mapActions } from "vuex";

export default {
  filters: { numberFormat },
  props: ["item"],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch("updateCardProductAmount", {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapActions({
    deleteProduct: "deleteCartProductItem",
    plusProduct: "updateCardProductAmount",
    minusProduct: "updateCardProductAmount"
    }),
  },
};
</script>