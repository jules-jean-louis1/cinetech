<?php

namespace App\Controller;

class ProfilController extends AbstractController
{
    public function showProfil()
    {
        require_once __DIR__ . '/../View/profil.php';
    }
}