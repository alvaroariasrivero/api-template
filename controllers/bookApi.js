const Book = require('../models/book');

const getAllBooks = async (req, res) => {
    try {
        const data = await Book.find({}, '-_id').populate('id_autor', '-_id');
        res.status(200).json(data);
    } catch (error) {
        console.error("Error en getAllBooks:", error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllBooks
};
