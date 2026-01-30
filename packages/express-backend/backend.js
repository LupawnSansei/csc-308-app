import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userModel from "./user.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
})

    mongoose.set("debug", true);

    mongoose
        .connect("mongodb://localhost:27017/users")
        .catch((error) => console.log(error));

function getUsers(name, job) {
    if (name === undefined && job === undefined) {
        return userModel.find();
    }
    if (name && job) {
        return userModel.find({ name: name, job: job });
    }
    if (name) {
        return findUserByName(name);
    }
    return findUserByJob(job);
}

app.get("/users", async (req, res) => {
    try {
        const { name, job } = req.query;
        const result = await getUsers(name, job);
        res.send({ users_list: result });
    } catch (error) {
        res.status(500).send("Failed to fetch users.");
    }
});

function findUserById(id) {
    return userModel.findById(id);
}




app.get("/users/:id", async (req, res) => {
    try {
        const id = req.params["id"]; //or req.params.id
        const result = await findUserById(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send("Failed to fetch user.");
    }
});




const generateId = () => {
    return Math.random().toString(36).slice(2, 8);
};
    
const addUser = (user) => {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;

};
function findUserByName(name) {
    return userModel.find({ name: name });
}

function findUserByJob(job) {
    return userModel.find({ job: job });
}


app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const userWithID = {...userToAdd, id: generateId()};
    addUser(userWithID);

    res.status(201).send(userWithID);

});

const deleteUser = (id) => {
    return userModel.findByIdAndDelete(id);
};
/*
app.delete("/users", (req, res) => {
    const id = req.body.id; 
    const deleted = deleteUser(id);
    if (deleted === null) {
        res.status(404).send("Resource not found.");
    } else {
        res.status(204).send(deleted);
    }
});
*/
app.delete("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUser(id);
        if (!result) {
            res.status(404).send("Resource not found.");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send("Failed to delete user.");
    }
});

