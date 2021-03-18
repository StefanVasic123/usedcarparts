const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

// GET route
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})

// POST route
router.post('/', (req, res) => {
    const newItem = new Item({
        userId: req.body.userId,
        item: req.body.item,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        productionYear: req.body.productionYear,
        subType: req.body.subType,
        gas: req.body.gas,
        cc: req.body.cc,
        horsePower: req.body.horsePower
    })
    newItem.save().then(item => res.json(item))
})

// DELETE route
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

// Find specific item
router.post('/findItem', (req, res) => {
    Item.find({ 
            userId: req.body.userId,
            item: req.body.item
        })
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ success: false }))
})

// Find specific manufacturer
router.post('/findManufacturer', (req, res) => {
    Item.find({
        userId: req.body.userId,
        item: req.body.item,
        manufacturer: req.body.manufacturer
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find specific model
router.post('/findModel', (req, res) => {
    Item.find({
        userId: req.body.userId,
        item: req.body.item,
        manufacturer: req.body.manufacturer,
        model: req.body.model
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find specific production year
router.post('/findProdYear', (req, res) => {
    Item.find({
        userId: req.body.userId,
        item: req.body.item,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        productionYear: req.body.productionYear
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find specific gas
router.post('/findGas', (req, res) => {
    Item.find({
        userId: req.body.userId,
        item: req.body.item,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        productionYear: req.body.productionYear,
        gas: req.body.gas
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find specific cc
router.post('/findCC', (req, res) => {
    Item.find({
        userId: req.body.userId,
        item: req.body.item,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        productionYear: req.body.productionYear,
        gas: req.body.gas,
        cc: req.body.cc
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find specific cc
router.post('/findHP', (req, res) => {
    Item.find({
        userId: req.body.userId,
        item: req.body.item,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        productionYear: req.body.productionYear,
        gas: req.body.gas,
        cc: req.body.cc,
        horsePower: req.body.horsePower
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find all items of choosen manufacturer
router.post('/findSpecificManufacturer', (req, res) => {
    Item.find({
        userId: req.body.userId,
        manufacturer: req.body.manufacturer
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find all items of choosen model
router.post('/findSpecificModel', (req, res) => {
    Item.find({
        userId: req.body.userId,
        model: req.body.model
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find all items of production year
router.post('/findSpecificProductionYear', (req, res) => {
    Item.find({
        userId: req.body.userId,
        productionYear: req.body.productionYear
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find all items of subType
router.post('/findSpecificSubType', (req, res) => {
    Item.find({
        userId: req.body.userId,
        subType: req.body.subType
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find all items of Gas
router.post('/findSpecificGas', (req, res) => {
    Item.find({
        userId: req.body.userId,
        gas: req.body.gas
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find all items of CC
router.post('/findSpecificCC', (req, res) => {
    Item.find({
        userId: req.body.userId,
        cc: req.body.cc
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

// Find all items of HP
router.post('/findSpecificHP', (req, res) => {
    Item.find({
        userId: req.body.userId,
        horsePower: req.body.horsePower
    })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ success: false }))
})

module.exports = router;