<?php

namespace App\Controller;

class MovieController
{
    public function showMoviePage()
    {
        require_once __DIR__ . '/../View/movie.php';
    }
    public function showMovieDetailPage($id, $slug)
    {
        require_once __DIR__ . '/../View/movieDetail.php';
    }
}