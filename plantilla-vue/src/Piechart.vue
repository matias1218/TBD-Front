<template>	
 	

<div  >
	
	<div class="w3-container w3-gray w3-cell m4 w3-cell-middle">
	    <p>Indices de aprobación.</p>
	    <p>Los siguentes graficos muestran la distribucion de aprobacion-desaprobacion que existen en Chile segun región</p>
	    

  	</div>

  	 <div class="w3-container w3-light-gray w3-cell m1 w3-cell-top">
	    <p>Gráfico aprobación en las principales comunas de Santiago.</p>

	    <div class="w3-container w3-gray w3-cell m4 w3-cell-middle">
		    <div id="area1">
				<svg width="500" height="250"></svg>
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
      			age:'yes',population:50
      		},
      		{
      			age:'no',population:40
      		}	
      ],



    }
  },
  methods:{
    loadGraph:function(data){

    	

		var body = d3.select("#area1");
    	var svg = body.select("svg"),
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
		      .attr("fill", function(d) { return color(d.data.age); });
		  /**
		  arc.append("text")
		      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
		      .attr("dy", "0.35em")
		      .text(function(d) { return d.data.age; });
			**/
		////////
		
    }
    
  },
  mounted:function(){
   
     this.loadGraph(this.data);
     //this.cosa(this.data);
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