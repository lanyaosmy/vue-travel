<template>
    <nav id="nav">
        <ul>
            <li class="links">
                <router-link to="/">Home</router-link>
            </li>
            <li v-for="destination in destinations" :key="destination.name">
                <router-link
                    :to="{ name: 'detail', params: { slug: destination.slug } }"
                    >{{ destination.name }}</router-link
                >
            </li>
            <li>
                <router-link to="/user">Daseboard</router-link>
            </li>
            <li>
                <router-link to="/todo">Todo</router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
import store from '@/store.js'
export default {
    data() {
        return {
            destinations: store.destinations
        }
    }
}
</script>
<style scoped>
#nav {
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    background-color: aliceblue;
    z-index: 1;
}
a {
    padding: 0 20px;
}
ul,
li {
    display: flex;
}
</style>
