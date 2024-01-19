<template>
    <h1 class="text-center">Create an Event!</h1>

    <form @submit.prevent="createEvent()" class="row">
        <div class="col-5 my-3">
            <input v-model="eventData.name" class="form-control" type="text" required minlength="1" maxlength="30"
                placeholder="Name of your event..." title="Name of your event" name="event-name" id="event-name">
        </div>
        <div class="col-4 my-3">
            <input v-model="eventData.location" class="form-control" type="text" required minlength="1" maxlength="100"
                placeholder="Event's location..." title="Event's location" name="event-location" id="event-location">
        </div>
        <div class="col-3 my-3">
            <input v-model="eventData.coverImg" class="form-control" type="url" required minlength="15" maxlength="500"
                placeholder="Cover image URL..." title="Cover image URL" name="event-coverImg" id="event-coverImg">
        </div>
        <div class="col-4 my-3">
            <select v-model="eventData.type" name="event-type" id="event-type" class="form-control" required
                title="Select a category">
                <option selected disabled value="">Select a category</option>
                <option v-for="option in typeOptions" :value="option">{{ option }}</option>
            </select>
        </div>
        <div class="col-3 my-3">
            <input v-model="eventData.capacity" class="form-control" type="number" required min="1" max="10000000"
                placeholder="Event Capacity..." title="Event Capacity" name="event-capacity" id="event-capacity">
        </div>
        <div class="col-2 my-3">
            <input v-model="eventData.startDate" class="form-control" type="date" title="Event start date"
                name="event-startDate" id="event-startDate">
        </div>
        <div class="col-12 my-3">
            <textarea v-model="eventData.description" class="form-control" name="event-description" id="event-description"
                placeholder="Event description..." title="Event description" cols="30" rows="10"></textarea>
        </div>
        <button class="btn btn-primary col-4 mx-3">Create an event</button>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { eventService } from '../services/EventService.js';
export default {

    setup() {
        const eventData = ref({ type: '' })
        return {
            eventData,
            typeOptions: ['concert', 'convention', 'sport', 'digital'],

            async createEvent() {
                try {
                    logger.log('creating a new event form data:', eventData.value)
                    const event = await eventService.createEvent(eventData.value)
                    // TODO this isn't done, i just need to create the function in service
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>