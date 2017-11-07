<template>	
 	




<div class="w3-container" >

    <div class="w3-panel w3-theme-l1 w3-card-2">
        <p>Grafo de redes sociales para cada tópico según las diversas opiniones y posturas de la población estudiada.</p>
      </div> 
  
  <div class="w3-container w3-gray w3-cell m4 w3-cell-middle">
      <p>Indices de aprobación.</p>
      <p>En cambio, en las regiones del pais, el consumo se ve notablemente disminuido por lo que su aprobación es menor</p>
      

    </div>

     <div class="w3-container w3-light-gray w3-cell m1">
      <p>Porcentaje de aprobación/desaprobación en otras regiones.</p>

      <div class="w3-container w3-cell m4">
        <div id="cosa" >
          <div id="pie">
    
          </div>
      </div>
      </div>      
    </div>
</div>



</template>
<script>
export default{
  data: function(){
    return {
    
      data2 : [],
      dataset : [{"id":1,"approval":444,"disapproval":274,"create":1509932247000,"topic":{"id":1,"name":"Legalización"}},{"id":2,"approval":276,"disapproval":45,"create":1509932252000,"topic":{"id":2,"name":"Medicinal"}}]

      //{"tweetsTopicId":1,"topicId":1,"date":1508710487000,"value":10}



    }
  },
  methods:{
  
    grafico2: function(dataset){

      


      
      var width = 800,
          height = 500,
          radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

      var arc = d3.svg.arc()
          .outerRadius(0)
          .innerRadius(radius - 18);

      var pie = d3.layout.pie()
          .sort(null)
         .startAngle(1.1*Math.PI)
          .endAngle(3.1*Math.PI)
          .value(function(d) { return d.approval ; });

      var svg = d3.select("#pie")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

       var g = svg.selectAll(".arc")
            .data(pie(dataset))
          .enter().append("g")
            .attr("class", "arc");

        g.append("path")
        .style("fill", function(d) { return color(d.data.approval); })
          .transition().delay(function(d,i) {
        return i * 500; }).duration(500)
        .attrTween('d', function(d) {
          var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
          return function(t) {
            d.endAngle = i(t); 
            return arc(d)
            }
          }); 
        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
          .transition()
          .delay(1000)
            .text(function(d) { return d.data.topic.name });

            g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", "2.35em")
          .transition()
          .delay(1000)
            .text(function(d) { return "Tweets Aprobación: "+d.data.approval});

      
          
          
      //d3.select("body").transition().style("background-color", "#d3d3d3");
      function type(d) {
        d.approval = +d.approval;
        return d;
      }
    }
    
  },
  mounted:function(){
   
    this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvals')
    .then(response=>{
      this.data2 = response.body;
      console.log(response.body);
      this.grafico2(this.dataset);
      console.log("blavlablabl");
    }, response=>{
      console.log("error de conexion");
    })//this.grafico2(this.dataset);

  }
}
</script>
<style> 
#pie { 
    background-color:#FFE6AAFF;
}

	.arc text {
	  font: 10px sans-serif;
	  text-anchor: middle;
	}

	.arc path {

	  stroke: #fff;
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

</style>