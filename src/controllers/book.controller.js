const Book = require('../models/book.model');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Kitob topilmadi' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
};

const createBook = async (req, res) => {
    try {
        const { title, author, price, stock } = req.body;
        const newBook = new Book({ title, author, price, stock });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Kitob topilmadi' });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Kitob topilmadi' });
        res.json({ message: 'Kitob o‘chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };