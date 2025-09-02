
// // import express from "express";
// // import {
// //   createNote,
// //   deleteNote,
// //   getAllNotes,
// //   getNoteById,
// //   updateNote,
// // } from "../controllers/notesController.js";

// // const router = express.Router();

// // router.get("/", getAllNotes);
// // router.get("/:id", getNoteById);
// // router.post("/", createNote);
// // router.put("/:id", updateNote);
// // router.delete("/:id", deleteNote);

// // export default router;


// const express = require("express");
// const {
//   createNote,
//   deleteNote,
//   getAllNotes,
//   getNoteById,
//   updateNote,
// } = require("../controllers/notesController.js");

// const router = express.Router();

// router.get("/", getAllNotes);
// router.get("/:id", getNoteById);
// router.post("/", createNote);
// router.put("/:id", updateNote);
// router.delete("/:id", deleteNote);

// module.exports = router;



// controllers/noteController.js
const Note = require("../models/Note");

// Get all notes
async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get single note by ID
async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new note
async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update note
async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete note
async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Export controllers
module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
