<template>
    <div class="container-fluid">
        <section class="row justify-content-center">
            <div class="d-flex col-10 rounded mt-3 background-placement"
                :style="{ backgroundImage: `url(${activeEvent.coverImg})` }">
                <!-- <div class="d-flex col-10"> -->

                <div class="row card-background">
                    <div class="col-4">
                        <img :src="activeEvent.coverImg" alt="Event image" class="img-fluid m-3 image-styling">
                    </div>
                    <div class="col-8">
                        <div class="d-flex justify-content-between">
                            <div class="px-3">
                                <p class="fs-3 pt-3">{{ activeEvent.name }}</p>
                                <p class="fs-4">{{ activeEvent.location }}</p>
                            </div>
                            <p class="p-3">{{ activeEvent.shortStartDate }}</p>
                        </div>
                        <p class="px-3">{{ activeEvent.description }}</p>
                    </div>
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
    backdrop-filter: blur(25px);
    text-shadow: 2px 2px 3px black;
    overflow: hidden;
}


.image-styling {
    border-radius: 15px;
    box-shadow: 3px 3px 6px black;
}

.background-placement {
    background-size: cover;
    background-position: 50% 75%;
    overflow: hidden;
}
</style>