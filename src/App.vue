<template>
  <v-app>
    <v-toolbar app dark>
        <v-toolbar-title class="headline text-uppercase">
            <span>Huddle</span>
            <span class="font-weight-light">Connecting People</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div>{{email}}</div>
        <router-link :to="{name: 'profile'}" tag="v-btn"> Profile</router-link>
        <router-link :to="{name: 'match'}" tag="v-btn"> Matches</router-link>
        <v-btn v-if="email" @click="logout" tag="v-btn">Logout</v-btn>
        <router-link v-else to="/" tag="v-btn">Login</router-link>
    </v-toolbar>
    <v-content>
        <router-view />
    </v-content>
  </v-app>
</template>

<script>
    import router from "./router"
    import {EventBus} from "./EventBus";


    export default {
  name: 'App',
  data () {
    return {
        email: ''
    }
  },
    methods: {
      updateLogin: function(loginEmail) {
          this.email = loginEmail;
      },
        logout: function() {
          sessionStorage.setItem('email', '');
            this.email = '';
          router.push({name: 'login'});
        }
    },
        beforeMount() {
            this.email = sessionStorage.getItem('email');
            EventBus.$on('login', email => {
                sessionStorage.setItem('email', email);
                this.email = email;
            });
            EventBus.$on('logout', () => {
                sessionStorage.setItem('email', '');
                this.email = '';
            });
        }
    }


</script>
