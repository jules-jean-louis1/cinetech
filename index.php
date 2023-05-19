<?php
session_start();
require './vendor/autoload.php';

use App\Controller\{
    AuthController,
    HomeController,
    MovieController,
    CommentController
};

$authController = new AuthController();
$homeController = new HomeController();
$movieController = new MovieController();
$commentController = new CommentController();
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
$router->map('GET', '/movie/[i:id]-[*:slug]', function($id, $slug) use ($movieController) {
    $movieController->showMovieDetailPage($id, $slug);
}, 'movie_details');

// Page Serie

// Page Serie Details

// Page Profil
$router->map('GET', '/profil', function() use ($authController) {
    $authController->showProfil();
}, 'profil');
// isLogged
$router->map('GET', '/isLogged', function() use ($authController) {
    $authController->isLogged();
});
// Add Comment
$router->map('POST', '/addComment', function() use ($commentController) {
    $commentController->addComment();
});
// Add Reply of original comment
$router->map('POST', '/addReplyComment/[i:id]', function($id) use ($commentController) {
    $commentController->addReplyToComment($id);
});
// Edit Comment
$router->map('POST', '/editComment/[i:id]', function($id) use ($commentController) {
    $commentController->editComment($id);
});
// Delete Comment
$router->map('POST', '/deleteComment/[i:id]', function($id) use ($commentController) {
    $commentController->deleteComment($id);
});
// Get Comment
$router->map('GET', '/getComment/[i:id]', function($id) use ($commentController) {
    $commentController->getComment($id);
});
// Logout
$router->map('GET', '/logout', function() use ($authController) {
    $authController->logout();
}, 'logout');



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

