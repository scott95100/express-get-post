const express = require(`express`)
const app = express()
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs')

//middleWare
//this will help us use our layout file(layout.ejs)
app.use(expressLayouts)

app.set('view engine', 'ejs')

//ROUTES
app.get('/', (req, res)=> {
    res.send('heyo')
})
//Create new view 
app.get('dinosaurs/new', (rec, res)=> {
    res.render('dinosaurs/new')
})
//POST route, doesnt have a view
app.post('/dinosaurs', (req, res)=> {
    // this is coming from our form submit
    //we are going to look at the req.body
    console.log(req.body)
})
//index view 
app.get('/dinosaurs', (rec, res)=> {
    // take our data and put it in a more readable format
    let dinos = fs.readFileSync('./dinosaurs.json')
    dinos = JSON.parse(dinos)
    //in our views folder render this page
    res.render('dinosaurs/index', { dinos: dinos })
} )


//SHOW view
app.get('/dinosaurs/:index', (req, res)=> {
    let dinos = fs.readFileSync('./dinosaurs.json')
    dinos = JSON.parse(dinos)
    const dino = dinos[req.params.index]
    res.render('dinosaurs/show', { dino })
})









const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})
