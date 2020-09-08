const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

router.get('/movies', (req, res) => {
  Movie.find().then(moviesFromDB => {
    res.render('movies', { moviesList: moviesFromDB })
  })
});

router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then(celebrityFromDB => {
      res.render('movies/new', { celebrities: celebrityFromDB });
    }).catch(error => {
      next(error);
    })
});

router.post("/movies", (req, res) => {
  const {title, genre, plot, cast} = req.body;
  Movie.create({
    title, genre, plot, cast
  }).then(movie => {
console.log(movie);
res.redirect("movies")
})
  .catch(err => {
  res.redirect("movies/new")})
})

router.get("/movies/:id/edit", (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
  .populate('cast')
  .then((movieFromDB) => {
    Celebrity.find().then(celebrities => {
      
      res.render("movies/edit", { movie: movieFromDB, celebrities: celebrities })
    })
  })
  .catch(err => next(err))
}) 


router.post("/movies/:id/edit", (req, res, next) => {
  const {title, genre, plot, cast} = req.body;
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, {title, genre, plot, cast})
  .then(() => {
res.redirect("/movies")
  })
  .catch(err => next(err))
})



module.exports = router; 