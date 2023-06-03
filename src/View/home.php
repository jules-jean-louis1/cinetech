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
    <div id="containerQuickAccess" class="h-fit py-6">
        <div id="containerQuickAccessImg"></div>
        <div class="flex justify-center">
            <div class="flex flex-col lg:flex-row items-center justify-between p-4 h-72 w-10/12 xl:w-9/12 bg-[#1F0C1983] rounded">
                <div class="flex flex-col justify-around h-full w-full lg:w-1/2">
                    <div id="introWebsite" class="text-white">
                        <h1 class="text-2xl font-bold hidden lg:block">Bienvenue sur WatchManager</h1>
                        <p class="text-lg h-fit">WatchManager est une plateforme qui vous permet de consulter une vaste sélection de films et de séries. Créez un compte dès maintenant et accédez à une expérience de divertissement personnalisée.</p>
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
                <div class="hidden lg:block h-full w-1/2">
                    <svg viewBox="0 0 84 28" fill="#BEBABDBD" stroke="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.03603 2.7134C0.536115 1.40411 1.50298 0 2.90446 0H13.6228C14.4521 0 15.1954 0.511825 15.4912 1.2866L24.464 24.7866C24.9639 26.0959 23.997 27.5 22.5955 27.5H12.5658C11.3218 27.5 10.2069 26.7323 9.76313 25.5701L1.03603 2.7134Z"/>
                        <path d="M27.036 24.7866C26.5361 26.0959 27.503 27.5 28.9045 27.5H39.6228C40.4521 27.5 41.1954 26.9882 41.4912 26.2134L50.464 2.7134C50.9639 1.40411 49.997 0 48.5955 0L38.5658 0C37.3218 0 36.2069 0.767737 35.7631 1.9299L27.036 24.7866Z"/>
                        <path d="M59.036 24.7866C58.5361 26.0959 59.503 27.5 60.9045 27.5H71.6228C72.4521 27.5 73.1954 26.9882 73.4912 26.2134L82.464 2.7134C82.9639 1.40411 81.997 0 80.5955 0L70.5658 0C69.3218 0 68.2069 0.767737 67.7631 1.9299L59.036 24.7866Z"/>
                        <path d="M43.036 24.7866C42.5361 26.0959 43.503 27.5 44.9045 27.5H55.6228C56.4521 27.5 57.1954 26.9882 57.4912 26.2134L66.464 2.7134C66.9639 1.40411 65.997 0 64.5955 0L54.5658 0C53.3218 0 52.2069 0.767737 51.7631 1.9299L43.036 24.7866Z"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <div id="containerPopularMovies" class="mt-10">
        <div>
            <div class="flex justify-center">
                <div class="w-10/12">
                    <div class="flex items-center space-x-4 text-white">
                        <h2 class="text-xl font-bold flex items-center gap-2">
                            <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 pointer-events-none"><path d="M12.585 3.324l.723.9 1.058 1.275 1.006 1.204.631.774c1.534 1.91 2.708 3.174 3.086 5.201a6.811 6.811 0 01-.561 4.161c-1.113 2.351-3.62 4.026-6.22 4.153-.11.005-.217.008-.324.008-2.513 0-4.969-1.419-6.182-3.577-1.615-2.831-1.252-6.184.903-8.371.77-.78 1.176-.771 1.222.028l.004.16.001.682.01.691.016.46.027.453c.123 1.72.532 3.212 1.879 3.438.823.138 1.698-.077 2.237-.985.356-.614.426-1.34.196-2.039l-.088-.232-.109-.236-.138-.284-.264-.52-.33-.629-.4-.74c-.935-1.724-1.096-4.03.25-5.937a.853.853 0 011.367-.038z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                            Tendances
                        </h2>
                        <button id="btnTrendingWeek" type="button" class="p-2 rounded bg-[#362431]">Semaines</button>
                        <button id="btnTrendingDay" type="button" class="p-2 rounded bg-[#362431]">Jours</button>
                    </div>
                </div>
            </div>
            <div class="flex justify-center">
                <div id="containerMoviesWeekOrDay" class="w-10/12"></div>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="w-10/12 text-white">
                <h2 class="text-2xl font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ticket" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M15 5l0 2"/>
                        <path d="M15 11l0 2"/>
                        <path d="M15 17l0 2"/>
                        <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"/>
                    </svg>
                    Films populaires
                </h2>
                <div id="containerMoviesIndex"></div>
                <h2 class="flex items-center gap-2 text-2xl font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-tv" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/>
                        <path d="M16 3l-4 4l-4 -4"/>
                    </svg>
                    Séries populaires
                </h2>
                <div id="containerSeriesIndex"></div>

            </div>
        </div>
    </div>
</div>
<?php require_once __DIR__ . '/elements/footer.php'; ?>
</body>
</html>