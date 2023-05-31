<header class="bg-[#1f0c19] text-white">
    <div id="containerHeader" class="py-3">
        <nav class="flex justify-between items-center px-6">
            <div>
                <ul class="flex items-center space-x-4">
                    <li>
                        <a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/';?>">
                            <svg width="52" height="28" viewBox="0 0 84 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.03603 2.7134C0.536115 1.40411 1.50298 0 2.90446 0H13.6228C14.4521 0 15.1954 0.511825 15.4912 1.2866L24.464 24.7866C24.9639 26.0959 23.997 27.5 22.5955 27.5H12.5658C11.3218 27.5 10.2069 26.7323 9.76313 25.5701L1.03603 2.7134Z" fill="white"/>
                                <path d="M27.036 24.7866C26.5361 26.0959 27.503 27.5 28.9045 27.5H39.6228C40.4521 27.5 41.1954 26.9882 41.4912 26.2134L50.464 2.7134C50.9639 1.40411 49.997 0 48.5955 0L38.5658 0C37.3218 0 36.2069 0.767737 35.7631 1.9299L27.036 24.7866Z" fill="white"/>
                                <path d="M59.036 24.7866C58.5361 26.0959 59.503 27.5 60.9045 27.5H71.6228C72.4521 27.5 73.1954 26.9882 73.4912 26.2134L82.464 2.7134C82.9639 1.40411 81.997 0 80.5955 0L70.5658 0C69.3218 0 68.2069 0.767737 67.7631 1.9299L59.036 24.7866Z" fill="white"/>
                                <path d="M43.036 24.7866C42.5361 26.0959 43.503 27.5 44.9045 27.5H55.6228C56.4521 27.5 57.1954 26.9882 57.4912 26.2134L66.464 2.7134C66.9639 1.40411 65.997 0 64.5955 0L54.5658 0C53.3218 0 52.2069 0.767737 51.7631 1.9299L43.036 24.7866Z" fill="white"/>
                            </svg>
                        </a>
                    </li>
                    <li><a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/movie';?>" class="uppercase">Film</a></li>
                    <li><a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/series';?>" class="uppercase">Series</a></li>
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
                <div id="containerResultSearch" class="absolute bg-[#362431] mt-8 rounded-lg shadow-lg xl:w-[46.5vw] md:w-[44.5vw]">
                    <ul id="displayResultSearch" class="z-10"></ul>
                </div>
            </div>
            <div>
                <?php if (isset($_SESSION['id'])) :?>
                    <div class="relative">
                        <button id="btnHeaderProfile" type="button" class="bg-[#9c4ef4] hover:bg-[#8241cc] text-white rounded-lg px-2 py-1">Profil</button>
                        <ul id="menuProfilHeader" class="absolute right-0 w-36 mt-0.5  bg-[#9c4ef4] rounded-lg border-[1px] border-[#a8b3cf33] shadow-lg z-10 hidden ">
                            <li>
                                <button id="btnHeaderProfile" type="button" class="bg-[#9c4ef4] hover:bg-[#8241cc] text-white rounded-lg px-2 w-full">
                                    <a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/profil';?>" class="flex items-center justify-between">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
                                        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"/>
                                    </svg>
                                    Profil
                                    </a>
                                </button>
                            </li>
                            <li>
                                <button id="btnHeaderLogou" type="button" class="bg-[#9c4ef4] hover:bg-[#8241cc] text-white px-2 w-full">
                                    <a href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/cinetech/logout';?>" class="flex items-center justify-between">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/>
                                            <path d="M9 12h12l-3 -3"/>
                                            <path d="M18 15l3 -3"/>
                                        </svg>
                                        Deconnexion
                                    </a>
                                </button>
                            </li>
                        </ul>
                    </div>
                <?php else :?>
                <div>
                    <button id="btnHeaderLoginRegister" type="button" class="bg-[#9c4ef4] hover:bg-[#8241cc] text-white rounded-lg px-2 py-1">Connexion</button>
                </div>
                <?php endif; ?>
            </div>
        </nav>
    </div>
</header>


