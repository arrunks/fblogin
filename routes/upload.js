var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var https = require('https');

function downloadFile(url, tempFilepath, filepath, callback) {
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


/* GET users listing. */
router.post('/',function(req,res){
	var url = req.body.imageUrl;
	var filename = req.body.userId + Date.now();
	if(url){
		downloadFile(url,path.join(__dirname,'../public/uploads/temp/'),path.join(__dirname , '../public/uploads/'+filename+'.jpg'),function(){
				res.json({"status": "success"});
		});
	}else{
		res.json({"status": "failed"});
	}
});

module.exports = router;
