import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './Index.vue';
import Actors from './Actors.vue';
import formulario from './formulario.vue';
import barChart from './grafico.vue';
import pieChart from './Piechart.vue';
import pie from './pie.vue';
import estadisticas1 from './Estadisticas1.vue';
import grafo from './grafo.vue';
import pieApr from './pieChart/legalizacionPieApproval.vue';
import line from './line.vue';
import pieDis from './pieChart/legalizacionPieDisapproval.vue';
import tweets from './pieChart/tweets.vue';
import mapLegal from './maps/mapaLegal.vue';
import mapMedic from './maps/mapaMedicinal.vue';
import tweetList from './tweets/tweets.vue';
import VueResource from 'vue-resource';
require("./style.scss");

import App from './App.vue';
Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
  { path: '/index', alias: '/', component: Index},
  { path:'/actors', component: Actors},
  { path:'/form', component: formulario},
  { path:'/barChart', component: barChart},
  { path:'/pieChart', component: pieChart},
  { path:'/pie', component: pie},
  { path:'/estadisticas1', component: estadisticas1},
  { path:'/grafo', component: grafo},
  { path:'/pieApr', component: pieApr},
  { path:'/line', component: line},
  { path:'/pieDis', component: pieDis},
  { path:'/tweets', component: tweets},
  { path:'/mapLegal', component: mapLegal},
  { path:'/mapMedic', component: mapMedic},
  { path:'/tweetList', component: tweetList}

]

// Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
