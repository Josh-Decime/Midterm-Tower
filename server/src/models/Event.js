import { Schema } from "mongoose";

export const EventSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        name: { type: String, required: true, minLength: 1, maxLength: 30 },
        description: { type: String, required: true, minLength: 5, maxLength: 5000 },
        coverImg: { type: String, required: true, minLength: 15, maxLength: 500 },
        location: { type: String, required: true, minLength: 1, maxLength: 100 },
        capacity: { type: Number, required: true, min: 1, max: 10000000 },
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, default: false },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)
EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})