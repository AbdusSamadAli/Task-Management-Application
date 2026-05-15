import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    dueDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);