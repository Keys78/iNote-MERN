import { InferSchemaType, model, Schema } from "mongoose";

const reviewSchema = new Schema({
    username: { type: String, required: true },
    role:{ type: String, default: 'user' },
    comment: { type: String, required: true },
    starRating: { type: Number, required: true },
}, { timestamps: true });

type Review = InferSchemaType<typeof reviewSchema>;

export default model<Review>("Review", reviewSchema);

