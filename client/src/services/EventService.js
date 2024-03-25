import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";



class EventService {
    async getAllEvents() {
        const response = await api.get('api/events')
        logger.log('getting response data from API:', response.data)
        AppState.events = response.data.map(event => new Event(event))
        logger.log('events in the AppState:', AppState.events)
    }
    async createEvent(eventData) {
        const response = await api.post('api/events', eventData)
        logger.log('response data:', response.data)
        const newEvent = new Event(response.data)
        AppState.events.push(newEvent)
        return newEvent
    }
    async getEventById(eventId) {
        AppState.activeEvent = null
        const response = await api.get(`api/events/${eventId}`)
        logger.log('get event by Id response data:', response.data)
        AppState.activeEvent = new Event(response.data)
    }
    async getComments(eventId) {
        AppState.comments = []
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('get comments response data:', response.data)
        AppState.comments = new Comment(response.data)
    }




}

export const eventService = new EventService()