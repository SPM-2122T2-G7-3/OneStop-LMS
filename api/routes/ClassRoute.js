const express = require('express');
const router = express.Router();

const ClassController = require('../controllers/ClassController');
const QuizController = require('../controllers/QuizController');
const UserService = require('../services/UserService');
const FileService = require('../services/FileService');


router.post('/new', UserService.allowAdmin, (req, res, next) => {
    const {
        courseCode,
        startDate,
        endDate,
        capacity
    } = req.body;

    ClassController.createNewClass(courseCode, startDate, endDate, capacity, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get('/:classId/info', (req, res, next) => {
    const classId= req.params.classId;
    
    ClassController.getClassInfo(classId, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get('/:classId/contents', (req, res, next) => {
    const classId= req.params.classId;
    
    ClassController.getClassContent(classId, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.put('/:classId/learners', (req, res, next) => {
    const classId = req.params.classId;
    const {
        learners
    } = req.body;

    ClassController.updateClassLearners(classId, learners, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get("/:classId/learners", (req, res, next) => {
    const classId = req.params.classId;

    ClassController.getLearnerInClass(classId, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get('/enrolled', UserService.allowLearner, (req, res, next) => {
    const username = req.headers['username'];
    
    ClassController.getEnrolledClass(username, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.put('/:classId/trainers', (req, res, next) => {
    const classId = req.params.classId;
    const {
        trainers
    } = req.body;

    ClassController.updateClassTrainers(classId, trainers, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get('/:classId/trainers', (req, res, next) => {
    const classId = req.params.classId;

    ClassController.getTrainerInClass(classId, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.put('/approve', UserService.allowAdmin, (req, res, next) => {
    const {
        username,
        classId
    } = req.body;

    ClassController.approveSelfEnrollment(classId, username, (status, payload) => {
        res.status(status).json(payload);
    })
});


router.post('/:classId/apply', UserService.allowLearner, (req, res, next) => {
    const classId = req.params.classId;
    const username = req.headers["username"];

    ClassController.applyToClass(classId, username, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get('/:classId/applicants', (req, res, next) => {
    const classId = req.params.classId;

    ClassController.getApplicants(classId, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.put('/:classId/:chapterId/:sectionId/upload/links', (req, res, next) => {
    const classId = req.params.classId;
    const chapterId = req.params.chapterId;
    const sectionId = req.params.sectionId;
    const {
        links
    } = req.body;

    ClassController.uploadLinks(classId, chapterId, sectionId, links, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.post('/:classId/:chapterId/:sectionId/upload/file', FileService.uploadFile.single("file"), (req, res, next) => {
    const classId = req.params.classId;
    const chapterId = req.params.chapterId;
    const sectionId = req.params.sectionId;
    const fileInfo = req.body.fileInfo;

    ClassController.uploadContent(classId, chapterId, sectionId, fileInfo, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.post('/:classId/chapter/new', (req, res, next) => {
    const classId = req.params.classId;
    const {
        chapterTitle
    } = req.body;

    ClassController.newChapter(classId, chapterTitle, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get('/:classId/:chapterId/:sectionId/contents', (req, res, next) => {
    const classId = req.params.classId;
    const chapterId = req.params.chapterId;
    const sectionId = req.params.sectionId;

    ClassController.getContent(classId, chapterId, sectionId, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.post("/:classId/:chapterId/section/new", (req, res, next) => {
    const classId = req.params.classId;
    const chapterId = req.params.chapterId;
    const {
        sectionTitle
    } = req.body;

    ClassController.newSection(classId, chapterId, sectionTitle, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get('/teach', UserService.allowTrainer, (req, res, next) => {
    const username = req.headers['username'];
    
    ClassController.getTeachingClass(username, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get('/:classId/quizzes', (req, res, next) => {
    const classId = req.params.classId;
    
    QuizController.getQuizzesByClass(classId, (status, payload) => {
        res.status(status).json(payload);
    });
})


module.exports = router;