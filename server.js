// noop:1
var express    = require('express')
var mongoose   = require('mongoose')
var path       = require('path')
var bodyParser = require("body-parser")
var app        = express()
var port       = process.env.PORT || 3003;
var Url        = require("./data/url-schema");
var Utility    = require('./utility.js')

// Connect to our mongo database
mongoose.connect('mongodb://localhost/uzip_shortUrl');

//Express request pipeline
app.use(express.static('./public'));
app.use(bodyParser.json())

app.get('/:code', function(req, res) {
  console.log("reg", req.params.code)
  Url.findOne({code:req.params.code}, function(err, data){
    console.log("data", data)
    if(data)
      res.redirect(302, data.longUrl)
    else
      res.end();
  });
});

app.post('/addUrl', function (req, res, next) {
	Url.findOne({longUrl:req.body.longUrl}, function(err, data) {
    if (err){
      res.send(err)
    }
    else if(data) {
      res.send("http://uzip.org/"+data.code);
    } else {
    		var newCode = getCode()
    		checkCode(newCode)
    		.then(function(data){
	    	 	var url = new Url({
				  	code    : data,
				  	longUrl : req.body.longUrl
				  });
				  url.save(function (err, data) {
				    if (err)
				      res.send(err);
				    else
				      res.send("http://uzip.org/"+data.code);
				  });
    		})
			}
	});
})

app.listen(port, function () {
  console.log('Example app listening on port 3003!')
});

//Generate a random code
function getCode() {
	return Utility.randomString(6,"abcdefghijklmnopqrstuvwxyz")
}

//Check if the code is unique
function checkCode(code) {
	return new Promise(function (resolve, reject){
		Url.findOne({code:code}, function(err, data) {
			if(err === null){
				resolve(code);
			}else if(data){
				checkCode(getCode());
			}
		})
	})
}
