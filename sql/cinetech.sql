-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 03 juin 2023 à 10:43
-- Version du serveur : 5.7.36
-- Version de PHP : 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cinetech`
--

-- --------------------------------------------------------

--
-- Structure de la table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
CREATE TABLE IF NOT EXISTS `bookmark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `utilisateurs_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `bookmark`
--

INSERT INTO `bookmark` (`id`, `type`, `status`, `utilisateurs_id`, `movie_id`, `created_at`, `update_at`) VALUES
(2, 'movie', 2, 9, 713704, '2023-05-23 13:26:29', NULL),
(3, 'movie', 1, 9, 502356, '2023-05-23 13:31:37', NULL),
(19, 'movie', 0, 2, 713704, '2023-05-31 14:23:01', NULL),
(17, 'movie', 0, 9, 764, '2023-05-27 13:26:52', NULL),
(6, 'movie', 0, 9, 758323, '2023-05-23 13:40:26', NULL),
(7, 'movie', 1, 9, 842675, '2023-05-23 13:50:04', NULL),
(8, 'tv', 0, 9, 1396, '2023-05-23 12:56:27', '2023-05-23 12:56:27'),
(12, 'tv', 0, 9, 36361, '2023-05-25 11:21:13', NULL),
(13, 'tv', 0, 9, 101463, '2023-05-25 11:25:49', NULL),
(24, 'movie', 0, 2, 385687, '2023-05-31 20:06:04', NULL),
(21, 'movie', 0, 2, 502356, '2023-05-31 19:54:31', NULL),
(25, 'movie', 0, 2, 447277, '2023-05-31 20:06:51', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `title_comment` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `like_comments` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `parent_id`, `title_comment`, `content`, `like_comments`, `created_at`, `update_at`, `utilisateur_id`, `movie_id`) VALUES
(1, NULL, '1er Comment test', 'Test', 0, '2023-05-17 13:56:28', NULL, 1, 713704),
(2, 1, NULL, 'Réponse une', 0, '2023-05-18 18:47:52', NULL, 1, 713704),
(3, 2, NULL, 'Reply a Réponse une', 0, '2023-05-19 10:16:39', NULL, 1, 713704),
(4, NULL, 'Lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 0, '2023-05-20 11:26:45', NULL, 2, 713704),
(5, 3, NULL, 'Non.', 0, '2023-05-20 11:32:26', NULL, 2, 713704),
(6, 2, NULL, 'Deux', 0, '2023-05-20 11:33:01', NULL, 2, 713704),
(7, NULL, 'C\'était sympa :)', 'Cool', 0, '2023-05-25 15:50:10', NULL, 9, 91363);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `login`, `email`, `password`, `avatar`, `nom`, `prenom`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', '$2y$10$.9fCBUshfipL5vM7vLWEo.DyqosQZJtmANAablW4OKo.wgaHjKswS', 'Admin.png', NULL, NULL, '2023-05-15 22:40:40', NULL),
(2, 'Jules', 'jules@gmail.com', '$2y$10$mG5x.WhV1Ug1KK4BSFsqxOaGNvKBJLBBCc.bLftwZSgI5BktTrVOa', 'Jules.png', NULL, NULL, '2023-05-20 11:17:17', NULL),
(6, 'Toto', 'toto@gmail.com', '$2y$10$zB5ryMbFnZjFS92Eh2TPsO6/dUjCOY4Kh.ml5mMo5pYBfwrh3w1bu', 'Toto.png', NULL, NULL, '2023-05-22 10:46:46', NULL),
(7, 'Tata', 'tata@gmail.com', '$2y$10$K1L0VvwtunJfNQX8T8TuKeUBkTjCwrGIo8nhhIxbSZKnOMnUaL4Jq', 'Tata.png', NULL, NULL, '2023-05-22 10:56:18', NULL),
(8, 'Lion', 'lionlion@gmail.com', '$2y$10$4/XQfRVLM0piIdgKGdwnjOCEO15XQ/AkQj4yok7lBfjldUL9Q8382', '9d319d-Lion.png', NULL, NULL, '2023-05-22 11:30:30', NULL),
(9, 'Acerola', 'acerola@gmail.com', '$2y$10$HUfCpfP5/H/KYpYQaWoR2ue5hhyQA0arCs4qzS5Ucyup8mg1qmFhq', '9dc6bf-Acerola.png', 'Erolas', 'Ac', '2023-05-22 11:35:49', '2023-05-30 11:26:45'),
(10, 'W14', 'w14@gmail.com', '$2y$10$AjlfFE.u0mB5pxZ4u9NJne5QJQgqwrSM01CJm6tJhHkB.RyihVxU6', 'fc998e-W14.png', NULL, NULL, '2023-06-03 12:32:39', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
