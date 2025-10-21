const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.rju6ust.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)



const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})



const Note = mongoose.model('Note', noteSchema)
/*
const note = new Note({
  content: 'HTML is easy',
  important: true,
})


const note2 = new Note({
  content: 'Web development seems fun',
  important: true,
})


const note3 = new Note({
  content: "Mongoose is a fun word",
  important: false,
})



note.save()

note2.save()

note3.save().then(result => {
  console.log('all notes are saved')
  mongoose.connection.close()
})
  */
if(process.argv.length < 4) {
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}


const note = new Note({
  content: process.argv[3],
  important: process.argv[4]
})


note.save().then(() =>
  mongoose.connection.close()
)






