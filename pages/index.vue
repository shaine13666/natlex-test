<template>
  <main v-if="globalCovidData">
    <v-row class="py-4">
      <v-col cols="12">
        <h2 class="mb-4">
          Global covid data
        </h2>
        <div class="mb-4">
          Date: {{ dataDate }}
        </div>
        <h3 class="mb-4">
          Cases
        </h3>
        <div class="mb-4">
          <span class="font-bold">New Confirmed:</span>
          {{ numberWithCommas(globalCovidData.Global.NewConfirmed) }}
        </div>
        <div class="mb-4">
          <span class="font-bold">New Deaths:</span>
          {{ numberWithCommas(globalCovidData.Global.NewDeaths) }}
        </div>
        <div class="mb-4">
          <span class="font-bold">New Recovered:</span>
          {{ numberWithCommas(globalCovidData.Global.NewRecovered) }}
        </div>
        <div class="mb-4">
          <span class="font-bold">Total Confirmed:</span>
          {{ numberWithCommas(globalCovidData.Global.TotalConfirmed) }}
        </div>
        <div class="mb-4">
          <span class="font-bold">Total Death:</span>
          {{ numberWithCommas(globalCovidData.Global.TotalDeaths) }}
        </div>
      </v-col>
    </v-row>
  </main>
</template>

<script>
import { useGlobalCovidData } from '@/composables/useGlobalCovidData'

export default {
  setup () {
    const { globalCovidData, dataDate } = useGlobalCovidData()

    function numberWithCommas (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return {
      dataDate,
      globalCovidData,
      numberWithCommas
    }
  }
}
</script>
