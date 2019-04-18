import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Profile from './views/Profile.vue';
import Match from './views/Match.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/match',
            name: 'match',
            component: Match
        }
    ]
});
