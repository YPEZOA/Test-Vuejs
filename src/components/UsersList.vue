<script setup>
import { storeToRefs } from 'pinia'
import { useUsersStore } from '../stores/useUsersStore'
import UserCard from './UserCard.vue'
import LoaderComponent from './LoaderComponent.vue'
import { onMounted } from 'vue'

const { getUsers, getAvailableCountries, resetFilter } = useUsersStore()
const { loading, countries, filtersResultCount, search, usersFilter, countrySelected } =
  storeToRefs(useUsersStore())

onMounted(async () => {
  await getUsers()
  await getAvailableCountries()
})
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="font-bold text-white text-4xl my-4">Search Users</h1>
    <section class="flex flex-col items-center w-full">
      <div class="flex w-full items-center justify-center gap-3">
        <input
          v-model="search"
          type="text"
          class="grow-1 rounded-full p-4 px-6 w-6/12 text-[#282828] outline-none my-4 text-xl focus:outline-yellow"
          placeholder="Write name or last name.."
        />
        <button class="p-4 px-6 bg-teal-600 text-white rounded-full" @click="resetFilter">
          Reset filter
        </button>
      </div>

      <select class="w-auto text-slate-700" v-model="countrySelected" name="country">
        <option value="" disabled selected>Select a country</option>
        <option class="text-black" v-for="country in countries" :key="country">
          {{ country }}
        </option>
      </select>
    </section>

    <span class="my-4 text-white">Resultados de la busqueda: {{ filtersResultCount }}</span>

    <div v-if="loading"><LoaderComponent /></div>

    <main v-if="!loading" class="grid grid-cols-4 gap-4">
      <UserCard
        v-for="user in usersFilter"
        :avatar="user.picture.large"
        :name="user.name.first"
        :last-name="user.name.last"
        :age="user.dob.age"
        :location="user.location.city"
        :country="user.location.country"
        :phone="user.phone"
        :key="user.id.value"
      />
    </main>
  </div>
</template>
