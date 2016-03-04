<?
include('KioskHeader.php');
?>
<!--<script src="js/kiosk/Kiosk.js"></script>-->
<!--<link href="css/kiosk1920.css" rel="stylesheet" />-->
<style>

    .hide{
        display: none;
    }

    body{

    }



</style>
</head>
<body>
<div id="Templates" class="hidden"> </div>
<div id="container">

    <section id="u-header" class="banner-color view-port">
        <style>
            #u-header>div{
                display: inline-block;
            }
            #brand-logo img{
                height: 30px;
            }

        </style>
        <div id="brand-logo" >
            <?= isset($labels['logo'])?'<img src="'.$labels['logo'].'" />':''; ?>
        </div>
        <div id="brand-name" >
            <?= isset($labels['kiosk_header'])?$labels['kiosk_header']:''; ?>
        </div>
        <div id="brand-more">
            <div id="Clock" data-ctr="uplight.Clock">
            </div>

        </div>
        <div id="brand-slogan">
            <?= isset($labels['slogan'])?$labels['slogan']:''; ?>
        </div>

    </section>
    <section id="mainview" >

    </section>
    <script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>

    <script src="js/gallery/ImagesLibrary.js"></script>

    <script src="js/gallery/ImagesRow.js"></script>
    <script src="js/gallery/Gallery4.js"></script>
    <script>
        $(document).ready(function(){
            console.log($(window ).width()+'x'+$(window ).height());
            var width  = $(window ).width();
            var height  = $(window ).height();

            var cols = 5;
            var rows = 7;
            if(width<500){
                rows=5;
                cols=4;
            }



            var options={
                canvasWidth:width,
                canvasHeight:height,
                getimages:'rem/getimages',
                thumbSize:100,
                thumbDistance:120,
                rowHeight:120,
                rowWidth:width+50,
               // rows:5,
              //  cols:4,
                 rows:7,
                 cols:5,
                prviewPaddingX:10,
                prviewPaddingY:10,
                previwWidth:width-20,
                previwHeight:height -20
            }

            var gal = new hallmark.App($('#mainview'),options);
        })
    </script>
</div>
</body>
</html>
