<template>
  <div>
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" :value="color.id" />
      <span class="colors__value" :style="{ 'background-color': color.code }">
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["color"],
};
</script>