<template>
	<div class="w3-container w3-center">
		<div class="w3-panel w3-theme-l1 w3-card-2">
		  <h3>Historial porcentual de aprobación/desaprobación por tópico</h3>
	      <p>{{message}}</p>
	    </div>
	    <div class="w3-bar">
	    	<button class="w3-btn button1 w3-round-xxlarge" id="btn-med" v-on:click="changeMed()" >Medicinal </button>
	    	<button class="w3-btn w3-round-xxlarge" id="btn-leg" v-on:click="changeLeg()">Legalización</button>
	    </div><br><br>
	    <div class="w3-bar">
	    	<button class="w3-btn button1 w3-round-xxlarge" id="btn-aprob" v-on:click="changeA()" >Aprobación </button>
	    	<button class="w3-btn w3-round-xxlarge" id="btn-desap" v-on:click="changeD()">Desaprobación</button>
	    </div><br><br>
		
		<div id="lineG">
			<div id="chart"></div>
		</div>		

	</div>
</template>

<script>

	import * as d3 from 'd3';
	export default{

		data:function(){
			return{
				categoria:'',
				medicinal:'http://localhost:3000/data',
				recreativo:'http://localhost:3001/data',
				legal:'http://localhost:3002/data',
				message1:'Gráfico de Aprobación Medicinal',
				message2:'Gráfico de Desaprobación Medicinal',
				message3:'Gráfico de Aprobación Recreativa',
				message4:'Gráfico de Desaprobación Recreativa',
				message5:'Gráfico de Aprobación Legal',
				message6:'Gráfico de Desaprobación Legal',
				message:'',
				status:'',

			}
			
		},
  		
    	mounted(){
    		this.categoria=this.medicinal;
    		this.message=this.message1;
    		this.status='medicinal';
    		this.$http.get(this.categoria)
		    .then(response=>{
		      var data = response.body;
		      this.cargarGrafico(data);
		    }, response=>{
		      console.log("error de conexion");
		    })
    	},
    	methods:{
    		say:function(message){
    			alert(this.categoria)
    		},
    		changeMed:function(){
    			this.categoria=this.medicinal
    			this.status='medicinal';
    			this.message=this.message1;
    			this.changeToAprob();
    		},
    		changeRec:function(){
    			this.categoria=this.recreativo
    			this.status='recreativo';
    			this.message=this.message3;
    			this.changeToAprob();
    		},
    		changeLeg:function(){
    			this.categoria=this.legal
    			this.status='legal';
    			this.message=this.message5;
    			this.changeToAprob();
    		},
    		changeA:function(){
    			if(this.status=="medicinal"){
    				this.message=this.message1;
    			}
    			if(this.status=="recreativo"){
    				this.message=this.message3;
    			}
    			if(this.status=="legal"){
    				this.message=this.message5;
    			}
    			this.changeToAprob();	
    		},
    		changeD:function(){
    			if(this.status=="medicinal"){
    				this.message=this.message2;
    			}
    			if(this.status=="recreativo"){
    				this.message=this.message4;
    			}
    			if(this.status=="legal"){
    				console.log("desaprobacion legal");
    				this.message=this.message6;
    			}
    			this.changeData();	
    		},
    		funcionPrueba:function(){
    			this.changeRec();
    			this.say('hi');
    		},

    		changeData:function(){
    			console.log("status "+this.status);
    			console.log("categoria "+this.categoria);
    			this.$http.get(this.categoria)
				    .then(response=>{
				    	var estado=this.status;
				    	var svg=d3.select("#chart").transition();
				    	var maxUser={userName:"Pablo Alvarez",tweet:"El senado debería aprobar el cultivo de marihuana, modifiquen la ley 20000 de una vez",user:"@pAlvarez32"};
				  		var minUser={userName:"Augusto Correa Maldonado",tweet:"Que los parlamentarios prohiban todo tipo de drogas, puro #narcotrafico y asesinatos",user:"@augstM"};
				  		var maxUserM={userName:"Lorena Casanova",tweet:"Gracias a la marihuana medicinal mi hijo ha logrado avances en su enfermedad, gracias Marihuana (L)",user:"@Lore43"};
				  		var minUserM={userName:"Cristian Tolosa",tweet:"Los están engañando a todos con eso de la marihuana medicinal, usted sabe que produce daño al cerebro antes de los 23 años?",user:"@TololoCH"};

				      var data = response.body;
				      var margin = {top: 50, right: 50, bottom: 50, left: 50}
				            , width = window.innerWidth - 200 // Use the window's width 
				            , height = 375; // Use the window's height
				       var parseTime = d3.timeParse("%d-%b-%y");
				       var timeParser=d3.timeFormat("%d-%b-%Y");
				       var x = d3.scaleTime().range([0, width]);
				  		var y = d3.scaleLinear().range([height, 0]);
				      data.forEach(function(d) {
				        d.date = parseTime(d.date);
				        d.aprobacion = +d.aprobacion;
				        d.desaprobacion= +d.desaprobacion;
				        //console.log(d.desaprobacion);
				    	});
					    x.domain(d3.extent(data, function(d) { return d.date; }));
					    y.domain([0, 100]);
					    var valueline = d3.line()
					      .x(function(d) { return x(d.date); })
					      .y(function(d) { return y(d.desaprobacion); });
				      	

				      	//d3.selectAll("#circle1").style("opacity", 0);
				      	d3.select("#line1").transition()
				      		.duration(750)
				      		.attr("d",valueline(data))


				      		var div=d3.selectAll("#tooltup");
				      		var maxim2=d3.max(data, function(d) {
				      			return Math.max(d.desaprobacion); });
				      		console.log("el maximo es: "+maxim2);
				      		//console.log("Maximo "+maxim2);


				      		var circulos=d3.selectAll("#circle1");
				      		circulos.data(data);
				      		circulos.on("mouseover",function(d){
						            d3.select(this).transition()
						            .attr("r",12);

						            div.transition()    
						                  .duration(750)    
						                  .style("opacity", .95);    
						              div .html(function(i){
						                if(d.desaprobacion==maxim2){
						                	console.log("aqui status: "+estado);
						                	if(estado=="medicinal"){
						                		return 'Punto Máximo Desaprobacion:<br/>'+timeParser(d.date)+':<br/>'+d.desaprobacion+'%<br/>'+minUserM.userName+" "+minUserM.user+"<br/>"+minUserM.tweet;
						                	}
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
						                  .duration(750)    
						                  .style("opacity", 0);


						          });
				      		circulos.transition()
                        		.duration(500)
                        		.attr("cx", function(d) { return x(d.date); })     
				          		.attr("cy", function(d,i) { return y(d.desaprobacion); })
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
						          .attr("r",function(d){
						              if(d.desaprobacion==maxim2){
						                return 10;
						              }
						              return 7;
						            }); 
						          





				    }, response=>{
				      console.log("error de conexion");
				    })


    		},
    		changeToAprob:function(){
    			console.log("status "+this.status);
    			var estado=this.status;
    			console.log("categoria "+this.categoria);
    			this.$http.get(this.categoria)
				    .then(response=>{
				    	console.log("Entraste a change to aprobacion");
				    	var svg=d3.select("#chart").transition();
				    	var maxUser={userName:"Pablo Alvarez",tweet:"El senado debería aprobar el cultivo de marihuana, modifiquen la ley 20000 de una vez",user:"@pAlvarez32"};
				  		var minUser={userName:"Augusto Correa Maldonado",tweet:"Que los parlamentarios prohiban todo tipo de drogas, puro #narcotrafico y asesinatos",user:"@augstM"};
				  		var maxUserM={userName:"Lorena Casanova",tweet:"Gracias a la marihuana medicinal mi hijo ha logrado avances en su enfermedad, gracias Marihuana (L)",user:"@Lore43"};
				  		var minUserM={userName:"Cristian Tolosa",tweet:"Los están engañando a todos con eso de la marihuana medicinal, usted sabe que produce daño al cerebro antes de los 23 años?",user:"@TololoCH"};
					      var data = response.body;
					      var margin = {top: 50, right: 50, bottom: 50, left: 50}
					            , width = window.innerWidth - 200 // Use the window's width 
					            , height = 375; // Use the window's height
					       var parseTime = d3.timeParse("%d-%b-%y");
					       var timeParser=d3.timeFormat("%d-%b-%Y");
					       var x = d3.scaleTime().range([0, width]);
					  		var y = d3.scaleLinear().range([height, 0]);
					  		var maxim=d3.max(data, function(d) {
					      		return Math.max(d.aprobacion); });
				      data.forEach(function(d) {
				        d.date = parseTime(d.date);
				        d.aprobacion = +d.aprobacion;
				        d.desaprobacion= +d.desaprobacion;
				        //console.log(d.aprobacion);
				    	});
					    x.domain(d3.extent(data, function(d) { return d.date; }));
					    y.domain([0, 100]);
					    var valueline = d3.line()
					      .x(function(d) { return x(d.date); })
					      .y(function(d) {return y(d.aprobacion); });
				      	//d3.selectAll("#circle1").style("opacity", 0);
				      	d3.select("#line1").transition()
				      		.duration(750)
				      		.attr("d",valueline(data));


				      		var div=d3.selectAll("#tooltup");
				      		var maxim2=d3.max(data, function(d) {
				      			return Math.max(d.aprobacion); });
				      		//console.log("Maximo "+maxim2);
				      		


				      		var circulos=d3.selectAll("#circle1");
				      		circulos.data(data);
				      		circulos.on("mouseover",function(d){
					            d3.select(this).transition()
					            .attr("r",12);

					            div.transition()    
					                  .duration(200)    
					                  .style("opacity", .95);    
					              div .html(function(i){
					                if(d.aprobacion==maxim){
					                	if(estado=="medicinal"){
					                		console.log("Entraste en medicinal");
					                		return 'Punto Máximo Aprobacion:<br/>'+timeParser(d.date)+':<br/>'+d.aprobacion+'%<br/>'+maxUserM.userName+" "+maxUserM.user+"<br/>"+maxUserM.tweet;
					                	}
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

				      		circulos.transition()
                        		.duration(500)
                        		.attr("cx", function(d) { return x(d.date); })     
				          		.attr("cy", function(d,i) { return y(d.aprobacion); })
				          		.attr("r",function(d){
						              if(d.aprobacion==maxim){
						                return 10;
						              }
						              return 7;
						            })   
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
				          });
				          




				    }, response=>{
				      console.log("error de conexion");
				    })


    		},




    		cargarGrafico: function(data){
    			var maxUser={userName:"Lorena Casanova",tweet:"Gracias a la marihuana medicinal mi hijo ha logrado avances en su enfermedad, gracias Marihuana (L)",user:"@Lore43"};
				  		var minUser={userName:"Cristian Tolosa",tweet:"Los están engañando a todos con eso de la marihuana medicinal, usted sabe que produce daño al cerebro antes de los 23 años?",user:"@TololoCH"};

				  var div = d3.select("#chart").append("div") 
				    .attr("class", "tooltup")
				    .attr("id","tooltup")
				    .style("opacity", 0)

				  var margin = {top: 50, right: 50, bottom: 50, left: 50}
				            , width = window.innerWidth - 200 // Use the window's width 
				            , height = 375; // Use the window's height
				  // parse the date / time
				  var parseTime = d3.timeParse("%d-%b-%y");
				  var timeParser=d3.timeFormat("%d-%b-%Y");

				  // set the ranges
				  var x = d3.scaleTime().range([0, width]);
				  var y = d3.scaleLinear().range([height, 0]);
				  
				  ///////var y1 = d3.scaleLinear().range([height, 0]);  


				  

				  // define the line
				  var valueline = d3.line()
				      .x(function(d) { return x(d.date); })
				      .y(function(d) { return y(d.aprobacion); });

				  /*var valueline2 = d3.line()
				      .x(function(d) { return x(d.date); })
				      .y(function(d) { return y1(d.desaprobacion); });*/
				  // define the line
				    
				  // append the svg obgect to the body of the page
				  // appends a 'group' element to 'svg'
				  // moves the 'group' element to the top left margin
				  var svg = d3.select("#chart").append("svg")
				      .attr("width", width + margin.left + margin.right)
				      .attr("height", height + margin.top + margin.bottom)
				      .attr("class","linearG")
				    .append("g")
				      .attr("transform",
				            "translate(" + margin.left + "," + margin.top + ")");

				 
				    
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
				    ////////y1.domain([0, 100]);


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

				    /*svg.append("path")
				        .data([data])
				        .attr("id","line2")
				        .attr("class", "line2")
				        .attr("d", valueline2);*/

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

				    /*svg.selectAll("dot")  
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


				          });*/


				    function make_x_gridlines() {   
				        return d3.axisBottom(x)
				            .ticks(5)
				    }

				    // gridlines in y axis function
				    function make_y_gridlines() {   
				        return d3.axisLeft(y)
				            .ticks(5)
				    }

				    /*function make_y_gridlines() {   
				        return d3.axisRight(y1)
				            .ticks(5)
				    } */   


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
				              .tickSize(-width)
				              .tickFormat("")
				          );
				    
				    // Add the X Axis
				    svg.append("g")
				        .attr("transform", "translate(0," + height + ")")
				        .call(d3.axisBottom(x));

				    // Add the Y Axis
				    svg.append("g")
				        .call(d3.axisLeft(y));
				    


				    /*("x", 5)             
				      .attr("y", margin.top)    
				      .attr("class", "legend")
				      .style("fill", "darkgreen")         
				      .on("click", function(){
				        // Determine if current line is visible
				        var active   = valueline.active ? false : true,
				          newOpacity = active ? 0 : 1,
				          visibilidad= active ? " no " : " ";
				        // Hide or show the elements
				        d3.select("#line1").style("opacity", newOpacity);
				        d3.selectAll("#circle1").style("opacity", newOpacity);
				        d3.select(this).text("Aprobación:"+visibilidad+"visible");
				        //d3.selectAll("circle").style("opacity",newOpacity);
				        // Update whether or not the elements are active
				        valueline.active = active;
				      })
				      .text("Aprobación: visible");*/
				    /*svg.append("text")
				      .attr("x", 5)             
				      .attr("y", margin.top+20)    
				      .attr("class", "legend")
				      .style("fill", "darkred")         
				      .on("click", function(){
				        // Determine if current line is visible
				        var active   = valueline2.active ? false : true,
				          newOpacity = active ? 0 : 1,
				          visibilidad= active ? " no " : " ";
				        // Hide or show the elements
				        d3.select("#line2").style("opacity", newOpacity);
				        d3.selectAll("#circle2").style("opacity", newOpacity);
				        d3.select(this).text("Desaprobación:"+visibilidad+"visible");
				        //d3.selectAll("circle").style("opacity",newOpacity);
				        // Update whether or not the elements are active
				        valueline2.active = active;
				      })
				      .text("Desaprobación: visible");*/
			    




    		}
					
				
		}

    	
    }


</script>

<style>


.line {
  fill: none;
  stroke: #005500FF;
  stroke-width: 3px;
}
div.tooltup { 
    position: absolute;     
    text-align: center;     
    color:white; 
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
	
  #btn-med{
  	background-color: #005500FF;
  	color:white;
  }
  #btn-leg{
  	background-color: #F3F300FF;
  	color:#005500FF;
  }
  #btn-rec{
  	background-color: #AA0000FF;
  	color:white;
  }
  .button1:hover{
  	color:white;
  	background-color: red;
  }
  #btn-aprob{
  	color:white;
  	background-color: green;
  }
  #btn-desap{
  	color:white;
  	background-color: red;
  }
</style>