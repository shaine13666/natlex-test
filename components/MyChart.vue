<template>
  <div>
    <client-only>
      <highchart :options="computedOptions" />
    </client-only>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Chart',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const computedOptions = computed(() => ({
      credits: {
        enabled: false
      },
      subtitle: {
        text: 'covid-19'
      },
      yAxis: {
        title: {
          text: 'Cases'
        }
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: { enabled: false }
            }
          }
        ]
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top'
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      ...props.options
    }))

    return {
      computedOptions
    }
  }
})
</script>
