import '@babel/polyfill';
import Vue from 'vue';
import './plugins/axios'
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import moment from 'moment'

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
