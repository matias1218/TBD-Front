
<template>	
 	
<div class="w3-center w3-cell-row" >
	
	<div class="w3-container w3-gray w3-cell m4 w3-cell-middle">
	    <p>Indices de aprobación.</p>
	    <p>El siguiente gráfico corresponde a la distribucion de los sectores<br>
	    donde existe mayor aprobación del consumo de marihuana en la ciudad de <br>
		Santiago de Chile.</p>
	    

  	</div>

  	 <div class="w3-container w3-light-gray w3-cell m1 w3-cell-top">
	    <p>Gráfico aprobación en las principales comunas de Santiago.</p>
	    <svg width="960" height="500"></svg>
	  </div>
	

</div>

</template>
<script>
import * as d3 from 'd3';
export default{
  data: function(){
    return {
      data : [13,11,30,23,19,17,15,14,14,12],
      data2 : [
      			{letter:'A', frequency: .33},			
      			{letter:'b', frequency: .12},		
      			{letter:'c', frequency: .13},			
      			{letter:'d', frequency: .15},			
      			{letter:'e', frequency: .78},			
      			{letter:'f', frequency: .13},			
      			{letter:'g', frequency: .56},			
      			{letter:'h', frequency: .52},			
      			{letter:'i', frequency: .98},			
      			{letter:'j', frequency: .32},			
      			{letter:'k', frequency: .51},			
      			{letter:'l', frequency: .35},			
      			{letter:'m', frequency: .77},			
      			{letter:'n', frequency: .52},			
      			{letter:'o', frequency: .50},			
      			{letter:'p', frequency: .59},			
      			{letter:'q', frequency: .06}			
      ],
      data3 : [
      		{date:'30-May-12', close: 23.33},			
  			{date:'23-May-12', close: 23.12},		
  			{date:'19-May-12', close: 3.13},			
  			{date:'10-May-12', close: 23.15},			
  			{date:'1-May-12', close: 4.78},			
  			{date:'29-Apr-12', close: 55.13},			
  			{date:'20-Apr-12', close: 66.56},			
  			{date:'10-Apr-12', close: 76.52},			
  			{date:'2-Apr-12', close: 43.98},			
  			{date:'30-Mar-12', close: 33.32},			
  			{date:'26-Mar-12', close: 2.51},			
  			{date:'22-Mar-12', close: 33.35},			
  			{date:'20-Mar-12', close: 23.77},			
  			{date:'16-Mar-12', close: 45.52},			
  			{date:'12-Mar-12', close: 5.50},			
  			{date:'9-Mar-12', close: 5.59},			
  			{date:'2-Mar-12', close: 44.06}

      ],
      dataset1 : [
	    {label:"Men", "A":20, "Not Much Satisfied":10, "Satisfied": 50, "Very Satisfied":20},
	    {label:"Women", "Not Satisfied":15, "Not Much Satisfied":30, "Satisfied":40, "Very Satisfied":15}
	  ],
	  dataset : [
	  {"id":1,"approval":444,"disapproval":274,"create":1509932247000,"topic":{"id":1,"name":"Legalización"}},
	  {"id":2,"approval":276,"disapproval":45,"create":1509932252000,"topic":{"id":2,"name":"Medicinal"}}
	  ]

    }
  },
  methods:{
    loadGraph:function(dataset){

      	var margin = {top: (parseInt(d3.select('body').style('width'), 10)/10), right: (parseInt(d3.select('body').style('width'), 10)/20), bottom: (parseInt(d3.select('body').style('width'), 10)/5), left: (parseInt(d3.select('body').style('width'), 10)/20)},
    width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
    height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var colorRange = d3.scale.category20();
var color = d3.scale.ordinal()
    .range(colorRange.range());

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var divTooltip = d3.select("body").append("div").attr("class", "toolTip");


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");





var options = d3.keys(dataset[0]).filter(function(key) { return key !== "label"; });

dataset.forEach(function(d) {
    d.valores = options.map(function(name) { return {name: name, value: +d[name]}; });
});

x0.domain(dataset.map(function(d) { return d.label; }));
x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);
y.domain([0, d3.max(dataset, function(d) { return d3.max(d.valores, function(d) { return d.value; }); })]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Satisfaction %");

var bar = svg.selectAll(".bar")
    .data(dataset)
    .enter().append("g")
    .attr("class", "rect")
    .attr("transform", function(d) { return "translate(" + x0(d.label) + ",0)"; });

bar.selectAll("rect")
    .data(function(d) { return d.valores; })
    .enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("x", function(d) { return x1(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("value", function(d){return d.name;})
    .attr("height", function(d) { return height - y(d.value); })
    .style("fill", function(d) { return color(d.name); });

bar
    .on("mousemove", function(d){
        divTooltip.style("left", d3.event.pageX+10+"px");
        divTooltip.style("top", d3.event.pageY-25+"px");
        divTooltip.style("display", "inline-block");
        var x = d3.event.pageX, y = d3.event.pageY
        var elements = document.querySelectorAll(':hover');
        l = elements.length
        l = l-1
        elementData = elements[l].__data__
        divTooltip.html((d.label)+"<br>"+elementData.name+"<br>"+elementData.value+"%");
    });
bar
    .on("mouseout", function(d){
        divTooltip.style("display", "none");
    });


var legend = svg.selectAll(".legend")
    .data(options.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
		
    },
    cosa:function(data){
    	

		var width = 420,
		    barHeight = 20;

		var x = d3.scaleLinear()
		    .domain([0, d3.max(data)])
		    .range([0, width]);

		var chart = d3.select(".chart")
		    .attr("width", width)
		    .attr("height", barHeight * data.length);

		var bar = chart.selectAll("g")
		    .data(data)
		  .enter().append("g")
		    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

		bar.append("rect")
		    .attr("width", x)
		    .attr("height", barHeight - 1);

		bar.append("text")
		    .attr("x", function(d) { return x(d) - 3; })
		    .attr("y", barHeight / 2)
		    .attr("dy", ".35em")
		    .text(function(d) { return d; });

    }
   
  },
  mounted:function(){
   
     this.loadGraph(this.dataset);
     //this.cosa(this.data);
     //this.cosa2(this.data3);
     
  }
}
</script>
<style> 
	body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  width: 960px;
  height: 500px;
  position: relative;
}

svg {
    width: 100%;
    height: 100%;
    position: center;
}

text{
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.toolTip {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    position: absolute;
    display: none;
    width: auto;
    height: auto;
    background: none repeat scroll 0 0 white;
    border: 0 none;
    border-radius: 8px 8px 8px 8px;
    box-shadow: -3px 3px 15px #888888;
    color: black;
    font: 12px sans-serif;
    padding: 5px;
    text-align: center;
}

.legend {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 60%;
}

rect {
    stroke-width: 2;
}

text {
  font: 10px sans-serif;
}

.axis text {
  font: 10px sans-serif;
}

.axis path{
  fill: none;
  stroke: #000;
}

.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.axis .tick line {
  stroke-width: 1;
  stroke: rgba(0, 0, 0, 0.2);
}

.axisHorizontal path{
  fill: none;
}

.axisHorizontal line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.axisHorizontal .tick line {
  stroke-width: 1;
  stroke: rgba(0, 0, 0, 0.2);
}

.bar {
  fill: steelblue;
  fill-opacity: .9;
}

.x.axis path {
  display: none;
}

</style>