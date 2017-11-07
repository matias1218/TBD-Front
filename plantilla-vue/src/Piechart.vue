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
        <div >
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
      dataset : [
        { name: 'Firearms', total: 8124, percent: 67.9 },
        { name: 'Knives or cutting instruments', total: 1567, percent: 13.1 },
        { name: 'Other weapons', total: 1610, percent: 13.5 },
        { name: 'Hands, fists, feet, etc.', total: 660, percent: 5.5 }
      ]

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

        var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

        var body = d3.select("#pieChart");
        var svg = body.select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var div = body.select("#pieChart")
          .append("div") 
          .attr("class", "tooltip")       
          .style("opacity", 0);

        var arc = d3.svg.arc()
          .innerRadius(0)
          .outerRadius(radius - 18);

        var pie = d3.layout.pie()
          .value(function(d) { return d.population; })
          .startAngle(1.1*Math.PI)
        .endAngle(3.1*Math.PI)
          .sort(null)


        var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
      .style("fill", function(d) { return color(d.data.label); })
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
          .text(function(d) { return d.data.label; });

      d3.selectAll("path").on("mousemove", function(d) {
          div.style("left", d3.event.pageX+10+"px");
          div.style("top", d3.event.pageY-25+"px");
          div.style("display", "inline-block");
        div.html((d.data.label)+"<br>"+(d.data.population) + "%");
    });
        
    d3.selectAll("path").on("mouseout", function(d){
        div.style("display", "none");
    });


    //d3.select("body").transition().style("background-color", "#d3d3d3");
    function type(d) {
      d.population = +d.population;
      return d;
    }

		
    },
    grafico2: function(dataset){

      var div = d3.select("#pie").append("div").attr("class", "toolTip");
      

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
          .value(function(d) { return d.total; });

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
        .style("fill", function(d) { return color(d.data.name); })
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
            .text(function(d) { return d.data.name; });

        d3.selectAll("path").on("mousemove", function(d) {
            div.style("left", d3.event.pageX+10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
          div.html((d.data.name)+"<br>"+(d.data.total) + "<br>"+(d.data.percent) + "%");
      });
          
      d3.selectAll("path").on("mouseout", function(d){
          div.style("display", "none");
      });

      var legend = svg.append("g")
      .attr("class", "legend")
          //.attr("x", w - 65)
          //.attr("y", 50)
      .attr("height", 100)
      .attr("width", 100)
      .attr('transform', 'translate(-20,50)');    
        
      
      legend.selectAll('rect')
        .data(dataset)
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
        .data(dataset)
        .enter()
        .append("text")
      .attr("x", w - 52)
        .attr("y", function(d, i){ return i *  20 + 9;})
      .text(function(d) {
          var text = color_hash[data.indexOf(d)][0];
          return text;
        });

      
          
          
      //d3.select("body").transition().style("background-color", "#d3d3d3");
      function type(d) {
        d.total = +d.total;
        return d;
      }
    }
    
  },
  mounted:function(){
   
    
   
    this.grafico2(this.dataset);
     
     //this.cosa(this.data);
     //this.cosa2(this.data3);
     
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