<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer type="module" src="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/script/script_seriesDetail.js'; ?>"></script>
    <link rel="stylesheet" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/style/style_index.css';?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <title>Home</title>
</head>
<body class="bg-[#1f0c19]">
<?php require_once __DIR__ . '/elements/header.php'; ?>
<div id="containerModalDialog"></div>
<div class="containerSeriesDetailPage">
    <div id="containerSeries">
        <div id="detailSeries"></div>
        <div id="containerCast" class="flex justify-center pt-4"></div>
        <div id="containerSimilarSeries" class="flex justify-center pt-4"></div>
    </div>
    <div class="flex flex-col items-center mt-8">
        <div id="containerComments" class="w-8/12">
            <h2 class="flex items-center text-white text-2xl font-bold py-2">
                <span class="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1"/>
                    </svg>
                </span>
                <span class="pl-2">
                    Commentaires
                </span>
            </h2>
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