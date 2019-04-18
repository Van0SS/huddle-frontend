<template>
    <v-form>
        <v-container>
            <v-layout>
                <v-flex
                        xs12
                        md4
                >
                    <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="Red Hat Email"
                            required
                    ></v-text-field>
                    <v-btn
                            @click="login"
                        label="Login"
                    >Login</v-btn>
                    <v-btn
                        @click="signup"
                        label="Sign Up">
                        Sign Up
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
    import { EventBus} from "../EventBus";
    import router from "../router"
    export default {
  name: 'Login',
  data () {
        return {
            email: ''
    }
  },
  methods: {
      login : function() {

          sessionStorage.setItem('email', this.email)
          EventBus.$emit('login', this.email);
          router.push({path: 'match'})

      },
      signup : function() {
          var self = this;
          EventBus.$emit('login', self.email);
          axios.post('http://127.0.0.1:8084/auth/signup', {
              email: self.email,
              gender: 'OTHER',
              password: ''
          }).then(function (response) {
              sessionStorage.setItem('email', self.email)
              router.push({name: 'profile'});
          })
        .catch(function (error) {
            EventBus.$emit('login', '')
        })
    

      }
  },
}
</script>
