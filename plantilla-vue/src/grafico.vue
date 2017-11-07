
<template>	

<div class="w3-container">
	<div class="w3-panel w3-theme-l1 w3-card-2 w3-center">
        <p>Estadisticas de Aprobación y desaprobación de la Marihuana.</p>
      </div>

      <div class="w3-center w3-cell-row" id="wea">

	 
	
	<div class="w3-container w3-gray w3-cell m4 w3-cell-middle">
	    <p>Indices de aprobación y desaprobación.</p>
	    <p>El siguiente gráfico corresponde a la distribución de la opinión general de la población referente a los 2 tópicos estudiados: Legalización y Medicinal.</p>
	    

  	</div>

  	 <div class="w3-container w3-light-gray w3-cell m1 w3-cell-top">
	    <p>Gráfico de aprobación-desaprobación de la población Chilena.</p>
	    <svg  width="960" height="500"></svg>
	  </div>
	

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
      dataset : []
    }
  },
  methods:{
    loadGraph:function(data){

      	var svg = d3.select("svg"),
		    margin = {top: 50, right: 100, bottom: 30, left: 50},
		    width = +svg.attr("width") - margin.left - margin.right,
		    height = +svg.attr("height") - margin.top - margin.bottom;


		var tooltip = d3.select("body")
			.append("div")
			.attr("class", "toolTip");

		var x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
		    y = d3.scaleLinear().rangeRound([height, 0]);

		var coloursD = d3.scaleOrdinal().range(["#cb0000"]);
		var coloursA = d3.scaleOrdinal().range(["#579317"]);

		var g = svg.append("g")
		    .attr("transform", "translate(" + 30 + "," + margin.top + ")");

		var f = svg.append("g")
		    .attr("transform", "translate(" + 210 + "," + margin.top + ")");
		

		  x.domain(data.map(function(d) { return d.topic.name; }));
		  y.domain([0, 100]);
		  //y.domain([0, 1]); // eje y en rangos de 0% hasta el 100%

		  g.append("g")
		      .attr("class", "axis axis--x")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x));

		  g.append("g")
		      .attr("class", "axis axis--y")
		      .call(d3.axisLeft(y).ticks(20).tickSizeInner([-width])) // ticks indica la cantidad de indices del eje y
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", "0.71em")
		      .attr("text-anchor", "end")
		      .attr("fill", "#5D6971")
		      .text("Porcentaje de 0 a 100%");

		  g.selectAll(".bar")
		    .data(data)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", function(d) { return x(d.topic.name); })
		      .attr("y", function(d) { return y((d.approval*100)/(d.approval+d.disapproval)); })
		      .attr("width", 100)
		      .attr("height", function(d) { return height - y((d.approval*100)/(d.approval+d.disapproval)); })
		      .attr("fill", function(d) { return coloursA(d.approval); })
		      .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html("Aprobación "+"<br><br>"+"Categoria: "+(d.topic.name)+ "<br>"+ "Porcentaje de tweets: "+ ((d.approval*100)/(d.approval+d.disapproval))+" %");
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});


		  f.selectAll(".bar2")
		    .data(data)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", function(d) { return x(d.topic.name); })
		      .attr("y", function(d) { return y((d.disapproval*100)/(d.approval+d.disapproval)); })
		      .attr("width", 100)
		      .attr("height", function(d) { return height - y((d.disapproval*100)/(d.approval+d.disapproval)); })
		      .attr("fill", function(d) { return coloursD(d.disapproval); })
		      .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html("Desaprobación "+"<br><br>"+"Categoria: "+(d.topic.name)+ "<br>"+ "Porcentaje de tweets: "+ ((d.disapproval*100)/(d.approval+d.disapproval))+" %");
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});


		
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

    },
    cosa2:function(data){
    	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		// parse the date / time
		var parseTime = d3.timeParse("%d-%b-%y");

		// set the ranges
		var x = d3.scaleTime().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);

		// define the line
		var valueline = d3.line()
		    .x(function(data) { return x(data.date); })
		    .y(function(data) { return y(data.close); });

		// append the svg obgect to the body of the page
		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select("body").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform",
		          "translate(" + margin.left + "," + margin.top + ")");

		// gridlines in x axis function
		function make_x_gridlines() {		
		    return d3.axisBottom(x)
		        .ticks(5)
		}

		// gridlines in y axis function
		function make_y_gridlines() {		
		    return d3.axisLeft(y)
		        .ticks(5)
		}

		// format the data
		  data.forEach(function(data) {
		      data.date = parseTime(data.date);
		      data.close = +data.close;
		  });



		  // Scale the range of the data
		  x.domain(d3.extent(data, function(d) { return d.date; }));
		  y.domain([0, d3.max(data, function(d) { return d.close; })]);

		  // add the X gridlines
		  svg.append("g")			
		      .attr("class", "grid")
		      .attr("transform", "translate(0," + height + ")")
		      .call(make_x_gridlines()
		          .tickSize(-height)
		          .tickFormat("")
		      )

		  // add the Y gridlines
		  svg.append("g")			
		      .attr("class", "grid")
		      .call(make_y_gridlines()
		          .tickSize(-width)
		          .tickFormat("")
		      )

		  // add the valueline path.
		  svg.append("path")
		      .data([data])
		      .attr("class", "line")
		      .attr("d", valueline);

		  // add the X Axis
		  svg.append("g")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x));

		  // add the Y Axis
		  svg.append("g")
		      .call(d3.axisLeft(y));

		}
  },
  mounted:function(){
   
     this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvals')
	    .then(response=>{
	      this.dataset = response.body;
	      console.log("wea bacan");
	      console.log(this.dataset);
	      this.loadGraph(this.dataset);
	    }, response=>{
	      console.log("error de conexion");
	    })

     
  }
}
</script>
<style> 
	.axis {
		font: 13px sans-serif;

	}
	.axis path,
	.axis line {
	  fill: none;
	  stroke: #D4D8DA;
	  stroke-width: 1px;
	  shape-rendering: crispEdges;
	}
	.toolTip {
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
	.chart div {
	  font: 10px sans-serif;
	  background-color: steelblue;
	  text-align: right;
	  padding: 3px;
	  margin: 1px;
	  color: white;
	}

	.chart rect {
	  fill: steelblue;
	}

	.chart text {
	  fill: white;
	  font: 10px sans-serif;
	  text-anchor: end;
	}


	

	.line {
	  fill: none;
	  stroke: steelblue;
	  stroke-width: 2px;
	}

	.grid line {
	  stroke: lightgrey;
	  stroke-opacity: 0.7;
	  shape-rendering: crispEdges;
	}

	.grid path {
	  stroke-width: 0;
	}

</style>