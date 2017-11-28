<template>

	<div class="w3-container w3-center">
		<div class="w3-panel w3-theme-l1 w3-card-2">
	      <h3>Listado de tweets mas influyentes.</h3>
	    </div> 
			
		<ul class="w3-ul w3-card-4">
			<li class="w3-bar" v-for="u in dataset">

				<iframe border=0 frameborder=0 height=250 width=550 
		 			:src="'https://twitframe.com/show?url=https://twitter.com/'+u.id_user+'/status/'+u.id_tweet+'/'">
				
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
	    	
	    dataset : [

	    	{"id_user":"mrubiob","id_tweet":"920471747169849344"},
	    	{"id_user":"mrubiob","id_tweet":"920471747169849344"},
	    	{"id_user":"mrubiob","id_tweet":"920471747169849344"},
	    	{"id_user":"mrubiob","id_tweet":"920471747169849344"},
	    	{"id_user":"mrubiob","id_tweet":"920471747169849344"}
	    	

	    	]
	    	
	 

	    }
	},
	methods:{
		
		grafo2: function(json){

		}
	},
	mounted: function(){
		

	}
}
</script>

<style>


</style>