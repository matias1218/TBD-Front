<template>

<div class="w3-container">
	<div class="w3-center w3-panel w3-theme-l1 w3-card-2">
        <p>Mapas de distribución de opiniones</p>
      </div>

	<div class="w3-container w3-gray w3-cell m4 w3-cell-middle">
		
	  <br><br><br><br><br><br><br><br><br><br><br>
      <p>Porcentaje regional.</p>
      <p>El siguiente mapa muestra la distribución porcentual por cada región de chile, acerca de la aprobación que posee la categoría: Medicinal</p>
      <br><br><br><br><br><br><br><br><br><br><br>

    </div>
	<div class="w3-container w3-light-gray w3-cell m1"  id="map" width="200" height="200"></div>
</div>
</template>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script>
export default{
  data: function(){
    return {
    	
    	approval1: 0,
  		approval2: 0,
  		approval3: 0,
  		approval4: 0,
  		approval5: 0,
  		approval6: 0,
  		approval7: 0,
  		approval8: 0,
  		approval9: 0,
  		approval10: 0,
  		approval11: 0,
  		approval12: 0,
  		approval13: 0,
  		approval14: 0,
  		approval15: 0,
  		category1:"",
  		category2:""
  


    }
  },
  methods:{
  
    mapa: function(reg1,reg2,reg3,reg4,reg5,reg6,reg7,reg8,reg9,reg10,reg11,reg12,reg13,reg14,reg15,category){


    	var mapboxAccessToken = "pk.eyJ1IjoibWF0aWFzMTIxOCIsImEiOiJjamE3aHVjbjE0cGxlMzRwYzZkejZkaDZ2In0.eFyYPAAi5lcnJNg8STB0Mg";
    	var map = L.map('map',{
    		center: [5,28],
    		zoom: 3,
    		minZoom: 2,
    		maxZoom: 18
    	}).setView([-39, -70], 4);

    	

    	// set source for map tiles
		var ATTR = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> | ' +
		'&copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

    	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken,{id: 'mapbox.light',attribution:ATTR}).addTo(map);


    	function getColor(d) {
		    return d >= 95 ? '#800026' :
		           d >= 80  ? '#BD0026' :
		           d >= 65  ? '#E31A1C' :
		           d >= 50  ? '#FC4E2A' :
		           d >= 35   ? '#FD8D3C' :
		           d >= 20   ? '#FEB24C' :
		           d >= 10   ? '#FED976' :
		                      '#FFEDA0';
		}


    	var group;


    	var info = L.control();

		info.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};

		// method that we will use to update the control based on feature properties passed
		info.update = function (props) {
		    this._div.innerHTML = '<h4><b>Porcentaje de aprobación en Chile</b></h4>'+ 'Categoria: '+category +'<br>' +  (props ?
		        '<b>' + props.NOM_REG + '</b><br />' + props.approval + '% de la poblacion aprueba la Cannabis'
		        : 'Desliza el cursor sobre una region para ver su información');
		};
		info.addTo(map);



    	function highlightFeature(e) {
		    var layer = e.target;

		    layer.setStyle({
		        weight: 5,
		        color: '#666',
		        dashArray: '',
		        fillOpacity: 0.8
		    });

		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		    info.update(layer.feature.properties);
		}
		function resetHighlight(e) {
		    var layer = e.target;

		    layer.setStyle({
		        weight: 2,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    });

		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		    info.update();
		}	
		function zoomToFeature(e) {
		    map.fitBounds(e.target.getBounds());
		}


    	group = L.geoJson(chile,{
    		onEachFeature: function (feature, layer) {
    			if(layer.feature.properties.COD_REGI === 6){
					//bernardo ogg
					layer.feature.properties.approval = 100*reg6;

				}
				if(layer.feature.properties.COD_REGI === 10){
					//los lagos
				  	layer.feature.properties.approval = 100*reg10;
				  
				}
				if(layer.feature.properties.COD_REGI === 3){
					//atacama
				  	layer.feature.properties.approval = 100*reg3;
				  
				}
				if(layer.feature.properties.COD_REGI === 13){
					//metropolitana
				  	layer.feature.properties.approval = 100*reg13;
				  
				}
				if(layer.feature.properties.COD_REGI === 9){
					//araucania
				  	layer.feature.properties.approval = 100*reg9;
				  
				}
				if(layer.feature.properties.COD_REGI === 7){
					//maule
				  	layer.feature.properties.approval = 100*reg7;
				  
				}
				if(layer.feature.properties.COD_REGI === 5){
					//valparaiso
				  	layer.feature.properties.approval = 100*reg5;
				  
				}
				if(layer.feature.properties.COD_REGI === 1){
					//tarapaca
					layer.feature.properties.approval = 100*reg1;
			  
				}
				if(layer.feature.properties.COD_REGI === 14){
					//los rios
				  	layer.feature.properties.approval = 100*reg14;
				  
				}
				if(layer.feature.properties.COD_REGI === 8){
					//bio bio
				  	layer.feature.properties.approval = 100*reg8;
				  
				}
				if(layer.feature.properties.COD_REGI === 11){
					//aysen gral carlos ibañez
				  	layer.feature.properties.approval = 100*reg11;
				  
				}
				if(layer.feature.properties.COD_REGI === 2){
					//antofagasta
				  	layer.feature.properties.approval = 100*reg2;
				  
				}
				if(layer.feature.properties.COD_REGI === 15){
					//arica y parinacota
				  	layer.feature.properties.approval = 100*reg15;
				  
				}
				if(layer.feature.properties.COD_REGI === 4){
					//coquimbo
				  	layer.feature.properties.approval = 100*reg4;
				  
				}
				if(layer.feature.properties.COD_REGI === 12){
					//magallanes antartica
				  	layer.feature.properties.approval = 100*reg12;
				  
				}
				layer.bindPopup("<b>"+layer.feature.properties.NOM_REG+"</b>"+"<br>"+"Aprobacion: "+layer.feature.properties.approval+"%" +"<br>"+"Desaprobación: "+(100-layer.feature.properties.approval)+"%");

				layer.on({
		        	click: zoomToFeature,
		        	mouseover: highlightFeature,
		        	mouseout: resetHighlight
		    	});


	        
	        }
	        
	        
    	}).addTo(map);

   
    	var styles = group.eachLayer(function (layer) {  
    		console.log(layer.feature);
		  if(layer.feature.properties.approval >= 95) {    
		    layer.setStyle({fillColor :'#800026',weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7}); 
		  }
		  else{
		  	if(layer.feature.properties.approval >= 80) {    
			  layer.setStyle({fillColor :'#BD0026',weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7}); 
			}
			else{
				if(layer.feature.properties.approval >= 65) {    
				  layer.setStyle({fillColor :'#E31A1C',weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7}); 
				}
				else{
					if(layer.feature.properties.approval >= 50) {    
					  layer.setStyle({fillColor :'#FC4E2A',weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7}); 
					}
					else{
						if(layer.feature.properties.approval >= 35) {    
						  layer.setStyle({fillColor :'#FD8D3C',weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7}); 
						}
						else{
							if(layer.feature.properties.approval >= 20) {    
							  layer.setStyle({fillColor :'#FEB24C',weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7}); 
							}
							else{
								if(layer.feature.properties.approval >= 10) {    
								  layer.setStyle({fillColor :'#FED976',weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7}); 
								}
								else{
									layer.setStyle({fillColor :'#FFEDA0',weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7}); 
								}
							}
						}
					}
				}
			}
		  }

		});


		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

		    var div = L.DomUtil.create('div', 'info legend'),
		        grades = [0, 10, 20, 35, 50, 65, 80, 95],
		        labels = [];

		    // loop through our density intervals and generate a label with a colored square for each interval
		    for (var i = 0; i < grades.length; i++) {
		        div.innerHTML +=
		            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
		            grades[i]+'%' + (grades[i + 1] ? ' &ndash; ' + grades[i + 1]+'%' + '<br>' : '+');
		    }

		    return div;
		};

		legend.addTo(map);

    },
    greet: function () {

  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/1/topic')
	    .then(response=>{
	      this.category1 = response.body.name;

	      this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/20/topic')
		    .then(response=>{
		      this.category2 = response.body.name;
		      
		    }, response=>{
		      console.log("error de conexion");
		    })//this.grafico2(this.dataset);
	      
	    }, response=>{
	      console.log("error de conexion");
	    })//this.grafico2(this.dataset);


  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/17').then(response=>{
		  this.approval1 = response.body.approval;
		  console.log(this.approval1);

		  this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/18').then(response=>{
		  	this.approval2 = response.body.approval;
		  	console.log(this.approval2);

		  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/19').then(response=>{
			  	this.approval3 = response.body.approval;
			  	console.log(this.approval3);

			  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/20').then(response=>{
					  	this.approval4 = response.body.approval;
					  	console.log(this.approval4);

					  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/21').then(response=>{
						  	this.approval5 = response.body.approval;
						  	console.log(this.approval5);

						  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/22').then(response=>{
							  	this.approval6 = response.body.approval;
							  	console.log(this.approval6);

							  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/23').then(response=>{
								  	this.approval7 = response.body.approval;
								  	console.log(this.approval7);

								  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/24').then(response=>{
									  	this.approval8 = response.body.approval;
									  	console.log(this.approval8);

									  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/25').then(response=>{
											  	this.approval9 = response.body.approval;
											  	console.log(this.approval9);

											  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/26').then(response=>{
													  	this.approval10 = response.body.approval;
													  	console.log(this.approval10);

													  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/27').then(response=>{
															  	this.approval11 = response.body.approval;
															  	console.log(this.approval11);

															  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/28').then(response=>{
																	  	this.approval12 = response.body.approval;
																	  	console.log(this.approval12);

																	  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/29').then(response=>{
																			  	this.approval13 = response.body.approval;
																			  	console.log(this.approval13);

																			  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/30').then(response=>{
																					  	this.approval14 = response.body.approval;
																					  	console.log(this.approval14);

																					  		this.$http.get('http://localhost:8081/tbd-tweeds-backend/approvalTopicByRegions/31').then(response=>{
																							  	this.approval15 = response.body.approval;
																							  	console.log(this.approval15);
																							  	this.mapa(this.approval1,this.approval2,this.approval3,this.approval4,this.approval5,this.approval6,this.approval7,this.approval8,this.approval9,this.approval10,this.approval11,this.approval12,this.approval13,this.approval14,this.approval15,this.category2);
																						  	
																						    	}, response=>{
																							      console.log("no se extrajo el approval");
																							    })

																					  	
																				    	}, response=>{
																					      console.log("no se extrajo el approval");
																					    })

																			  	
																		    	}, response=>{
																			      console.log("no se extrajo el approval");
																			    })

																	  	
																    	}, response=>{
																	      console.log("no se extrajo el approval");
																	    })

															  	
														    	}, response=>{
															      console.log("no se extrajo el approval");
															    })

													  	
												    	}, response=>{
													      console.log("no se extrajo el approval");
													    })

											  	
										    	}, response=>{
											      console.log("no se extrajo el approval");
											    })

									  	
								    	}, response=>{
									      console.log("no se extrajo el approval");
									    })

								  	
							    	}, response=>{
								      console.log("no se extrajo el approval");
								    })
							  	
						    	}, response=>{
							      console.log("no se extrajo el approval");
							    })
						  	
					    	}, response=>{
						      console.log("no se extrajo el approval");
						    })
					  	
				    	}, response=>{
					      console.log("no se extrajo el approval");
					    })

			  	
		    	}, response=>{
			      console.log("no se extrajo el approval");
			    })

	    	}, response=>{
		      console.log("no se extrajo el approval");
		    })

    	}, response=>{
	      console.log("no se extrajo el approval");
	    })
   
  	}
    
  },
  mounted:function(){


  	
  	this.greet();


  }
}
</script>
<style> 
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
#map{
	height: 100%;
	width: 75%;
	margin-top: 0%;
	margin-right: 1%;
	
	margin-left: 25%;
}
.info {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
}
.info h4 {
    margin: 0 0 5px;
    color: #777;
}
.legend {
    line-height: 18px;
    color: #555;
}
.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}

</style>