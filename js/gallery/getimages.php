<?php
$folders=array('ChristmasCards'=>'Christmas Crads','NFLTeam'=>'NFL Team');
$out = array();
foreach($folders as $folder=>$name) $out[] = getFiles('imgs/'.$folder,$name);
header('Content-Type: application/json');
echo json_encode($out);


function getFiles($folder,$name){
    $out = new stdClass();
    $out->name = $name;
    $ar=array();
    foreach(scandir($folder) as $file) if(strpos($file,'.jpg')!==FALSE)$ar[]=$file;
    $out->folder = $folder;
    $out->ns='hallmark';
    $out->jpgs = $ar;
    return $out;
}