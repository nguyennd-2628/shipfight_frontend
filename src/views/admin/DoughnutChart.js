import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class DoughnutChart extends Component {
	render() {
		const options = {
            theme: "dark2",
            animationEnabled: true,
            exportEnabled: true,
			title: {
				text: "Ranking Statistics"
			},
			subtitles: [{
				text: "",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: "Diamond", y: 5 },
					{ name: "Gold", y: 7 },
					{ name: "Silver", y: 40 },
					{ name: "Bronze", y: 17 },
					{ name: "Wood", y: 31 }
				]
			}]
		}
		
		return (
		<div className="site-layout-content">
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default DoughnutChart;