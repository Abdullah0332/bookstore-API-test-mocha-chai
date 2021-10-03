let mongoose = require("mongoose");
let Book = require("../models/book");

/*
 * GET /book route to retrieve all the books.
 */
const getBooks = async (req, res) => {
  try {
    let books = await Book.find({});

    res.json(books);
  } catch (error) {
    res.json(error);
  }
};

/*
 * POST /book to save a new book.
 */
const postBook = async (req, res) => {
  try {
    //Creates a new book
    var newBook = new Book(req.body);
    //Save it into the DB.
    const book = await newBook.save();
    res.json({ message: "Book successfully added!", book });

    // res.json(book);
  } catch (error) {
    res.json(error);
  }
};

/*
 * GET /book/:id route to retrieve a book given its id.
 */
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.json(error);
  }
};

/*
 * DELETE /book/:id to delete a book given its id.
 */
const deleteBook = async (req, res) => {
  try {
    const result = await Book.remove({ _id: req.params.id });
    res.json({ message: "Book successfully deleted!", result });
  } catch (error) {
    res.json(error);
  }
};

/*
 * PUT /book/:id to updatea a book given its id
 */
const updateBook = async (req, res) => {
  Book.findById({ _id: req.params.id }, (err, book) => {
    if (err) res.send(err);
    Object.assign(book, req.body).save((err, book) => {
      if (err) res.send(err);
      res.json({ message: "Book updated!", book });
    });
  });
};

//export all the functions
module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };
