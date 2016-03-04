<?php
set_time_limit(300);
$ar=[];
if (($handle = fopen('../data/GroceryUPC.tsv', "r")) !== FALSE) {
			while (($data = fgetcsv($handle,0,"\t")) !== FALSE){
				$ar[]=$data;
			}
		}

$dbpdo=new PDO('sqlite:../data/products5.db');
//$dbpdo = new mysqli('localhost', 'root', '', 'test');
//$dbpdo=new PDO("mysql:host=localhost;dbname=test", 'root', '');
$sql = "CREATE TABLE IF NOT EXISTS prods (id INTEGER PRIMARY KEY AUTOINCREMENT, upc14 TEXT, upc12 TEXT, brand TEXT, name TEXT)";
$dbpdo->query($sql);
$stmt = $dbpdo->prepare("INSERT INTO prods (upc14,upc12,brand,name) VALUES (?,?,?,?)");

//$stmt->bind_param("ssss", $val1, $val2,$val3,$val4);
//$dbpdo->query("START TRANSACTION");
$dbpdo->beginTransaction();
		foreach($ar as $row){
            $val1=$row[1];
            $val2=$row[2];
            $val3=$row[3];
            $val4=$row[4];
            $stmt->execute(array($val1, $val2,$val3,$val4));
		}
//$stmt->close();
$dbpdo->commit();
//$dbpdo->query("COMMIT");

//$dbpdo-> commit();

echo 'length '.count($ar).'     '.json_encode($dbpdo->errorInfo());
?>