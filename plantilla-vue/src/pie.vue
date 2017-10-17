<template>	
 	
<!--
<div class="w3-container" id="pie">
	
	<div class="w3-container w3-gray w3-cell m4 w3-cell-middle">
	    <p>Indices de aprobación.</p>
	    <p>En cambio, en las regiones del pais, el consumo se ve notablemente disminuido por lo que su aprobación es menor</p>
	    

  	</div>

  	 <div class="w3-container w3-light-gray w3-cell m1">
	    <p>Porcentaje de aprobación/desaprobación en otras regiones.</p>

	    <div class="w3-container w3-gray w3-cell m4">
		    <div >
				<svg width="500" height="250"></svg>
			</div>
	  	</div>	    
	  </div>
</div>
-->

<div class="w3-container" >
	
	<div class="w3-container w3-gray w3-cell m4 w3-cell-middle">
	    <p>Indices de aprobación.</p>
	    <p>En cambio, en las regiones del pais, el consumo se ve notablemente disminuido por lo que su aprobación es menor</p>
	    

  	</div>

  	 <div class="w3-container w3-light-gray w3-cell m1">
	    <p>Porcentaje de aprobación/desaprobación en otras regiones.</p>

	    <div class="w3-container w3-gray w3-cell m4" id="pie">
		    <div >
				<div id="chart"></div>
			</div>
	  	</div>	    
	  </div>
</div>

</template>
<script>
import * as d3 from 'd3';
export default{
  data: function(){
    return {
  
      data : [
      		{
      			label:'Yes',population:10
      		},
      		{
      			label:'No',population:90
      		}	
      ],



    }
  },
  methods:{
    loadGraph:function(data){

    	 var color_hash = {  0 : ["apple", "green"],
						     1 : ["mango", "orange"]
						  }   

		var body = d3.select("#pie");
    	var svg = body.selectAll("svg"),
		    width = +svg.attr("width"),
		    height = +svg.attr("height"),
		    radius = Math.min(width, height) / 2,
		    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var color = d3.scaleOrdinal(["#98abc5", "#8a89a6"]);

		var pie = d3.pie()
		    .sort(null)
		    .value(function(d) { return d.population; });

		var path = d3.arc()
		    .outerRadius(radius - 10)
		    .innerRadius(0);

		var label = d3.arc()
		    .outerRadius(radius - 40)
		    .innerRadius(radius - 40);
 
      	var arc = g.selectAll(".arc")
		    .data(pie(data))
		    .enter().append("g")
		      .attr("class", "arc");

		  arc.append("path")
		      .attr("d", path)
		      .attr("fill", function(d) { return color(d.data.label); });
		 
		  arc.append("text")
		      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
		      .attr("dy", "0.35em")
		      .text(function(d) { return d.data.label; });

		/** add title to chart
		  svg.append("svg:text")
		   .attr("class", "title")
	   .attr("x", 20)
	   .attr("y", 20)
	   .text("Fruit Sold Per Hour");
	   **/
	   var legend = svg.append("g")
		  .attr("class", "legend")
	        //.attr("x", w - 65)
	        //.attr("y", 50)
		  .attr("height", 100)
		  .attr("width", 100)
	    .attr('transform', 'translate(-20,50)');    
	      
	    
	    legend.selectAll('rect')
	      .data(data)
	      .enter()
	      .append("rect")
		  .attr("x", w - 65)
	      .attr("y", function(d, i){ return i *  20;})
		  .attr("width", 10)
		  .attr("height", 10)
		  .style("fill", function(d) { 
	        var color = color_hash[data.indexOf(d)][1];
	        return color;
	      })
	      
	    legend.selectAll('text')
	      .data(data)
	      .enter()
	      .append("text")
		  .attr("x", w - 52)
	      .attr("y", function(d, i){ return i *  20 + 9;})
		  .text(function(d) {
	        var text = color_hash[data.indexOf(d)][0];
	        return text;
	      });
		

		
    },
    cosa:function(data){
    	

        var width = 500;
        var height = 250;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 125;
        var legendRectSize = 18;                                  // NEW
        var legendSpacing = 4;                                    // NEW

        var color = d3.scaleOrdinal(["#98abc5", "#8a89a6"]);

        var body = d3.select("#pie");
        var svg = body.select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius - 18);

        var pie = d3.pie()
          .value(function(d) { return d.population; })
          .sort(null);

        var path = svg.selectAll('path')
          .data(pie(data))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(d.data.label);
          });

        var legend = svg.selectAll('.legend')                     // NEW
          .data(color.domain())                                   // NEW
          .enter()                                                // NEW
          .append('g')                                            // NEW
          .attr('class', 'legend')                                // NEW
          .attr('transform', function(d, i) {                     // NEW
            var height = legendRectSize + legendSpacing;          // NEW
            var offset =  height * color.domain().length / 2;     // NEW
            var horz = -12.5 * legendRectSize;                    // mueve leyenda en horizontal
            var vert = i * height - offset;                       // mueve leyenda en vertical
            return 'translate(' + horz + ',' + vert + ')';        // NEW
          });                                                     // NEW

        legend.append('rect')                                     // NEW
          .attr('width', legendRectSize)                          // NEW
          .attr('height', legendRectSize)                         // NEW
          .style('fill', color)                                   // NEW
          .style('stroke', color);                                // NEW
          
        legend.append('text')                                     // NEW
          .attr('x', legendRectSize + legendSpacing)              // NEW
          .attr('y', legendRectSize - legendSpacing)              // NEW
          .text(function(d) { return d; }); 
    }
    
  },
  mounted:function(){
   
     //this.loadGraph(this.data);
     this.cosa(this.data);
     //this.cosa2(this.data3);
     
  }
}
</script>
<style> 


	.arc text {
	  font: 10px sans-serif;
	  text-anchor: middle;
	}

	.arc path {
	  stroke: #fff;
	}


</style>