const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async(req,res) => {
    const categoryList = await Category.find();
    if(!categoryList) {
        return res.status(500).json({success: false})
    }
    return res.status(200).send(categoryList);
})

router.get(`/:id`, async(req,res) => {
    const category = await Category.findById(req.params.id);

    if(!category) {
        return res.status(500).json({message: 'The category with the given Id was not found'});
    }
    return res.status(200).send(category);
})

router.put('/:id', async (req,res)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
           name: req.body.name,
           icon: req.body.icon,
           color: req.body.color, 
        },
        {new: true}
    )


    if(!category) {
        return res.status(404).send('The category not updated');
    }
    return res.send(category);
})

router.post(`/`, async(req,res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category) {
        return res.status(404).send('The category cannot be created');
    }
    return res.send(category);
})

router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, messaget: 'Category delete success'});
        } else {
            return res.status(404).json({success: false, messaget: 'Category delete fail'});
        }
    }).catch((error)=>{
        return res.status(400).json({success: false, error: error});
    })
})

module.exports = router;