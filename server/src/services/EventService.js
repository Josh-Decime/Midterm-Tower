import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class EventService {

    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name picture')
    }




}

export const eventService = new EventService()