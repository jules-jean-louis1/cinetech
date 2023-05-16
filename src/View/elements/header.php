<header class="bg-[#1f0c19] text-white">
    <div id="containerHeader" class="py-3">
        <nav class="flex justify-between px-4">
            <div>
                <ul class="flex space-x-4">
                    <li><a href="/">Accueil</a></li>
                    <li><a href="<?php __DIR__?>./movie">Film</a></li>
                    <li><a href="/page2">Series</a></li>
                </ul>
            </div>
            <div>
                <?php if (isset($_SESSION['id'])) :?>
                    <div class="relative">
                        <button id="btnHeaderProfile" type="button" class="bg-[#fffe3e] text-black rounded-lg px-2">Profil</button>
                        <ul id="menuProfilHeader" class="absolute right-0 w-36 mt-0.5  bg-[#1C1F26] rounded-lg border-[1px] border-[#a8b3cf33] shadow-lg z-10 hidden">
                            <li>
                                <button id="btnHeaderProfile" type="button" class="bg-[#fffe3e] text-black rounded-lg px-2">
                                    Profil
                                </button>
                            </li>
                            <li>
                                <button id="btnHeaderLogou" type="button" class="bg-[#fffe3e] text-black rounded-lg px-2">
                                    Deconnexion
                                </button>
                            </li>
                        </ul>
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


