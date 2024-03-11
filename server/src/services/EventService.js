import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class EventService {

    async getAllEvents() {
        const events = await dbContext.Events.find().populate('creator', 'name picture').populate('ticketCount')
        return events
    }
    async getEventById(eventId) {
        const event = (await dbContext.Events.findById(eventId).populate('creator', 'name picture')).populate('ticketCount')
        if (!event) {
            throw new BadRequest(`Invalid ID: ${eventId}`)
        }
        return event
    }

    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name picture')
        await event.populate('ticketCount')
        return event
    }
    async editEvent(eventId, updateData) {
        const originalEvent = await this.getEventById(eventId)
        originalEvent.name = updateData.name != undefined ? updateData.name : originalEvent.name
        originalEvent.description = updateData.description != undefined ? updateData.description : originalEvent.description
        originalEvent.coverImg = updateData.coverImg != undefined ? updateData.coverImg : originalEvent.coverImg
        originalEvent.location = updateData.location != undefined ? updateData.location : originalEvent.location
        originalEvent.capacity = updateData.capacity != undefined ? updateData.capacity : originalEvent.capacity
        originalEvent.startDate = updateData.startDate != undefined ? updateData.startDate : originalEvent.startDate
        // originalEvent.isCanceled = updateData.isCanceled != undefined ? updateData.isCanceled : originalEvent.isCanceled
        originalEvent.type = updateData.type != undefined ? updateData.type : originalEvent.type
        await originalEvent.save()
        return originalEvent
    }


    async cancelEvent(eventId) {
        const EventToCancel = await this.getEventById(eventId)
        EventToCancel.isCanceled = !EventToCancel.isCanceled
        await EventToCancel.save()
        return EventToCancel
    }



}

export const eventService = new EventService()