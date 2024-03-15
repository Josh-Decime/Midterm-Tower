import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventService } from "../services/EventService.js";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";
import { commentService } from "../services/CommentService.js";

export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getTicketsForEvent)
            .get('/:eventId/comments', this.getCommentsForEvent)

            .use(Auth0Provider.getAuthorizedUserInfo)

            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    async getAllEvents(request, response, next) {
        try {
            const events = await eventService.getAllEvents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }


    async createEvent(request, response, next) {
        try {
            const eventData = request.body
            const userId = request.userInfo.id
            eventData.creatorId = userId
            const event = await eventService.createEvent(eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await eventService.getEventById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const updateData = request.body
            const event = await eventService.editEvent(eventId, updateData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await eventService.cancelEvent(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsForEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketService.getTicketsForEvent(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getCommentsForEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comment = await commentService.getCommentsForEvent(eventId)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }

}