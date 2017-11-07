
<template>	

<div class="w3-container">
	<div><svg></svg></div>

</div>

</div>
 	


</template>
<script>
import * as d3 from 'd3';
export default{
  data: function(){
    return {
     
      dataset : [
      		{"date":"22-Oct-17", "aprobacion": 58,"desaprobacion": 42},           
            {"date":"23-Oct-17", "aprobacion": 30,"desaprobacion": 70},       
            {"date":"24-Oct-17", "aprobacion": 67,"desaprobacion": 33},            
            {"date":"25-Oct-17", "aprobacion": 44,"desaprobacion": 36},           
            {"date":"26-Oct-17", "aprobacion": 46,"desaprobacion": 54},         
            {"date":"27-Oct-17", "aprobacion": 55,"desaprobacion": 45},           
            {"date":"28-Oct-17", "aprobacion": 66,"desaprobacion": 34},           
            {"date":"29-Oct-17", "aprobacion": 92,"desaprobacion": 8},           
            {"date":"30-Oct-17", "aprobacion": 45,"desaprobacion": 55},            
            {"date":"31-Oct-17", "aprobacion": 33,"desaprobacion": 67},           
            {"date":"1-Nov-17", "aprobacion": 40,"desaprobacion": 60},            
            {"date":"2-Nov-17", "aprobacion": 77,"desaprobacion": 23},           
            {"date":"3-Nov-17", "aprobacion": 67,"desaprobacion": 33},           
            {"date":"4-Nov-17", "aprobacion": 45,"desaprobacion": 55},           
            {"date":"5-Nov-17", "aprobacion": 67,"desaprobacion": 33},            
            {"date":"6-Nov-17", "aprobacion": 43,"desaprobacion": 57}
      	]
    }
  },
  methods:{
    loadGraph:function(data){
    	var maxUser={userName:"Pablo Alvarez",tweet:"El senado debería aprobar el cultivo de marihuana, modifiquen la ley 20000 de una vez",user:"@pAlvarez32"};
  var minUser={userName:"Augusto Correa Maldonado",tweet:"Que los parlamentarios prohiban todo tipo de drogas, puro #narcotrafico y asesinatos",user:"@augstM"};

  var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0)

  var margin = {top: 50, right: 50, bottom: 50, left: 50}
            , width = window.innerWidth - margin.left - margin.right // Use the window's width 
            , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

  // parse the date / time
  var parseTime = d3.timeParse("%d-%b-%y");
  var timeParser=d3.timeFormat("%d-%b-%Y");

  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);
  var y1 = d3.scaleLinear().range([height, 0]);  


  

  // define the line
  var valueline = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.aprobacion); });

  var valueline2 = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y1(d.desaprobacion); });
  // define the line
    
  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class","linearG")
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  function draw(data, country) {
    
    var data = data[country];
    
    // format the data
    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.aprobacion = +d.aprobacion;
        d.desaprobacion= +d.desaprobacion;
    });
    
    // sort years ascending
    data.sort(function(a, b){
      return a["date"]-b["date"];
  	})
   
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, 100]);
    y1.domain([0, 100]);


    var maxim2=d3.max(data, function(d) {
      return Math.max(d.desaprobacion); });

    var maxim=d3.max(data, function(d) {
      return Math.max(d.aprobacion); });
    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("id","line1")
        .attr("d", valueline);
    svg.append("path")
        .data([data])
        .attr("id","line2")
        .attr("class", "line2")
        .attr("d", valueline2);

    svg.selectAll("dot")  
          .data(data)     
      .enter().append("circle")               
          .attr("r", function(d){
            if(d.aprobacion==maxim){
              return 10;
            }
            return 7;
          })
          .attr("id","circle1")   
          .attr("cx", function(d) { return x(d.date); })     
          .attr("cy", function(d) { return y(d.aprobacion); })
          .style("stroke",function(d){
            if(d.aprobacion==maxim){
              return "darkgreen";
            }
            return "none";
          })   
          .style("stroke-width",function(d){
            if(d.aprobacion==maxim){
              return 2.5;
            }
            return 0;
          })   
          .style("fill",function(d){
            
            if(d.aprobacion==maxim){
              return "gold";
            }
            return "limegreen";
          })
          .on("mouseover",function(d){
            d3.select(this).transition()
            .attr("r",12);

            div.transition()    
                  .duration(200)    
                  .style("opacity", .95);    
              div .html(function(i){
                if(d.aprobacion==maxim){
                  return 'Punto Máximo Aprobacion:<br/>'+timeParser(d.date)+':<br/>'+d.aprobacion+'%<br/>'+maxUser.userName+" "+maxUser.user+"<br/>"+maxUser.tweet;
                }
                return timeParser(d.date)+':<br/>'+d.aprobacion+'%';
            })
                  .style("left", (d3.event.pageX) + "px")   
                  .style("top", (d3.event.pageY) + "px")
          })
          .on("mouseout",function(d){
            d3.select(this).transition()
            .attr("r",function(d){
              if(d.aprobacion==maxim){
                return 10;
              }
              return 7;
            })   
            .style("fill",function(d,i){
              if(d.aprobacion==maxim){
                return "gold";
              }
              return "limegreen";
            });

            div.transition()    
                  .duration(500)    
                  .style("opacity", 0);


          });

    svg.selectAll("dot")  
          .data(data)     
      .enter().append("circle")               
          .attr("r", function(d){
            if(d.desaprobacion==maxim2){
              return 10;
            }
            return 7;
          })   
          .attr("cx", function(d) { return x(d.date); })     
          .attr("cy", function(d) { return y(d.desaprobacion); })
          .attr("id","circle2")
          .style("stroke",function(d){
            if(d.desaprobacion==maxim2){
              return "darkred";
            }
            return "none";
          })   
          .style("stroke-width",function(d){
            if(d.desaprobacion==maxim2){
              return 2.5;
            }
            return 0;
          })   
          .style("fill",function(d){
            
            if(d.desaprobacion==maxim2){
              return "gold";
            }
            return "red";
          })
          .on("mouseover",function(d){
            d3.select(this).transition()
            .attr("r",12);

            div.transition()    
                  .duration(200)    
                  .style("opacity", .95);    
              div .html(function(i){
                if(d.desaprobacion==maxim2){
                  return 'Punto Máximo Desaprobacion:<br/>'+timeParser(d.date)+':<br/>'+d.desaprobacion+'%<br/>'+minUser.userName+" "+minUser.user+"<br/>"+minUser.tweet;
                }
                return timeParser(d.date)+':<br/>'+d.desaprobacion+'%';
            })
                  .style("left", (d3.event.pageX) + "px")   
                  .style("top", (d3.event.pageY) + "px"); 
          })
          .on("mouseout",function(d){
            d3.select(this).transition()
            .attr("r",function(d){
              if(d.desaprobacion==maxim2){
                return 10;
              }
              return 7;
            })   
            .style("fill",function(d,i){
              if(d.desaprobacion==maxim2){
                return "gold";
              }
              return "red";
            });

            div.transition()    
                  .duration(500)    
                  .style("opacity", 0);


          });


    function make_x_gridlines() {   
        return d3.axisBottom(x)
            .ticks(5)
    }

    // gridlines in y axis function
    function make_y_gridlines() {   
        return d3.axisLeft(y)
            .ticks(5)
    }

    function make_y_gridlines() {   
        return d3.axisRight(y1)
            .ticks(5)
    }    


    // add the X gridlines
      svg.append("g")     
          .attr("class", "grid")
          .attr("transform", "translate(0," + height + ")")
          .call(make_x_gridlines()
              .tickSize(-height)
              .tickFormat("")
          );

      // add the Y gridlines
      svg.append("g")     
          .attr("class", "grid")
          .call(make_y_gridlines()
              .tickSize(width)
              .tickFormat("")
          );
    
    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
    }


    svg.append("text")
      .attr("x", 5)             
      .attr("y", margin.top)    
      .attr("class", "legend")
      .style("fill", "darkgreen")         
      .on("click", function(){
        // Determine if current line is visible
        var active   = line1.active ? false : true,
          newOpacity = active ? 0 : 1,
          visibilidad= active ? " no " : " ";
        // Hide or show the elements
        d3.select("#line1").style("opacity", newOpacity);
        d3.selectAll("#circle1").style("opacity", newOpacity);
        d3.select(this).text("Aprobación:"+visibilidad+"visible");
        //d3.selectAll("circle").style("opacity",newOpacity);
        // Update whether or not the elements are active
        line1.active = active;
      })
      .text("Aprobación: visible");
    svg.append("text")
      .attr("x", 5)             
      .attr("y", margin.top+20)    
      .attr("class", "legend")
      .style("fill", "darkred")         
      .on("click", function(){
        // Determine if current line is visible
        var active   = line2.active ? false : true,
          newOpacity = active ? 0 : 1;
          visibilidad= active ? " no " : " ";
        // Hide or show the elements
        d3.select("#line2").style("opacity", newOpacity);
        d3.selectAll("#circle2").style("opacity", newOpacity);
        d3.select(this).text("Desaprobación:"+visibilidad+"visible");
        //d3.selectAll("circle").style("opacity",newOpacity);
        // Update whether or not the elements are active
        line2.active = active;
      })
      .text("Desaprobación: visible");

    // trigger render
    draw(data, "data");
  

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

.line {
  fill: none;
  stroke: #005500FF;
  stroke-width: 3px;
}
.line2 {
  fill: none;
  stroke: #AA0000FF;
  stroke-width: 3px;
}
div.tooltip { 
    position: absolute;     
    text-align: center;     
            
    
    padding: 2px;       
    font: 14px sans-serif;    
    background: #00AA00FF; 
    border: 0px;    
    border-radius: 8px;     
    pointer-events: none;     
}
.linearG{
  background-color:hsl(56, 100%, 91%);
}
.grid line {
    stroke: lightgrey;
    stroke-opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid path {
    stroke-width: 0;
  }
  .legend{
    font-size:20px;
    border-radius:8px;
  }

</style>