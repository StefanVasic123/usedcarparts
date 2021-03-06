const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


const User = require('../../models/User');

router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})

// Create new User
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Popunite sva polja' })
    }
    User.findOne({ email })
        .then(user => {
            if(user)
            return res.status(400).json({ msg: 'Korisnik vec postoji' })

        const newUser = new User({
            name, 
            email,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;

                newUser.save()
                    .then(user => {

                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                })
                            }
                        )
                    })
            })
        })
    })
})

// DELETE Route
// @desc Delete A Post
// @access Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;