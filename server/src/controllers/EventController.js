import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventService } from "../services/EventService.js";
import BaseController from "../utils/BaseController.js";

export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router


            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
    }

    \
    async createEvent(request, response, next) {
        try {
            const eventData = request.body
            // FIXME 
            const userId = request.userInfo.id
            eventData.creatorId = userId
            const event = await eventService.createEvent(eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

}