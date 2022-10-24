<template>
  <h3>routerA 携带的参数：</h3>
  {{ query }}
  <p>
    <button @click="goHome">返回 home</button>
  </p>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter, type LocationQuery } from 'vue-router'

const router = useRouter()
const route = useRoute()

const query = ref<LocationQuery | undefined>()

onMounted(() => {
  query.value = route.query
})

function goHome() {
  router.push({ name: 'home' })
}
</script>
