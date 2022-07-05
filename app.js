const express = require('express');
const router = express.Router();
const app = express();
const { projects } = require ("./data.json")

//sets up the view engine to pug
app.set('view engine', 'pug');
//serves items from the public folder
app.use('/static', express.static('public'));

//render the home route
app.get('/', (req, res, next) => {
    res.render('index', { projects });
})

//renders the about route
app.get('/about', (req, res) => {
    res.render('about')
  })

//dynamically renders the project routes to match projects also produces error if route doesn't match a project id
app.get('/projects/:id', (req, res, next) => {
    const { id } = req.params;
    const project = projects[id];
    if(project) {
        res.render('project', { project })
    } else {
        const err = new Error;
        err.status = 404;
        err.message = `Cannot find project ${id}`;
        next(err)
    }
})



//404 error handling 
app.use((err, req, res, next) => {
    err.status = 404;
    next(err);
  });

//global error handling
  app.use((err, req, res, next) => {
    err.message = err.message || "There was a server error!";
    err.status = (err.status || 500);
    console.log(`You have hit a ${err.status} error!`);
    res.send(`Error Code: ${err.status} : ${err.message}`);
  });

  
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});