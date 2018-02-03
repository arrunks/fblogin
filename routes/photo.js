var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var https = require('https');

var downloadFile = function(url, tempFilepath, filepath, callback) {
    var tempFile = fs.createWriteStream(tempFilepath);
    tempFile.on('open', function(fd) {
        https.get(url, function(res) {
            res.on('data', function(chunk) {
                tempFile.write(chunk);
            }).on('end', function() {
                tempFile.end();
                fs.renameSync(tempFile.path, filepath);
                return callback(filepath);
            });
        });
    });
}

var rmdir = function(dir) {
    var list = fs.readdirSync(dir);
    for(var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);

        if(filename == "." || filename == "..") {
            // pass these files
        } else if(stat.isDirectory()) {
            // rmdir recursively
            rmdir(filename);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
};


/* GET users listing. */
router.post('/',function(req,res){
	var url = req.body.imageUrl;
	var filename = req.body.userId + Date.now();
  var leadId = req.body.leadId;
  var dir = path.join(__dirname,'../public/uploads/'+leadId);


  if (!fs.existsSync(dir)){   //check if directory exists
    fs.mkdirSync(dir);   // create directory
  }

	if(url){
		downloadFile(url,dir+'/temp/',dir+'/photo.jpg',function(){
				res.json({"status": "success"});
		});
	}else{
		res.json({"status": "failed"});
	}
});

module.exports = router;
