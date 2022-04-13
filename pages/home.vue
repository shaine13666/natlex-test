<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="3"
      >
        <v-select
          v-model="count"
          :items="counts"
          label="chart-count"
          @change="generateCharts"
        />
      </v-col>
    </v-row>
    <v-row
      v-for="(chart, index) in charts"
      :key="index"
      align="center"
    >
      <v-col
        cols="12"
        sm="3"
      >
        <v-select
          v-model="chart.country"
          :items="countries"
          label="country"
          @change="fetchChartData(index)"
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
      >
        <v-btn
          small
          color="indigo"
          dark
          @click="changeColor(index)"
        >
          Change color
        </v-btn>
      </v-col>
      <template v-if="chart.options">
        <v-col
          v-if="chart.options.chart"
          cols="12"
          sm="3"
        >
          <v-switch
            v-model="chart.options.chart.type"
            class="mb-4"
            color="indigo"
            flat
            hide-details
            label="chart-type"
            false-value="column"
            true-value="line"
          />
        </v-col>
        <v-col cols="12">
          <MyChart
            :options="chart.options"
            style="width: 100%;"
          />
        </v-col>
      </template>
      <v-progress-circular
        v-else
        indeterminate
        color="indigo"
      />
    </v-row>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const { $axios } = useContext()

    const countries = ref(null)
    const colors = ref(['#21fa90', '#890620', '#90fcf9', '#201a23'])
    const counts = ref([1, 2, 3, 4])
    const count = ref(1)
    const charts = ref([
      {
        country: 'Russian Federation',
        options: null
      }
    ])

    const { fetch: fetchCountry } = useFetch(async () => {
      const data = await $axios
        .$get('/countries')

      countries.value = data.map(i => i.Country).sort()

      await fetchChartData(0)
    })

    async function fetchChartData (index = 0) {
      await $axios
        .$get(`/total/dayone/country/${charts.value[index].country}`)
        .then((data) => {
          data = data.slice(200, 300)

          const death = data.map(d => d.Deaths)
          const active = data.map(a => a.Active)
          const recovered = data.map(r => r.Recovered)
          const confirmed = data.map(c => c.Confirmed)

          const date = data.map((d) => {
            return new Date(d.Date).toDateString('en-us')
          })

          charts.value[index].options = {
            chart: {
              type: 'line',
              zoomType: 'x'
            },
            title: {
              text: charts.value[index].country
            },
            xAxis: {
              categories: date
            },
            colors: colors.value,
            series: [
              {
                name: 'Recovered',
                data: recovered
              },
              {
                name: 'Death',
                data: death
              },
              {
                name: 'Active',
                data: active
              },
              {
                name: 'Confirmed',
                data: confirmed
              }
            ]
          }
        })
    }

    function changeColor (index) {
      charts.value[index].options.colors = []

      for (let i = 0; i < 4; i++) {
        charts.value[index].options.colors.push(
          '#' + Math.floor(Math.random() * 16777215).toString(16)
        )
      }
    }

    function generateCharts () {
      charts.value = []

      for (let i = 0; i < count.value; i++) {
        charts.value.push({
          country: 'Russian Federation',
          options: null
        })
      }
    }

    watch(
      () => charts.value,
      (charts) => {
        charts.forEach((_, index) => {
          fetchChartData(index)
        })
      }
    )

    return {
      charts,
      countries,
      counts,
      count,
      fetchCountry,
      fetchChartData,
      generateCharts,
      changeColor
    }
  }
})
</script>
