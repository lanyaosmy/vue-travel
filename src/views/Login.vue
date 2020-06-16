<template>
    <div>
        <h1>Login</h1>
        <div class="form">
            <label for="username">Username</label>
            <input v-model="username" type="text" name="username" />
            <label for="password">Password</label>
            <input v-model="password" type="password" />
            <button @click="login">Login</button>
        </div>
    </div>
</template>
<script>
import store from '@/store.js';
export default {
    data() {
        return {
            username: null,
            password: null
        };
    },
    methods: {
        login() {
            store.user = this.username;
            const redirectPath = this.$route.query.redirect;
            this.$router.push(redirectPath);
        }
    }
};
</script>
