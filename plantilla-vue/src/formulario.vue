<template>
  
  <div class="center">
    <h1>{{titulo}}</h1>
    <div>
      <label>Nombre del actor:</label>
      <input type="text" v-model="actor.firstName">
    </div>
    <div>
      <label>Apellido del actor:</label>
      <input type="text" v-model="actor.lastName">
    </div>
    <div>
      <button v-on:click="agregar" >Agregar</button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
    
      titulo: 'Agregando un actor',
      actor: {
        firstName:'',
        lastName:''
      }
    }
  },
  methods: {
    agregar: function (event) {
      // crea una variable local y se asocia a lo que está entrando por input
      var user = this.actor
      // el arreglo se envia como metodo post
      this.$http.post('http://localhost:8081/sakila-spring-backend/actors/',user).then(response=>{
        // caso exitoso
        alert('Se ha agregado exitosamente el actor ' + user.firstName + ' ' + user.lastName);
      }, response=>{
        // caso fallido
        alert('error en agregacion de actor');
      })
    }
  }
}
</script>