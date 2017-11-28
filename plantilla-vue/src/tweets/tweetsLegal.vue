<template>

	<div class="w3-container w3-center">
		<div class="w3-panel w3-theme-l1 w3-card-2">
	      <h3>Listado de tweets mas influyentes.</h3>
	      <p>Categoría legal</p>
	    </div> 
			
		<ul class="w3-ul w3-card-4">
			<li class="w3-bar" v-for="u in dataset">

				<iframe border=0 frameborder=0 height=250 width=550 
		 			:src="'https://twitframe.com/show?url=https://twitter.com/'+u[1]+'/status/'+u[0]+'/'">
				
		 		</iframe>
			</li>

		</ul>
<!--
<iframe border=0 frameborder=0 height=250 width=550 
 src="https://twitframe.com/show?url=https://twitter.com/mrubiob/status/920471747169849344"></iframe>
-->
				

	</div>
	
	
</template>

<script>
export default{
	data: function(){
	    return {
	    	
	    dataset:[
		["935306386141048832","234889198"],
		["935306758029021185","234889198"],
		["932749814672117761","910603842160660480"],
		["932748938880446469","4786177654"],
		["932749229793083392","1408972381"]
	]
	    	
	 

	    }
	},
	methods:{
		
		grafo2: function(json){

		}
	},
	mounted: function(){
		/*
		this.$http.get('http://localhost:8081/tbd-tweeds-backend/list_tweets/1')
	    .then(response=>{
	      this.dataset = response.body;
	    }, response=>{
	      console.log("error de conexion");
	    })
	    */

	}
}
</script>

<style>


</style>