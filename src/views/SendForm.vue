<template>
  <app-form></app-form>
</template>

<script>
export default {
  components: {
    appForm: () => import('@/components/Form.vue')
  }
}
</script>

<style lang="scss">
</style>
