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
    public function getUserInfo()
    {
        if (isset($_SESSION['id'])) {
            $userManager = new UserManager();
            $user = $userManager->infoUser($_SESSION['id']);
            echo json_encode($user);
        } else {
            header('Location: /');
        }
    }
    public function editProfil()
    {
        $errors = [];
        if (isset($_SESSION['id'])){
            $email = $this->verifyField('email');
            $login = $this->verifyField('login');
            $password = $this->verifyField('password');
            $confirmPassword = $this->verifyField('passwordConfirm');
            if (!$email) {
                $errors['email'] = 'L\'email est requis';
            } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors['email'] = 'L\'email n\'est pas valide';
            } elseif (strlen($email) > 255) {
                $errors['email'] = 'L\'email est trop long';
            } elseif (strlen($email) < 3) {
                $errors['email'] = 'L\'email est trop court';
            } elseif ($email !== $_SESSION['email']) {
                $userManager = new UserManager();
                if ($userManager->verifyEmail($email)) {
                    $errors['email'] = 'Cet email est déjà utilisé';
                } else {
                    $userManager->updateField('email', $email, $_SESSION['id']);
                    $_SESSION['email'] = $email;
                }
            }

        }
    }
}