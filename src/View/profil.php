<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer type="module" src="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/script/script_profil.js'; ?>"></script>
    <link rel="stylesheet" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/style/style_index.css';?>">
    <title>Profil</title>
</head>
<body class="bg-[#1f0c19]">
<?php require_once __DIR__ . '/elements/header.php'; ?>
<div id="containerModalDialog"></div>
<div class="containerProfilPage">
    <div id="btnProfilAction">
        <button id="btnProfilBookmark" type="button">Vos favoris</button>
        <button id="btnProfilEdit" type="button">Modifier Votre Profil</button>
    </div>
    <div id="containerLast6"></div>
    <div id="displayFavorite">
        <h2 class="text-white">Vos favoris</h2>
        <div>
            <h2 class="text-white" id="title_movie">Vos films favoris</h2>
            <div id="containerFavoriteMovie" class="flex flex-wrap gap-2"></div>
        </div>
        <div id="containerFavoriteSeries">
            <h2 class="text-white" id="title_series">Vos series favorites</h2>
            <div id="containerFavoriteSerie"></div>
        </div>
    </div>
</div>
<?php require_once __DIR__ . '/elements/footer.php'; ?>
</body>
</html>