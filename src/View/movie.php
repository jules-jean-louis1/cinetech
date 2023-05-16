<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer type="module" src="<?php __DIR__?>./public/script/script_movie.js"></script>
    <title>Home</title>
</head>
<body>
<?php require_once __DIR__ . '/elements/header.php'; ?>
<div id="containerModalDialog"></div>
<div class="containerMoviesPage">
    <div class="flex">
        <div id="containerFilterMovies" class="w-60">
            <div id="containerGenres"></div>
        </div>
        <div>
            <div id="containerMovies"></div>
            <div id="paginationMovies">
                <button id="previousPageButton" type="button" class="p-2 border border-red-300 rounded">Précédent</button>
                <button id="nextPageButton" type="button" class="p-2 border border-red-300 rounded">Suivant</button>
            </div>
        </div>

    </div>
</div>
<?php require_once __DIR__ . '/elements/footer.php'; ?>
</body>
</html>
