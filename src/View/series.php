<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer type="module" src="<?php __DIR__?>./public/script/script_series.js"></script>
    <link rel="stylesheet" href="<?php __DIR__ ?>./public/style/style_index.css">
    <link rel="icon" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/images/icon/logo.svg';?>">
    <title>Series TV</title>
</head>
<body class="bg-[#1f0c19]">
<?php require_once __DIR__ . '/elements/header.php'; ?>
<div id="containerModalDialog"></div>
<div class="containerMoviesPage">
    <div id="titlePage" class="py-2">
        <h2 class="flex items-center space-x-2 text-white text-2xl font-bold text-center lg:text-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-tv" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/>
                <path d="M16 3l-4 4l-4 -4"/>
            </svg>
            Séries TV
        </h2>
    </div>
    <div class="flex flex-col lg:flex-row">
        <div id="containerFilterSeries" class="flex flex-col gap-4 w-full lg:w-60">
            <div id="filterPlusMinus" class="rounded text-white p-2 bg-[#2a1825] border border-[#362431]">
                <form id="sort-form">
                    <label for="sort-by">Trier par :</label>
                    <select name="sort-by" id="sort-by" class="bg-transparent p-2 rounded  border border-[#362431]">
                        <option value="popularity.desc">Plus populaire</option>
                        <option value="popularity.asc">Moins populaire</option>
                        <option value="vote_average.desc">Mieux noté</option>
                        <option value="vote_average.asc">Moins bien noté</option>
                        <option value="original_title.asc">Titre de A à Z</option>
                        <option value="original_title.desc">Titre de Z à A</option>
                        <option value="release_date.desc">Date de sortie récente</option>
                        <option value="release_date.asc">Date de sortie ancienne</option>
                    </select>
                </form>
            </div>
            <div id="containerButtonGenre">
                <button id="buttonGenre" type="button" class="rounded text-white p-2 bg-[#2a1825] border border-[#362431] font-semibold p-2 w-full">Genres</button>
                <div id="containerGenres" class="flex flex-wrap gap-2 rounded text-white p-2 bg-[#2a1825] border border-[#362431] hidden"></div>
            </div>
        </div>
        <div class="w-full lg:w-11/12">
            <div id="containerSeries" class="flex flex-wrap justify-between lg:justify-around gap-3 lg:gap-5 mt-2 lg:mt-0 pb-5 lg:px-10 w-full"></div>
            <div id="paginationMovies" class="flex justify-center gap-5">
                <button id="previousPageButton" type="button" class="rounded text-white p-2 bg-[#2a1825] border border-[#362431] font-semibold p-2">Précédent</button>
                <button id="nextPageButton" type="button" class="rounded text-white p-2 bg-[#2a1825] border border-[#362431] font-semibold p-2">Suivant</button>
            </div>
        </div>
    </div>
</div>
<?php require_once __DIR__ . '/elements/footer.php'; ?>
</body>
</html>
