<?php

namespace App\Controller;
use App\Model\CommentManager;
class CommentController extends AbstractController
{
    public function addComment()
    {
        $errors = [];
        if (isset($_SESSION['id'])) {
            $id_movie = $this->verifyField('id_movie');
            $title = $this->verifyField('title');
            $comment = $this->verifyField('comment');
            $id_user = $_SESSION['id'];

            if (!$id_movie) {
                $errors['id_movie'] = 'Le film n\'est pas valide';
            }
            if (!$title) {
                $errors['title'] = 'Le titre est requis';
            } elseif (strlen($title) < 3 && strlen($title) > 255) {
                $errors['title'] = 'Le titre doit contenir au moins 3 caractères';
            }
            if (!$comment) {
                $errors['comment'] = 'Le commentaire est requis';
            } elseif (strlen($comment) < 3) {
                $errors['comment'] = 'Le commentaire doit contenir au moins 3 caractères';
            }
            if (empty($errors)) {
                $commentManager = new CommentManager();
                $commentManager->addComment($title, $comment, $id_movie, $id_user);
                $errors['success'] = 'Votre commentaire a bien été ajouté';
            }
        } else {
            $errors['logout'] = 'Vous devez être connecté pour poster un commentaire';
        }
        header("Content-Type: application/json");
        echo json_encode($errors);
    }
    public function getComment($id_movie)
    {
        $commentManager = new CommentManager();
        $comments = $commentManager->getComment($id_movie);

        require __DIR__ . '/../View/fetch/displayComment.php';
    }
}