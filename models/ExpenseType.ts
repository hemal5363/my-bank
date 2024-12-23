import mongoose from "mongoose";

const ExpenseType = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ExpenseType ||
  mongoose.model("ExpenseType", ExpenseType);
