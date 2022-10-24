<template>
  <button @click="goRouteA">导航至路由A并携带参数</button>
  <button @click="goRouteB">导航至路由B并携带参数</button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goRouteA() {
  router.push({
    name: 'RouterA',
    query: {
      id: undefined,
      name: 'RouterA',
      age: 12,
      address: null,
    },
  })
}

function goRouteB() {
  router.push({
    name: 'RouterB',
    query: {
      id: 1,
      name: 'RouterB',
      address: '上海',
    },
  })
}
</script>
