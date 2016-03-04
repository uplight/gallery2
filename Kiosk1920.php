<?
include('KioskHeader.php');
?>
    <!--<script src="js/kiosk/Kiosk.js"></script>-->
<!--<link href="css/kiosk1920.css" rel="stylesheet" />-->
<style>
    body{
        width: 1920px;
        height: 1080px;
        overflow: hidden;
    }
    .hide{
        display: none;
    }

    body{
        <?= isset($labels['bg_1920'])?'background-image:url("'.$labels['bg_1920'].'");':'' ?>
    }

    #container{
        width: 1860px;
        height: 1080px;
        overflow: hidden;
        top:0;
        left: 0;
    }
    #mainview{
        width: 1860px;
        height: 1000px;
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
            var options={
                canvasWidth:1860,
                canvasHeight:1000,
                getimages:'rem/getimages',
                thumbSize:150,
                thumbDistance:200,
                rowHeight:200,
                rowWidth:1860,
                rows:5,
                cols:4
            }

            var gal = new hallmark.App($('#mainview'),options);
        })
    </script>
</div>
</body>
</html>
