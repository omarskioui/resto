const express = require('express');
const { getAllReservations, updateReservation, deleteReservation, createReservation } = require('../controler/reservation');
const isauth = require('../middleware/isauth');
const reservationRouter=express.Router();
 reservationRouter.get('/getreservations',isauth,getAllReservations)
 reservationRouter.post('/createReservation',createReservation)
 reservationRouter.put('/updateReservation/:id',isauth,updateReservation)
 reservationRouter.delete('/deleteReservation/:id',isauth,deleteReservation)

module.exports=reservationRouter