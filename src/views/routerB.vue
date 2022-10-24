<template>
  <h3>routerB 携带的参数：</h3>
  {{ query }}
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, type LocationQuery } from 'vue-router'

const route = useRoute()

const query = ref<LocationQuery | undefined>()

onMounted(() => {
  query.value = route.query
})
</script>
