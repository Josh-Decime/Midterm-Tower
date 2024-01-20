<template>
    <div class="container-fluid">
        <section class="row">
            <div class="d-flex col-10 card-background" :style="{ backgroundImage: `url(${activeEvent.coverImg})` }">
                <div class="col-4">
                    <img :src="activeEvent.coverImg" alt="Event image" class="img-fluid">
                </div>
                <div class="col-8">
                    <div class="d-flex justify-content-between">
                        <div class="mx-3">
                            <p class="fs-3 mt-3">{{ activeEvent.name }}</p>
                            <p class="fs-4">{{ activeEvent.location }}</p>
                        </div>
                        <p class="m-3">{{ activeEvent.shortStartDate }}</p>
                    </div>
                    <p class="mx-3">{{ activeEvent.description }}</p>


                </div>
            </div>
        </section>
    </div>
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
        return {
            activeEvent: computed(() => AppState.activeEvent)
        }
    }
};
</script>


<style lang="scss" scoped>
.card-background {
    background-size: cover;
    backdrop-filter: blur(250px);
    background-color: black;
}
</style>