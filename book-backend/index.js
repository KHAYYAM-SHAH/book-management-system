const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('📚 Book API is running');
});

// Get all books
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).json({ error: 'Failed to fetch books' });
    }
    res.json(results);
  });
});

// Get single book by ID
app.get('/api/books/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching book:', err);
      return res.status(500).json({ error: 'Failed to fetch book' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(results[0]);
  });
});

// Add a new book
app.post('/api/books', (req, res) => {
  const { title, author, genre, yearPublished } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  db.query(
    'INSERT INTO books (title, author, genre, yearPublished) VALUES (?, ?, ?, ?)',
    [title, author, genre, yearPublished],
    (err, result) => {
      if (err) {
        console.error('Error adding book:', err);
        return res.status(500).json({ error: 'Failed to add book' });
      }
      res.status(201).json({ id: result.insertId, title, author, genre, yearPublished });
    }
  );
});
// Update a book
app.put('/api/books/:id', (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  db.query(
    'UPDATE books SET title = ?, author = ? WHERE id = ?',
    [title, author, id],
    (err, result) => {
      if (err) {
        console.error('Error updating book:', err);
        return res.status(500).json({ error: 'Failed to update book' });
      }
      res.json({ message: 'Book updated successfully' });
    }
  );
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      return res.status(500).json({ error: 'Failed to delete book' });
    }
    res.sendStatus(204); // No content
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
