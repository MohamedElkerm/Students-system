const express = require('express')
const [getStudents , getStudentsById , createNewStudent,deleteStudent,updateAccount] = require('../controllers/studentController')

// router object
const router = express.Router()

//Routes

//Get all students
router.get('/getAll',getStudents)

//Get student by id~
router.get('/get/:id' ,getStudentsById )

// create new student
router.post('/createNewStudent' , createNewStudent)

//delete the student data
router.delete('/deleteStudent' , deleteStudent)

//update the student data 
router.put('/update',updateAccount)

module.exports = router