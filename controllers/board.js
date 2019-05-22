const Board =  require('../models/Board')
const Task = require('../models/Task')

const errorHandler = require('../utils/errorHandler')

module.exports.create = async (req, res) => {
    const board = new Board({
        name: req.body.name,
        text: req.body.text,
        user: req.user.id
    })

    try{
       await board.save() 
        .then(response => {
            console.log(response)
            res.status(201).json({
                board,
                message: 'Board created'
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
    const tasks = Task.findById({board: req.body.id})
    if(board){
        try{
           
            await Task.deleteMany({board: req.body.id})
            await Board.deleteOne({_id: req.body.id})
            
            res.status(200).json({
                message: 'Board deleted successfully'
            })
        }catch(error){
            errorHandler(res, error)
        }
    } else {
        res.status(404).json({
            message: 'Board is not found'
        })
    }
    
}

module.exports.update = async (req, res) => {
    const board = await Board.findById(req.body.id)
    const boardData = await Board.find({_id: req.body.id})

    if(board){
        await Board.update(board, {
            text: req.body.text ? req.body.text : boardData[0].text,
            name: req.body.name ? req.body.name : boardData[0].name
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