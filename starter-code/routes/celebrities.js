const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
  .then(celebritiesFromDB => {
    // console.log(celebritiesFromDB);
    res.render('celebrities/index', { 
      celebritiesList: celebritiesFromDB 
    })
  })
  .catch(err => next(err))
})

router.get("/celebrities/new", (req, res)=> {
  res.render("celebrities/new")
})

router.get("/celebrities/:id", (req, res, next) => {
    console.log(req.params);
    const id = req.params.id;
    console.log("id: ",id);
    Celebrity.findById(id)
    .then(celebrity => {
      console.log(celebrity);
      res.render("celebrities/show", { celebrity })
    })
    .catch(err => next(err))
  })

router.post("/celebrities", (req, res) => {
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.create({
    name, occupation, catchPhrase
  }).then(celebrity => {
console.log(celebrity);
res.redirect("celebrities")
  })
  .catch(err => {
  res.redirect("celebrities/new")})
})


router.post("/celebrities/:id/delete", (req, res, next) => {
    const id = req.params.id;
  Celebrity.findByIdAndDelete(id)
  .then(() => {
  res.redirect("/celebrities")
  })
  .catch(err => next(err))
  })

router.get("/celebrities/:id/edit", (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/edit", { celebrity })
    })
    .catch(err => next(err))
}) 

router.post("/celebrities/:id", (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    const id = req.params.id;
    Celebrity.findByIdAndUpdate(id, {name, occupation, catchPhrase})
    .then(() => {
  res.redirect("/celebrities")
    })
    .catch(err => next(err))
  })

module.exports = router; 