const express = require('express');
const router = express.Router();
const app = express();
const { projects } = require ("./data.json")


app.set('view engine', 'pug');
app.use('/static', express.static('public'));
//const mainRoutes = require('./routes');

/*
Set your routes. You'll need:
An "index" route (/) to render the "Home" page with the locals set to data.projects
An "about" route (/about) to render the "About" page
Dynamic "project" routes (/project/:id or /projects/:id) 
based on the id of the project that render a customized version of the Pug
 project template to show off each project. Which means adding data, or "locals", 
 as an object that contains data to be passed to the Pug template.
*/
app.get('/', (req, res, next) => {
    res.render('index', { projects });
})

app.get('/about', (req, res) => {
    res.render('about')
  })

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

app.use((req, res, next) => {
    const err = new Error('Not Found, please try another URL');
    err.status = 404;
    next(err);
  });
  

  app.use((err, req, res) => {
    err.message = err.message || "There was a server error!";
    res.status(err.status || 500);
    console.log(`You have hit a ${err.status} error!`);
    res.send(`Error Code: ${res.status} : ${err.message}`);
  });

  
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});