<script setup>
import UsersList from './components/UsersList.vue'
</script>

<template>
  <Suspense timeout="0">
    <UsersList />
  </Suspense>
</template>
