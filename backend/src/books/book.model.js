const mongoose =  require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:  {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category:  {
        type: String,
        required: true,
        enum: [
            'self-help',
            'personal-development',
            'finance',
            'business',
            'strategy',
            'psychology',
            'behavioral-economics',
            'history',
            'anthropology',
            'philosophy',
            'productivity',
            'communication',
            'memoir',
            'entrepreneurship',
            'fiction',
            'horror',
            'adventure'
        ]
    },
    trending: {
        type: Boolean,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    newPrice: {
        type: Number,
        required: true,
    },
    gst: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 100
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
  }, {
    timestamps: true,
  });

  const Book = mongoose.model('Book', bookSchema);

  module.exports = Book;