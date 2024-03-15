import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
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

    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest(`Invalid id: ${commentId}`)
        }
        if (comment.creatorId != userId) {
            throw new Forbidden('Not yours to delete!')
        }
        await comment.deleteOne()
        return `This comment has been deleted!`
    }


}

export const commentService = new CommentService()