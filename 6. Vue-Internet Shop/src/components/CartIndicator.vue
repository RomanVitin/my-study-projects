<template>
 <router-link
    class="header__cart"
    aria-label="Корзина с товарами"
    :to="{ name: 'cart' }"
    v-if="$store.state.productAddSending"
  >
  <span><img src="..\public\img\loadCartSpinner.gif" alt="Обновление корзины..."></span>
  </router-link>
  
  <router-link
    class="header__cart"
    aria-label="Корзина с товарами"
    :to="{ name: 'cart' }"
    v-else
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{
      $store.state.cartProducts.length
    }}</span>
  </router-link>
</template>

<script>
export default {
};
</script>