'use strict';

var router = require('express').Router();

var config = require('../config'),

    AuthController = require('../data/auth'),
    allowOnly = require('../services/routesHelper').allowOnly,
    UserController = require('../data/user'),
    GradeController = require('../data/grade'),
    CourseController = require('../data/course'),
    StudentController = require('../data/student'),
    TeacherController = require('../data/teacher');

var APIRoutes = function (passport) {

    router.post('/signup', AuthController.signUp);

    router.post('/authenticate', AuthController.authenticateUser);

    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.guest, UserController.index));

    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.teacher, TeacherController.index));

    router.post('/grade', GradeController.addGrade);

    router.post('/checkGrades', GradeController.checkGradesByUsername);

    router.get('/grade', GradeController.getStudentGrades);

    router.post('/course', CourseController.addCourse);

    router.get('/course', CourseController.getCourses);

    router.post('/student', StudentController.addStudent);

    router.get('/student', StudentController.getStudents);

   router.post('/studentInfo', StudentController.getStudentDetails);

    return router;
};

module.exports = APIRoutes;