<?php
session_start();
require './vendor/autoload.php';

use App\Controller\{
    AuthController,
    HomeController,
    MovieController,
};

$authController = new AuthController();
$homeController = new HomeController();
$movieController = new MovieController();
$router = new AltoRouter();

$router->setBasePath('/cinetech');

$router->map('GET', '/', function() use ($homeController) {
    $homeController->showHome();
}, 'home');
$router->map('GET', '/login', function() use ($authController) {
    $authController->showLoginForm();
}, 'login');
$router->map('POST', '/login/submit', function() use ($authController) {
    $authController->login();
}, 'login_post');
$router->map('GET', '/register', function() use ($authController) {
    $authController->showRegisterForm();
}, 'register');
$router->map('POST', '/register/submit', function() use ($authController) {
    $authController->register();
}, 'register_post');
$router->map('GET', '/profilHeader', function() use ($authController) {
    $authController->profilHeader();
});
// Page Film
$router->map('GET', '/movie', function() use ($movieController) {
    $movieController->showMoviePage();
}, 'movie');

// Page Film Details
$router->map('GET', '/movie/[i:id]', function() {

}, 'film_details');


$match = $router->match();

if( $match && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] );
} else {
    // no route was matched
    http_response_code(404);
    ?>
    <h1 class="text-center font-bold">404 Page Not Found</h1>
    <?php
}
?>

