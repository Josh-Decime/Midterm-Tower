<template>
    <h1>Event details page!</h1>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, ref, onMounted, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
export default {
    setup() {
        const route = useRoute()
        watchEffect(() => {
            route.params.event - description
            getEventById()
        })
        async function getEventById() {
            try {

            } catch (error) {
                Pop.error(error)
            }
        }
        return {}
    }
};
</script>


<style lang="scss" scoped></style>