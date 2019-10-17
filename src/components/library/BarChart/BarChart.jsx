import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3'
import isEqual from 'lodash.isequal';
import './BarChart.css';

class BarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
        data: PropTypes.array,
        height: PropTypes.number,
        width: PropTypes.number
    }

    componentDidMount() {
        this.drawChart(this.props.data);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.data, prevProps.data)) {
            this.updateBarChart(this.props.data);
        }
    }

    getDimensions = (props = this.props) => {
        let margin = { top: 10, right: 5, bottom: 80, left: 50 };
        let width = props.width - margin.left - margin.right;
        let height = props.height - margin.top - margin.bottom;
        let padding = width / 7;
        return { margin, width, height, padding };
    }

    updateBars = (data, yScale, width, height, padding) => {
        d3.selectAll('.rectangle')
            .data(data)
            .transition()
            .attr('height', (d) => {
                return height - yScale(+d.value);;
            })
            .attr('x', (d, i) => { return ((width / data.length) * i) + padding / 2; })
            .attr('y', (d) => { return yScale(+d.value) })
            .select('title')
            .text((d) => { return d.label + ' : ' + d.value });
    }

    updateYAxis = (yAxis) => {
        d3.selectAll('g.y.axis')
            .transition()
            .call(yAxis);
    }

    updateBarChart = (data) => {
        let { width, height, padding } = this.getDimensions();
        let yScale = this.getYScale(data, height);
        this.updateBars(data, yScale, width, height, padding);
        let yAxis = d3.axisLeft(yScale);
        this.updateYAxis(yAxis);
    }

    getSVG = (margin, width, height) => {
        return d3.select(this.refs.canvas)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    }

    getXScale = (data, width) => {
        return d3.scaleBand()
            .domain(data.map((d) => { return d.label; }))
            .range([0, width]);
    }

    getYScale = (data, height) => {
        return d3.scaleLinear()
            .domain([0, d3.max(data, (d) => { return +d.value; })])
            .range([height, 0]);
    }

    appendXAxis = (svg, axis, height) => {
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(axis)
            .selectAll('text')
            .style('font-size', '14px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '-.55em')
            .attr('transform', 'rotate(-90)');
    }

    appendYAxis = (svg, axis) => {
        svg.append('g')
            .attr('class', 'y axis')
            .call(axis);
    }

    appendBars = (svg, data, width, height, yScale, padding) => {
        svg.selectAll('rectangle')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'rectangle')
            .attr('width', (width / data.length) - padding)
            .attr('height', (d) => {
                return height - yScale(+d.value);
            })
            .attr('x', (d, i) => {
                return ((width / data.length) * i) + padding / 2;
            })
            .attr('y', (d) => {
                return yScale(+d.value);
            })
            .append('title')
            .text((d) => {
                return d.label + ' : ' + d.value;
            });
    }

    drawChart(data) {

        let { margin, width, height, padding } = this.getDimensions();

        let svg = this.getSVG(margin, width, height);
        let xScale = this.getXScale(data, width);
        let xAxis = d3.axisBottom(xScale);

        let yScale = this.getYScale(data, height);
        let yAxis = d3.axisLeft(yScale);

        this.appendXAxis(svg, xAxis, height);
        this.appendYAxis(svg, yAxis);
        this.appendBars(svg, data, width, height, yScale, padding);
    }

    render() {
        return <div ref='canvas'></div>
    }

}

export default BarChart;