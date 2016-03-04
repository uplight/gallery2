<?
include('KioskHeader.php');
?>
<!--<script src="js/kiosk/Kiosk.js"></script>-->
<!--<link href="css/kiosk1920.css" rel="stylesheet" />-->
<style>
    body{
        width: 1080px;
        height: 1860px;
        overflow: hidden;
    }
    .hide{
        display: none;
    }

    body{
    <?= isset($labels['bg_1080'])?'background-image:url("'.$labels['bg_1080'].'");':'' ?>
    }

    #container{
        width: 1080px;
        height: 1860px;
        overflow: hidden;
        top:0;
        left: 0;
    }
    #mainview{
        width: 1080px;
        height: 1760px;
        padding: 40px;

    }

</style>
</head>
<body>
<div id="Templates" class="hidden"> </div>
<div id="container">

    <section id="u-header" class="banner-color view-port">
        <style>
            #u-header{
                height: 80px;
            }
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
<br/>
    <br/>
    <br/>
    <section id="mainview" >

    </section>
    <script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>

    <script src="js/gallery/ImagesLibrary.js"></script>

    <script src="js/gallery/ImagesRow.js"></script>
    <script src="js/gallery/Gallery4.js"></script>
    <script>
        $(document).ready(function(){

            console.log($('#mainview').width()+'x'+$('#mainview' ).height());
            var width  = $('#mainview').width();
            var height  = $('#mainview' ).height();

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
                thumbSize:150,
                thumbDistance:200,
                rowHeight:200,
                rowWidth:1060,
                rows:6,
                cols:6,
                prviewPaddingX:80,
                prviewPaddingY:50,
                previwWidth:900,
                previwHeight:1200
            }

            var gal = new hallmark.App($('#mainview'),options);
        })
    </script>
</div>
</body>
</html>
