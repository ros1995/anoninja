const db = connect("mongodb://localhost:27017/anoninja");

db.posts.drop();

db.posts.insertMany([
    {
        id: 1,
        title: "Ninjas",
        pseudonym: "Ninja",
        subject: "Ninjas are better than Pirates",
    },
    {
        id: 2,
        title: "Pirates",
        pseudonym: "Pirate",
        subject: "Pirates are better than ninjas",
    },
]);
