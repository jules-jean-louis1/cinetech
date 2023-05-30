<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer type="module" src="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/script/script_profil.js'; ?>"></script>
    <link rel="stylesheet" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/style/style_index.css';?>">
    <link rel="icon" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/images/icon/logo.svg';?>">
    <title>Profil</title>
</head>
<body class="bg-[#1f0c19]">
<?php require_once __DIR__ . '/elements/header.php'; ?>
<div id="containerModalDialog"></div>
<div class="containerProfilPage">
    <div id="btnProfilAction" class="flex gap-4">
        <button id="btnProfilBookmark" type="button" class="flex items-center gap-2 text-black font-bold bg-[#fffe3e] p-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
            </svg>
            Vos favoris
        </button>
        <button id="btnProfilEdit" type="button" class="flex items-center gap-2 text-black font-bold bg-[#fffe3e] p-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5"/>
                <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z"/>
            </svg>
            Modifier Votre Profil
        </button>
    </div>
    <div id="containerLast6"></div>
    <div id="containerProfilAction">
        <div id="profilForm"></div>
    </div>
    <div class="flex justify-center items-center">
        <div id="displayFavorite" class="w-10/12 hidden">
            <div class="p-2">
                <h2 class="font-bold text-2xl text-white" id="title_movie">Vos films favoris</h2>
                <div id="containerFavoriteMovie" class="flex flex-wrap gap-2"></div>
            </div>
            <div class="p-2">
                <h2 class="font-bold text-2xl text-white" id="title_series">Vos series favorites</h2>
                <div id="containerFavoriteSeries" class="flex flex-wrap gap-2"></div>
            </div>
        </div>
    </div>
</div>
<?php require_once __DIR__ . '/elements/footer.php'; ?>
</body>
</html>