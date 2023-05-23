<?php

namespace App\Controller;
use App\Model\UserManager;
use App\Model\BookmarkManager;
class ProfilController extends AbstractController
{
    public function showProfil()
    {
        require_once __DIR__ . '/../View/profil.php';
    }
    public function getLast6()
    {
        $bookmarkManager = new BookmarkManager();
        $bookmarks = $bookmarkManager->getLast6($_SESSION['id']);
        return $bookmarks;
    }
}