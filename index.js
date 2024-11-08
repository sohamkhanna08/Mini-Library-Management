const express = require("express");
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Book = require("./models/book.js");
const User = require("./models/user.js");
require('dotenv').config();

app.use(express.json());  
app.use(express.urlencoded({extended:true}));

main()
.then((res)=>{
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

//Post : Book Route
app.post('/books', async (req, res) => {
    try {
      const { title, author, genre, status } = req.body;
      const book = new Book({ title, author, genre, status });
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      console.error('Error creating book:', error.message); 
      res.status(400).json({ error: 'Error creating book', details: error.message }); 
    }
  });

//Get : Book Filter
app.get('/books', async (req, res) => {
try {
    const { genre, status } = req.query;
    const filter = {};
    if (genre) filter.genre = genre;
    if (status) filter.status = status;
    const books = await Book.find(filter);
    res.json(books);
} catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
}
});

//Get : Book by ID
app.get('/books/:id', async (req, res) => {
try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
} catch (error) {
    res.status(500).json({ error: 'Error fetching book' });
}
});

//Put : Update Book by ID
app.put('/books/:id', async (req, res) => {
try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
} catch (error) {
    res.status(400).json({ error: 'Error updating book' });
}
});

//Patch : Update Book status
app.patch('/books/:id/status', async (req, res) => {
try {
    const { status } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id,{ status },{ new: true, runValidators: true });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
} catch (error) {
    res.status(400).json({ error: 'Error updating book status', details: error.message });
}
});

//Delete : Delete book
app.delete('/books/:id', async (req, res) => {
try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
} catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
}
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});