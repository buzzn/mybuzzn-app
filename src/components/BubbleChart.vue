<template>
    <div>
        <div ref="chart" class="bubble-chart"></div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import SocketState from '../states/SocketState';

export default {
  name: 'Bubblechart',
  data() {
    return {
      svg: null,
      force: null,
      forceStrength: 0.06,
      forceSimulation: null,
      forceCollide: null,
      socket: SocketState.state,
      dataSet: {
        usersConsumptions: [],
      },
    };
  },
  computed: {
    allValues() {
      const all = this.socket.group_users.map(d => d.power);
      all.push(this.socket.group_production);
      return all;
    },
  },
  mounted() {
    this.create();
  },
  watch: {
    allValues() {
      this.updateChart();
    },
  },
  methods: {
    updateValues() {
      // this.dataSet.usersConsumptions = this.dataSet.usersConsumptions.map((d) => {
      //   // eslint-disable-next-line
      //   d.oldValue = d.power;
      //   // eslint-disable-next-line
      //   d.power += (Math.random() - 0.5) * 4;
      //   // eslint-disable-next-line
      //   d.value = d.value < 0 ? 0 : d.value;
      //   return d;
      // });
      this.updateChart();
    },

    tick() {
      this.svg.selectAll('circle.consumption')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    },

    updateChart() {
      const circleRadiusScale = d3.scaleSqrt()
        .domain([0, d3.max(this.allValues)])
        .range([0, 80]);

      const self = this;
      this.svg.selectAll('.consumption')
        .transition().duration(800)
        // eslint-disable-next-line
        .tween('radius', function (d) {
          if (!d) return;
          const that = d3.select(this);
          const i = d3.interpolate(d.radius, circleRadiusScale(d.power));
          // eslint-disable-next-line
          return function (t) {
            // eslint-disable-next-line
            d.radius = i(t);
            that.attr('r', dat => dat.radius);
            self.forceSimulation.nodes(self.socket.group_users);
          };
        });
      this.forceSimulation.alpha(0.2).restart();
    },
    create() {
      const circleRadiusScale = d3.scaleSqrt()
        .domain([0, d3.max(this.allValues)])
        .range([0, 80]);

      const [width, height] = [this.$refs.chart.offsetWidth, this.$refs.chart.offsetHeight];
      this.dataSet.usersConsumptions = this.socket.group_users.map(consumption => ({
        ...consumption,
        oldValue: consumption.power,
        x: width / 2,
        y: height / 2,
        radius: circleRadiusScale(consumption.power),
      }));

      // create svg
      this.svg = d3.select(this.$refs.chart)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const productionGroup = this.svg
        .append('g')
        .attr('class', 'production');

      const consumptionGroup = this.svg
        .append('g')
        .attr('class', 'consumption');

      // draw production circle
      productionGroup.selectAll('circle.production')
        .data([this.socket.group_production])
        .enter()
        .append('circle')
        .attr('class', 'production')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', d => circleRadiusScale(d))
        .attr('fill', '#00bcd0')
        .attr('fill-opacity', 0.5);

      // draw circles
      consumptionGroup.selectAll('circle.consumption')
        .data(this.dataSet.usersConsumptions)
        .enter()
        .append('circle')
        .attr('class', 'consumption')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.radius)
        .attr('fill', d => (d.id === 3 ? '#d4e157' : '#80deea'));

      this.forceSimulation = d3.forceSimulation()
        .force('x', d3.forceX(width / 2).strength(this.forceStrength))
        .force('y', d3.forceY(height / 2).strength(this.forceStrength))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide(d => d.radius + 1));

      this.forceSimulation.nodes(this.dataSet.usersConsumptions)
        .on('tick', this.tick);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/animations";

.bubble-chart {
  width: 100%;
  height: 300px;
  opacity: 0;
  animation: fadeScale 500ms ease forwards 1000ms;
}
span {
  color: red;
}
</style>
