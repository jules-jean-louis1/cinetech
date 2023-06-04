<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer type="module" src="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/script/script_movieDetail.js'; ?>"></script>
    <link rel="stylesheet" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/style/style_index.css';?>">
    <link rel="icon" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/images/icon/logo.svg';?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
<!--    <script defer type="module" src="<?php /*echo 'https://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/script/script_movieDetail.js'; */?>"></script>
    <link rel="stylesheet" href="<?php /*echo 'https://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/style/style_index.css';*/?>">
    <link rel="icon" href="<?php /*echo 'https://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/images/icon/logo.svg';*/?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">-->
    <title>Home</title>
</head>
<body class="bg-[#1f0c19]">
<?php require_once __DIR__ . '/elements/header.php'; ?>
<div id="containerModalDialog"></div>
<div class="containerMoviesDetailPage">
    <div id="containerSeries">
        <div id="detailMovie"></div>
        <div id="containerCast" class="flex justify-center pt-4"></div>
        <div id="containerSimilarMovies" class="flex justify-center pt-4"></div>
    </div>
    <div class="flex flex-col items-center">
        <div id="containerComments" class="w-10/12">
            <div id="containerCommentsForm" class="w-full"></div>
            <div id="containerCommentsList" class="w-full">
                <div id="commentsContainer"></div>
            </div>
        </div>
    </div>
</div>
<?php require_once __DIR__ . '/elements/footer.php'; ?>
</body>
</html>

