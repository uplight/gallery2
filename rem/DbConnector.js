/**
 * Created by VladHome on 2/29/2016.
 */
var sqlite3 = require('sqlite3').verbose();
var DB = {
    db:null,
    stmt:null,
    query:function(sql,callBack){
        var stmt = this.db.all('SELECT * FROM users', [], function (err, rows) {
            if (err) {
                console.log(err);
                callBack(0);
            } else if (rows.length === 0) {
                callBack(0);
            } else {
                callBack(rows);
            }
        });
    },
    createTable:function(){
        //grp_id,upc14,upc12,brand,name
       // this.db.run('DROP TABLE IF EXISTS prods');

       this.db.run("CREATE TABLE prods (id INTEGER PRIMARY KEY, upc14 TEXT, upc12 TEXT, brand TEXT, name TEXT)");

    },
    connect:function(){
        this.db = new sqlite3.Database('data/products.db');
       // console.log(this.DB);
        return this;
    },
    prepareInsert:function(){
        this.stmt =  this.db.prepare("INSERT INTO prods (upc14, upc12,brand, name ) VALUES (?,?,?,?,?)");
       // this.stmt =  this.db.prepare("INSERT INTO prods VALUES (?,?,?,?,?)");
    },
    insertRow:function(data){
        this.stmt.run(data);
    },
    finalize:function(){
        this.stmt.finalize();
    }
}

exports.DB = DB;