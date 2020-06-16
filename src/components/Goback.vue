<template>
    <span>
        <button @click="goBack">GO BACK</button>
    </span>
</template>

<script>
export default {
    methods: {
        goBack() {
            return this.$router.go(-1)
        }
    }
}
</script>
