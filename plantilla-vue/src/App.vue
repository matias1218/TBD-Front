<template>
  <div>
    
    <div class="w3-sidebar w3-light-grey w3-card-4 w3-animate-left" style="display:none" id="mySidebar">
      <div class="w3-bar w3-dark-grey">
        <span class="w3-bar-item w3-padding-16">Contenidos</span>
        <button v-on:click="close" class="w3-bar-item w3-button w3-right w3-padding-16" title="Cerrar menu">×</button>
      </div>
      <div class="w3-bar-block">
       
 <!--       <a href="#/barChart" class="w3-bar-item w3-button" v-on:click="changeTitleEstadistics">Estadisticas</a> -->      <a href="#/index" class="w3-bar-item w3-button" v-on:click="changeTitleHome">Inicio</a>
          <button class="w3-button w3-block w3-left-align" v-on:click="show">
          Ver Estadisticas <i class="fa fa-caret-down"></i>
          </button>
          <div id="demoAcc" class="w3-hide w3-white w3-card-2">
            <a href="#/barChart" class="w3-bar-item w3-button" v-on:click="changeTitleBarChart">Barras</a>
            <a href="#/pieChart" class="w3-bar-item w3-button" v-on:click="changeTitlePieChart">Torta</a>
            <a href="#/estadisticas1" class="w3-bar-item w3-button" v-on:click="changeTitlePiesChart">Listado en Torta</a>
          </div>
<!--
          <div class="w3-dropdown-click">
            <button class="w3-button" v-on:click="drop">
              Dropdown <i class="fa fa-caret-down"></i>
            </button>
            <div id="demoDrop" class="w3-dropdown-content w3-bar-block w3-white w3-card-2">
              <a href="#" class="w3-bar-item w3-button">Link</a>
              <a href="#" class="w3-bar-item w3-button">Link</a>
            </div>
          </div>
          <a href="#" class="w3-bar-item w3-button">Link 2</a>
          <a href="#" class="w3-bar-item w3-button">Link 3</a>
-->
      </div>

    </div>

  
    <div id="main">

    <div class="w3-bar w3-theme-d4 w3-border w3-large">

      <a id="openNav" class="w3-bar-item w3-button w3-white" data-toggle="tooltip" title="Menu" v-on:click="open"><i class="fa fa-th-list"></i></a>
      <a href="#/index" class="w3-bar-item w3-button" data-toggle="tooltip" title="Inicio" v-on:click="changeTitleHome"><i class="fa fa-home"></i></a>
      <a href="#" class="w3-bar-item w3-button" data-toggle="tooltip" title="Buscar"><i class="fa fa-search"></i></a>
      <a href="#" class="w3-bar-item w3-button" data-toggle="tooltip" title="Contactanos"><i class="fa fa-envelope"></i></a>
      <a href="#" class="w3-bar-item w3-button" data-toggle="tooltip" title="Siguenos en twitter"><i class="fa fa-twitter"></i></a>
      <a href="#" class="w3-bar-item w3-button w3-right" data-toggle="tooltip" title="Sobre nosotros"><i class="fa fa-info-circle"></i></a>

    </div>

    <main class="container">
        <div class="w3-theme-l2">
      
          <div class="w3-container w3-center" >
            <h1>{{title}}</h1>
            <h4>{{text}}</h4>
          </div>
      </div>
      <div>
        <br>
         <router-view></router-view> 
         <br> 
      </div>
     
    </main>

    </div>
    <footer class="w3-theme-d4">
    <p>holas</p>
      
    </footer>
</div>

</template>

<script>
export default {
  data(){
    return{
      title:'',
      text:''
    }
  },

  methods: {
    open: function (event) {
      document.getElementById("main").style.marginLeft = "0%";
      document.getElementById("mySidebar").style.width = "18%";
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("openNav").style.display = "block";
    },
    close: function (event) {
      document.getElementById("main").style.marginLeft = "0%";
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("openNav").style.display = "block";
    },
    show: function (event){
      var x = document.getElementById("demoAcc");
      if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
          x.previousElementSibling.className += " w3-theme-d4";
      } else { 
          x.className = x.className.replace(" w3-show", "");
          x.previousElementSibling.className = 
          x.previousElementSibling.className.replace(" w3-theme-d4", "");
      }
    },

    drop: function (event) {
        var x = document.getElementById("demoDrop");
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
            x.previousElementSibling.className += " w3-theme-d4";
        } else { 
            x.className = x.className.replace(" w3-show", "");
            x.previousElementSibling.className = 
            x.previousElementSibling.className.replace(" w3-theme-d4", "");
        }
    },
    changeTitleBarChart: function(){
           this.title = 'Estadisticas 1';
    },

    changeTitlePieChart: function(){
           this.title = 'Estadisticas 2';
    },
    changeTitlePiesChart: function(){
           this.title = 'Estadisticas 3';
    },
    changeTitleHome: function(){
           this.title = 'Tweeds';
           //this.text = 'Información ciudadana sobre la Cannabis Sativa';
    },
  },
  mounted:function(){
    if(this.$route.path =='/' || this.$route.path =='/index'){
      this.title = 'Tweeds';
      //this.text = 'Información ciudadana sobre la Cannabis Sativa';
    }
  }
}
</script>
