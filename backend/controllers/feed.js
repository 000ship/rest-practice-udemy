const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            id: new Date().toISOString(),
            title: 'First Post',
            content: 'This is the first post!',
            imageUrl: 'images/batman.jpg',
            creator: { name: 'Amir' },
            createdAt: new Date()
        }]
    });
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({
                message: 'Validation failed; entered data is incorrect.',
                errors: errors.array()
            });
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/dock.jpg',
        creator: { name: 'Amir' }
    });
    post.save()
        .then(result => {
            res.status(201).json({
                message: 'Post created Successfully!',
                post: result
            });
        })
        .catch(err => console.log(err));
}