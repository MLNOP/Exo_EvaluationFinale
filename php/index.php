<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="css/main.css" />
    <script src="js/main.js"></script>
</head>
<body>
    <header>
        <!-- div contenant le svg pour enlever les marges -->
        <div class="svg">
            <!-- inclut le sprite contenant le svg -->
            <?php include_once('img/sprite.svg'); ?>
        </div>
    </header>
    <main>
        <!-- SVG exemple -->
        <svg class="Icon" >
            <use xlink:href="#menu" aria-hidden="true"></use>
        </svg>
    </main>
    <footer></footer>
</body>
</html>