<template>

<div class="w3-container w3-center">
  <br><br>
  <div>

      <div class="w3-container">
          <img  src="./img/TweedsFinal.png" alt="Lights" style="width:100%;max-width:400px"/>
      <br>
      <h3 >
        "Blog informativo sobre la contingencia acerca del consumo de Cannabis"
      </h3>
      </div>
  </div>

  <div class="w3-row w3-container">
    <hr>
    <div class="w3-col s3 w3-center w3-margin">
      <img  src="./img/drug.svg" alt="Lights" style="width:100%;max-width:200px"/>
    </div>
    <div class="w3-col s5 w3-flat-silver w3-center w3-margin w3-card">
      <h3> Enterate de lo actual... </h3>
      <p class="w3-margin justify" > "Tweeds" entrega estadisticas acerca de la contingencia ciudadana que circula en las principales redes sociales, apoyandose principalmente en Twitter. Frente a la gran cantidad de flujo de tweets, se ha recopilado gran parte de la información en relación al nivel de aprobación que mantiene la comunidad, en temas como legalización y uso medicinal. Enterate de lo que opina la gente en este blog preparado especialmente para conocer un poco mas sobre la Cannabis. </p>
    </div>
    <div class="w3-col s3  w3-center w3-margin">
      <img  src="./img/drug.svg" alt="Lights" style="width:100%;max-width:200px"/>
    </div>
  </div>
</div>

</template>
<script>
export default{

  data(){
    return{
      title:'Index'
    }
  },

  mounted:function(){
    console.log('Index.vue')
  }
}
</script>
<style>
.w3-Baskerville {
    font-family: 'Libre Baskerville', serif;
}
.w3-Josefin {
    font-family: 'Josefin Slab', serif;
}
.w3-Conforta {
    
    font-family: 'Comfortaa', cursive;
}
.justify{
    text-align:justify;
}
.w3-Yanone{
  font-family: 'Yanone Kaffeesatz', sans-serif;
}
</style>
