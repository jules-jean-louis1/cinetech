<?php if (!empty($comments)) : ?>
<?php //var_dump($comments); ?>
    <?php foreach ($comments as $comment) : ?>
        <div id="comment" class="p-2 bg-slate-100">
            <div id="commentHeader" class="flex justify-between">
                <p><?php echo $comment['login']; ?></p>
                <p><?php echo $comment['created_at']; ?></p>
            </div>
            <div class="">
                <p><?php echo $comment['title_comment']; ?></p>
                <p><?php echo $comment['content']; ?></p>
            </div>
            <div id="callToActionComment">
                <?php if (isset($_SESSION['id']) && $_SESSION['id'] === $comment['utilisateur_id']) : ?>
                    <button class="btn btn-primary btn-sm" id="btnUpdateComment" data-id="<?php echo $comment['id']; ?>">Modifier</button>
                    <button class="btn btn-danger btn-sm" id="btnDeleteComment" data-id="<?php echo $comment['id']; ?>">Supprimer</button>
                <?php endif; ?>
            </div>
            <div id="containerReplyComment_<?= $comment['id']?>"></div>
        </div>
    <?php endforeach; ?>
<?php else : ?>
    <p>Aucun commentaire pour ce film.</p>
<?php endif; ?>
