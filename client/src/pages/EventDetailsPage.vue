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
                        <div @click="cancelEvent()"
                            v-if="activeEvent.creatorId == account.id && activeEvent.isCanceled == false"
                            class="fs-4 d-flex justify-content-end selectable text-danger mdi mdi-lock-open-variant"
                            title="Cancel this event"></div>
                        <div @click="reopenEvent()" v-if="activeEvent.creatorId == account.id && activeEvent.isCanceled"
                            class="fs-4 d-flex justify-content-end selectable text-danger mdi mdi-lock"
                            title="Re-open this event"></div>
                        <!-- NOTE I wrote this incase I want to do a drop down to be able to either edit or delete the event -->
                        <!-- <div v-if="activeEvent.creatorId == account.id" class=" d-flex justify-content-end">
                            <button class="btn btn-outline fs-4 mdi mdi-dots-horizontal"></button>
                        </div> -->
                        <div class="d-flex justify-content-between">
                            <div class="px-3">
                                <div class="mt-2">
                                    <span class="fs-3 pt-3 white-text">{{ activeEvent.name }}</span>
                                    <span v-if="activeEvent.isCanceled" class="text-danger fw-bolder fs-3">
                                        (canceled)</span>
                                    <span v-if="activeEvent.availability <= 0" class="text-danger fw-bolder fs-3">(sold
                                        out)</span>
                                    <span v-if="checkAccountTickets">(Attending)</span>
                                </div>
                                <p class="fs-4 white-text">{{ activeEvent.location }}</p>
                            </div>
                            <p class="p-3 white-text">{{ activeEvent.shortStartDate }}</p>
                        </div>
                        <p class="px-3 white-text">{{ activeEvent.description }}</p>
                        <div class="d-flex justify-content-between">
                            <p v-if="!activeEvent.isCanceled && activeEvent.availability >= 0" class="px-3 white-text">
                                {{ activeEvent.availability }} out
                                of {{ activeEvent.capacity }} tickets left</p>
                            <!-- <p v-if="activeEvent.isCanceled" class="px-3 text-danger fw-bolder">Canceled</p> -->
                            <button v-if="!activeEvent.isCanceled && activeEvent.availability > 0 && account.id"
                                @click="createTicket()" class="mx-3 mb-3 btn btn-success">Buy a
                                ticket</button>
                            <p v-if="!account.id">Login to buy a ticket</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="tickets.length" class="d-flex col-10 rounded mt-3 row">
                <span>See who is attending</span>
                <div class="bg-secondary rounded d-flex flex-wrap p-2">
                    <div v-for="ticket in tickets">
                        <img :src="ticket.profile.picture" :alt="`${ticket.profile.name}'s picture`" class="ticket-pic"
                            :title="`${ticket.profile.name}`">
                    </div>
                </div>
            </div>
            <div class="d-flex col-8 rounded mt-3 row">
                <span>See what people are saying</span>
                <div class="bg-secondary rounded">
                    <span v-if="account.id" class="d-flex justify-content-end my-1">Join the
                        conversation</span>
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
                    <p></p>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, ref, onMounted, watchEffect, watch } from 'vue';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import { commentService } from '../services/CommentService.js';
import { logger } from '../utils/Logger.js';
import { ticketService } from '../services/TicketService.js';
import { accountService } from '../services/AccountService.js';
export default {
    setup() {
        const route = useRoute()
        const account = computed(() => AppState.account)
        const activeEvent = computed(() => AppState.activeEvent)
        const tickets = computed(() => AppState.tickets)
        const comments = computed(() => AppState.comments)
        const checkAccountTickets = computed(() => {
            const account = AppState.tickets.find(ticket => ticket.accountId == AppState.account.id)
            return account != undefined
        })
        const commentData = ref({})
        watchEffect(() => {
            route.params.eventId
            getEventById()
            getComments()
            getEventTickets()
            getMyTickets()
        })
        // FIXME this was an attempt to make the ticket count update
        // const availableTickets = ref(() => AppState.activeEvent.availability)


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
                let ticketData = { eventId: route.params.eventId }
                // FIXME this was an attempt to make the ticket count update
                // activeEvent.availability -= 1
                await ticketService.createTicket(ticketData)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function cancelEvent() {
            try {
                const confirm = await Pop.confirm("Are you sure you want to cancel this event?", "Canceled events can not sell tickets")
                if (!confirm)
                    return
                await eventService.toggleEventCancellation(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function reopenEvent() {
            try {
                const confirm = await Pop.confirm("Are you sure you want to re-open this event?", "Tickets will be available for this event")
                if (!confirm)
                    return
                await eventService.toggleEventCancellation(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getEventTickets() {
            await ticketService.getEventTickets(route.params.eventId)
        }

        async function getMyTickets() {
            await accountService.getMyTickets()
        }

        return {
            account,
            activeEvent,
            comments,
            commentData,
            createComment,
            deleteComment,
            createTicket,
            cancelEvent,
            reopenEvent,
            tickets,
            checkAccountTickets,
            // availableTickets
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

.white-text {
    color: white;
}

.ticket-pic {
    height: 3vh;
    border-radius: 50%;
}
</style>