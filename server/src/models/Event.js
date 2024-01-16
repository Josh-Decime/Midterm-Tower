import { Schema } from "mongoose";

export const EventSchema = new Schema(
    {
        name: { type: String, required: true, minLength: 1, maxLength: 30 },
        description: { type: String, required: true, minLength: 5, maxLength: 500 },
        coverImg: { type: String, required: true, minLength: 15, maxLength: 500 },
        location: { type: String, required: true, minLength: 1, maxLength: 100 },
        capacity: { type: Number, required: true, min: 1, max: 10000000 },
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, default: false },
    }
)