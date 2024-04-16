<template>
    <router-link :to="{ path: `/eventDetails/${event.id}` }">
        <section v-if="event.id">
            <div class="event-card selectable m-2 mt-4 cover-image"
                :style="{ backgroundImage: `url(${event.coverImg})` }">
                <div class="backdrop-blur ">
                    <p class="fs-4 mx-2 my-0">{{ event.name }}</p>
                    <p class="fs-5 mx-2 my-0">{{ event.location }}</p>
                    <p class="fs-5 mb-0 mx-2">{{ event.shortStartDate }}</p>
                    <div v-if="event.isCanceled" class="bg-danger text-black text-center">Canceled</div>
                    <div v-if="!event.isCanceled && event.capacity > 0" class="text-end mx-2">{{ event.capacity }}
                        tickets left</div>
                    <div v-if="!event.isCanceled && event.capacity <= 0" class="bg-danger text-black text-center">Sold
                        out!</div>
                </div>
            </div>
        </section>
    </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Event } from '../models/Event.js';
export default {
    props: { event: { type: Event, require: true } },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
.event-card {
    border-style: solid;
    border-width: 10px;
    border-radius: 5px;
    // border-color: darkslategray;
    border-color: var(--bs-secondary);
    overflow: hidden;
}

.cover-image {
    background-size: cover;
    background-position: center;
    padding-top: 250px;
}

.backdrop-blur {
    backdrop-filter: blur(25px);
    color: whitesmoke;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    // border-color: rgb(76, 74, 74);
    border-color: var(--bs-secondary);
}

.backdrop-blur:hover {
    border-style: solid;
    border-width: 1px;
    border-color: whitesmoke;
}
</style>