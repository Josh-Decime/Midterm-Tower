<template>
    <h1>Event details page!</h1>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, ref, onMounted, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
export default {
    setup() {
        const route = useRoute()
        watchEffect(() => {
            route.params.eventId
            getEventById()
        })
        async function getEventById() {
            try {
                await eventService.getEventById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {}
    }
};
</script>


<style lang="scss" scoped></style>