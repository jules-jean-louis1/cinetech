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
    <link rel="stylesheet" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/style/style_index.css';?>">
    <link rel="icon" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/images/icon/logo.svg';?>">
    <title>Home</title>
</head>
<body class="bg-[#1f0c19]">
<?php require_once __DIR__ . '/elements/header.php'; ?>
<div id="containerModalDialog"></div>
<div class="containerIndex">
    <div id="containerQuickAccess" class="h-72 py-6">
        <div class="flex justify-center">
            <div class="flex items-center justify-between p-4 h-72 w-8/12 bg-[#251821] hover:bg-[#362431] rounded">
                <div class="flex flex-col justify-around h-full w-1/2">
                    <div id="introWebsite" class="text-white">
                        <h1 class="text-2xl font-bold">Bienvenue sur WatchManager</h1>
                        <p class="text-lg">WatchManager est une plateforme qui vous permet de consulter une vaste sélection de films et de séries. Créez un compte dès maintenant et accédez à une expérience de divertissement personnalisée.</p>
                    </div>
                    <div>
                        <button>
                            <a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/movies';?>" class="bg-[#fffe3e] hover:bg-[#FFFE72] rounded p-3 text-black">Films</a>
                        </button>
                        <button>
                            <a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/series';?>" class="bg-[#9c4ef4] hover:bg-[#8241cc] text-white rounded p-3">Séries</a>
                        </button>
                    </div>
                </div>
                <div class="h-full w-1/3">
                    <svg width="84" height="28" viewBox="0 0 84 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.03603 2.7134C0.536115 1.40411 1.50298 0 2.90446 0H13.6228C14.4521 0 15.1954 0.511825 15.4912 1.2866L24.464 24.7866C24.9639 26.0959 23.997 27.5 22.5955 27.5H12.5658C11.3218 27.5 10.2069 26.7323 9.76313 25.5701L1.03603 2.7134Z" fill="white"/>
                        <path d="M27.036 24.7866C26.5361 26.0959 27.503 27.5 28.9045 27.5H39.6228C40.4521 27.5 41.1954 26.9882 41.4912 26.2134L50.464 2.7134C50.9639 1.40411 49.997 0 48.5955 0L38.5658 0C37.3218 0 36.2069 0.767737 35.7631 1.9299L27.036 24.7866Z" fill="white"/>
                        <path d="M59.036 24.7866C58.5361 26.0959 59.503 27.5 60.9045 27.5H71.6228C72.4521 27.5 73.1954 26.9882 73.4912 26.2134L82.464 2.7134C82.9639 1.40411 81.997 0 80.5955 0L70.5658 0C69.3218 0 68.2069 0.767737 67.7631 1.9299L59.036 24.7866Z" fill="white"/>
                        <path d="M43.036 24.7866C42.5361 26.0959 43.503 27.5 44.9045 27.5H55.6228C56.4521 27.5 57.1954 26.9882 57.4912 26.2134L66.464 2.7134C66.9639 1.40411 65.997 0 64.5955 0L54.5658 0C53.3218 0 52.2069 0.767737 51.7631 1.9299L43.036 24.7866Z" fill="white"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <div id="containerPopularMovies" class="mt-10">
        <div>
            <div class="flex space-x-4 text-white">
                <p class="text-xl font-bold">Tendances</p>
                <button id="btnTrendingWeek" type="button" class="p-2 rounded bg-[#362431]">Semaines</button>
                <button id="btnTrendingDay" type="button" class="p-2 rounded bg-[#362431]">Jours</button>
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