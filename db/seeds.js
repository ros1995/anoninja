const db = connect("mongodb://localhost:27017/anoninjaDB");

db.posts.drop();

db.posts.insertMany([
    {
        title: "Ninjas",
        pseudonym: "Ninja",
        content: "Ninjas are better than Pirates",
        date: new Date(),
    },
    {
        title: "Pirates",
        pseudonym: "Pirate",
        content: "Pirates are better than ninjas",
        date: new Date(),
    },
]);
