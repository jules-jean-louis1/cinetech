<?php

?>

<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer type="module" src="<?php __DIR__?>./public/script/script_index.js"></script>
    <title>Home</title>
</head>
<body>
<?php require_once __DIR__ . '/elements/header.php'; ?>
<div id="containerModalDialog"></div>
<div class="containerIndex">
    <div id="containerPopularMovies">
        <div>
            <div class="flex space-x-4">
                <p class="text-xl font-bold">Tendances</p>
                <button id="btnTrendingWeek" type="button" class="p-2 border border-red-300 rounded">Semaines</button>
                <button id="btnTrendingDay" type="button" class="p-2 border border-red-300 rounded">Jours</button>
            </div>
            <div id="containerMoviesWeekOrDay"></div>
        </div>
        <h2 class="text-2xl font-bold">Films populaires</h2>
        <div id="containerMoviesIndex"></div>
        <h2 class="text-2xl font-bold">Séries populaires</h2>
        <div id="containerSeriesIndex"></div>
    </div>
</div>
<?php require_once __DIR__ . '/elements/footer.php'; ?>
</body>
</html>