import { ref, useContext, useFetch } from '@nuxtjs/composition-api'

export function useGlobalCovidData () {
  const { $axios } = useContext()
  const globalCovidData = ref(null)
  const dataDate = ref('')

  useFetch(async () => {
    await $axios
      .$get('/summary')
      .then((data) => {
        globalCovidData.value = data
        dataDate.value = new Date(data.Date).toDateString('en-us')
      })
  })

  return {
    globalCovidData, dataDate
  }
}
