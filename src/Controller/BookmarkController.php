<?php

namespace App\Controller;
use App\Model\BookmarkManager;
class BookmarkController
{
    public function getBookmarks($id)
    {
        if (isset($_SESSION['id']) && !empty(trim($id))){
            $bookmarkManager = new BookmarkManager();
            $bookmarks = $bookmarkManager->verifyBookmark($_SESSION['id'], $id);
            if ($bookmarks) {
                header("Content-Type: application/json");
                echo json_encode(true);
            } else {
                header("Content-Type: application/json");
                echo json_encode(false);
            }
        } else {
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Vous devez être connecté pour ajouter un film à vos favoris']);
        }
    }
    public function addBookmark(int $id, string $type)
    {
        if (isset($_SESSION['id']) && !empty(trim($id)) && !empty(trim($type))) {
            $bookmarkManager = new BookmarkManager();
            $bookmark = $bookmarkManager->verifyBookmark($_SESSION['id'], $id);
            if (!$bookmark) {
                $bookmarkManager->addBookmark($_SESSION['id'], $id, $type);
                header("Content-Type: application/json");
                echo json_encode(['success' => 'Le film a bien été ajouté à vos favoris']);
            }
        } else {
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Vous devez être connecté pour ajouter un film à vos favoris']);
        }
    }
    public function removeBookmark(int $id)
    {
        if (isset($_SESSION['id']) && !empty(trim($id))) {
            $bookmarkManager = new BookmarkManager();
            $bookmark = $bookmarkManager->verifyBookmark($_SESSION['id'], $id);
            if ($bookmark) {
                $bookmarkManager->deleteBookmark($_SESSION['id'], $id);
                header("Content-Type: application/json");
                echo json_encode(['success' => 'Le film a bien été supprimé de vos favoris']);
            }
        } else {
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Vous devez être connecté pour supprimer un film de vos favoris']);
        }
    }

    public function getAllBookmarks()
    {
        if (isset($_SESSION['id'])) {
            $bookmarkManager = new BookmarkManager();
            $bookmarks = $bookmarkManager->getAllBookmarks($_SESSION['id']);
            header("Content-Type: application/json");
            echo json_encode($bookmarks);
        } else {
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Vous devez être connecté pour voir vos favoris']);
        }
    }

    public function editBookmark(int $id)
    {
        if (isset($_SESSION['id']) && !empty(trim($id)) && !empty(trim($_POST['status'])) && !empty(trim($_POST['movie_form']))) {
            $bookmarkManager = new BookmarkManager();
            $bookmark = $bookmarkManager->verifyBookmark($_SESSION['id'], htmlspecialchars($_POST['movie_form']));
            if ($bookmark) {
                $bookmarkManager->editBookmark($_SESSION['id'], $id, $_POST['status']);
                header("Content-Type: application/json");
                echo json_encode(['success' => 'Le film a bien été modifié']);
            }
        } else {
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Vous devez être connecté pour modifier un film de vos favoris']);
        }
    }

    public function deleteBookmark($id)
    {
        if (isset($_SESSION['id']) && !empty(trim($id))) {
            $bookmarkManager = new BookmarkManager();
            $bookmark = $bookmarkManager->ExistBookmark($_SESSION['id'], $id);
            if ($bookmark) {
                $bookmarkManager->supprBookmark($_SESSION['id'], $id);
                header("Content-Type: application/json");
                echo json_encode(['success' => 'Le film a bien été supprimé de vos favoris']);
            }
        } else {
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Vous devez être connecté pour supprimer un film de vos favoris']);
        }
    }

    public function getBookmarksTV()
    {
        if (isset($_SESSION['id'])) {
            $bookmarkManager = new BookmarkManager();
            $bookmarks = $bookmarkManager->getAllBookmarksTV($_SESSION['id']);
            header("Content-Type: application/json");
            echo json_encode($bookmarks);
        } else {
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Vous devez être connecté pour voir vos favoris']);
        }
    }

    public function addBookmarkTV($id)
    {
        if (isset($_SESSION['id'])){
            $bookmarkManager = new BookmarkManager();
            if (!empty(trim($id))) {
                $bookmark = $bookmarkManager->verifyBookmark($_SESSION['id'], $id);
                if (!$bookmark) {
                    $bookmarkManager->addBookmarkTV($_SESSION['id'], $id);
                    header("Content-Type: application/json");
                    echo json_encode(['success' => 'La série a bien été ajoutée à vos favoris']);
                } else {
                    header("Content-Type: application/json");
                    echo json_encode(['error' => 'La série est déjà dans vos favoris']);
                }
            }
        } else {
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Vous devez être connecté pour ajouter un film à vos favoris']);
        }
    }

    public function removeBookmarkTV($id)
    {
        if (isset($_SESSION['id']) && !empty(trim($id))) {
            $bookmarkManager = new BookmarkManager();
            $bookmark = $bookmarkManager->verifyBookmark($_SESSION['id'], $id);
            if ($bookmark) {
                $bookmarkManager->deleteBookmark($_SESSION['id'], $id);
                header("Content-Type: application/json");
                echo json_encode(['success' => 'La série a bien été supprimée de vos favoris']);
            }
        } else {
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Vous devez être connecté pour supprimer une série de vos favoris']);
        }
    }

    public function getBookmarksMovies()
    {
        if (isset($_SESSION['id'])) {
            $bookmarkManager = new BookmarkManager();
            $bookmarks = $bookmarkManager->getAllBookmarksMovie(htmlspecialchars($_SESSION['id']));
            header("Content-Type: application/json");
            echo json_encode($bookmarks);
        } else {
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Vous devez être connecté pour voir vos favoris']);
        }
    }

}