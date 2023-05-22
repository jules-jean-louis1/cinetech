<?php

namespace App\Controller;
use App\Model\BookmarkManager;
class BookmarkController
{
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