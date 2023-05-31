<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer type="module" src="<?php __DIR__?>./public/script/script_movie.js"></script>
    <link rel="stylesheet" href="<?php __DIR__ ?>./public/style/style_index.css">
    <link rel="icon" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/images/icon/logo.svg';?>">
    <title>Films - WatchManager</title>
</head>
<body>
<?php require_once __DIR__ . '/elements/header.php'; ?>
<div id="containerModalDialog"></div>
<div class="containerMoviesPage">
    <div class="flex">
        <div id="containerFilterMovies" class="w-60">
            <div id="filterPlusMinus">
                <form id="sort-form">
                    <label for="sort-by">Trier par :</label>
                    <select name="sort-by" id="sort-by">
                        <option value="popularity.desc">Plus populaire</option>
                        <option value="popularity.asc">Moins populaire</option>
                        <option value="vote_average.desc">Mieux noté</option>
                        <option value="vote_average.asc">Moins bien noté</option>
                        <option value="original_title.asc">Titre de A à Z</option>
                        <option value="original_title.desc">Titre de Z à A</option>
                        <option value="release_date.desc">Date de sortie récente</option>
                        <option value="release_date.asc">Date de sortie ancienne</option>
                    </select>
                    <button type="submit">Trier</button>
                </form>
            </div>
            <div id="containerGenres"></div>
        </div>
        <div class="w-11/12">
            <div id="containerMovies" class="flex flex-wrap gap-5 overflow-x-scroll py-5 px-10 w-full"></div>
            <div id="paginationMovies" class="flex justify-center gap-5">
                <button id="previousPageButton" type="button" class="p-2 border border-red-300 rounded">Précédent</button>
                <button id="nextPageButton" type="button" class="p-2 border border-red-300 rounded">Suivant</button>
            </div>
        </div>
    </div>
</div>
<?php require_once __DIR__ . '/elements/footer.php'; ?>
</body>
</html>
