const express = require('express');
const blogService = require('./blog-service'); 
const app = express();
const port = process.env.PORT || 8080;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/about');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/blog', (req, res) => {
    blogService.getPublishedPosts()
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

app.get('/posts', (req, res) => {
    blogService.getAllPosts()
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

app.get('/categories', (req, res) => {
    blogService.getCategories()
        .then((categories) => {
            res.json(categories);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

blogService.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Express http server listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(`Error initializing the blog service: ${err}`);
    });