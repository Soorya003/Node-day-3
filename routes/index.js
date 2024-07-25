const express = require("express");
const Mentor = require("../models/mentor");
const Student = require("../models/student");
const router = express.Router();

router.post("/mentor", async (req,res) => {
    try{
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).send(mentor);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.post("/student", async (req,res) => {
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.get("/mentor", async (req,res) => {
    try{
        const mentors = await Mentor.find();
        res.send(mentors);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.get("/student", async (req,res) => {
    try{
        const students = await Student.find();
        res.send(students);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
//assign a student to a mentor
// POST /api/mentors/:mentorId/assign/:studentId
router.post('/api/mentors/:mentorId/assign/:studentId', async (req, res) => {
    try {
      const mentor = await Mentor.findById(req.params.mentorId);
      const student = await Student.findByIdAndUpdate(req.params.studentId, { mentor: mentor._id }, { new: true });
      res.json(student);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
//add multiple students to a mentor
  // POST /api/mentors/:mentorId/addStudents
router.post('/api/mentors/:mentorId/addStudents', async (req, res) => {
    try {
      const mentor = await Mentor.findById(req.params.mentorId);
      const students = await Student.updateMany({ mentor: null }, { mentor: mentor._id });
      res.json(students);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
//assign or change a mentor for a student
  // PUT /api/students/:studentId/assignMentor/:mentorId
router.put('/api/students/:studentId/assignMentor/:mentorId', async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.studentId, { mentor: req.params.mentorId }, { new: true });
      res.json(student);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//show all students for a particular mentor
  // GET /api/mentors/:mentorId/students
router.get('/api/mentors/:mentorId/students', async (req, res) => {
    try {
      const students = await Student.find({ mentor: req.params.mentorId });
      res.json(students);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//show previously assigned mentor for a particular student
  // GET /api/students/:studentId/previousMentor
router.get('/api/students/:studentId/previousMentor', async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      const previousMentor = await Mentor.findById(student.previousMentor);
      res.json(previousMentor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
module.exports = router;