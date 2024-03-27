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



}

export const ticketService = new TicketService()