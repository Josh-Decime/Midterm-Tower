import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventService } from "../services/EventService.js";
import BaseController from "../utils/BaseController.js";

export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)

            .use(Auth0Provider.getAuthorizedUserInfo)

            .post('', this.createEvent)
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

}