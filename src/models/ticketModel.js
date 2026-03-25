import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: String,
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: Number,
  purchaser: String
});

export default mongoose.model("tickets", ticketSchema);