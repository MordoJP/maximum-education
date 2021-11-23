<template>
  <app-form class="send-form"></app-form>
</template>

<script>
export default {
  components: {
    appForm: () => import('@/components/Form.vue')
  }
}
</script>

<style>
.send-form {
  width: 975px;
}
</style>
