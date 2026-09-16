
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/movieDB")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: String,
    actor: String,
    actress: String,
    year: Number,
    genre: String,
    rating: Number
});

// Movie Model
const Movie = mongoose.model("Movie", movieSchema);

// Display all movies
app.get("/movies", async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

// Add a movie
app.post("/movies", async (req, res) => {
    const movie = new Movie(req.body);
    await movie.save();
    res.json(movie);
});

// Get one movie
app.get("/movies/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
});

// Update a movie
app.put("/movies/:id", async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(movie);
});

// Delete a movie
app.delete("/movies/:id", async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted successfully" });
});

// Start server
app.listen(8080, () => {
    console.log("Server running at http://localhost:8080");
});