<?php if (!empty($comments)) : ?>
    <?php foreach ($comments as $comment) : ?>
        <div class="comment">
            <p><?php echo $comment['content']; ?></p>
            <!-- Autres informations sur le commentaire -->
        </div>
    <?php endforeach; ?>
<?php else : ?>
    <p>Aucun commentaire pour ce film.</p>
<?php endif; ?>
