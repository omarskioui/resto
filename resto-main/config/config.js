const mongoose = require('mongoose');
const config = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://chams:FGLZUxGs1B7WrIng@cluster0.9j34r.mongodb.net/Grilli")
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('not Connected to MongoDB');
    }
}
module.exports = config