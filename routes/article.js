const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");

const db = dbSingleton.getConnection();

//EX a
//create new article - create
router.post("/", (req, res) => {
  const { title, content, author } = req.body;

  const query = "INSERT INTO articles (title, content, author) VALUES (?,?,?)";
  db.query(query, [title, content, author], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "article added!", id: results.insertId });
  });
});

//EX b
//show all articles

router.get("/", (req, res) => {
  const query = "SELECT * FROM articles";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

//Ex c
//getting one article by id
router.get("/id/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM articles WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

//Ex d
//deleting an article by using id
router.delete("/id/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM articles WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "article deleted!" });
  });
});

//Ex e
//getting an article by the name of the author
router.get("/author/:author", (req, res) => {
  const { author } = req.params;
  const query = "SELECT * FROM articles WHERE author = ?";
  db.query(query, [author], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

//Ex f
//getting an article by the date of create
//to change to bigger than the date entered
router.get("/date/:date", (req, res) => {
  const { date } = req.params;
  const query = "SELECT * FROM articles WHERE created_at > ?";
  db.query(query, [date], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

//Ex g
//getting articles by order of created date
router.get("/date/order", (req, res) => {
  const query = "SELECT * FROM articles ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

//Ex h
//get the amomunt of articles
router.get("/count", (req, res) => {
  console.log("in");
  const query = "SELECT COUNT(*) FROM articles;";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(results);
  });
});

//Ex i
//get article by title
router.get("/title/:title", (req, res) => {
  const { title } = req.params;
  const query = "SELECT * FROM articles WHERE title LIKE ?;";
  db.query(query, [title], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(results);
  });
});

//Ex j
//getting a list of authors
router.get("/listAuthors", (req, res) => {
  console.log("in");
  const query = "SELECT DISTINCT author FROM articles;";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(results);
  });
});

module.exports = router;
