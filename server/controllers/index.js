const { Console } = require('console');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let url = require('url');

let Survey = require('../models/survey');
let Question = require('../models/child');
//let local = mongoose.model('local', surveyModel);

//should render ../views/index.ejs//
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Express' });
}

module.exports.displayLogin = (req, res, next) => {
    res.render('login', { title: 'Login' });
}

module.exports.displayListSurvey = (req, res, next) => {
    res.render('survey', { title: 'List of Surveys' });
}

module.exports.displayQuestionEntry = (req, res, next) => {
    let name = req.params.name;
    console.log("ID should be below");
    //console.log(name);
    res.render('survey_question', {title: 'Question Entry', id: name });

   
    //res.render('survey_question', {title: 'Question Entry', name: name });
}

module.exports.processQuestionAdd = (req, res, next) => {
    let name = req.params.name;
    console.log(req.body.id);
    let newQuestion = Question({
        "question": req.body.Question,
        "optA": req.body.optA,
        "optB": req.body.optB,
        "optC": req.body.optC,
        "optD": req.body.optD
    });

    newQuestion.save((err) => {
        if(err) {
            res.send(err);
        } else {
            Survey.findOneAndUpdate({ 'Name': name }, (err, newQuestion) => {

                Survey.quearray.addToSet(newQuestion)
                Survey.save( function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("it worked");
                    }
                })
            })   
        }
    })
        
        /* Survey.findOne({ 'Name': name }, (err, surveyItem) => {
        let localid = surveyItem._id;
        console.log(surveyItem);
        let localarray = surveyItem.quearray;
        console.log("is this the error");
        console.log(localid);
        let newQuestion = Question({
            "question": req.body.Question,
            "optA": req.body.optA,
            "optB": req.body.optB,
            "optC": req.body.optC,
            "optD": req.body.optD
        });
        localarray.addToSet(newQuestion);
        
        let newSurvey = Survey({
            "_id": localid,
            "quearray": newQuestion
        });
        //must add your own function
        Survey.updateOne({_id: localid}, newSurvey, (err) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                // refresh the book list
                res.redirect(url.format({
                    'pathname': '/survey_question/' + req.body.Name
                }));
            }
        })*/
        res.redirect(url.format({
            'pathname': '/survey_question/' + req.body.Name
        }));
   // })

    
  /*  Survey.findById(id, (err, survToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            Survey.updateOne({_id: id}, newQuestion, (err) => {
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    // refresh the book list
                    res.redirect('/survey_question');
                }
            })
            //res.render('/survey_question', {title: 'Edit Contact', book: bookToEdit})
        }
    });*/
}

module.exports.displayUserPage = (req, res, next) => {
    res.render('user', { title: 'User Local' });
}

module.exports.displayCreateSurvey = (req, res, next) => {
    res.render('create', { title: 'Create Survey' });
}
//below is the post for create survey - do this with the added feature
module.exports.processNewSurvey = (req, res, next) => {
    //console.log(req.body.Name);
    let newSurvey = Survey({
        "Name": req.body.Name,
        "Author": req.body.Author,
        "Description": req.body.Description,
       // "quearray": null
    });
    //verify that the name is not in use already
    //differentiate that the correct user can only see their surveys
    Survey.create(newSurvey, (err, Survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        } else 
        {
        }
    });
    let name = req.body.Name;
    res.redirect(url.format({
        pathname: '/survey_question/' + req.body.Name
    }));
}

module.exports.displaySurvey = (req, res, next) => {
    res.render('survey', { title: 'Survey' });
}