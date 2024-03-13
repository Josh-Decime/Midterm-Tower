import { Schema } from "mongoose";

export const CommentSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
        body: { type: String, required: true, maxLength: 2000 },
        isAttending: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)
CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})