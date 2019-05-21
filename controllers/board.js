const errorHandler = require('../utils/errorHandler')
const mongoose = require('mongoose')

const Board =  require('../models/Board')
const Schema = mongoose.Schema

module.exports.create = async (req, res) => {
    const board = new Board({
        name: req.body.name,
        text: req.body.text,
    })

    try{
       await board.save() 
        .then(response => {
            console.log(response)
            res.status(201).json({
                board
            })
        })
    } catch(error){
        res.status(500).json({
            error
        })
    }
    
}

module.exports.delete = async (req, res) => {
    const board = Board.findById(req.body.id)

    if(board){
        await Board.deleteOne(board)
            .then(result => {
                console.log(result)
                res.status(200).json({
                    message: 'Deleted successfully'
                })
            })
            .catch(error => {
                console.log(error)
            })
    } else {
        res.status(404).json({
            error: "This board is not found"
        })
    }
}

module.exports.update = async (req, res) => {
    const board = Board.findById(req.body.id)

    if(board){
        await Board.update(board, {
            text: req.body.text || board.text,
            name: req.body.name || board.name
        })
            .then(response => {
                console.log(response)
                res.status(200).json({
                    message: "Updated successfully"
                })
            })
            .catch(error => {
                console.log(error)
            })    
    }
    
}