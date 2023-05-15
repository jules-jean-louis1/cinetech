<?php

namespace App\Controller;
use App\Model\UserManager;
class AuthController
{
    public function showLoginForm()
    {
        require_once __DIR__ . '/../View/login.php';
    }
    public function showRegisterForm()
    {
        require_once __DIR__ . '/../View/register.php';
    }
    public function verifyField($field)
    {
        if (isset($_POST[$field]) && !empty(trim($_POST[$field]))) {
            return $_POST[$field];
        } else {
            return false;
        }
    }
    public function register($email, $login, $password, $confirmPassword)
    {
        $email = $this->verifyField('email');
        $login = $this->verifyField('login');
        $password = $this->verifyField('password');
        $confirmPassword = $this->verifyField('confirmPassword');
        $errors = [];

        if (!$email) {
            $errors['email'] = 'L\'email est requis';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'L\'email n\'est pas valide';
        }
        if (!$login) {
            $errors['login'] = 'Le login est requis';
        } elseif (strlen($login) < 3) {
            $errors['login'] = 'Le login doit contenir au moins 3 caractères';
        }
        if (!$password) {
            $errors['password'] = 'Le mot de passe est requis';
        } elseif (strlen($password) < 8) {
            $errors['password'] = 'Le mot de passe doit contenir au moins 8 caractères';
        }
        if (!$confirmPassword) {
            $errors['confirmPassword'] = 'La confirmation du mot de passe est requise';
        } elseif ($password !== $confirmPassword) {
            $errors['confirmPassword'] = 'La confirmation du mot de passe ne correspond pas';
        }
        if (empty($errors)) {

        }
    }
}