/**
 * Created by VladHome on 2/26/2016.
 */
var express = require('express');
var fs = require('fs');

var DB = require('./rem/DbConnector.js').DB;
var app = express();
const csv = require('csv-streamify');
app.use(express.static((__dirname)));
app.get('/getproduct/:limit', function (req, res,next) {
    var limit = Number(req.params.limit)
   var out=[]
    for(var i=0,n=100;i<limit;i++){
       out.push({id:i,name:"Product "+(i+1),pos:Math.random()*1000});
    }
    res.send(out);
})
app.get('/getproduct', function (req, res,next) {
   /// var limit = Number(req.params.limit)
    var out=[]
    for(var i=0,n=100;i<3;i++){
        out.push({id:i,name:"Product "+(i+1),pos:Math.random()*1000});
    }
    res.send(out);
})

app.get('/database', function(req,res){
    console.log(DB);

    DB.connect().createTable();
 /*   query(null,function(rows){
        console.log(rows);
    });*/
    var out ={};
    res.send(out);
})

app.get('/getimages', function (req, res,next) {
    /// var limit = Number(req.params.limit)

    const parser = csv({objectMode: true,delimiter: "\t"})

// emits each line as a buffer or as a string representing an array of fields
    var u=0
    DB.connect().prepareInsert();
    parser.on('data', function (line) {

       console.log(u++);
        //console.log(line[0])
       //if(u<400)
           DB.insertRow(line);


    })
    parser.on('end', function (line) {
        console.log(' end')
        DB.finalize();
    })


    fs.createReadStream('data/GroceryUPC.tsv').pipe(parser)

    var out = [];
    makeArray('ChristmasCards',out);
    makeArray('NFLTeam',out);
    res.send(out);
})

var makeArray = function($folder,out){
    var ar = fs.readdirSync('media/imgs/'+$folder);
    for (var i = 0, n = ar.length; i < n; i++) {
        var item = ar[i];
        $img = {};
        $img.id=out.length+1;
        $img.price = Math.random();
        $img.sale = ($img.price < 0.1);
        var cat1 = Math.floor(Math.random() * 30)+1;
        var cat2 = Math.floor(Math.random() * 30)+1;
        $img.cats = (cat1 === cat2)?cat1 + '' : cat1 + ',' + cat2;
        $img.name = 'ChristmasCards  '+i;
        $img.thumb = 'media/imgs/' + $folder + '/'+item;
        $img.large = 'media/imgs/' + $folder + '/OriginalFiles/' + item;
        out.push($img);
    }
}


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

})