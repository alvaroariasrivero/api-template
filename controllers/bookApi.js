const Book = require('../models/book');

const getAllProducts = async(req, res) => {
    let data;
    try {
        data = await Book.find({}, '-_id').populate('id_autor', '-_id');
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({"error":error});
    }
};

const getBooks = {
    getAllProducts
};

module.exports = getBooks;