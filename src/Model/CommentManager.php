<?php

namespace App\Model;

class CommentManager extends AbstractDatabase
{
    public function addComment(string $title, string $content, int $id_movie, int $id_user)
    {
        $bdd = $this->getBdd();
        $sql = "INSERT INTO comments (title_comment, content, created_at, utilisateur_id, movie_id) VALUES (:title, :content, NOW(), :id_user, :id_movie)";
        $query = $bdd->prepare($sql);
        $query->execute([
            'title' => $title,
            'content' => $content,
            'id_user' => $id_user,
            'id_movie' => $id_movie
        ]);
    }
    public function addReplyComment(int $parent_id, string $content,int $id_user, int $id_movie)
    {
        $bdd = $this->getBdd();
        $sql = "INSERT INTO comments (parent_id, content, created_at, utilisateur_id, movie_id) VALUES (:parent_id, :content, NOW(), :id_user, :id_movie)";
        $query = $bdd->prepare($sql);
        $query->execute([
            'parent_id' => $parent_id,
            'content' => $content,
            'id_user' => $id_user,
            'id_movie' => $id_movie
        ]);
    }
    public function getComment(int $id_movie)
    {
        $bdd = $this->getBdd();
        $sql = "SELECT comments.*, utilisateurs.login
        FROM comments 
        LEFT JOIN utilisateurs ON comments.utilisateur_id = utilisateurs.id 
        WHERE movie_id = :id_movie";
        $query = $bdd->prepare($sql);
        $query->execute([
            'id_movie' => $id_movie
        ]);
        $comments = $query->fetchAll(\PDO::FETCH_ASSOC);
        return $comments;
    }
}