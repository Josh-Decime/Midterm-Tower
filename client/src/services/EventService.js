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




}

export const eventService = new EventService()