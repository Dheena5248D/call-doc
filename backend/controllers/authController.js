const Doctor = require('../models/docterModel');
const User = require('../models/userModel');
const express = require('express');

exports.registerDoc = async(req,res)=>{
    const doc = new Doctor({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        specalization: req.body.specalization,
        hospital: req.body.hospital,
        location: req.body.location,
    })
    try{
        const savedDoc = await doc.save();
        res.status(201).json(savedDoc);
    }catch(err){
        res.status(400).json(err);
    }
}
exports.loginDoc = async (req,res)=>{
    const doc = await Doctor.findOne({email: req.body.email})

    if(!doc){
        res.status(404).json({message:"user not found"});
    }
    if(doc.password != req.body.password){
        res.status(404).json({message:"password is wrong"})
    }
    res.cookie('doctorId', doc._id.toString(), { 
        maxAge: 900000,  // 15 minutes
        httpOnly: true,
        sameSite: 'strict'})
    res.status(200).json(doc);
   
}

exports.registerUser = async(req,res)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    })
    try{
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.loginUser = async (req,res)=>{
    const user = await User.findOne({email: req.body.email})

    if(!user){
        res.status(404).json({message:"user not found"});
    }
    if(user.password != req.body.password){
        res.status(404).json({message:"password is wrong"})
    }
    res.status(200).json(user);
}