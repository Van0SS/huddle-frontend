<template>
    <v-container align-center class="about">
        <v-layout pa-5 row wrap justify-center id="form">
            <v-form>
                <v-flex pb-5 id="profile-section">
                    <v-flex pb-3>
                        <v-layout row>
                            <v-icon x-large left>face</v-icon>
                            <h2 class="display-2 font-weight-black text-md-center">Profile</h2>
                        </v-layout>
                    </v-flex>
                    <v-flex>
                        <span class="subheading font-weight-bold">Email: </span>
                        <span>{{ info.userId }}</span>
                        <v-select v-model="info.gender" :items="genders" label="Gender"></v-select>
                    </v-flex>
                </v-flex>   

                <v-flex pb-5 id="interest-section">
                    <v-flex pb-3>
                        <v-layout row>
                            <v-icon x-large left>favorite</v-icon>
                            <h2 class="display-2 font-weight-black text-md-center">About Me</h2>
                        </v-layout>
                    </v-flex>
                    <v-flex>
                        <v-textarea outline id="bio" name="bio" v-model="info.bio"></v-textarea>
                    </v-flex>
                </v-flex>
                
                <v-flex pb-5 id="activity-section">
                    <v-flex pb-3>
                        <v-layout row>
                            <v-icon x-large left>event</v-icon>
                            <h2 class="display-2 font-weight-black text-md-center">Activities</h2>
                        </v-layout>
                    </v-flex>
                    <template v-for="item in info.activities">
                        <v-flex pb-3 :key="item.activity">
                            <v-list :key="item.activity">
                                <v-layout pb-3 row>
                                    <v-icon v-if="item.times.length > 0" large color="green darken-2" left>check_circle</v-icon>
                                    <h3 class="headline font-weight-medium">{{ item.activityName }}</h3>
                                    <v-icon right v-on:click="item.show = !item.show">expand_more</v-icon>
                                </v-layout>
                                <div v-show="item.show">
                                    <v-select v-model="item.times" name="time" :items="times" label="Time" multiple></v-select>
                                    <v-checkbox name="same-gender" :label="`Match me with same gender`" v-model="item.sameGender" v-bind:disabled="item.times.length < 1"></v-checkbox>
                                </div>
                            </v-list>
                        </v-flex>
                    </template>
                </v-flex>
                <v-btn v-on:click="update(info)">Submit</v-btn>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'Profile',
    props: ["emailProp"],
    data() {
        return {
            email: '',
            info: {},
            genders: ['MALE', 'FEMALE', 'OTHER'],
            times: ['BEFORE_WORK', 'MORNING', 'LUNCHTIME', 'AFTER_WORK', 'AFTERNOON'],
        };
    },
    methods: {
      update(info) {
        axios
            .post('http://127.0.0.1:8084/prefs', info)
      },
    },
      beforeMount() {
        this.email = sessionStorage.getItem('email');
      },
    mounted () {
      axios
              .get('http://127.0.0.1:8084/prefs?userId=' + sessionStorage.getItem('email'))
              .then(response => {
                for (var key in response.data.activities) {
                  if (!response.data.activities.hasOwnProperty(key)) continue;

                  var obj = response.data.activities[key]
                  obj.show = obj.times.length > 0
              }
              this.info = response.data
          })
    }
  }
</script>
