const express = require('express');
const router = express.Router();

// In-memory data
let students = [
    { id: 1, name: "arun", dept: "cse", age: 23 },
    { id: 2, name: "vicky", dept: "cse", age: 23 },
    { id: 3, name: "kumar", dept: "ece", age: 22 }
];

// -----------------------------------
// GET – All students
// -----------------------------------
router.get('/', (req, res) => {
    res.json(students);
});

// -----------------------------------
// POST – Single / Multiple add
// -----------------------------------
router.post('/', (req, res) => {
    const newStudents = req.body;

    if (Array.isArray(newStudents)) {
        students.push(...newStudents);
    } else {
        students.push(newStudents);
    }

    res.status(201).json({
        message: "Student(s) added successfully",
        students
    });
});

// -----------------------------------
// PUT – Multiple update
// -----------------------------------
router.put('/', (req, res) => {
    const updates = req.body;

    updates.forEach(update => {
        students = students.map(student =>
            student.id === update.id
                ? { ...student, ...update }
                : student
        );
    });

    res.json({
        message: "Students updated successfully",
        students
    });
});

// -----------------------------------
// DELETE – SINGLE student by ID
// -----------------------------------
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const before = students.length;
    students = students.filter(student => student.id !== id);

    if (students.length === before) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json({
        message: "Student deleted successfully",
        students
    });
});

// -----------------------------------
// DELETE – MULTIPLE students by IDs
// -----------------------------------
router.delete('/', (req, res) => {
    const ids = req.body.ids; // { "ids": [1,3] }

    if (!Array.isArray(ids)) {
        return res.status(400).json({
            message: "ids must be an array"
        });
    }

    students = students.filter(student => !ids.includes(student.id));

    res.json({
        message: "Multiple students deleted successfully",
        students
    });
});

module.exports = router;