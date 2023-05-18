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
    public function addReplyComment(string $content, int $parent_comment_id,int $id_movie, int $id_user)
    {
        $bdd = $this->getBdd();
        $sql = "INSERT INTO comments (content, created_at, utilisateur_id, movie_id, parent_comment_id) VALUES (:content, NOW(), :id_user, :id_movie, :parent_comment_id)";
        $query = $bdd->prepare($sql);
        $query->execute([
            'content' => $content,
            'id_user' => $id_user,
            'id_movie' => $id_movie,
            'parent_comment_id' => $parent_comment_id
        ]);
    }
    public function getComment(int $id_movie)
    {
        $bdd = $this->getBdd();
        $sql = "SELECT comments.*, utilisateurs.login, utilisateurs.id 
                FROM comments 
                INNER JOIN utilisateurs ON comments.utilisateur_id = utilisateurs.id WHERE movie_id = :id_movie";
        $query = $bdd->prepare($sql);
        $query->execute([
            'id_movie' => $id_movie
        ]);
        $comments = $query->fetchAll(\PDO::FETCH_ASSOC);
        return $comments;
    }
}