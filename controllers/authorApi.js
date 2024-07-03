const Author = require('../models/author');

const getAllAuthors = async (req, res) => {
    try {
        const data = await Author.find({}, { _id: 0, __v: 0 }).sort({ apellidos: 'asc' });
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getAllAuthors:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAuthorByLastname = async (req, res) => {
    const { authorLastname } = req.query;
    try {
        const data = await Author.findOne({ apellidos: { "$regex": authorLastname, "$options": "i" } }, { _id: 0, __v: 0 });
        if(!data){
            return res.status(404).json({ error: "Ningún parámetro coincide con la búsqueda" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getAuthorByLastname:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createAuthor = async (req, res) => {
    try {
        console.log(req.body);
        const author = new Author(req.body);
        const result = await author.save();
        console.log('Author created', result);
        res.status(201).json(result);
    } catch (error) {
        console.log('Error in createAuthor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllAuthors,
    getAuthorByLastname,
    createAuthor
};