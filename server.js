const express = require('express');
const app = express();

app.use(express.json());

// Three books
let books = [
    { id: 1, title: "Wings of Fire", author: "APJ Kalam", category: "Biography" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction" },
    { id: 3, title: "Atomic Habits", author: "James Clear", category: "Self Help" }
];
app.get('/', (req, res) => {
    res.send("Welcome to Student Library Management System");
});

// CREATE - Add a book only if fewer than 3 exist
app.post('/books', (req, res) => {
    if (books.length >= 3) {
        return res.send("Only 3 books are allowed");
    }

    books.push(req.body);
    res.send("Book Added Successfully");
});

// READ - Display all books
app.get('/books', (req, res) => {
    res.json(books);
});

// UPDATE - Update existing book
app.put('/books/:id', (req, res) => {
    let book = books.find(b => b.id == req.params.id);

    if (book) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.category = req.body.category;

        res.send("Book Updated Successfully");
    } else {
        res.send("Book Not Found");
    }
});

// DELETE - Delete book
app.delete('/books/:id', (req, res) => {
    let oldLength = books.length;

    books = books.filter(b => b.id != req.params.id);

    if (books.length < oldLength) {
        res.send("Book Deleted Successfully");
    } else {
        res.send("Book Not Found");
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
