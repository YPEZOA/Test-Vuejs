import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import loader from '@/utils/loader'

export const useUsersStore = defineStore('user', () => {
  const users = ref([])
  const search = ref('')
  const countrySelected = ref('')
  const countries = ref([])
  const filtersResultCount = ref(0)
  const loading = ref(false)

  const wrapper = loader(loading)

  const getUsers = wrapper(async () => {
    const response = await fetch('https://randomuser.me/api/?results=100')
    const parsed = await response.json()
    users.value = parsed.results
    loading.value = false
  })

  const usersFilter = computed(() => {
    let finalUserList = users.value

    if (countrySelected.value) {
      loading.value = true
      finalUserList = users.value.filter((user) => countrySelected.value === user.location.country)
      filtersResultCount.value = finalUserList.length
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }

    if (!search.value.length) {
      filtersResultCount.value = finalUserList.length
      return finalUserList
    }

    const filterByNameOrLast = finalUserList.filter((user) => {
      const searchValue = search.value.toLowerCase()
      const foundName = user.name.first.toLowerCase().includes(searchValue)
      const foundLastName = user.name.last.toLowerCase().includes(searchValue)

      return foundName || foundLastName
    })
    filtersResultCount.value = filterByNameOrLast.length
    return filterByNameOrLast
  })

  const getAvailableCountries = () => {
    const countriesFromUsers = users.value.map((user) => user.location.country)
    const countriesAv = countriesFromUsers.filter((country, index) => {
      return countriesFromUsers.indexOf(country) === index
    })
    countries.value = countriesAv
  }

  const resetFilter = () => {
    filtersResultCount.value = users.value.length
    countrySelected.value = ''
    search.value = ''
  }

  return {
    // States
    search,
    users,
    countrySelected,
    countries,
    filtersResultCount,
    loading,
    // actions
    usersFilter,
    resetFilter,
    // getters
    getUsers,
    getAvailableCountries
  }
})
