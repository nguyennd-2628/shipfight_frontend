import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class LineChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Total players registered"
			},
			axisY: {
				title: "Amount",
				includeZero: false,
				suffix: ""
			},
			axisX: {
				title: "Month of Year",
				prefix: "M",
				suffix: "",
				interval: 1
			},
			data: [{
				type: "line",
				toolTipContent: "Month {x}: {y}",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 100 },
					{ x: 3, y: 120 },
					{ x: 4, y: 130 },
					{ x: 5, y: 176 },
					{ x: 6, y: 200 },
					{ x: 7, y: 222 },
					{ x: 8, y: 250 },
					{ x: 9, y: 300 },
					{ x: 10, y: 400 },
					{ x: 11, y: 450 },
					{ x: 12, y: 500 }
				]
			}]
		}
		
		return (
		<div className="site-layout-content">
			<h1>Statistic</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default LineChart;  