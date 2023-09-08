<template>
  <div>
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title" />
    </router-link>
    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>
    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <ul class="colors colors--black">
      <li
        is="ProductColor"
        :color="color"
        v-for="(color, index) in product.colors"
        :key="index"
        class="colors__item"
      ></li>
    </ul>
  </div>
</template>

<script>
import ProductColor from "@/components/ProductColor.vue"
import gotoPage from "@/helpers/gotoPage"
import numberFormat from "@/helpers/numberFormat"

export default {
  filters: {
    numberFormat
  },
  methods: {
    gotoPage
  },
  props: ["product"],
  components: { ProductColor: ProductColor },
};
</script>
