<script lang="ts" setup>
  defineProps<{ margin?: string }>();
</script>

<template>
  <hr
    class="UILine"
    :style="`margin: ${margin ?? 60}px 0`"
  />
</template>

<style lang="scss">
  .UILine {
    width: 100%;
    height: 0;
    display: block;
    border: 1.5px solid rgba(130, 130, 130, 0.2);
  }
</style>
