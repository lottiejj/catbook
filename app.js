const express = require('express')
const app = express()
const port = 3000
const { Cat, Comment } = require('./models');
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/cats', async (req, res) => {
  // show all my cats [an array]
  const cats = await Cat.findAll({
    include: {
       all: true
     }
  })

  res.render('index', { cats: cats })
})

app.post('/cats', async (req, res) => {
  // create a new cat record in my table
  await Cat.create(
    {
      name: req.body.name,
      breed: req.body.breed,
      owner: req.body.owner
    }
  )
  res.redirect('/cats')
})

app.delete('/cats/:id', async (req, res) => {
    //delete a cat
  await Cat.destroy({
    where: {
      id: req.params.id
    }
  })

  res.redirect('/cats')
})

app.post('/cats/:id/comments', async (req, res) => {
  await Comment.create({
    text: req.body.text,
    CatId: req.params.id
  })

  res.redirect('/cats')
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
