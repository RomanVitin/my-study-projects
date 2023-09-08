<template>
<main class="content container" v-if="$store.state.updateCartStatus">
  <div style="text-align: center"><img src="..\public\img\loadingCartPage.gif" alt="Загрузка корзины..."></div>
</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ numberOfProducts }} <span v-if="numberOfProducts === 1"> товар</span>
        <span v-else-if="numberOfProducts < 5"> товара</span>
        <span v-else> товаров</span> </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem
              v-for="item in products"
              :key="item.productId"
              :item="item"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" class="cart__button button button--primery" type="submit" :disabled="products.length === 0" :to="{ name: 'order'}">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import CartItem from "@/components/CartItem.vue";
import { mapGetters } from "vuex";
export default {
  filters: { numberFormat },
  components: { CartItem },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
      numberOfProducts: "numberOfProducts",
    }),
  },
};
</script>