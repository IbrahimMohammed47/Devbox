
import Vue from 'vue';
import App from './App';
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
 el: '#app',
 router,
 vuetify,
 store,
 render: h => h(App)
});
// Vue.createApp(App).use(router).mount('#app');