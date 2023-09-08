<template>
  <div>
    <BaseHeader />

    <router-view />

    <BaseFooter />
  </div>
</template>


<script>
import BaseHeader from "@/components/BaseHeader.vue";
import BaseFooter from "@/components/BaseFooter.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  components: { BaseHeader, BaseFooter },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if(userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey'])
  }
};
</script>

