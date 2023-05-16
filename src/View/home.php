<?php
var_dump($_SESSION['id']);
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
<div class="containerAllPagesH"></div>
<?php require_once __DIR__ . '/elements/footer.php'; ?>
</body>
</html>