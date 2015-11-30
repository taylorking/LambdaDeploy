var request = require('request');
var exec = require('child_process').exec;
var fs = require('fs');
var aws = require('aws-sdk');
var FileReader = require('filereader');
var lambda = new aws.Lambda();

exports.handler = function(event, context) {
  console.log(event);
  var fileHandle = event.body.repository.url;
  fileHandle = fileHandle.replace(/\.git/g,"");
  fileHandle += "/archive/master.zip"

  var arn = event.arn;
  
  exec("rm -rf /tmp/*", function(err, stdout, stderr) {
    var stream = request(fileHandle).pipe(fs.createWriteStream('/tmp/update.zip'));
    stream.on('finish', function() {
      exec("./unzip /tmp/update.zip -d /tmp", function(err, stdout, stderr) {
        exec("cp zip /tmp/*/ && cd /tmp/*/ && ./zip -r /tmp/updateform.zip *", function(err,stdout, stderr) {
          
          var reader = new FileReader();
      
          var zip = fs.readFileSync("/tmp/updateform.zip");
          var params = {
            FunctionName: arn,
            Publish: true, 
            ZipFile: new Buffer(zip)
          }
          lambda.updateFunctionCode(params, function(err, data) {
            if(err) {
              context.fail(err);
              return;
            }
            context.succeed(data);
          });
        });
      });
    });
  });
  //  exec("ls /tmp", function(error, stdout, stderr) {
  //  console.log(stdout);
  //  });
};

