const { init } = require("../dbConfig");
const { ObjectId } = require("mongodb");

class Post {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.pseudonym = data.pseudonym;
        this.content = data.content;
        this.date = data.date;
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let postData = await db
                    .collection("posts")
                    .find({ _id: ObjectId(id) })
                    .toArray();
                let post = new Post({ ...postData[0], id: postData[0]._id });
                resolve(post);
            } catch (err) {
                reject("Post not found");
            }
        });
    }

    static create(postData) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const postData = await db
                    .collection("posts")
                    .insertOne({ postData });
                const newPost = new Post(result.ops[0]);
                resolve(newPost);
            } catch (error) {
                reject("Error publishing post");
            }
        });
    }
}

module.exports = Post;
