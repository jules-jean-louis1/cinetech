<?php

namespace App\Controller;

class HomeController
{
    public function showHome()
    {
        require_once __DIR__ . '/../View/home.php';
    }
}