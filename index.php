<?php
session_start();
require './vendor/autoload.php';
if (is_dir('./src/controller')) {
    echo 'oui';
} else {
    echo 'non';
}
use App\Controller\AuthController;

$authController = new AuthController();
$router = new AltoRouter();

$router->setBasePath('/cinetech');

$router->map('GET', '/', function() {
    echo 'Hello World';
});
$router->map('GET', '/login', function() use ($authController) {
    $authController->login();
}, 'login');
$router->map('GET', '/about[/]', function() {
    echo 'About';
});


$match = $router->match();

if( $match && is_callable( $match['target'] ) ) {
    require_once './elements/header.php';
    call_user_func_array( $match['target'], $match['params'] );
    require_once './elements/footer.php';
} else {
    // no route was matched
    http_response_code(404);
    ?>
    <h1 class="text-center font-bold">404 Page Not Found</h1>
    <?php
}
?>

