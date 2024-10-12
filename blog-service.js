const fs = require('fs');

let posts = [];
let categories = [];

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/posts.json', 'utf8', (err, data) => {
            if (err) {
                reject('Unable to read posts file');
                return;
            }
            posts = JSON.parse(data);

            fs.readFile('./data/categories.json', 'utf8', (err, data) => {
                if (err) {
                    reject('Unable to read categories file');
                    return;
                }
                categories = JSON.parse(data);
                resolve();
            });
        });
    });
};

module.exports.getAllPosts = function () {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject('No results returned');
        } else {
            resolve(posts);
        }
    });
};

module.exports.getPublishedPosts = function () {
    return new Promise((resolve, reject) => {
        const publishedPosts = posts.filter(post => post.published === true);
        if (publishedPosts.length === 0) {
            reject('No published posts found');
        } else {
            resolve(publishedPosts);
        }
    });
};

module.exports.getCategories = function () {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject('No categories found');
        } else {
            resolve(categories);
        }
    });
};
