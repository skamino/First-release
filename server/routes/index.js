let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET Landing page */
router.get('/', indexController.displayHomePage);

router.get('/login', indexController.displayLogin);
//needs a post

//for listing
router.get('/surveys',indexController.displayListSurvey);
//router.get('/survey_question', indexController.displayQuestionEntry);
router.get('/survey_question/:name', indexController.displayQuestionEntry);
//the post for the questions
router.post('/survey_question/:name', indexController.processQuestionAdd);

//router.get('/survey_question', indexController.displayQuestionEntryRegular)


//for auth
router.get('/user', indexController.displayUserPage);


//for creating a survey
router.get('/create', indexController.displayCreateSurvey);
//post to acutally set the survey
router.post('/create', indexController.processNewSurvey);

router.get('/survey/:id', indexController.displaySurvey);

module.exports = router;
