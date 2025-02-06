const Order = require('../models/order.model');
const Book = require('../models/book.model');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name').populate('books.book', 'title');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name').populate('books.book', 'title');
        if (!order) return res.status(404).json({ message: 'Buyurtma topilmadi' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
};

const createOrder = async (req, res) => {
    try {
        const { books } = req.body;
        let totalPrice = 0;

        for (const item of books) {
            const book = await Book.findById(item.book);
            if (!book) return res.status(404).json({ message: `Kitob topilmadi: ${item.book}` });

            totalPrice += book.price * item.quantity;
        }

        const order = new Order({ user: req.user.id, books, totalPrice });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Buyurtma topilmadi' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Buyurtma topilmadi' });
        res.json({ message: 'Buyurtma o‘chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi' });
    }
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder };