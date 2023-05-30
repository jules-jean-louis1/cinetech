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
            $nom = $this->verifyField('lastname');
            $prenom = $this->verifyField('firstname');
            // Get User Info
            $userManager = new UserManager();
            $user = $userManager->infoUser($_SESSION['id']);
            $bddEmail = $user['email'];
            $bddLogin = $user['login'];
            $bddNom = $user['nom'];
            $bddPrenom = $user['prenom'];
            // Check if fields are empty
            if ($email === $bddEmail || $login === $bddLogin || $nom === $bddNom || $prenom === $bddPrenom) {
                $errors['empty'] = 'Aucune modification n\'a été effectuée';
            } else {
                // Check if fields are valid
                if ($email !== $bddEmail) {
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
                        $errors['success'] = 'Votre email a bien été modifié';
                    }
                }
                if ($login !== $bddLogin) {
                    $errors['login'] = 'Le login est requis';
                } elseif (strlen($login) > 255) {
                    $errors['login'] = 'Le login est trop long';
                } elseif (strlen($login) < 3) {
                    $errors['login'] = 'Le login est trop court';
                } elseif ($login !== $_SESSION['login']) {
                    $userManager = new UserManager();
                    if ($userManager->verifyLogin($login)) {
                        $errors['login'] = 'Ce login est déjà utilisé';
                    } else {
                        $userManager->updateField('login', $login, $_SESSION['id']);
                        $_SESSION['login'] = $login;
                        $errors['success'] = 'Votre login a bien été modifié';
                    }
                }
                if ($password) {
                    if ($confirmPassword) {
                        if (strlen($password) < 8) {
                            $errors['password'] = 'Le mot de passe doit contenir au moins 8 caractères';
                        } elseif ($password !== $confirmPassword) {
                            $errors['confirmPassword'] = 'La confirmation du mot de passe ne correspond pas';
                        } else {
                            $userManager = new UserManager();
                            $userManager->updateField('password', password_hash($password, PASSWORD_DEFAULT), $_SESSION['id']);
                            $errors['success'] = 'Votre mot de passe a bien été modifié';
                        }
                    } else {
                        $errors['confirmPassword'] = 'La confirmation du mot de passe est requise';
                    }
                }
                if ($nom !== $bddNom) {
                    if (strlen($nom) > 255) {
                        $errors['nom'] = 'Le nom est trop long';
                    } elseif (strlen($nom) < 2) {
                        $errors['nom'] = 'Le nom est trop court';
                    } else {
                        $userManager = new UserManager();
                        $userManager->updateField('nom', $nom, $_SESSION['id']);
                        $errors['success'] = 'Votre nom a bien été modifié';
                    }
                }
                if ($prenom !== $bddPrenom) {
                    if (strlen($prenom) > 255) {
                        $errors['prenom'] = 'Le prénom est trop long';
                    } elseif (strlen($prenom) < 2) {
                        $errors['prenom'] = 'Le prénom est trop court';
                    } else {
                        $userManager = new UserManager();
                        $userManager->updateField('prenom', $prenom, $_SESSION['id']);
                        $errors['success'] = 'Votre prénom a bien été modifié';
                    }
                }
            }
            header('Content-Type: application/json');
            echo json_encode($errors);
        }
    }
}