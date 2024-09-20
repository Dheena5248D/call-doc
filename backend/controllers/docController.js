const Doctor = require('../models/docterModel');

exports.setSlots = async (req, res) => {
    if (req.cookies.doctorId === undefined) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    
    const doctorId = req.cookies.doctorId;
    try {
        const doctor = await Doctor.findById(doctorId);
        
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        
        const newSlot = {
            timing: req.body.timing,
            date: new Date(req.body.date), 
            isBooked: false,
            bookedBy: null
        };
        
        doctor.slots.push(newSlot);
        await doctor.save();
        
        return res.status(200).json({ message: "Slot added successfully", doctor });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.getBookedUsers =  async (req,res) =>{
    if (req.cookies.doctorId === undefined) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    try{
        const doctor = await Doctor.findById(req.cookies.doctorId).populate({
            path:'slots.bookedBy',
            select:'name email'
        })
        const bookedUsers = doctor.slots
            .filter(slot => slot.isBooked) 
        res.status(200).json({ bookedUsers });
    }catch (err) {
        return res.status(400).json({ error: err.message });
    }
}