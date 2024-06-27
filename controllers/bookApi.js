const Book = require('../models/book');
const Author = require('../models/author');

const getAllBooks = async (req, res) => {
    const { titleFragment } = req.query;
    if(titleFragment){
        try {
            const data = await Book.find({ titulo: { "$regex": titleFragment, "$options": "i" } }, '-_id').sort({ titulo: 'asc' }).populate('id_autor', '-_id');
            if (!data) {
                return res.status(404).json({ error: "Ningún parámetro coincide con la búsqueda" });
            }
            res.status(200).json(data);
        } catch (error) {
            console.error("Error in getAllBooks:", error);
            res.status(400).json({ error: error.message });
        }
    }else{
        try {
            const data = await Book.find({}, '-_id').sort({ titulo: 'asc' }).populate('id_autor', '-_id');
            res.status(200).json(data);
        } catch (error) {
            console.error("Error in getAllBooks:", error);
            res.status(400).json({ error: error.message });
        }
    }
};

const getBooksByAuthorLastName = async (req, res) => {
    const { lastName } = req.query;
    try {
        const author = await Author.findOne({ apellidos: lastName });
        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }
        const data = await Book.find({ id_autor: author._id }, '-_id').sort({ titulo: 'asc' }).populate('id_autor', '-_id nombre apellidos');
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getBooksByAuthorLastName:", error);
        res.status(400).json({ error: error.message });
    }
};

const getBooksByTitle = async(req, res) => {
    const { title } = req.query;
    try {
        const data = await Book.findOne({ titulo: { '$regex' : `^${title}$`, '$options': 'i'} }, '-_id').populate('id_autor', '-_id');
        if(!data){
            return res.status(404).json({ error: "Libro no encontrado" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getBooksByTitle:", error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBooksByAuthorLastName,
    getBooksByTitle
};
