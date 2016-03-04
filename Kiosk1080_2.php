<?
include('KioskHeader.php');
?>
<!--<script src="js/kiosk/Kiosk.js"></script>-->
<!--<link href="css/kiosk1920.css" rel="stylesheet" />-->
<style>
    body{
        width: 1080px;
        height: 1860px;
        overflow-y: auto;
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
        <div id="imagesrows">
            <div id="row1">

            </div>
            <div id="row2">

            </div>
            <div id="row3">

            </div>
            <div id="row4">

            </div>

        </div>
        <div id="DragCover">
            <style>
                #DragCover{
                    position: fixed;
                    top: 0;
                    left: 0;
                    background-color: rgba(255,255,255,0.2);
                    width: 1080px;
                    height: 1000px;
                }

            </style>
        </div>
        <div id="Cart">
            <style>
                #CratImage{
                    background-image: url('css/cart.png');
                    width: 120px;
                    height: 120px;
                    border-radius: 50% 50%;
                    margin: auto;
                    position: relative;
                }

            </style>
            <div id="CratImage">


            </div>

        </div>
        <div id="imageDrag">
            <style>
                #imageDrag{
                    position: fixed;
                    top: 0;
                    left: 0;
                    background-size: contain;
                    cursor: pointer;
                }

            </style>

        </div>


    </section>
    <script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>

    <script src="js/libs/hammer.min.js"></script>
    <script src="js/gallery/ImagesPreloader.js"></script>
    <script src="js/gallery/ImageDrag.js"></script>
    <script src="js/gallery/ImagesRow2.js"></script>
    <script src="js/gallery/MouseController.js"></script>
    <script src="js/gallery/gallery2.js"></script>
    <script>
        $(document).ready(function(){

           // console.log($('#mainview').width()+'x'+$('#mainview' ).height());
            var width  = $('#mainview').width();
            var height  = $('#mainview' ).height();

            var cols = 5;
            var rows = 7;
            if(width<500){
                rows=5;
                cols=4;
            }

            var options={
                gals:[
                    {
                        id:"#row1"
                    },{
                        id:"#row2"
                    },{
                        id:"#row3"
                    },{
                        id:"#row4"
                    }
                ],
                canvasWidth:width,
                canvasHeight:height,
                getimages:'rem/getimages',
                thumbWidth:150,
                thumbHeight:150,
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

            var gal = new gallery2.Main($('#mainview'),options);
        })
    </script>
</div>
</body>
</html>
