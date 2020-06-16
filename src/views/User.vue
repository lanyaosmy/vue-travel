<template>
    <div>
        <h1>user</h1>

        <router-link :to="{ name: 'invoice' }">my Invoice</router-link>
        <button @click="logout">Log out</button>
    </div>
</template>
<script>
import store from '@/store.js'
export default {
    methods: {
        logout() {
            store.user = null
            this.$router.push('/')
        }
    }
}
</script>
