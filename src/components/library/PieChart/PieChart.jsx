import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3'
import isEqual from 'lodash.isequal';
import { isMobile } from 'utilities/Browser';
import './PieChart.css';

class PieChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
        data: PropTypes.object,
        height: PropTypes.number,
        width: PropTypes.number
    }

    componentDidMount() {
        this.drawChart(this.props.data);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.data, prevProps.data)) {
            let { radius } = this.getDimensions();
            let color = this.getColorScale(this.props.data);
            this.updateData(this.props.data, color, radius);
        }
    }

    getDimensions = (props = this.props) => {
        let width = this.props.width;
        let height = this.props.height;
        let radius = Math.min(width, height) / 2;
        return { width, height, radius };
    }

    getSVG = (width, height) => {
        return d3.select(this.refs.canvas)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    }

    getColorScale = (data) => {
        return d3.scaleOrdinal()
            .domain(data)
            .range(d3.schemeDark2);
    }

    getPie = () => {
        return d3.pie()
            .value((d) => { return d.value; })
            .sort((a, b) => { return d3.ascending(a.key, b.key); });
    }

    getArcGenerator = (radius) => {
        return d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
    }

    appendPath = (data, arcGenerator, pie, color) => {
        let path = this.svg.selectAll('path')
            .data(pie(d3.entries(data)))
        path
            .enter()
            .append('path')
            .merge(path)
            .transition()
            .duration(1000)
            .attr('d', arcGenerator)
            .attr('fill', (d) => { return (color(d.data.key)) })
            .attr('stroke', 'white')
            .style('stroke-width', '2px')
            .style('opacity', 1)
        path
            .exit()
            .remove()
    }

    formatNumber = (value) => {
        if (value % 1 === 0) return Math.trunc(value);
        if (typeof value === 'string') value = Number.parseFloat(value);
        return value.toFixed(2);
    }

    appendText = (data, arcGenerator, pie) => {
        let text = this.svg.selectAll('text')
            .data(pie(d3.entries(data)));
        text
            .enter()
            .append('text')
            .attr('fill', 'white')
            .style('text-anchor', 'middle')
            .style('font-size', (isMobile) ? 14 : 17)
            .text((d) => { return `${d.data.key} (${this.formatNumber(d.data.value)})` })
            .attr('transform', (d) => { return 'translate(' + arcGenerator.centroid(d) + ')'; })
        /** 
         * @todo figure out why we this has to be called twice...
         */
        text
            .text((d) => { return `${d.data.key} (${this.formatNumber(d.data.value)})` })
            .attr('transform', (d) => { return 'translate(' + arcGenerator.centroid(d) + ')'; })
    }

    updateData = (data, color, radius) => {
        let pie = this.getPie();
        let arcGenerator = this.getArcGenerator(radius);
        this.appendPath(data, arcGenerator, pie, color);
        this.appendText(data, arcGenerator, pie);
    }


    drawChart(data) {
        let { width, height, radius } = this.getDimensions();
        this.svg = this.getSVG(width, height);
        let color = this.getColorScale(data);
        this.updateData(data, color, radius);
    }

    render() {
        return <div ref='canvas'></div>
    }

}

export default PieChart;