"use strict";
//{
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();
var mongoose = require('mongoose'), Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/projet');
var qcmSchema =  new Schema({
    id : Number,
    Titre : String,
    questions :
        [
            {
                id : Number,
                Titre : String,
                reponses :
                    [
                        {
                            id : Number,
                            Titre : String,
                            isTrue : Boolean
                        }
                    ]

            }
        ]
});
var userSchema = new Schema({
    Name:String,
    Surname:String,
    Birth:Date,
    Gender:String,
    Postal:Number,
    Town:String,
    Nationality:String,
    Token:
    {
        Value: String,
        Created: Date,
        Disqualified: Boolean
    }



});
var qcmDBB = mongoose.model('qcmDBB',qcmSchema, 'qcmDBB');
var userDBB = mongoose.model('userDBB',userSchema, 'userDBB' );
var app = express();
app.use('/', express.static(__dirname+'../..'));
app.use('/rest', bodyParser.json());
app.use('/rest',bodyParser.urlencoded({extended: true}));     // to support URL-encoded bodies
app.listen(9000);
console.log("Server Lancé sur localhost:9000/");
//}
var userTable = [] ;
function checkToken(token)
{
    var now = Date.now();
    var tokenValid= now-token.Created;
    if(tokenValid<(30*60*1000) && !token.Disqualified)
    {
        tokenValid=(tokenValid-tokenValid%1000)/1000
        var minutes=(tokenValid-tokenValid%60)/60;
        var secondes=tokenValid-minutes*60;


        //return("Token Encore Valide, temps restant:"+(29-minutes)+" minutes et "+(60-secondes)+" secondes");
        return true;

    }
    else
    {
        return false;
    }


};
function Utilisateur(name, surname, birth, gender, postal, town, nat, token)
{
    this.name=name;
    this.surname=surname;
    this.birth=birth;
    this.gender=gender;
    this.postal=postal;
    this.town=town;
    this.nationality=nat;
    this.token=token;
};
app.get('/TEST/requete/:qcmId/:numq', function(req,res)
{
    if((req.params.numq==1||req.params.numq==-1))
    {
        req.params.numq= req.params.numq*(-1);
    }
    //suppression
    return qcmDBB.update({ id: req.params.qcmId },
        { $pop: { questions : req.params.numq } }, function (err) {

            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }

        });
});
app.get('/rest/QCMList', function(req,res)
{
    qcmDBB.find({}, {Titre:1, id:1}, function(err,  doc) {
            //res.send(doc);
        }).sort("id").exec(function(err, posts){
        res.json(posts);
    })


});
app.post('/rest/QCMList', function(req, res)
{
    qcmDBB.create(
        { id: req.body.id, Titre:req.body.Titre  }, function (err) {

            if (!err) {
                console.log("save new ok");
                return res.send('');
            } else {
                console.log(err);
            }

        });
});
//insert({ id: "10", Titre:"java"})
app.post('/rest/User', function(req,res)
{
    var Now =  Date.now();
    var token=
    {
        value:Math.floor(Math.random()*9999999+1),
        created: Now,
        disqualified:false
    };
    var util = new Utilisateur(req.body.Name, req.body.Surname, req.body.Birth, req.body.Gender, req.body.Postal, req.body.Town, req.body.Nat, token);
    userDBB.create(
        {
            Name: util.name,
            Surname: util.surname,
            Birth: util.birth,
            Gender: util.gender,
            Postal: util.postal,
            Town: util.town,
            Nationality: util.nationality,
            Token:{
                Value: util.token.value,
                Created: util.token.created,
                Disqualified: util.token.disqualified
            }
        },
        function (err, doc) {

            if (!err)
            {
                console.log("save new ok");
                res.json(doc);

            }
            else
            {
                console.log(err);
            }
        }
    );
});
 // GET QCM avec QUESTIONS sans reponse
app.get('/rest/QCMList/:qcmId', function(req,res)
{
    qcmDBB.find({id:req.params.qcmId},{'questions.reponses':0}, function(err,  doc) {

}).sort("id").exec(function(err, posts){
        res.json(posts[0]);;
    })
});
app.post('/rest/QCMList/:qcmId', function(req, res)         // POST QCM avec QUESTIONS
{
    if(qcmTable[req.body.id]) {
        qcmTable[req.body.id].Titre = req.body.Titre;
        for (var i = 0; i < req.body.questions.length; i++) {
            qcmTable[req.body.id].questions[i].Titre = req.body.questions[i].Titre;

        }
        qcmDBB.update({id:req.params.qcmId},
            {id:req.params.qcmId,
            Titre:req.body.Titre,
            questions:req.body.questions})

        res.end("QCM Mis a Jour");
    }
    else
    {
        res.end("QCM Inexistant");
    }
});
//supp qcm
app.delete('/rest/QCMList/:qcmId', function(req, res)
{
    return qcmDBB.remove({id:req.params.qcmId}, function (err) {
        if (!err) {
            console.log("removed");
            var xxx= qcmDBB.update({ id: {$gt: req.params.qcmId}}, { $inc: { id: -1 } }, { multi: 1 }, function(err, users) {
                if (err) throw err;

                // object of all the users
                console.log(users);
            });
            return res.send('');
        } else {
            console.log(err);
        }

    });
});
app.post('/rest/QCMList/:qcmId/ScoreQCM', function (req, res)
{

    var userId = req.body.userId;
    userDBB.find({_id:userId}, function(err, doc){

        if(doc)
        {

            if(checkToken(doc[0].Token))
            {
                var reponseSheet=req.body.answers;
                var qcmId= req.params.qcmId;
                var resultatFinal=0;
                qcmDBB.find({id:req.params.qcmId}).sort("id").exec(function(err, sorted)
                {
                    var table = sorted[0].data;
                    for(var j=0; j<sorted[0].questions.length; j++)
                    {
                        if((sorted[0].questions[j].reponses[reponseSheet[j]].isTrue))
                        {
                            resultatFinal++;
                        }
                    }
                    res.json({resultat: resultatFinal});

                })




            }
            else
            {
                res.json({resultat:"Token Invalide"})
            }
        }
        else
        {
            res.json({resultat:"Utilisateur introuvable"})
        }
    })


});
//question sans reponse
app.post('/rest/QCMList/:qcmId/QuesList', function(req,res) {
    var xxxxx = 555;
    var oo =4;
    qcmDBB.update({id:req.params.qcmId},
        // {$set:{'questions.$.id': xxxxx, 'questions.$.Titre':"sfaxi"}},{ upsert: 1 },
        {$addToSet:{questions:{ id:req.body.id, Titre:req.body.Titre}}},
        function (err) {

            if (!err) {
                console.log("save new ok");
                return res.send('');
            } else {
                console.log(err);
            }

        });
});
//question+reponse avec istrue
app.post('/rest/QCMList/:qcmId/QuesList/:questionId', function(req,res) {

    console.log("update reponse");
    qcmDBB.update({ id: req.params.qcmId, 'questions.id':req.params.questionId},
        /* {$addToSet:{
         questions:{
         id:req.body.id, Titre:req.body.Titre,'questions.reponses':req.body.reponses
         }
         }
         */


        { $set: {"questions.$.Titre" :req.body.Titre, "questions.$.reponses" :req.body.reponses}

        }, function (err) {

            if (!err) {
                console.log("update");
                return res.send('');
            } else {
                console.log(err);
            }

        });
});
//question +reponse sans isTrue
app.get('/rest/QCMList/:qcmId/QuesList/:questionId', function(req,res) {
    qcmDBB.findOne(
        {"id":req.params.qcmId},
        {questions:{$elemMatch:{"id": req.params.questionId}},
        "questions.reponses.isTrue":0}
    ).sort("id").exec(function(err, posts){
            if(!err) {
                res.json(posts.questions[0]);
            }
            else
            {
                console.log(err);
            }
        })
});
app.get('/rest/QCMList/:qcmId/QuesListComplete/:questionId', function(req,res) {
    qcmDBB.findOne(
        {"id":req.params.qcmId},
        {questions:{$elemMatch:{"id": req.params.questionId}}}
    ).sort("id").exec(function(err, posts){
            if(!err) {
                res.json(posts.questions[0]);
            }
            else
            {
                console.log(err);
            }
        })
});

app.post('/rest/QCMList/:qcmId/QuesList/:questionId', function(req,res) {

    qcmDBB.update({ id: req.params.qcmId, 'questions.id':req.params.questionId},
        { $set: {"questions.$.Titre" :req.body.Titre, "questions.$.reponses" :req.body.reponses}

    }, function (err) {

            if (!err) {
                console.log("update");
                return res.send('');
            } else {
                console.log(err);
            }

        });
});
//sup question+reponse
app.delete('/rest/QCMList/:qcmId/QuesList/:questionId',function(req,res)
{
    return   qcmDBB.find({id:req.params.qcmId}, function(err, doc){
                    console.log(doc);
                    doc[0].questions.splice([req.params.questionId],1);
                    for (var i =0; i<doc[0].questions.length; i++)
                    {

                        doc[0].questions[i].id = i;
                    }
                    qcmDBB.update({id:req.params.qcmId},
                        {id:req.params.qcmId,
                            Titre:doc[0].Titre,
                            questions:doc[0].questions}, function(err, doc)
                        {
                            if(!err)
                            res.json("");
                            else
                            res.json(err);

                        })
                })




});
app.post('/rest/QCMList/:qcmId/QuesListe', function(req,res) {
    qcmDBB.update({id:req.params.qcmId}, {$push:{'questions':{"Titre":"teeeeest"}}},{safe: true, upsert:true}, function (err) {

        if (!err) {
            console.log("save new ok");
            return res.send('');
        } else {
            console.log(err);
        }
    });

   });

app.post('/rest/QCMList/:qcmId/QuesList/:questionId/deleteAns',function(req,res)
{
    qcmDBB.find(
        {id: req.params.qcmId, "questions.id":req.params.questionId},
        function(err, post){
            if(post)
            {
                console.log("Delete Enter")
                for(var i =0;i<req.body.listDelete.length;i++)
                {
                    post[0].questions[req.params.questionId].reponses.splice(req.body.listDelete[i],1);
                }
                for(var i =0; i<post[0].questions[req.params.questionId].reponses.length;i++){
                    post[0].questions[req.params.questionId].reponses.id=i;

                }
                qcmDBB.update({ id: req.params.qcmId, 'questions.id':req.params.questionId},
                    { $set: {"questions.$.reponses" :post[0].questions[req.params.questionId].reponses}

                    }, function (err) {

                        if (!err) {
                            console.log("update");
                            res.send(post[0].questions[req.params.questionId]);
                        } else {
                            console.log(err);
                        }

                    });

            }

        }
    )
})
	