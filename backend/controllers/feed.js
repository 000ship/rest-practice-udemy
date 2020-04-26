exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            id: '1',
            title: 'First Post',
            content: 'This is the first post!',
            imageUrl: 'images/batman.jpg',
            creator: {
                name: 'Amir'
            },
            createdAt: new Date()
        }]
    });
}

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    // Creating post in DB
    res.status(201).json({
        message: 'Post created Successfully!',
        post: { id: Date.now().toString(), title: title, content: content }
    });
}