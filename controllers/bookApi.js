const Book = require('../models/book');
const Author = require('../models/author');

const getAllBooks = async (req, res) => {
    const { titleFragment } = req.query;
    if(titleFragment){
        try {
            const data = await Book.find({ titulo: { "$regex": titleFragment, "$options": "i" } }, { _id: 0, __v: 0 }).sort({ titulo: 'asc' }).populate('id_autor', { _id: 0, __v: 0 });
            if (!data) {
                return res.status(404).json({ error: "Ningún parámetro coincide con la búsqueda" });
            }
            res.status(200).json(data);
        } catch (error) {
            console.error("Error in getAllBooks:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }else{
        try {
            const data = await Book.find({}, { _id: 0, __v: 0 }).sort({ titulo: 'asc' }).populate('id_autor', { _id: 0, __v: 0 });
            res.status(200).json(data);
        } catch (error) {
            console.error("Error in getAllBooks:", error);
            res.status(500).json({ error: 'Internal server error' });
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
        const data = await Book.find({ id_autor: author._id }, { _id: 0, __v: 0 }).sort({ titulo: 'asc' }).populate('id_autor', { _id: 0, __v: 0 });
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getBooksByAuthorLastName:", error);
        res.status(500).json({ error: 'Internal server error' });
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
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createBook = async(req, res) => {
    try {
        const author = await Author.findOne({ apellidos: req.body.apellido_autor });
        if(!author){
            return res.status(404).json({ error: "El autor no ha sido encontrado" });
        }
        const book = new Book({
            titulo: req.body.titulo,
            isbn: req.body.isbn,
            paginas: req.body.paginas,
            genero: req.body.genero,
            id_autor: author._id
        });
        const result = await book.save();
        console.log('Book created', result);
        res.status(201).json(result);
    } catch (error) {
        console.log('Error in createBook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllBooks,
    getBooksByAuthorLastName,
    getBooksByTitle,
    createBook
};
