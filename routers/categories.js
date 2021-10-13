const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');

router.get('/', async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList)
        res.status(500).json({ success: false })

    res.status(200).send(categoryList);
})

router.get('/:id', async (req, res) => {
    const categoryList = await Category.findById(req.params.id);

    if (!categoryList)
        res.status(500).json({ success: false, msg: "Category with given id not found" })

    res.status(200).send(categoryList);
})

router.post("/", async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    category = await category.save();

    if (!category) {
        return res.status(404).send("The category cant be created")
    }

    res.send(category);
})

router.put("/:id", async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        { new: true }
        // new : true used to see the updated value after put request as we see old data,but got updated in db
    )
    if (!category) {
        return res.status(400).send("The category cant be created")
    }

    res.send(category);
})

router.delete("/:id", (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then(category => {
            if (category) {
                return res.status(200).json({ success: true, msg: "The category has been sucessfully deleted" });
            }
            else
                return res.status(404).json({ success: false, msg: "No category found with entered id" })
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err })
        })
})

module.exports = router;