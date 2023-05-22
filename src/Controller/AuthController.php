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
    public function register()
    {
        $email = $this->verifyField('email');
        $login = $this->verifyField('login');
        $password = $this->verifyField('password');
        $confirmPassword = $this->verifyField('passwordConfirm');
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
            $userManager = new UserManager();
            if ($userManager->verifyEmail($email)) {
                $errors['email'] = 'Cet email est déjà utilisé';
            }
            if ($userManager->verifyLogin($login)) {
                $errors['login'] = 'Ce login est déjà utilisé';
            }
            if (empty($errors)) {
                $userManager->register($email, $login, $password);
                $id_user = $userManager->getUserByLogin($login);
                $id = $id_user;
                $firstLetter = strtoupper(substr($login, 0, 1));
                $backgroundColor = sprintf('#%06X', mt_rand(0, 0xFFFFFF)); // Générer une couleur d'arrière-plan aléatoire
                $avatar = $this->generateAvatarImage($firstLetter, $backgroundColor, $login);
                $randomString = bin2hex(random_bytes(3)); // Génère une chaîne hexadécimale de 6 caractères
                $avatarName = $randomString . '-' . $login . '.png';
                $userManager->addAvatar($avatarName, $id);
                $errors['success'] = 'Votre compte a bien été créé';
            }
        }
        header("Content-Type: application/json");
        echo json_encode($errors);
        exit();
    }
    public function login()
    {
        $email = $this->verifyField('email');
        $password = $this->verifyField('password');
        $errors = [];
        if (!$email) {
            $errors['email'] = 'Le champ email / Login  est requis';
        }
        if (!$password) {
            $errors['password'] = 'Le champ mot de passe est requis';
        }
        if (count($errors) === 0) {
            $userManager = new UserManager();
            $login = $userManager->login(htmlspecialchars($email), htmlspecialchars($password));
            if ($login === false) {
                $errors['error'] = 'L\'email / login ou le mot de passe est incorrect';
            } else {
                $_SESSION['id'] = $login['id'];
                $_SESSION['login'] = $login['login'];
                $_SESSION['email'] = $login['email'];
                $errors['success'] = 'Vous êtes connecté';
            }
        }
        header('Content-Type: application/json');
        echo json_encode($errors);
        exit();
    }
    public function profilHeader()
    {
        if (isset($_SESSION['id'])) {
            $userManager = new UserManager();
            $user = $userManager->getUserById($_SESSION['id']);
            echo json_encode($user);
        } else {
            header('Location: /');
        }
    }
    private function generateAvatarImage($text, $backgroundColor, $login)
    {
        $canvasWidth = 200;
        $canvasHeight = 200;

        $canvas = imagecreatetruecolor($canvasWidth, $canvasHeight);

        // Convertir la couleur d'arrière-plan en composantes RGB
        $backgroundR = hexdec(substr($backgroundColor, 1, 2));
        $backgroundG = hexdec(substr($backgroundColor, 3, 2));
        $backgroundB = hexdec(substr($backgroundColor, 5, 2));

        // Remplir le canvas avec la couleur d'arrière-plan
        $backgroundColor = imagecolorallocate($canvas, $backgroundR, $backgroundG, $backgroundB);
        imagefill($canvas, 0, 0, $backgroundColor);

        // Définir la couleur du texte
        $foregroundColor = imagecolorallocate($canvas, 255, 255, 255); // Blanc

        // Centrer le texte dans le canvas
        $fontSize = 100;
        $fontPath = 'public/font/Rajdhani-SemiBold.ttf'; // Chemin vers le dossier des polices de caractères
        $textBoundingBox = imageftbbox($fontSize, 0, $fontPath, $text);
        $textWidth = $textBoundingBox[2] - $textBoundingBox[0];
        $textHeight = $textBoundingBox[1] - $textBoundingBox[7];
        $textX = ($canvasWidth - $textWidth) / 2;
        $textY = ($canvasHeight - $textHeight) / 2 + $textHeight;
        $fontSize = intval($fontSize);
        // Dessiner le texte sur le canvas avec la police de caractères par défaut
        imagefttext($canvas, $fontSize, 0, $textX, $textY, $foregroundColor, $fontPath, $text);

        // Enregistrer l'image dans un fichier PNG
        $filename = 'public/images/avatars/' . $login . '.png'; // Chemin vers le dossier et nom du fichier d'avatar
        imagepng($canvas, $filename);
        imagedestroy($canvas);

        return $filename;
    }


    public function isLogged()
    {
        if (isset($_SESSION['id'])) {
            echo json_encode(['isLogged' => true, 'id' => $_SESSION['id']]);
        } else {
            echo json_encode(false);
        }
    }
    public function logout()
    {
        session_destroy();
        header('Location: http://' . $_SERVER['HTTP_HOST'] . '/cinetech/');
    }
}