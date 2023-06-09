<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer type="module" src="<?php echo 'https://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/script/script_actor.js'; ?>"></script>
    <link rel="stylesheet" href="<?php echo 'https://' . $_SERVER['HTTP_HOST'] . '/cinetech/public/style/style_index.css';?>">
    <title>Actor</title>
</head>
<body>
<?php require_once __DIR__ . '/elements/header.php'; ?>
<div id="containerModalDialog"></div>
<div class="containerActorDetailPage">
    <div id="containerMovies">
        <div id="detailActor"></div>
        <div id="containerCast"></div>
        <div id="containerSimilarActorMovies"></div>
    </div>
</div>
<?php require_once __DIR__ . '/elements/footer.php'; ?>
</body>
</html>