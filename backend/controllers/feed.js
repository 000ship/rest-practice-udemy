const { validationResult } = require('express-validator/check');

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
    // Creating post in DB
    res.status(201).json({
        message: 'Post created Successfully!',
        post: {
            id: new Date().toISOString(),
            title: title,
            content: content,
            creator: { name: 'Amir' },
            createdAt: new Date()
        }
    });
}