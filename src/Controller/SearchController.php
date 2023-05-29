<?php

namespace App\Controller;

class SearchController
{

    public function showSearchPage()
    {
        require_once __DIR__ . '/../View/search.php';
    }
    public function showActorPage()
    {
        require_once __DIR__ . '/../View/actor.php';
    }
}