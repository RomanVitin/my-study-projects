<template>
  <ul class="catalog__list">
    <li
      is="ProductItem"
      :product="product"
      class="catalog__item"
      v-for="product in products"
      :key="product.id"
    />
  </ul>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";

export default {
  props: ["products"],
  components: { ProductItem: ProductItem },
};
</script>
