const Post = require("../models/Post");

// just to check posts route is working - not sure if we want to get all posts here? if so then we can add in await Posts.all and then update in the model
async function index(req, res) {
    try {
        res.send("This is the posts route");
    } catch (error) {
        throw new Error(error);
    }
}

// posts show route
async function show(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ err });
    }
}

// create post route
async function create(req, res) {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ err });
    }
}

module.exports = { index, show, create };
