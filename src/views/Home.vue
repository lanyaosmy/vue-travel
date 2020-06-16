<template>
    <div class="home">
        <div v-for="destination in destinations" :key="destination.name">
            <div class="destination">
                <router-link
                    :to="{ name: 'detail', params: { slug: destination.slug } }"
                >
                    <h2>{{ destination.name }}</h2>
                </router-link>
                <figure>
                    <router-link
                        :to="{
                            name: 'detail',
                            params: { slug: destination.slug }
                        }"
                    >
                        <img
                            :src="require(`../assets/${destination.image}`)"
                            :alt="destination.name"
                        />
                    </router-link>
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store.js'

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            destinations: store.destinations,
            localCount: 2
        }
    },
    methods: {
        increment() {
            this.$store.commit('increment')
        }
    }
}
</script>

<style scoped>
.home {
    display: flex;
    justify-content: space-between;
}
</style>
