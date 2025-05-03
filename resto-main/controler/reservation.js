const reservation= require('../models/reservation')
exports.createReservation = async (req, res) => {
    
try {
    const newreservation = new reservation(req.body)
    await newreservation.save()
    res.status(201).send({msg:"reservation added successfully",newreservation})
    
} catch (error) {
    res.status(500).send({msg:"failed to add reservation",error})
    
}
}

exports.getAllReservations = async (req, res) => {
    try {
        if (req.user.role == "admin") {
            const reservations = await reservation.find()
        res.status(200).send({reservations})
        }
        else {
            
        res.status(400).send({msg:"failed to get reservation",error})
        }
        
        
    } catch (error) {
        res.status(500).send({msg:"failed to get reservations",error})
        
    }
}
exports.deleteReservation = async (req, res) => {
    try {
        if (req.user.role == "admin") {
            const deletedreservation = await reservation.findByIdAndDelete(req.params.id)
            if (!deletedreservation) {
                return res.status(404).send({ msg: "reservation not found" });
            }
            res.status(200).send({ msg: "reservation deleted successfully" });
        }
        else {
            res.status(403).send({ msg: "Only admin can delete reservations" });
        }
        
    } catch (error) {
        res.status(500).send({ msg: "failed to delete reservation", error });
        
    }
}
exports.updateReservation = async (req, res) => {
    try {
        if (req.user.role == "admin") {
            const updatedreservation = await reservation.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).send(updatedreservation)
            
        }
        else {
            res.status(403).send({ msg: "Only admin can update reservations" });
        }
        
    } catch (error) {
        res.status(500).send({ msg: "failed to update reservation", error });
        
    }
}


