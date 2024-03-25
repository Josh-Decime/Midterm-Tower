import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentService {

    async createComment(commentData) {
        const response = await api.post('api/comments', commentData)
        console.log('create comment response data', response.data)
        // AppState.comments.push(new Comment(response.data))
    }


}

export const commentService = new CommentService()