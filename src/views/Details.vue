<template>
    <div>
        <Goback />
        <section>
            <h2>{{ destination.name }}</h2>
            <div class="destination-detail">
                <img
                    :src="require(`@/assets/${destination.image}`)"
                    :alt="destination.name"
                />
                <p>{{ destination.description }}</p>
            </div>
        </section>
        <section class="experience">
            <h2>Top experiences in {{ destination.name }}</h2>
            <div class="cards" id="experience">
                <div
                    class="card"
                    v-for="experience in destination.experiences"
                    :key="experience.name"
                >
                    <router-link
                        :to="{
                            name: 'experience',
                            params: { experienceSlug: experience.slug },
                            hash: '#experience'
                        }"
                    >
                        <img
                            :src="require(`@/assets/${experience.image}`)"
                            :alt="experience.name"
                        />
                        <span>{{ experience.name }}</span>
                    </router-link>
                </div>
            </div>
            <router-view :key="$route.path"></router-view>
        </section>
    </div>
</template>
<script>
import store from '@/store.js'
import Goback from '@/components/Goback.vue'
export default {
    data() {
        return {}
    },
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    computed: {
        destination() {
            return store.destinations.find(dest => dest.slug === this.slug)
        }
    },
    components: {
        Goback
    }
}
</script>

<style scoped>
.destination-detail {
    display: flex;
}
.cards {
    display: flex;
}
.cards img {
    width: 50%;
}
.card a {
    display: block;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s, transform 1s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateX(-30%);
}
</style>
