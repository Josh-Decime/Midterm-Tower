import auth0provider from "@bcwdev/auth0provider";
import { eventService } from "../services/EventService.js";
import BaseController from "../utils/BaseController.js";

export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .post('', this.createEvent)
    }

    //TODO when I attempt to post on postman I'm getting back cant read properties of undefined reading id.. I'm not sure if that is a issue with me placing my bearer token in the wrong place in postman so I wont get a user, or if it is an issue with my code. I'll have to ask for help tomorrow since I cant continue until post works
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

}