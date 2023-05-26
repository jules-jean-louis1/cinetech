<header class="bg-[#1f0c19] text-white">
    <div id="containerHeader" class="py-3">
        <nav class="flex justify-between items-center px-4">
            <div>
                <ul class="flex space-x-4">
                    <li><a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/';?>">Accueil</a></li>
                    <li><a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/movie';?>">Film</a></li>
                    <li><a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/series';?>">Series</a></li>
                </ul>
            </div>
            <div class="flex flex-col w-1/2" id="containerSearchBar">
                <div id="background_color" class="bg-[#362431] px-2 py-1 rounded">
                    <form action="" method="post" id="searchBarHeader" class="flex items-center">
                        <input type="text" name="search" id="search" placeholder="Rechercher un film ou une serie"
                               class="rounded-lg px-2 py-1 bg-[#362431] w-full">
                        <div id="eraseSearches" class="hidden">
                            <button type="button" name="supprSearch" id="supprSearch">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M18 6l-12 12"/>
                                    <path d="M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <button type="submit" id="submitBtnSearch" class="bg-transparent px-2 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search"
                                 width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                 fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
                                <path d="M21 21l-6 -6"/>
                            </svg>
                        </button>
                    </form>
                </div>
                <div id="containerResultSearch" class="absolute bg-[#362431] mt-8 rounded-lg shadow-lg w-1/2">
                    <ul id="displayResultSearch"></ul>
                </div>
            </div>
            <div>
                <?php if (isset($_SESSION['id'])) :?>
                    <div class="relative">
                        <button id="btnHeaderProfile" type="button" class="bg-[#fffe3e] text-black rounded-lg px-2 py-1">Profil</button>
                        <ul id="menuProfilHeader" class="absolute right-0 w-36 mt-0.5  bg-[#1C1F26] rounded-lg border-[1px] border-[#a8b3cf33] shadow-lg z-10 hidden ">
                            <li>
                                <button id="btnHeaderProfile" type="button" class="bg-[#fffe3e] text-black rounded-lg px-2">
                                    Profil
                                </button>
                            </li>
                            <li>
                                <button id="btnHeaderLogou" type="button" class="bg-[#fffe3e] text-black rounded-lg px-2">
                                    <a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/logout';?>">
                                    Deconnexion
                                    </a>
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


