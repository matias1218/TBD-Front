<template>

<section>
 
    <bar-graph ></bar-graph>
    <pie-graph ></pie-graph>


</section>


</template>
<script>
import BarGraph from './Piechart.vue';
import PieGraph from './pie.vue';
export default{

  data(){
    return{
      title:'Index'
    }
  },
  components:{
    BarGraph,
    PieGraph
  },
  mounted:function(){
    console.log('Index.vue')
  }
}
</script>
