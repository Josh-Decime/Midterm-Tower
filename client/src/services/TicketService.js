import { AppState } from "../AppState.js";
import { Ticket } from "../models/Ticket.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";


class TicketService {

    async createTicket(eventId) {
        const response = await api.post('api/tickets', eventId)
        logger.log('create ticket response data', response.data)
        AppState.tickets.push(new Ticket(response.data))
    }

    async getEventTickets(eventId) {
        let response = await api.get(`api/events/${eventId}/tickets`)
        let tickets = response.data.map(ticket => new Ticket(ticket))
        AppState.tickets = tickets
        console.log('tickets in the AppState:', AppState.tickets)
    }



}

export const ticketService = new TicketService()