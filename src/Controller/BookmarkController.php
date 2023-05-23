<?php

namespace App\Controller;
use App\Model\BookmarkManager;
class BookmarkController
{
    public function getBookmarks($id)
    {
        if (isset($_SESSION['id']) && !empty(trim($id))){
            $bookmarkManager = new BookmarkManager();
            $bookmarks = $bookmarkManager->getBookmarkByMovie($_SESSION['id'], $id);
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
    public function addBookmark()
    {
        if (isset($_SESSION['id'])){
            $bookmarkManager = new BookmarkManager();
            $verfiyBookmark = $bookmarkManager->verifyBookmark($_SESSION['id'], $_POST['id_movie']);
            if ($verfiyBookmark) {
                // Supprimer le bookmark
                $bookmarkManager->deleteBookmark($_SESSION['id'], $_POST['id_movie']);
            } else {
                // Ajouter le bookmark
                $bookmarkManager->addBookmark($_SESSION['id'], $_POST['id_movie']);
            }
        } else {
            echo 'Vous devez être connecté pour ajouter un film à vos favoris';
        }
    }
}