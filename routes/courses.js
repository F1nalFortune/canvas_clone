var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Course = require('../models/course');
var Assignment = require('../models/assignment');

router.get('/', function(req, res) {
  Course.find( function(err, courses) {
    res.json(courses);
  });
});

router.get('/:id', function(req, res) {
  Course.findById(req.params.id, function(err, course) {
    res.json(course);
  });
});

router.post('/', function(req, res) {
  new Course({
    teacher: req.body.teacher,
    title: req.body.title,
    date: req.body.date
  }).save( function(err, course) {
    res.json(course);
  });
});

router.delete('/:id', function(req, res) {
  Course.findById(req.params.id, function(err, course) {
    course.remove();
    res.status(200).send({success: true});
  })
})
//Assignments CRUD
router.get('/:id/assignments', function(req, res) {
  Assignment.find({ courseId: req.params.id}, function(err, assignments) {
    res.json(assignments);
  });
});

router.delete('/assignments/:id', function(req, res) {
  Assignment.findById(req.params.id, function(err, assignment) {
    assignment.remove();
    res.status(200).send({success: true});
  })
})

router.post('/:id/assignments', function(req, res) {
  new Assignment({
    name: req.body.name,
    courseId: req.params.id
  }).save( function(err, assignment) {
    res.json(assignment)
  })
})

module.exports = router;
