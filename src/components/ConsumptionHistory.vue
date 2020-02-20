<template>
    <div class='consumption-history'>
        <div class='graph' ref='graph'></div>
        <div class="legend">
          <div class="row" v-if="consumption">
            <label class="red">{{ 'consumption' | translate}}</label>
            <strong>{{ consumption }} kWh</strong>
          </div>
          <div class="row" v-if="production">
            <label>{{ 'yield' | translate}}</label>
            <strong>{{ production }} kWh</strong>
          </div>
          <div class="row" v-if="consumption">
            <label class="none">{{ 'self-sufficiency' | translate}}</label>
            <strong>{{ selfSufficiency }} %</strong>
          </div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import APIService from '../services/APIService';
import ConsumptionHistoryState from '../states/ConsumptionHistoryState';

export default {
  name: 'ConsumptionHistory',
  props: ['type'],
  components: {
  },
  data() {
    return {
      data: ConsumptionHistoryState.state,
      consumption: null,
      production: null,
    };
  },
  computed: {
    selfSufficiency() {
      if (this.consumption === null) {
        return 0;
      }
      return Math.round((this.production / this.consumption) * 100);
    },
  },
  mounted() {
    if (this.type === 'our') {
      APIService.ourConsumptionHistory().then(() => {
        this.createGraph();
      });
    } else {
      APIService.consumptionHistory().then(() => {
        this.createGraph();
      });
    }
  },
  methods: {
    createGraph() {
      const width = this.$refs.graph.offsetWidth;
      const height = this.$refs.graph.offsetHeight;
      const [marginTop, marginRight, marginLeft, marginBottom] = [10, 0, 40, 30];
      const graphHeight = height - marginTop - marginBottom;
      const graphWidth = width - marginLeft - marginRight;
      const arrayData = Object.values(this.data.data).filter((value, key) => key % 2 === 0);
      const data = arrayData.map(d => Object.values(d).map(a => a / 1000 / 1000));
      const xLabels = Object.keys(arrayData[0]);

      const svg = d3.select(this.$refs.graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${marginLeft}, ${marginTop})`);

      const x = d3.scaleLinear()
        .domain(d3.extent(xLabels, d => parseInt(d, 10)))
        .range([0, graphWidth]);

      const maxValues = data.map(dat => d3.max(dat, d => parseInt(d, 10)));
      const minValues = data.map(dat => d3.min(dat, d => parseInt(d, 10)));

      const y = d3.scaleLinear()
        .domain([d3.min(minValues), d3.max(maxValues) * 1.02])
        .range([graphHeight, 0]);

      const customXAxis = (g) => {
        const axisBottom = d3
          .axisBottom(x)
          .tickFormat(d => `${new Date(d * 1000).getHours()}:00`);
        g.call(axisBottom);
        g.selectAll('.tick').select('line').remove();
        g.selectAll('.tick text')
          .attr('transform', `translate(0, ${marginBottom / 3})`)
          .attr('fill', 'white')
          .attr('fill-opacity', '0.5');
      };

      const customYAxis = (g) => {
        const axisRight = d3
          .axisLeft(y)
          .tickSize(5);
        g.call(axisRight);
        g.selectAll('.tick').select('line').remove();
        g.selectAll('.tick text')
          .attr('fill', 'white')
          .attr('fill-opacity', '0.5');
      };
      svg.append('g')
        .attr('transform', `translate(0, ${graphHeight})`)
        .call(customXAxis);
      svg.append('g')
        .call(customYAxis);

      const colors = [
        '#99e9b1',
        '#d4e157',
      ];

      svg
        .selectAll('.line')
        .data(data)
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', (d, i) => colors[i % colors.length])
        .attr('stroke-width', 2)
        .attr('d', dat => d3.line()
          .x((d, i) => x(+xLabels[i]))
          .y(d => y(d))(dat),
        );
    },
  },
};
</script>

<style lang='scss' scoped>
@import '../assets/scss/variables';
@import '../assets/scss/animations';

.graph {
  min-width: 300px;
  height: 200px;
  margin: 1em 0;

}
.legend {
  margin: 2em 0 0;
  .row {
    justify-content: space-between;
    margin: 0 0 0.5em;
    > * {
      flex: none;
    }
    label {
      position: relative;
      padding-left: 30px;
      &:before {
        content: '';
        display: block;
        width: 20px;
        height: 4px;
        background: #99e9b1;
        border-radius: 2px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
      }
      &.red {
        &:before {
          background: #ffadad;
        }
      }
      &.none {
        &:before {
          display: none;
        }
      }
    }
  }
}


</style>
