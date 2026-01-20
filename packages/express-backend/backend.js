import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Artist"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap552",
            name: "Dennis",
            job: "Bartender"
        }
    ]}
const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

app.get("/users", (req, res) => {
    const { name, job } = req.query;

    if (name !== undefined && job !== undefined) {
        const result = users["users_list"].filter(
            (user) => user["name"] === name && user["job"] === job
        );
        res.send({ users_list: result });
    } else if (name !== undefined) {
        const result = findUserByName(name);
        res.send({ users_list: result });
    } else {
        res.send(users);
    }
});

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);





app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    console.log("get")
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});





    
const addUser = (user) => {
    users["users_list"].push(user);

    return user;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;

    addUser(userToAdd);

    res.send();

});

const deleteUser = (id) =>
{
    const index = users["users_list"].findIndex(
        (user) => user["id"]=== id 
    );
    if (index === -1)
        {
            return null;
        }
        const [deleted] = users["users_list"].splice(index, 1);
    return deleted;

};
app.delete("/users", (req, res) => {
    const id = req.body.id; 
    const deleted = deleteUser(id);
    if (deleted === null) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(deleted);
    }
});


