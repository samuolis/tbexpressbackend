const request = require('request');
var authentication = require('../models/authentication');
var user = require('../models/users');

const access_token_url = 'https://graph.accountkit.com/v1.3/access_token?grant_type=authorization_code&code=';
const account_info_url = 'https://graph.accountkit.com/v1.3/me/?access_token=';

const sClientID = "357099475220262";
const sSecret = "84876895f9ed23f08ec4976daf608320";
const sRedirectURI = "https://trainingbuddy-221215.appspot.com/user/";

// Function for getting user info
exports.user_get = function(req, res) {
  console.log('get user');
  var accessToken;
  request(access_token_url + req.get("authorization-code") + '&access_token=AA|' + sClientID + '|' + sSecret ,
   function (error, response, body) {
     var info = JSON.parse(body);
     if (response.body != null){
       accessToken = info.access_token;
       authentication.createAuthenticationFunction(info, function(response){
         console.log('response from put ' + JSON.stringify(response));
       });
       request(account_info_url + accessToken,
        function (error, response, body) {
          let info = JSON.parse(body);
          if (response.body != null){
            console.log('put user info id: ' + info.id);
            res.status(200).json(info);
          }
          else {
            res.status(200).json(info);
          }
       });
     }
     else {
       res.status(200).json(info);
     }
  });
};

exports.user_insert = function(req, res) {
  // user.findOneByUserId(req.params.user_id)
  user.createUser(req, res);
}
