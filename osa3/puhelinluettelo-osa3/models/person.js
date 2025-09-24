const mongoose = require('mongoose')


mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

// oli tauon jälkeen sekaannusta minne tämä piti tehdä, joten menin
// versionhallinnastani ja esimerkkisovelluksen versionallinnasta katsomaan
// että minnekäs nämä pitikään tehdä
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function(v) {
                return v.length > 5
            }
        }
    }
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)