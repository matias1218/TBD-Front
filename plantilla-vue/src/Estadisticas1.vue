<template>

<section>
    <lie-graph ></lie-graph>
    <bar-graph ></bar-graph>
    <pie-graph ></pie-graph>
    


</section>


</template>
<script>
import BarGraph from './pieChart/legalizacionPieApproval.vue';
import PieGraph from './pieChart/legalizacionPieDisapproval.vue';
import lieGraph from './grafico.vue';
export default{

  data(){
    return{
      title:'Index'
    }
  },
  
  components:{
    BarGraph,
    PieGraph,
    lieGraph
  },
  mounted:function(){
    console.log('Index.vue')
  }
}
</script>
