<template>

	<div class="w3-container w3-center">
		<div class="w3-panel w3-theme-l1 w3-card-2">
	      <p>Grafo de redes sociales para cada tópico según las diversas opiniones y posturas de la población estudiada.</p>
	    </div> 
		<div id="grafo">
			<div id="chart"></div>
		</div>		

	</div>
	
	
</template>

<script>
export default{
	
	methods:{
		
		grafo2: function(json){
			var margin = {top: 50, right: 50, bottom: 50, left: 50}
          , width = window.innerWidth - margin.left - margin.right // Use the window's width 
          , height = 600; // Use the window's height




          
		  var svg = d3.select("#chart")
		  	  .append("svg")
		      .attr("width", width)
		      .attr("height", height)
		      .attr("class","graph");

		  var force = d3.layout.force()
		      .gravity(0.03)
		      .distance(200)
		      .charge(-100)
		      .size([width, height]);


		 
		  var div = d3.select("#chart").append("div") 
				    .attr("class", "tool")       
				    .style("opacity", 0)



		  

		    force
		        .nodes(json.nodes)
		        .links(json.links)
		        .start();

		    var link = svg.selectAll(".link")
		        .data(json.links)
		      .enter().append("line")
		        .attr("class", "link")
		        .style("stroke-width", 3);

		    var node = svg.selectAll(".node")
		        .data(json.nodes)
		      .enter().append("g")
		        .attr("class", "node")
		        .call(force.drag);

		    var color = d3.scale.category20();

		     node.append("circle")
		        .attr("r", function(d) { return d.peso*3 })
		        .attr("id", function(d) {return d.userName;})
		        .style("fill",function(d,i){
		          if(d.userName=="Medicinal"){
		            return "limegreen";
		          }
		          if(d.userName=="Legalizacion"){
		            return "gold";
		          }
		          if(d.userName=="Recreativo"){
		            return "firebrick";
		          }
		          return "darkgreen";
		        })
		        .on("mouseover",function(d){
		          d3.select(this).transition()
		          .attr("r",function(d) { return d.peso*6 });

		          div.transition()    
		                .duration(200)    
		                .style("opacity", .95);    
		            div .html(d.userName+':<br/>"'+d.tweet+'"')  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY) + "px"); 


		        })
		        .on("mouseout",function(d){
		          var color2=d3.scale.category20();
		          d3.select(this).transition()
		          .attr("r",function(d) { return d.peso*3 })
		          .style("fill",function(d,i){
		            if(d.userName=="Medicinal"){
		              return "limegreen";
		            }
		            if(d.userName=="Legalizacion"){
		              return "gold";
		            }
		            if(d.userName=="Recreativo"){
		              return "firebrick";
		            }
		            return "darkgreen";
		          });

		          div.transition()    
		                .duration(500)    
		                .style("opacity", 0);


		        });



		    node.append("text")
		        .attr("dx", 12)
		        .attr("dy", ".35em")
		        .text(function(d) { return d.userName });



		    force.on("tick", function() {
		      link.attr("x1", function(d) { return d.source.x; })
		          .attr("y1", function(d) { return d.source.y; })
		          .attr("x2", function(d) { return d.target.x; })
		          .attr("y2", function(d) { return d.target.y; });

		      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		  });

		}
	},
	mounted: function(){
		this.$http.get('http://localhost:3000/db')
	    .then(response=>{
	      this.data = response.body;
	      this.grafo2(this.data);
	    }, response=>{
	      console.log("error de conexion");
	    })
	}
}
</script>

<style>

.link {
  stroke: #ccc;
}

.graph{
  background-color:#FFE6AAFF;
}

.node text {
  pointer-events: none;
  font: 14px sans-serif;
}
.link {
      stroke: #00FF00FF;
      stroke-opacity: 0.5;
    }

.Medicinal{
  
}
.Recreativo{
  stroke:#FF0000FF;
  stroke-width:30;
}
.Legalizacion{
  stroke:#FFFF00FF;
  stroke-width:30;
}

div.tool { 
    position: absolute;     
    text-align: center;     
            
    padding: 2px;       
    font: 14px sans-serif;    
    background: #00AA00FF; 
    border: 0px;    
    border-radius: 8px;     
    pointer-events: none;     
}
</style>