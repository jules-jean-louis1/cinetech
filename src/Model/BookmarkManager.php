<?php

namespace App\Model;

class BookmarkManager extends AbstractDatabase
{
    public function verifyBookmark(int $id_user, int $id_movie) : bool
    {
        $bdd = $this->getBdd();
        $sql = "SELECT COUNT(id) FROM bookmark WHERE id_user = :id_user AND id_movie = :id_movie";
        $query = $bdd->prepare($sql);
        $query->execute([
            'id_user' => $id_user,
            'id_movie' => $id_movie
        ]);
        $bookmark = $query->fetch(\PDO::FETCH_ASSOC);
        if ($bookmark['COUNT(id)'] > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function addBookmark(int $id_user, int $id_movie)
    {
        $sql = "INSERT INTO bookmark (id_user, movie_id, created_at) VALUES (:id_user, :id_movie)";
        $this->pdo->prepare($sql)->execute([
            'id_user' => $id_user,
            'id_movie' => $id_movie,
        ]);
    }
    public function deleteBookmark(int $id_user, int $id_movie)
    {
        $sql = "DELETE FROM bookmark WHERE id_user = :id_user AND movie_id = :id_movie";
        $this->pdo->prepare($sql)->execute([
            'id_user' => $id_user,
            'id_movie' => $id_movie,
        ]);
    }
    public function getBookmarkByMovie(int $id_user, int $id_movie)
    {
        $bdd = $this->getBdd();
        $query = $bdd->prepare('SELECT COUNT(id) FROM bookmark WHERE utilisateurs_id = :id_user AND movie_id = :id_movie');
        $query->execute([
            'id_user' => $id_user,
            'id_movie' => $id_movie
        ]);
        $bookmark = $query->fetch(\PDO::FETCH_ASSOC);
        if ($bookmark['COUNT(id)'] > 0) {
            return true;
        } else {
            return false;
        }
    }
}