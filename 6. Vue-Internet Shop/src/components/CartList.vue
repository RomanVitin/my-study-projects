<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li v-for="item in products" class="cart__order" :key="item.id">
        <h3>{{ item.product.title }}</h3>
        <b
          >{{ item.product.price | numberFormat }}&nbsp;₽ x
          {{ item.amount }}&nbsp;шт.</b
        >
        <span>Артикул: {{ item.product.id }}</span>
      </li>
    </ul>
    <div class="cart__total">
      <p>Доставка: <b>500&nbsp;₽</b></p>
      <p>
        Итого: <b>{{ numberOfProducts }}</b>
        <span v-if="numberOfProducts === 1"> товар</span>
        <span v-else-if="numberOfProducts < 5"> товара</span>
        <span v-else> наименований товаров</span> на общую сумму
        <b>{{ (totalPrice + 500) | numberFormat }}&nbsp;₽</b><br />(без учета
        доставки)
      </p>
    </div>
    <button
      style="margin-bottom: 7px"
      class="cart__button button button--primery"
      type="submit"
      :disabled="orderLoading"
    >
      <div v-if="orderLoading">
        <img
          src="..\public\img\loadOrderSpinner.gif"
          alt="Отправка заказа..."
        />
      </div>
      <span v-else-if="orderLoadingFailled">Отправить еще раз</span>
      <span v-else>Оформить заказ</span>
    </button>
    <div style="text-align: center; color: red" v-if="orderLoadingFailled">
      <span>Ошибка!</span>
    </div>
  </div>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import { mapGetters } from "vuex";
export default {
  filters: { numberFormat },
  props: ["orderLoading", "orderLoadingFailled"],
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
      numberOfProducts: "numberOfProducts",
    }),
  },
};
</script>
