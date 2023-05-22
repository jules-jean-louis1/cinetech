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
    public function addReplyToComment()
    {
        $errors =[];
        if (isset($_SESSION['id'])) {
            $id_movie = $this->verifyField('id_movie');
            $parent_id = $this->verifyField('parent_comment');
            $content = $this->verifyField('content');
            $id_user = $_SESSION['id'];
            if (!$id_movie) {
                $errors['id_movie'] = 'Le film n\'est pas valide';
            }
            if (!$parent_id) {
                $errors['parent_id'] = 'Le commentaire parent n\'est pas valide';
            }
            if (!$content) {
                $errors['content'] = 'Le commentaire est requis';
            } elseif (strlen($content) < 3) {
                $errors['content'] = 'Le commentaire doit contenir au moins 3 caractères';
            }
            if (empty($errors)) {
                $commentManager = new CommentManager();
                $commentManager->addReplyComment($parent_id, $content, $id_user, $id_movie);
                $errors['success'] = 'Votre commentaire a bien été ajouté';
            } else {
                $errors['fail'] = 'Votre commentaire n\'a pas été ajouté';
            }
        } else {
            $errors['logout'] = 'Vous devez être connecté pour poster un commentaire';
        }
        header("Content-Type: application/json");
        echo json_encode($errors);
    }
    public function editComment()
    {
        $errors = [];
        if (isset($_SESSION['id'])) {
            $id_comment = $this->verifyField('id_comment');
            $comment = $this->verifyField('comment');
            $id_user = $_SESSION['id'];
            if (!$id_comment) {
                $errors['id_comment'] = 'Le commentaire n\'est pas valide';
            }
            if (!$comment) {
                $errors['comment'] = 'Le commentaire est requis';
            } elseif (strlen($comment) < 3) {
                $errors['comment'] = 'Le commentaire doit contenir au moins 3 caractères';
            }
            if (empty($errors)) {
                $commentManager = new CommentManager();
                $commentManager->editComment($comment, $id_comment);
                $errors['success'] = 'Votre commentaire a bien été modifié';
            }
        } else {
            $errors['logout'] = 'Vous devez être connecté pour modifier un commentaire';
        }
        header("Content-Type: application/json");
        echo json_encode($errors);
    }
    public function deleteComment()
    {
        $errors = [];
        if (isset($_SESSION['id'])) {
            $id_comment = $this->verifyField('id_comment');
            $commentManager = new CommentManager();
            $verify = $commentManager->verifyIfCommentAsReply($id_comment);
            if ($verify) {
                $editContent = '<i>Commentaire supprimé</i>';
                $update = $commentManager->editComment($editContent, $id_comment);
                $errors['success'] = 'Votre commentaire a bien été supprimé';
            } else {
                $commentManager->deleteComment($id_comment);
                $errors['success'] = 'Votre commentaire a bien été supprimé';
            }
        } else {
            $errors['logout'] = 'Vous devez être connecté pour supprimer un commentaire';
        }
        header("Content-Type: application/json");
        echo json_encode($errors);
    }
    public function getComment(int $id_movie)
    {
        $commentManager = new CommentManager();
        $commentsData = $commentManager->getComment($id_movie);
        if (empty($commentsData)) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'errors', 'data' => 'Aucun commentaire pour ce film']);
        } else {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'success', 'comments' => $commentsData]);
        }
    }
}