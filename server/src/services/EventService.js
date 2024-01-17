import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class EventService {
    async getAllEvents() {
        const events = await dbContext.Events.find().populate('creator', 'name picture')
        return events
    }

    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name picture')
        return event
    }




}

export const eventService = new EventService()