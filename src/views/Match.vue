<template>
  <v-data-table
          :v-if="email"
    :headers="headers"
    :items="users"
    :pagination.sync="pagination"
    item-key="userId"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <tr>
        <td>{{ moment(props.item.date).format('YYYY-MM-DD HH:MM') }}</td>
        <td>
            <template v-for="item in props.item.commonActivities">
                <v-list :key="item.activity">
                    {{ item.activityName }}@{{ item.times.join('/') }}: {{ item.details }}
                </v-list>
            </template>
        </td>
        <td>{{ props.item.userId }}</td>
        <td>{{ props.item.gender }}</td>
        <td>{{ props.item.bio }}</td>
        <td>
          <v-icon v-on:click="unmatch(props.item.userId)">cancel</v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
    data: () => ({
        timer: '',
        pagination: {
            sortBy: 'date',
            rowsPerPage: 50
        },
        headers: [
            {
                text: 'Match Time',
                align: 'left',
                value: 'date'
            },
            { text: 'Activities', value: 'commonActivities' },
            { text: 'UserId', value: 'userId' },
            { text: 'Gender', value: 'gender' },
            { text: 'Bio', value: 'bio' },
            { text: 'Unmatch', value: 'iron' }
        ],
        users: []
    }),

    methods: {
        unmatch(userEmail) {
            axios
                .post('http://127.0.0.1:8084/match/unmatch?userId=' + sessionStorage.getItem('email') + '&unmatchUserId=' + userEmail)
                .then(this.getMatch())
        },
        getMatch() {
            axios
            .get('http://127.0.0.1:8084/match?userId=' + sessionStorage.getItem('email'))
            .then(response => {
                this.users = response.data
            })
        }
    },
    beforeMount() {
        this.email = sessionStorage.getItem('email');
    },
    mounted () {
        this.getMatch()
        this.timer = setInterval(this.getMatch, 3000)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
};
</script>
