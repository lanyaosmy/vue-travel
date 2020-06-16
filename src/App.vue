<template>
    <div id="app">
        <Navigation />
        <transition name="moveUp" mode="out-in">
            <router-view :key="$route.path" />
        </transition>
    </div>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
export default {
    components: {
        Navigation
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.vue-active-class {
    color: #7042b9;
}

.slide-enter-active,
.slide-leave-active {
    transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-30%);
}

.moveUp-enter-active {
    animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.moveUp-leave-active {
    animation: moveUp 0.3s ease-in;
}
@keyframes moveUp {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
