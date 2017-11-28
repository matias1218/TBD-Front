<template>
  <div>

 

  
  <div id="main">

   <div class="navbar w3-card-4">
      <a href="#/index"><i class="fa fa-home"></i> Inicio</a>
      
      <div class="dropdown">
        <button class="dropbtn"><i class="fa fa-line-chart"></i> Estadisticas 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="#/tweets">Tweets por topico</a>
          <a href="#/estadisticas1">Aprobación-desaprobación</a>
          <a href="#/timeline">Historial de tweets por topico</a>
        </div>
      </div> 

      <div class="dropdown">
        <button class="dropbtn"><i class="fa fa-users"></i> Usuarios 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="#/tweetList">Tweets mas influyentes</a>
          <a href="#/grafo">Redes de información</a>
        </div>
      </div> 

      <div class="dropdown">
        <button class="dropbtn"><i class="fa fa-map-marker"></i> Mapas Regionales
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="#/mapLegal">Aprobación Legal</a>
          <a href="#/mapMedic">Aprobación medicinal</a>
        </div>
      </div> 
    </div>

    
    <main class="w3-container">
      
      <div>
        <br>
         <router-view></router-view> 
         <br> 
      </div>
     
    </main>

    </div>
    <footer class="w3-theme-d4">
    <p>Tweeds</p>
      
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
    show2: function (event){
      var x = document.getElementById("demoAccMap");
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
           this.title = 'Tweets por categoria';
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
<style>
  td, th {
    vertical-align: middle !important;
    }
.left, .right {
        float:left;
        height:100vh;
    }
    
.left {
        background: #337ab7;
        display: inline-block;
        white-space: nowrap;
        width: 50px;
        transition: width 1s ;
    }

.right {
        background: #fff;
        width: 350px;
        transition: width 1s;
        border-style:solid;
        border-color:#ccc;
        border-width:1px;
    }    

.left:hover {
        width: 250px;
    }    
    
.item:hover {
        background-color:#ccc;
        }
        
.left .glyphicon {
        margin:15px;
        width:20px;
        color:#fff;
    }
    
.right .glyphicon {
        color:#a9a9a9;
    }
span.glyphicon.glyphicon-refresh{
    font-size:17px;
    vertical-align: middle !important;
    }
    
.item {
        height:50px;
        overflow:hidden;
        color:#fff;
    }
.title {
        background-color:#eee;
        border-style:solid;
        border-color:#ccc;
        border-width:1px;
        box-sizing: border-box;
    }
.search:hover {
        border-color:#4aa9fb;
        border-width:1px;
    }
.search {
    padding:3px 8px 3px !important;
    }
input[type=search] {
    padding: 10px 0px 10px;
  border: 0px solid #fff;
  background: #eee;
  -webkit-appearance: none;
    width:90%;
    float:none;
}
input[type=search]:focus {
    outline:none;
    }
.type{
    height: 47px;;
    }
.date{
    background-color:#f7f7f7
    }
.docdate {
    vertical-align:bottom !important;
    }
.distr {
    margin: 0 0 5px;
    font-size: 12px;
    }
.ndoc {
    margin: 0 0 5px;
    }
.storage {
    margin: 0;
    color: #aaa !important;
    font-size: 12px;
    }
        
    
.navbar {
    overflow: hidden;
    background-color: #265728;
    font-family: Arial;
}

.navbar a {
    float: left;
    font-size: 16px;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

.dropdown {
    float: left;
    overflow: hidden;
}

.dropdown .dropbtn {
    font-size: 16px;    
    border: none;
    outline: none;
    color: white;
    padding: 14px 16px;
    background-color: inherit;
}

.navbar a:hover, .dropdown:hover .dropbtn {
    background-color: #3d8b40;
    transition: 0.3s;
    
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #bdbdbd;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.dropdown:hover .dropdown-content {
    display: block;
    
}
   

    
</style>
