const Author = require('../models/author');

const getAllAuthors = async (req, res) => {
    try {
        const data = await Author.find({}, '-_id').sort({ apellidos: 'asc' });
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getAllAuthors:", error);
        res.status(400).json({ error: error.message });
    }
}

const getAuthorByLastname = async (req, res) => {
    const { authorLastname } = req.query;
    try {
        const data = await Author.findOne({ apellidos: { "$regex": authorLastname, "$options": "i" } }, '-_id');
        if(!data){
            return res.status(404).json({ error: "Ningún parámetro coincide con la búsqueda" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getAuthorByLastname:", error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllAuthors,
    getAuthorByLastname
}