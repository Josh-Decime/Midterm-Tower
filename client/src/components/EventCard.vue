<template>
    <section v-if="event.id">
        <div class="event-card selectable m-2 cover-image" :style="{ backgroundImage: `url(${event.coverImg})` }">
            <div class="backdrop-blur ">
                <p class="fs-4 mx-2">{{ event.name }}</p>
                <p class="fs-5 mx-2">{{ event.location }}</p>
                <p class="fs-5 mb-0 mx-2">{{ event.startDate }}</p>
            </div>
        </div>
    </section>
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
    border-color: darkslategray;
    overflow: hidden;
}

.cover-image {
    background-size: cover;
    padding-top: 250px;
}

.backdrop-blur {
    backdrop-filter: blur(25px);
    color: whitesmoke;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(76, 74, 74);
}

.backdrop-blur:hover {
    border-style: solid;
    border-width: 1px;
    border-color: whitesmoke;
}
</style>