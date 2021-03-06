const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (inputText) => {
    return inputText.toUpperCase();
});

app.use((request, reponse, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} - ${request.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(`Unable to append to server.log with error: ${err.descriptionText}`);
        }
    });
    next();
});

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express</h1>');
    // response.send({
    //     name: 'Lucio',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });
    response.render('home.hbs', {
        pageTitle: 'Home Page',        
        descriptionText: 'Welcome to my website'
    });
});

app.get('/about', (resquest, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',        
        descriptionText: 'This is about me'
    });
});

app.get('/bad', (request, response) => {
    // response.send('<center><h1>Something wrong please try again later!!!</h1></center>');
    response.send({
        err: 404,
        mess: 'Something wrong please try again later!!!'
    });
});

app.get('/project', (request, response) => {
    response.render('project.hbs', {
        pageTitle: 'Project Page',
        descriptionText: 'Portfolio page'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
