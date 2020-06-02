const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url =
    `mongodb://root:${password}@118.24.106.204:8017/phonebook?authSource=admin`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number
})
const Phone = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Phone.find({}).then(result => {
        result.forEach(note => {
            console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length === 5) {
    const phone = new Phone({
        name: process.argv[3],
        number: process.argv[4]
    })

    phone.save().then(result => {
        console.log(`added ${phone.name} number ${phone.number} to phonebook`)
        mongoose.connection.close()
    })
}
else {
    console.log('Please provide 3 or 5 arguments')
}