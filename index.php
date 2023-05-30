<?php
session_start();
require './vendor/autoload.php';

use App\Controller\{
    AuthController,
    HomeController,
    MovieController,
    SeriesController,
    CommentController,
    ProfilController,
    BookmarkController,
    SearchController,
};

$authController = new AuthController();
$homeController = new HomeController();
$movieController = new MovieController();
$seriesController = new SeriesController();
$commentController = new CommentController();
$profilController = new ProfilController();
$bookmarkController = new BookmarkController();
$searchController = new SearchController();
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
$router->map('GET', '/series', function() use ($seriesController) {
    $seriesController->showSeriesPage();
}, 'series');

// Page Serie Details
$router->map('GET', '/series/[i:id]-[*:slug]', function($id, $slug) use ($seriesController) {
    $seriesController->showSeriesDetailPage($id, $slug);
}, 'series_details');

// Page Profil
$router->map('GET', '/profil', function() use ($profilController) {
    $profilController->showProfil();
}, 'profil');
// Get user info
$router->map('GET', '/getUserProfil', function() use ($profilController) {
    $profilController->getUserInfo();
});
// Favorites of user
$router->map('GET', '/getLast6', function() use ($profilController) {
    $profilController->getLast6();
});
// All bookmarks of user
$router->map('GET', '/getAllBookmarks', function() use ($bookmarkController) {
    $bookmarkController->getAllBookmarks();
});
// Bookmarks TV Shows of user
$router->map('GET', '/getBookmarksTV', function() use ($bookmarkController) {
    $bookmarkController->getBookmarksTV();
});
// Add Bookmark TV Show
$router->map('GET', '/addBookmarkTV/[i:id]', function($id) use ($bookmarkController) {
    $bookmarkController->addBookmarkTV($id);
});
// Remove Bookmark TV Show
$router->map('GET', '/removeBookmarkTV/[i:id]', function($id) use ($bookmarkController) {
    $bookmarkController->removeBookmarkTV($id);
});
// Modification bookmark
$router->map('POST', '/editBookmark/[i:id]', function($id) use ($bookmarkController) {
    $bookmarkController->editBookmark($id);
});
// isLogged
$router->map('GET', '/isLogged', function() use ($authController) {
    $authController->isLogged();
});
// Gestions des commentaires
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
// Add Like
$router->map('POST', '/addLike/[i:id]', function($id) use ($commentController) {
    $commentController->addLike($id);
});
// Remove Like
$router->map('POST', '/removeLike/[i:id]', function($id) use ($commentController) {
    $commentController->removeLike($id);
});
// Add Dislike
$router->map('POST', '/addDislike/[i:id]', function($id) use ($commentController) {
    $commentController->addDislike($id);
});
// Remove Dislike
$router->map('POST', '/removeDislike/[i:id]', function($id) use ($commentController) {
    $commentController->removeDislike($id);
});


// Gestionnaires des favoris
// Get Favorite
$router->map('GET', '/getBookmarks/[i:id]', function($id) use ($bookmarkController) {
    $bookmarkController->getBookmarks($id);
});
// Add Favorite
$router->map('GET', '/addBookmarks/[i:id]/[a:type]', function($id, $type) use ($bookmarkController) {
    $bookmarkController->addBookmark($id, $type);
});
// Remove Favorite
$router->map('GET', '/removeBookmarks/[i:id]', function($id) use ($bookmarkController) {
    $bookmarkController->removeBookmark($id);
});
// Delete Favorite from profil
$router->map('DELETE', '/deleteBookmarks/[i:id]', function($id) use ($bookmarkController) {
    $bookmarkController->deleteBookmark($id);
});
// Logout
$router->map('GET', '/logout', function() use ($authController) {
    $authController->logout();
}, 'logout');

// Gestionnaire des recherches
// Page affichage des résultats de recherche
$router->map('GET', '/search', function() use ($searchController) {
    $searchController->showSearchPage();
}, 'search');
// Actor Page
$router->map('GET', '/actor/[i:id]-[*:slug]', function($id, $slug) use ($searchController) {
    $searchController->showActorPage($id, $slug);
}, 'actor');

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

