<template>	
 	

<div class="w3-container" id="pieChart">
	
	<div class="w3-container w3-gray w3-cell m4 w3-cell-middle">
	    <h3>Cantidad de Tweets</h3>
	    <p>El siguiente gráfico muestra las cantidades de tweets emitidos los cuales han sido clasificados por categoria, donde se destacan 3 principales y las cuales son nuestro objeto de estudio: Medicina, Recreacional  y Legalización.</p>

	    

  	</div>

  	 <div class="w3-container w3-light-gray w3-cell m1">
	    <p>Clasificacion de Tweets recopilados segun categoría</p>

	    <div class="w3-container w3-gray w3-cell m4">
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
    
      data2 : []


      //{"tweetsTopicId":1,"topicId":1,"date":1508710487000,"value":10}



    }
  },
  methods:{
    loadGraph:function(data){


    	
		var width = 500;
        var height = 250;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 125;
        var legendRectSize = 18;                                  // NEW
        var legendSpacing = 4;                                    // NEW

        var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#cfbde2"]);

        var body = d3.select("#pieChart");
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
          .value(function(d) { return d.value; })
          .sort(null);

        var path = svg.selectAll('path')
          .data(pie(data))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(d.data.topicName);
          });

        var legend = svg.selectAll('.legend')                     // NEW
          .data(color.domain())                                   // NEW
          .enter()                                                // NEW
          .append('g')                                            // NEW
          .attr('class', 'legend')                                // NEW
          .attr('transform', function(d, i) {                     // NEW
            var height = legendRectSize + legendSpacing;          // NEW
            var offset =  height * color.domain().length / 2;     // NEW
            var horz = -14 * legendRectSize;                    // mueve leyenda en horizontal
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
   
    this.$http.get('http://localhost:8081/tbd-tweeds-backend/tweets_topic')
    .then(response=>{
      this.data2 = response.body;
      this.loadGraph(this.data2);
    }, response=>{
      console.log("error de conexion");
    })
     
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