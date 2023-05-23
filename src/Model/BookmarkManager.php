<?php

namespace App\Model;

class BookmarkManager extends AbstractDatabase
{
    public function addBookmark(int $id_user, int $id_movie, string $type)
    {
        $bdd = $this->getBdd();
        $query = $bdd->prepare('INSERT INTO bookmark (type, utilisateurs_id, movie_id, created_at) VALUES (:type_movie, :id_user, :id_movie, NOW())');
        $query->execute([
            'type_movie' => $type,
            'id_user' => $id_user,
            'id_movie' => $id_movie
        ]);
    }
    public function deleteBookmark(int $id_user, int $id_movie)
    {
        $bdd = $this->getBdd();
        $query = $bdd->prepare('DELETE FROM bookmark WHERE utilisateurs_id = :id_user AND movie_id = :id_movie');
        $query->execute([
            'id_user' => $id_user,
            'id_movie' => $id_movie
        ]);
    }
    public function verifyBookmark(int $id_user, int $id_movie)
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
    // Manage Bookmark of the user
    public function getLast6(int $id_user)
    {
        $bdd = $this->getBdd();
        $query = $bdd->prepare("SELECT * FROM bookmark WHERE utilisateurs_id = :id_user ORDER BY created_at DESC LIMIT 6");
        $query->execute([
            'id_user' => $id_user
        ]);
        $bookmarks = $query->fetchAll(\PDO::FETCH_ASSOC);
        return $bookmarks;
    }

    public function getAllBookmarks(int $id)
    {
        $bdd = $this->getBdd();
        $query = $bdd->prepare("SELECT * FROM bookmark WHERE utilisateurs_id = :id_user ORDER BY created_at DESC");
        $query->execute([
            'id_user' => $id
        ]);
        $bookmarks = $query->fetchAll(\PDO::FETCH_ASSOC);
        return $bookmarks;
    }
}