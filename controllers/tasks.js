const Task=require('../models/task')
const getAllTasks=(async(req,res)=>{
    try {
        const tasks= await Task.find({})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({error: error})
    }
})
const createTask=async(req,res)=>{
    try {
        const task= await Task.create(req.body)
        return res.status(201).json({task})
    } catch (error) {
        return res.status(500).json({error: error})
    }
}
const getTask=async(req,res)=>{
    try {
        const {id:taskID}=req.params
        const task= await Task.findOne({_id:taskID})
        if(!task)
        {
            return res.status(404).json({msg: 'Task not found'})
        }
        return res.status(200).json({task})
    } catch (error) {
        return res.status(500).json({error: error})
    }
    res.json({id:req.params.id})
}

const updateTask=async(req,res)=>{
    const {id:taskID}=req.params
    try {
        const task =await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,
        })
        if(!task)
        {
            return res.status(404).json({msg: 'Task not found'})
        }
        return res.status(200).json({task})
    } catch (error) {
        return res.status(500).json({error: error})

    }
}

const deleteTask=async(req,res)=>{
    const {id:taskID}=req.params
    try {
        const task=await Task.findOneAndDelete({_id:taskID})
        if(!task)
        {
            return res.status(404).json({msg: 'Task not found'})
        }
        return res.status(200).json({task})
    } catch (error) {
        return res.status(500).json({error: error})
    }
}

module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}