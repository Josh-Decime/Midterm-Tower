import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentService {

    async createComment(commentData) {
        const response = await api.post('api/comments', commentData)
        console.log('create comment response data', response.data)
        AppState.comments.push(new Comment(response.data))
    }

    async deleteComment(commentId) {
        // logger.log('Comment Id:', commentId)
        const response = await api.delete(`api/comments/${commentId}`)
        logger.log('Comment deleted response:', response)
        const indexToRemove = AppState.comments.findIndex(comment => comment.id == commentId)
        AppState.comments.splice(indexToRemove, 1)
    }


}

export const commentService = new CommentService()