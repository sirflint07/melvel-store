const mongoose = require('mongoose')
const sneakerModel = require('../models/sneakerSchema')

module.exports = {

    // GET all sneakers in db
    getSneakers: async (req, res) => {
        try {
            const sneakers = await sneakerModel.find({})
            if (!sneakers || sneakers.length === 0) {
                return res.status(404).json({msg: 'Sneakers not found'})
            }
            res.status(200).json(sneakers)
        } catch (error) {
            res.status(400).json(error.message)
        }
    },

    // create a new sneaker in db
    postSneaker: async (req, res) => {
        try {
            const body = req.body

            if(body) {
                const sneaker = await sneakerModel.create(body)
                if (sneaker) {
                    return res.status(201).json(sneaker)
                }
            }
            res.status(404).json({msg: 'no body attached'})
            
        } catch (error) {
            res.status(400).json(error.message)
        }

    },

    // get a single sneaker
    getSneaker: async (req, res) => {
       const {id} = req.params

       try {
        if (id) {
            const sneaker =  await sneakerModel.findById(id)

            if (!sneaker) {
            return res.status(404).json({err: 'could not find the sneaker'})
            }
            res.status(200).json(sneaker)
           }
       } catch (error) {
        res.status(400).json(error.message)
       }
    },
    // delete a Sneaker

    deleteSneaker: async () => {
        const {id} = req.params
        try {
            const sneaker = await sneakerModel.findByIdAndDelete(id)
            if (!sneaker) {
                return res.status(400).json({msg: 'sneaker not found'})
            }
            res.status(200).json(sneaker)
        } catch (error) {
            
        }
    },

    updateSneaker: async (req, res) => {
        const id = req.params.id
        const body =  req.body

        try {
            const sneaker =  await sneakerModel.findByIdAndUpdate(id, body)
            if (!sneaker) {
                res.status(400).json({msg: 'could not update sneaker'})
            }
            res.status(200).json(sneaker)
        } catch (error) {
            res.status(404).json(error.message)
        }
    }
}
