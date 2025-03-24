// Importing required modules and dependencies
const express = require('express');
const fs = require('fs');
const validatePostData = require('../middlewares/validateData')

// Initializing an express router
const router = express.Router();

// Creating a function to read data
async function readData() {
    try {
        const data = await fs.readFile('./database/posts.json');
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
}

// Defining the get all posts route
router.get('/' , async (req, res, next) => {
    try {
        const posts = await readData();
        res.status(200).send(data);
    } catch (error) {
        console.error(error.message);
    }}
);

// GET post by id
router.get('/:id', async (req, res, next) => {
    const postId = req.params.id;
    const data = await readData();
    const post = data.find((post) => post.id === postId);

    if(!post){
        res.status(404).send('Post not found');
    } else {
        console.error(error.message);
    }
});

// CREATE post
router.post('/', validatePostData, async (req, res, next) => {
    
}