import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class TicketService {

    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        return ticket
    }

    async getTicketsForEvent(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
        return tickets
    }



}

export const ticketService = new TicketService()