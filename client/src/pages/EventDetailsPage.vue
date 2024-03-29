<template>
    <div class="container-fluid">
        <section class="row justify-content-center">
            <div class="d-flex col-10 rounded mt-3 background-placement"
                :style="{ backgroundImage: `url(${activeEvent.coverImg})` }">
                <div class="row card-background">
                    <div class="col-4">
                        <img :src="activeEvent.coverImg" alt="Event image" class="img-fluid m-3 image-styling">
                    </div>
                    <div class="col-8">
                        <div v-if="activeEvent.creatorId == account.id"
                            class=" d-flex justify-content-end selectable text-danger mdi mdi-close-outline"
                            title="Cancel this event"></div>
                        <!-- NOTE I wrote this incase I want to do a drop down to be able to either edit or delete the event -->
                        <!-- <div v-if="activeEvent.creatorId == account.id" class=" d-flex justify-content-end">
                            <button class="btn btn-outline fs-4 mdi mdi-dots-horizontal"></button>
                        </div> -->
                        <div class="d-flex justify-content-between">
                            <div class="px-3">
                                <div class="mt-2">
                                    <span class="fs-3 pt-3">{{ activeEvent.name }}</span>
                                    <span v-if="activeEvent.isCanceled" class="text-danger fw-bolder"> (canceled)</span>
                                </div>
                                <p class="fs-4">{{ activeEvent.location }}</p>
                            </div>
                            <p class="p-3">{{ activeEvent.shortStartDate }}</p>
                        </div>
                        <p class="px-3">{{ activeEvent.description }}</p>
                        <div class="d-flex justify-content-between">
                            <p v-if="!activeEvent.isCanceled" class="px-3">{{ activeEvent.capacity }} tickets left</p>
                            <!-- <p v-if="activeEvent.isCanceled" class="px-3 text-danger fw-bolder">Canceled</p> -->
                            <button v-if="!activeEvent.isCanceled && activeEvent.capacity > 0" @click="createTicket()"
                                class="mx-3 mb-3 btn btn-success">Buy a
                                ticket</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex col-10 rounded mt-3 row">
                <span>See who is attending</span>
                <div class="bg-secondary rounded">
                    <!-- TODO profile images from tickets go here -->
                    <p>PROFILE PHOTOS GO HERE</p>
                </div>
            </div>
            <div class="d-flex col-8 rounded mt-3 row">
                <span>See what people are saying</span>
                <div class="bg-secondary rounded">
                    <span v-if="account.id" class="d-flex justify-content-end my-1">Join the conversation</span>
                    <span v-if="!account.id" class="d-flex justify-content-end my-2">Login to join the
                        conversation</span>
                    <form v-if="account.id" @submit.prevent="createComment()">
                        <!-- TODO clear the comment box after a comment is posted -->
                        <textarea v-model="commentData.body" class="form-control mb-2" name="comment-body" id=""
                            cols="30" rows="3" placeholder="Your comment here..."></textarea>
                        <div class=" d-flex justify-content-end">
                            <button class="btn btn-success mb-3">Post Comment</button>
                        </div>
                    </form>
                    <div v-for="comment in  comments " v-if="comments.length" class="row">
                        <!-- FIXME col is not a good option to have the profile image next to comments -->
                        <div class="col-3 col-md-1">
                            <img :src="comment.creator.picture" :alt="`${comment.creator.name}'s profile image`"
                                class="comment-profile-photo">
                        </div>
                        <div class="col-8 col-md-10 bg-page my-1 me-1 rounded">
                            <div class="d-flex justify-content-between">
                                <p class="fw-bolder my-0">{{ comment.creator.name }}</p>
                                <p v-if="comment.creator.id == account.id" @click="deleteComment(comment.id)"
                                    class="selectable text-danger mdi mdi-close-outline my-0"
                                    title="Delete this comment"></p>
                            </div>
                            <p>{{ comment.body }}</p>

                        </div>
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
import { commentService } from '../services/CommentService.js';
import { logger } from '../utils/Logger.js';
import { ticketService } from '../services/TicketService.js';
export default {
    setup() {
        const route = useRoute()
        const account = computed(() => AppState.account)
        const activeEvent = computed(() => AppState.activeEvent)
        const comments = computed(() => AppState.comments)
        const commentData = ref({})
        watchEffect(() => {
            route.params.eventId
            getEventById()
            getComments()
        })

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
        async function createComment() {
            try {
                commentData.value.eventId = route.params.eventId
                logger.log('comment data value:', commentData.value)
                await commentService.createComment(commentData.value)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function deleteComment(commentId) {
            try {
                const confirm = await Pop.confirm("Are you sure you want to delete this comment?")
                if (!confirm)
                    return
                await commentService.deleteComment(commentId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function createTicket() {
            try {
                // let eventId = route.params.eventId
                // logger.log('Event Id for making a ticket:', eventId)
                // I had route.params.eventId in () directly instead of defining it & logging it so i could see, because it says "eventId is required"
                // await ticketService.createTicket(eventId)

                // FIXME it is creating a ticket now but it doesn't update the capacity. I could edit the capacity every time a ticket is created or deleted, or maybe I could somehow subtract the event capacity by the total ticket count? 
                let ticketData = { eventId: route.params.eventId }
                await ticketService.createTicket(ticketData)

            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            account,
            activeEvent,
            comments,
            commentData,
            createComment,
            deleteComment,
            createTicket,
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

.comment-profile-photo {
    height: 5vh;
    border-radius: 50%;
}
</style>