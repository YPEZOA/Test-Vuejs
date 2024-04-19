<script setup>
// import { toRefs } from 'vue'

const props = defineProps(['name', 'lastName', 'age', 'location', 'phone', 'avatar', 'country'])
// const { user } = toRefs(props)
</script>

<template>
  <article
    class="card-container flex flex-col justify-between bg-[#292929] bg-no-repeat bg-contain w-[270px] h-[350px] rounded-md"
    :class="{
      'border-[4px] border-green-500': props.country === 'Mexico'
    }"
  >
    <div class="flex flex-col grow items-center justify-end mb-4">
      <img
        :src="props.avatar"
        class="border-yellow border-2 rounded-full bg-white w-[100px] h-[100px]"
        :class="{ 'border-red-500 border-[3px]': props.country === 'Mexico' }"
        alt="Avatar"
      />
      <h1 class="text-white text-xl font-semibold">{{ props.name }} {{ props.lastName }}</h1>
      <span class="text-white text-sm">{{ props.location }}, {{ props.country }}</span>
    </div>
    <div
      class="flex justify-between items-end text-xs px-4 border-t-[1px] border-gray-500 text-white py-2"
    >
      <div class="flex items-center flex-col">
        <p class="font-semibold">Edad</p>
        <span>{{ props.age }}</span>
      </div>
      <div class="flex items-center flex-col">
        <p class="font-semibold">Celular</p>
        <span>{{ props.phone }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card-container {
  background-image: url('../assets/bgc.jpg');
}
</style>
