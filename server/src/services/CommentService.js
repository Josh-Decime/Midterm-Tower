import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";
import { eventService } from "./EventService.js";


class CommentService {

    async createComment(commentData) {
        // const event = await eventService.getEventById(commentData.eventId)
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async getCommentsForEvent(eventId) {
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
        return comments
    }



}

export const commentService = new CommentService()