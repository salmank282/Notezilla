import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, default: "" },
    tag: {
      type: String,
      enum: ["favorite", "work", "personal", "ideas"],
      default: "personal",
    },
  },
  { timestamps: true },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
