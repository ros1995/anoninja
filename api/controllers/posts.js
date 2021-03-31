const Post = require("../models/Post");

// trying to get all posts so that I can find out the id of each post
async function index(req, res) {
    try {
        const posts = await Post.all;
        res.status(200).json(posts);
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
