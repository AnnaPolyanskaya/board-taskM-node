const Task = require('../models/Task')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async (req, res) => {


    console.log(req.user)

    const task = new Task({
        name: req.body.name,
        text: req.body.text,
        board: req.body.board,
        user: req.user.id
    })

    try{
        await task.save()
            .then(response => {
                console.log(response)
                res.status(200).json({
                    task,
                    message: "Task added"
                })
            })
            .catch(error => {
                res.status(500).json({
                    error
                })
            })
    } catch(error) {
        res.status(500).json({
            error
        })
    }
   
}

module.exports.delete = async (req, res) => {
    const task = await Task.findById(req.body.id)
    

    if(task){
        await Task.deleteOne(task)
        res.status(200).json({
            message: 'Task successfully deleted'
        })
    } else {
        res.status(404).json({
            message: 'This task is not found'
        })
    }
}

module.exports.update = async (req, res) => {
    const task = Task.findById(req.body.id)
    const taskData = await Task.find({_id: req.body.id})

    console.log(taskData[0])

    try{
        if(task){
            await Task.findOneAndUpdate(
                {_id: req.body.id},
                {
                    name: req.body.name ? req.body.name : taskData[0].name,
                    text: req.body.text ? req.body.text : taskData[0].text
                }
            )
            res.status(200).json({
                message: "Task successfully updated"
            })
        } else {
           errorHandler(res, error)
        }
    } catch(error) {
        errorHandler(res, error)
    }
}

module.exports.status = async (req, res) => {
    const task = await Task.findById(req.body.id)

    try{
        if(task){
            await Task.findOneAndUpdate(
                {_id: req.body.id },
                {doneStatus: req.body.status}
            )
            res.status(200).json({
                message: "Task status successfully updated"
            })
        } else {
           errorHandler(res, error)
        }
    } catch(error) {
        errorHandler(res, error)
    }
}