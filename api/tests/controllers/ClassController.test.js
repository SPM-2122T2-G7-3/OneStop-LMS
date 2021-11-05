require('dotenv').config();
const mongoose = require('mongoose');
const expect = require('chai').expect;

const ClassController = require('../../controllers/ClassController');
const ClassRun = require('../../models/ClassModel');
const Course = require('../../models/CourseModel');

before(function (done) {
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbName = process.env.DB_TEST_NAME;
    const connStr = `mongodb://${dbHost}:${dbPort}/${dbName}`;
    mongoose.connect(connStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, done);
});


describe('Update Class Learners', function () {
    describe('Valid Update of Class Learners', function () {
        let classId = undefined;

        beforeEach(function (done) {
            const startDate = new Date("2021-10-12");
            const endDate = new Date("2021-11-12");
            const capacity = 50;

            const courseDetails = new Course({
                courseCode: "P01",
                courseTitle: "Xerox WorkCentre 5300 User Training",
                _id: mongoose.Types.ObjectId()
            });

            const newClass = new ClassRun({
                course: courseDetails,
                startDate: startDate,
                endDate: endDate,
                capacity: capacity,
                trainers: ["lance.fu"],
                learners: [{
                    username: "shermin.lim",
                    enrolled: true
                },
                {
                    username: "siti.hindun",
                    enrolled: true
                }],
                content: []
            });

            newClass.save()
                .then(doc => {
                    classId = doc.id;
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done(err);
                });
        });

        it("should return status 200 when successfully updated into DB", function (done) {
            const learners = [{ 
                username: "joen.chua", 
                enrolled: true 
            }];

            ClassController.updateClassLearners(classId, learners, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(200);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });


        it("should return message for successful update", function (done) {
            const learners = [{ 
                username: "joen.chua", 
                enrolled: true 
            }];

            ClassController.updateClassLearners(classId, learners, (status, payload) => {
                try {
                    expect(payload.message).to.be.a("string");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    });


    describe("Invalid Update of Class Learners", function () {
        let classId = undefined;

        before(function (done) {
            const startDate = new Date("2021-10-12");
            const endDate = new Date("2021-11-12");
            const capacity = 50;

            const courseDetails = new Course({
                courseCode: "P01",
                courseTitle: "Xerox WorkCentre 5300 User Training",
                _id: mongoose.Types.ObjectId()
            });

            const newClass = new ClassRun({
                course: courseDetails,
                startDate: startDate,
                endDate: endDate,
                capacity: capacity,
                trainers: ["lance.fu"],
                learners: [{
                    username: "shermin.lim",
                    enrolled: true
                },
                {
                    username: "siti.hindun",
                    enrolled: true
                }],
                content: []
            });

            newClass.save()
                .then(doc => {
                    classId = doc.id;
                    done();
                });
        });


        it("should return status 400 when update is not succesful", function (done) {
            const learners = [];

            ClassController.updateClassLearners(classId, learners, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(400);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });


        it("should return error message", function (done) {
            const learners = [];

            ClassController.updateClassLearners(classId, learners, (status, payload) => {
                try {
                    expect(payload).to.be.an("object");
                    expect(payload.errors).to.be.a("array");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    });

    afterEach(function (done) {
        mongoose.connection.db.dropDatabase(done);
    });
}); // Enroll learners to course


describe("Update Class Trainer", function () {
    describe("Valid update of class trainer", function () {
        let classId = undefined;

        before(function (done) {
            const startDate = new Date("2021-10-12");
            const endDate = new Date("2021-11-12");
            const capacity = 50;

            const courseDetails = new Course({
                courseCode: "P01",
                courseTitle: "Xerox WorkCentre 5300 User Training",
                _id: mongoose.Types.ObjectId()
            });

            const newClass = new ClassRun({
                course: courseDetails,
                startDate: startDate,
                endDate: endDate,
                capacity: capacity,
                trainers: ["lance.fu"],
                learners: [{
                    username: "shermin.lim",
                    enrolled: true
                },
                {
                    username: "siti.hindun",
                    enrolled: true
                }],
                content: []
            });

            newClass.save()
                .then(doc => {
                    classId = doc.id;
                    done();
                });
        });

        it("should return status 200 when successfully updated into DB", function (done) {
            const trainers = ["joen.chua"];

            ClassController.updateClassTrainers(classId, trainers, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(200);
                    done();
                } catch (error) {
                    done(error);
                }
            });

        });

        it("should return message for successful update", function (done) {
            const trainers = ["joen.chua"];

            ClassController.updateClassTrainers(classId, trainers, (status, payload) => {
                try {
                    expect(payload.message).to.be.a("string");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });

        after(function (done) {
            mongoose.connection.db.dropDatabase(done);
        });
    });

    describe("Invalid Update of Class Learners", function () {
        let classId = undefined;

        before(function (done) {
            const startDate = new Date("2021-10-12");
            const endDate = new Date("2021-11-12");
            const capacity = 50;

            const courseDetails = new Course({
                courseCode: "P01",
                courseTitle: "Xerox WorkCentre 5300 User Training",
                _id: mongoose.Types.ObjectId()
            });

            const newClass = new ClassRun({
                course: courseDetails,
                startDate: startDate,
                endDate: endDate,
                capacity: capacity,
                trainers: ["lance.fu"],
                learners: [{
                    username: "shermin.lim",
                    enrolled: true
                },
                {
                    username: "siti.hindun",
                    enrolled: true
                }],
                content: []
            });

            newClass.save()
                .then(doc => {
                    classId = doc.id;
                    done();
                });
        });


        it("should return status 400 when update is not successful", function (done) {
            const trainers = [];

            ClassController.updateClassTrainers(classId, trainers, (status, payload) => {
                try {
                    expect(status).to.be.a("number");
                    expect(status).to.equal(400);
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });


        it("should return error message", function (done) {
            const trainers = [];

            ClassController.updateClassTrainers(classId, trainers, (status, payload) => {
                try {
                    expect(payload).to.be.an("object");
                    expect(payload.errors).to.be.a("array");
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });

        after(function (done) {
            mongoose.connection.db.dropDatabase(done);
        });
    });
});


describe("Approve Self Enrolled Learners", function () {
    let classId = undefined;

    beforeEach(function (done) {
        const startDate = new Date("2021-10-12");
        const endDate = new Date("2021-11-12");
        const capacity = 50;

        const courseDetails = new Course({
            courseCode: "P01",
            courseTitle: "Xerox WorkCentre 5300 User Training",
            _id: mongoose.Types.ObjectId()
        });

        const newClass = new ClassRun({
            course: courseDetails,
            startDate: startDate,
            endDate: endDate,
            capacity: capacity,
            trainers: ["lance.fu"],
            learners: [{
                username: "shermin.lim",
                enrolled: true
            },
            {
                username: "siti.hindun",
                enrolled: true
            },
            {
                username: "claire.niu",
                enrolled: false
            }],
            content: []
        });

        newClass.save()
            .then(doc => {
                classId = doc.id;
                done();
            });
    });

    it("should return status 200 when successfully updated into DB", function (done) {
        const username = "claire.niu";

        ClassController.approveSelfEnrollment(classId, username, (status, payload) => {
            try {
                expect(status).to.be.a("number");
                expect(status).to.equal(200);
                done();
            } catch (error) {
                done(error);
            }
        });
    });


    it("should return message for successful update", function (done) {
        const username = "claire.niu";

        ClassController.approveSelfEnrollment(classId, username, (status, payload) => {
            try {
                expect(payload).to.be.an("object");
                expect(payload.message).to.be.a("string");
                done();
            } catch (error) {
                done(error);
            }
        });
    });


    afterEach(function (done) {
        mongoose.connection.db.dropDatabase(done);
    });
});


describe("Get Trainer in Class", function() {
    let classId = undefined;

    before(function (done) {
        const startDate = new Date("2021-10-12");
        const endDate = new Date("2021-11-12");
        const capacity = 50;

        const courseDetails = new Course({
            courseCode: "P01",
            courseTitle: "Xerox WorkCentre 5300 User Training",
            _id: mongoose.Types.ObjectId()
        });

        const newClass = new ClassRun({
            course: courseDetails,
            startDate: startDate,
            endDate: endDate,
            capacity: capacity,
            trainers: ["lance.fu"],
            learners: [{
                username: "shermin.lim",
                enrolled: true
            },
            {
                username: "siti.hindun",
                enrolled: true
            },
            {
                username: "claire.niu",
                enrolled: false
            }],
            content: []
        });

        newClass.save()
            .then(doc => {
                classId = doc.id;
                done();
            });
    });

    it("should return status 200 when successfully query from DB", function (done) {
        ClassController.getTrainerInClass(classId, (status, payload) => {
            try {
                expect(status).to.be.a("number");
                expect(status).to.equal(200);
                done();
            } catch (error) {
                done(error);
            }
        });
    });
    
    it("should return list of trainers when successfully query from DB", function(done) {
        ClassController.getTrainerInClass(classId, (status, payload) => {
            try {
                expect(payload).to.be.an("object");
                expect(payload.trainers).to.be.an("array");
                done();
            } catch (error) {
                done(error);
            }
        });
    });
    
    after(function (done) {
        mongoose.connection.db.dropDatabase(done);
    });
    
})