// Importing the Express module to create the application
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 4000;// Setting the port to listen on for incoming requests

// Importing CORS (Cross-Origin Resource Sharing) middleware
const cors = require('cors');
app.use(cors());

// Set up static folder to serve images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware for setting custom headers to allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Middleware for parsing request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importing and setting up MongoDB connection using Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Admin666:singsong333@cluster0.wky8o.mongodb.net/MusicDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Define Mongoose schema for 'Music' collection
const musicSchema = new mongoose.Schema({
  title: String,
  singer: String,
  date: String,
  poster: String
});

// Create a 'Music' model using the schema
const Music = mongoose.model('Music', musicSchema);

// GET route for fetching all music entries
app.get('/api/musics', async (req, res) => {
  try {
    const musics = await Music.find({});
    res.json(musics);
  } catch (error) {
    console.error("Error fetching all musics:", error);
    res.status(500).json({ message: "Error fetching musics", error: error.message });
  }
});

// GET route for fetching a single music entry by ID
app.get('/api/music/:id', async (req, res) => {
    const music = await Music.findById(req.params.id);
    res.json(music);
});

// Configure Multer for file uploads (poster images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  }
});

const upload = multer({ storage });

// POST route for adding music
app.post('/api/musics', upload.single('poster'), async (req, res) => {
  try {
    const { title, singer, date } = req.body; // Destructuring the request body to extract music data
    const poster = req.file ? `/uploads/${req.file.filename}` : '';

    // Check if all required fields are provided
    if (!title || !singer || !date || !poster) {
      return res.status(400).json({ message: "Missing required fields (title, singer, date, poster)" });
    }

    // Create a new music document
    const newMusic = new Music({ title, singer, date, poster });

    // Save the new music document to the database
    await newMusic.save();

    // Return success message with the new music data
    res.status(201).json({ message: "Music Added!", music: newMusic });
  } catch (error) {
    console.error("Error adding music:", error);
    res.status(500).json({ message: "Error adding music", error: error.message });
  }
});

// Route to get a specific music by its ID
app.get('/api/music/:id', async (req ,res)=>{
  const music = await Music.findById(req.params.id);
  res.json(music);
})

app.put('/api/music/:id', upload.single('poster'), async (req, res) => {
  try {
    const { title, singer, date } = req.body;
    const poster = req.file ? `/uploads/${req.file.filename}` : req.body.poster; // Handle poster update

    const updatedMusic = await Music.findByIdAndUpdate(req.params.id, { title, singer, date, poster }, { new: true });
    if (!updatedMusic) {
      return res.status(404).json({ message: 'Music not found' });
    }
    res.json(updatedMusic);
  } catch (error) {
    console.error("Error updating music:", error);
    res.status(500).json({ message: "Error updating music", error: error.message });
  }
});

// Route to delete a specific music by its ID
app.delete('/api/music/:id', async (req, res) => {
  console.log('Deleting music with ID:', req.params.id);
  const music = await Music.findByIdAndDelete(req.params.id);
  if (music) {
    res.status(200).send({ message: "Music deleted successfully", music });
  } else {
    res.status(404).send({ message: "Music not found" });
  }
});

// Starting the server on port 4000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Logging a message when the server starts
});
