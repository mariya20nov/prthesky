var express = require('express');
var bodyParser = require('body-parser');

var http = require('https');


// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/prthesky", function(err, db) {
  if(err) { return console.dir(err); }

  var collection = db.collection('auroras');

  var curCon = 0;

  	var doc1 = '';

	var callback = function(response) {
	  var str = '';

	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  response.on('end', function () {
	    // console.log(str);
	    try {
		    doc1 = JSON.parse(str);
		    collection.insert(doc1);
		    console.log("OK", curCon);
		    curCon++;
		}
		catch(err) {
		    console.log("error: ");
		   //console.log("error: i=", i, "j=", j);
		}
	    get();
	  });
	}

	function get() {
	var i =	(Math.floor(Math.random() * 100000) + 500000) / 10000;
	var j =	(Math.floor(Math.random() * 400000) + 300000) / 10000;
	//console.log("i", i, "j", j);

	var url = "https://api.auroras.live/v1/?type=all&lat=" + i + "&long=" + j + "&forecast=false&twentysevenday=true";
	var req = http.get(url, callback);
	req.end();
	}

	for (var k = 0; k < 20; k = k + 1) {
		get();
	}

});