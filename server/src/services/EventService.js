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




}

export const eventService = new EventService()