const Esport = require('../models/esports')
const asyncHandler = require('express-async-handler')

const getEsports=async(req,res)=>{
    try {
        const esports = await Esport.find({});
        res.status(200).json(esports);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getEsport= asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const esport = await Esport.findById(id);
        res.status(200).json(esport);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const createEsport =async(req,res)=>{
    try {
        const esport = await Esport.create(req.body)
        res.status(200).json(esport);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
}

const updateEsport =async(req,res)=>{
    try {
        const {id} = req.params;
        const esport = await Esport.findByIdAndUpdate(id,req.body);
        if(!esport){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        const updatedesport = await Esport.findById(id);
        res.status(200).json(updatedesport);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteEsport =async(req,res)=>{
    try {
        const {id} = req.params;
        const esport = await Esport.findByIdAndDelete(id);
        if(!esport){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json(esport);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    getEsports,
    getEsport,
    createEsport,
    updateEsport,
    deleteEsport
}