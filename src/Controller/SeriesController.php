<?php

namespace App\Controller;

class SeriesController
{
    public function showSeriesPage()
    {
        require_once __DIR__ . '/../View/series.php';
    }
    public function showSeriesDetailPage($id, $slug)
    {
        require_once __DIR__ . '/../View/seriesDetail.php';
    }
}