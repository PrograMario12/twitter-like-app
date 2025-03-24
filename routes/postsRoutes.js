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

// GET POST BY ID
router.get("/post/:id", async (req, res, next) => {
    try {
      // Extract the post ID from the request parameters
      const postId = req.params.id;
      // Read data from the JSON file
      const data = await readData();

      // Find the post with the matching ID
      const post = data.find((post) => post.id === postId);

      // If the post is not found, send a 404 response
      if (!post) {
        res.status(404).json({ error: "Post not found" });
      } else {
        // If the post is found, send it as the response
        res.status(200).send(post);
      }
    } catch (error) {
      // Handle errors by logging them and sending an error response
      console.error(error.message);
    }
  });

// CREATE POST
router.post("/", validatePostData, async (req, res, next) => {
    try {
      // Generate a unique ID for the new post
      const newPost = {
        id: Date.now().toString(),
        username: req.body.username,
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
      };

      // Read the existing data
      const data = await readData();

      // Add the new post to the data
      data.push(newPost);

      // Write the updated data back to the JSON file
      await fs.writeFile("./database/posts.json", JSON.stringify(data));

      // Send a success response with the new post
      res.status(201).json(newPost);
    } catch (error) {
      // Handle errors by logging them to the console
      console.error(error.message);
    }
});

// Update post
router.put('/post/:id', validatePostData, async (req, res, next) => {
    try{
        const postId = req.params.id;
        const updatedData = {
            username: req.body.username,
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
        };

        const data = await readData();

        const postIndex = data.findIndex((post) => post.id === postId);

        if(postIndex === -1){
            return res.status(404).json({ error: 'Post not found'})
        }

        data[postIndex] = {
            ...data[postIndex],
            ...updatedData
        };

        await fs.writeFile('./database/posts.json', JSON.stringify(data))

        res.status(200).json(data[postIndex])
    } catch (error) {
        console.error(error.message)
    }
});