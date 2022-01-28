
const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({

    Title: {
        type: String,
        required: [true, 'Please enter title Name '],
        unique: true

    },

    Paragraph: {
        type: String,
        required: [true, 'Please enter information (paragraph) '],

    

    },

    Content: {
        type: String,
        required: [true, 'Please enter Content '],
    

    },
    Source: {
        type: String,
        required: [true, 'Please enter source '],

    },



    images: {
        public_id: {
          type: String,
         
        },
        url: {
          type: String,
         
        },
      },


})

module.exports = mongoose.model('Article',articleSchema)