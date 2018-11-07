'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const accountKit = require('node-accountkit');
const request = require('request');
const sClientID = "357099475220262";
const sSecret = "84876895f9ed23f08ec4976daf608320";
const sRedirectURI = "https://trainingbuddy-221215.appspot.com/user/";
accountKit.set("357099475220262", "84876895f9ed23f08ec4976daf608320");

accountKit.requireAppSecret(true);

function getModel () {
  return require(`./model-datastore`);
}

// Instantiate a datastore client


const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('labas'));

function getUser (req, res) {
  console.log('get user');
  var accessToken;
  request('https://graph.accountkit.com/v1.3/access_token?grant_type=authorization_code&code='+req.get("authorization-code")+'&access_token=AA|'+sClientID+'|'+sSecret ,
   function (error, response, body) {
     var info = JSON.parse(body);
     if (response.body != null){
       accessToken = info.access_token;
       getModel().create('authentication', info, (err, savedData) => {
           if (err) {
             next(err);
             return;
           }
           console.log('put authentication with id: ' + info.id);
         });
         request('https://graph.accountkit.com/v1.3/me/?access_token=' + accessToken,
          function (error, response, body) {
            let info = JSON.parse(body);
            if (response.body != null){
              console.log('put user info id: ' + info.id);
              return res.status(200).json(info);
            }
            else {
              return info;
            }
         });
     }
     else {
       return info;
     }
  });
}

function getProfileInfo (accessToken) {
  console.log('acess token in variable: ' + accessToken);

}



function getProfiles (req, res) {
  getModel().list('profile', 10, (err, entities, cursor) => {
      if (err) {
        next(err);
        return;
      }
      console.log('get profiles');
      return res.status(200).json(entities);
    });
}


app.get('/user/profile', getProfiles);
app.get('/user/', getUser);

app.listen(8080, () => console.log('Example app listening on port 8080!'));

module.exports = app;
