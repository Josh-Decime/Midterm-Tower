<template>
    <div class="event-card selectable m-2 cover-image">
        <!-- <img :src="event.coverImg" :alt="`Cover image for ${event.name}`"> -->
        <div>
            <p class="fs-4">{{ event.name }}</p>
            <p class="fs-5">{{ event.location }}</p>
            <p class="fs-5">{{ event.startDate }}</p>
        </div>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
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
    background-image: url(event.coverImg);
}
</style>