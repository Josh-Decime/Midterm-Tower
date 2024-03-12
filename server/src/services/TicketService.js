import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

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

    async getMyEventTickets(userId) {
        // const eventTickets = await dbContext.Tickets.find({ accountId: userId }).populate({
        //     path: 'event',
        //     populate: {
        //         path: 'ticketCount'
        //     }
        // })

        const eventTickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')

        return eventTickets
    }

    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('event')
        if (!ticket) {
            throw new BadRequest(`Invalid id: ${ticketId}`)
        }
        if (ticket.accountId != userId) {
            throw new Forbidden("Not your ticket to delete!")
        }
        await ticket.deleteOne()
        return `Ticket deleted for ${ticket.eventId}`
    }


}

export const ticketService = new TicketService()