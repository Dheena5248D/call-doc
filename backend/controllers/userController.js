const User = require('../models/userModel');
const Doctor = require('../models/docterModel');

exports.getDocs = async (req,res) =>{
    const doctors = await Doctor.find(
        { "slots.isBooked": false }, 
        { name: 1, hospital: 1, location: 1, slots: 1 }    );

        const filteredDoctors = doctors.map(doctor => ({
            doctorId: doctor._id,
            name: doctor.name,
            hospital: doctor.hospital,
            location: doctor.location,
            slots: doctor.slots.filter(slot => slot.isBooked === false) 
        }));


         res.status(200).json(filteredDoctors)
}

exports.setAppointment = async (req,res) => {
    const slotID = req.query.slotID

    try {
        const doctor = await Doctor.findOne({ "slots._id": slotID });

        if (!doctor) {
            return res.status(404).json({ message:  `Slot: ${slotID} not found` });
        }

        const slot = doctor.slots.id(slotID);

        if (!slot) {
            return res.status(404).json({ message: `Slot: ${slotID} not found` });
        }

        slot.isBooked = true;
        slot.bookedBy = req.cookies.userId; 

        await doctor.save(); 

        res.status(200).json({ message: "Appointment set successfully", slot });
    } catch (error) {
        res.status(500).json({ message: "Error setting appointment", error: error.message });
    }
}

exports.getBooked = async (req, res) => {
    if (req.cookies.userId === undefined) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = req.cookies.userId;

    try {

        const doctors = await Doctor.find({ "slots.bookedBy": userId });
        const bookedSlots = doctors.flatMap(doctor => 
            doctor.slots
                .filter(slot => slot.bookedBy.toString() === userId)
                .map(slot => ({
                    timing: slot.timing,
                    date: slot.date,
                    isBooked: slot.isBooked,
                    bookedBy: slot.bookedBy,
                    doctor: {
                        name: doctor.name,
                        hospital: doctor.hospital,
                        location: doctor.location
                    }
                }))
        );


        res.status(200).json(bookedSlots);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving booked slots", error: error.message });
    }
};