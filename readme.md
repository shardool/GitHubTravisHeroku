#setting up CI and CD with GitHub, Travis and Heroku
- create github repo
- add this repo to travis-ci
- add .travis.yml file to the local gitrepo
- add the following basic info to the file

<<<<<.travis.yml file>>>>>
```
language:
- 'node_js'
node_js:
- '5.3.0'
- 'iojs'
script:
- 'echo this a sample text that should exit with exit code 0 for build to pass'
after_script:
- 'echo some script that runs after the above script runs'
```
<<<<< end of file >>>>>

```
web: node app.js // where app.js is the script file to be run
```
### Heroku Deployment
- add a file named **Procfile** with the following content
- create Heroku account, generate API key and add ssh public key
- heroku toolbelt must be installed and be accessible from the commandline
- travis (sudo gem install travis-lint) should be installed be accessible from commandline 
- generate and add SSH private key to the OSX keychain (just like github/bitbucket)
- create heroku app by typing in following
```
heroku create myapp // this adds git remote to the repo named heroku
```
- login to travis by typing in the following
```
travis login --pro //type in the github username and password
```
- setup deployment details by typing in the following
```
travis setup -r shardool/myrepo heroku
```
- now add and commit all the files to the local repo and push it to the remote GitHub repo
- Now this git push will trigger the travis build and also push the code to Heroku
- It is very important(actually mandatory) for the repo to have a **package.json** file in order for heroku to know that it is a Node JS app.
- next execute the following heroku command to set the scaling on heroku
```
heroku ps:scale web=1
```
- you may execute the following command to inspect the heroku logs

```
heroku logs --tail
```
- you may choose to have the heroku code pulled down locally and run locally by executing the following command

```
heroku local web
```
- To launch the heroku-hosted app from commandline, execute the following
```
heroku open
```
*** GOTCHA: ***

Always let the hosting environment decide the port it wants to listen for incoming requests and never hardcode one.
``` JavaScript 
//example
var http = require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'content-type':'text/plain'});
    res.write('you are awesome');
    res.end();
}).listen(process.env.PORT || 42000); // when running locally will listen on 42000
```
### check if the SSH private keys have been loaded by executing the following
```
ssh -v git@github.com
ssh -v git@bitbucket.org
ssh -v git@heroku.com