<header>
    <div id="containerHeader">
        <nav class="flex justify-between px-4">
            <div>
                <ul class="flex space-x-4">
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/page1">Film</a></li>
                    <li><a href="/page2">Series</a></li>
                </ul>
            </div>
            <div>
                <?php if (isset($_SESSION['id'])) :?>
                    <div>
                        <button id="btnHeaderProfile" type="button">Deconnexion</button>
                        <button id="btnHeaderLogout" type="button">Deconnexion</button>
                    </div>
                <?php else :?>
                <div>
                    <button id="btnHeaderLoginRegister" type="button">Connexion</button>
                </div>
                <?php endif; ?>
            </div>
        </nav>
    </div>
</header>


