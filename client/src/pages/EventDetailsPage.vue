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
                        <div class="d-flex justify-content-between">
                            <p class="px-3">{{ activeEvent.capacity }} tickets left</p>
                            <button class="mx-3 mb-3 btn btn-success">Buy a ticket</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex col-10 rounded mt-3 row">
                <p>See who is attending</p>
                <div class="bg-secondary">
                    <!-- TODO profile images from tickets go here -->
                    <p>PROFILE PHOTOS GO HERE</p>
                </div>
            </div>
            <div class="d-flex col-8 rounded mt-3 row">
                <p>See what people are saying</p>
                <div class="bg-secondary">
                    <p class="d-flex justify-content-end">Join the conversation</p>
                    <form @submit.prevent="createComment()">
                        <textarea v-model="commentData.body" class="form-control mb-2" name="comment-body" id=""
                            cols="30" rows="3" placeholder="Your comment here..."></textarea>
                        <div class=" d-flex justify-content-end">
                            <button class="btn btn-success">Post Comment</button>
                        </div>
                    </form>
                    <!-- TODO imported comments go here -->
                    <p>Comments from API go here</p>
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
import { commentService } from '../services/CommentService.js';
import { logger } from '../utils/Logger.js';
export default {
    setup() {
        const route = useRoute()
        watchEffect(() => {
            route.params.eventId
            getEventById()
            getComments()
        })
        const commentData = ref({})

        async function getEventById() {
            try {
                await eventService.getEventById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getComments() {
            try {
                await eventService.getComments(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            activeEvent: computed(() => AppState.activeEvent),
            comments: computed(() => AppState.comments),
            commentData,
            async createComment() {
                try {
                    commentData.value.eventId = route.params.eventId
                    // commentData.body = commentData.value
                    logger.log('comment data value:', commentData.value)
                    await commentService.createComment(commentData.value)
                } catch (error) {
                    Pop.error(error)
                }
            }
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