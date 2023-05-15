<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <?php
    // Définir le nom du fichier JavaScript à inclure en fonction de la page
    $pageScript = '';
    // Condition pour la page d'accueil
    if ($_SERVER['REQUEST_URI'] === '/cinetech/') {
        $pageScript = 'script_index.js';
    }
    // Condition pour la page 1
    elseif ($_SERVER['REQUEST_URI'] === '/page1') {
        $pageScript = 'script_page1.js';
    }
    // Condition pour la page 2
    elseif ($_SERVER['REQUEST_URI'] === '/page2') {
        $pageScript = 'script_page2.js';
    }
    ?>

    <?php if (!empty($pageScript)) : ?>
        <script defer src="../public/script/<?php echo $pageScript; ?>"></script>
    <?php endif; ?>
    <title>Document</title>
</head>
<body>
<header>
    <div id="containerHeader">
        <nav class="flex justify-between px-4">
            <div>
                <ul class="flex space-x-4">
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/page1">Film</a></li>
                    <li><a href="/page2">Series</a></li>
                </ul>
            </div>
            <div>
                <div>
                    <button id="btnHeaderLoginRegister" type="button">Connexion</button>
                </div>
            </div>
        </nav>
    </div>
</header>
<div id="containerModalDialog"></div>
<div class="containerAllPagesH">

