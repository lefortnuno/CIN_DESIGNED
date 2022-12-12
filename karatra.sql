-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 12, 2022 at 12:21 PM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `karatra`
--

-- --------------------------------------------------------

--
-- Table structure for table `arrondissement`
--

DROP TABLE IF EXISTS `arrondissement`;
CREATE TABLE IF NOT EXISTS `arrondissement` (
  `idArrondissement` int(11) NOT NULL AUTO_INCREMENT,
  `nomArrondissement` varchar(30) NOT NULL,
  PRIMARY KEY (`idArrondissement`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `arrondissement`
--

INSERT INTO `arrondissement` (`idArrondissement`, `nomArrondissement`) VALUES
(1, 'ville haute'),
(2, 'SASA'),
(4, 'ville basse'),
(7, 'VB'),
(8, 'VH'),
(10, 'ANDRAINJATO'),
(12, 'ANDRAINJATO ATSIMO ');

-- --------------------------------------------------------

--
-- Table structure for table `individu`
--

DROP TABLE IF EXISTS `individu`;
CREATE TABLE IF NOT EXISTS `individu` (
  `cin` varchar(12) NOT NULL,
  `nom` varchar(75) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `nomPere` varchar(150) NOT NULL,
  `nomMere` varchar(150) NOT NULL,
  `lieunais` varchar(100) NOT NULL,
  `datenais` date DEFAULT NULL,
  `domicile` varchar(100) NOT NULL,
  `cicatrice` varchar(50) DEFAULT NULL,
  `longueur` float NOT NULL,
  `datelivrance` date DEFAULT NULL,
  `imgFaceFM` varchar(250) NOT NULL,
  `imgDosFM` varchar(250) NOT NULL,
  `idOrigine` int(11) NOT NULL,
  `idArrondissement` int(11) NOT NULL,
  `idProfession` int(20) NOT NULL,
  PRIMARY KEY (`cin`),
  KEY `idOrigine` (`idOrigine`),
  KEY `idArrondissement` (`idArrondissement`),
  KEY `idProfession` (`idProfession`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `individu`
--

INSERT INTO `individu` (`cin`, `nom`, `prenom`, `nomPere`, `nomMere`, `lieunais`, `datenais`, `domicile`, `cicatrice`, `longueur`, `datelivrance`, `imgFaceFM`, `imgDosFM`, `idOrigine`, `idArrondissement`, `idProfession`) VALUES
('201011028460', 'LEFORT', 'Nomenjanahary Nuno', 'TROFEL', 'TROFEL', 'Toamasina', '2000-07-29', 'Rova lot206', 'Aucune', 1.75, '2022-12-08', '1670505562539-DSC_0101.JPG', '1670505562566-a60f95e6048a6076bc6ca88177633fab.jpg', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `origine`
--

DROP TABLE IF EXISTS `origine`;
CREATE TABLE IF NOT EXISTS `origine` (
  `idOrigine` int(11) NOT NULL AUTO_INCREMENT,
  `nomOrigine` varchar(30) NOT NULL,
  PRIMARY KEY (`idOrigine`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `origine`
--

INSERT INTO `origine` (`idOrigine`, `nomOrigine`) VALUES
(1, 'merina'),
(2, 'Betsileo'),
(3, 'yyyyy');

-- --------------------------------------------------------

--
-- Table structure for table `procedure_cin`
--

DROP TABLE IF EXISTS `procedure_cin`;
CREATE TABLE IF NOT EXISTS `procedure_cin` (
  `idProcedureCin` int(11) NOT NULL AUTO_INCREMENT,
  `approbation` varchar(4) DEFAULT 'OUI',
  `etatCin` varchar(15) NOT NULL,
  `dateProcedure` date NOT NULL,
  `numSeries` varchar(15) NOT NULL,
  `observation` varchar(200) DEFAULT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `cin` varchar(12) NOT NULL,
  PRIMARY KEY (`idProcedureCin`),
  KEY `idUtilisateur` (`idUtilisateur`),
  KEY `cin` (`cin`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `procedure_cin`
--

INSERT INTO `procedure_cin` (`idProcedureCin`, `approbation`, `etatCin`, `dateProcedure`, `numSeries`, `observation`, `idUtilisateur`, `cin`) VALUES
(1, 'OUI', 'PRIMA', '2022-08-07', '2568/B', NULL, 1, '201011028460'),
(2, 'oui', 'PRIMA', '2022-12-02', '9878/B', NULL, 1, '201011569989'),
(3, 'oui', 'PRIMA', '2022-12-02', '9878/B', NULL, 1, '201011125020'),
(4, 'oui', 'PRIMA', '2022-12-02', '12827/B', NULL, 1, '201011028467'),
(5, 'oui', 'DUPLICATA PERTE', '2022-12-02', '4628/B', ' Modifier le 4/December/2022, par ', 5, '501012028460'),
(6, 'oui', 'DUPLICATA USURE', '2022-12-02', '3427/A', ' Modifier le 4/December/2022, par ', 1, '108081258654'),
(7, 'oui', 'DUPLICATA PERTE', '2022-12-03', '2365/B', 'Aucune', 1, '201011056989'),
(8, 'oui', 'DUPLICATA USURE', '2022-12-03', '56897/B', 'Aucune', 1, '108081258654'),
(9, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '111111111111'),
(10, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '111111111112'),
(11, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '111111111113'),
(12, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '111111111107'),
(13, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '111111111108'),
(14, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '111111111111'),
(15, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '111111111116'),
(16, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '555555555555'),
(17, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '555551555555'),
(18, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '555551555551'),
(19, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '555551555559'),
(20, 'oui', 'PRIMA', '2022-12-08', '111111/A', NULL, 1, '555551555565'),
(21, 'oui', 'PRIMA', '2022-12-08', '44444/A', NULL, 1, '444444444444'),
(22, 'oui', 'PRIMA', '2022-12-08', '44444/A', NULL, 1, '444444444439'),
(23, 'oui', 'PRIMA', '2022-12-08', '15687/A', NULL, 1, '201011028460');

-- --------------------------------------------------------

--
-- Table structure for table `profession`
--

DROP TABLE IF EXISTS `profession`;
CREATE TABLE IF NOT EXISTS `profession` (
  `idProfession` int(11) NOT NULL AUTO_INCREMENT,
  `nomProfession` varchar(30) NOT NULL,
  PRIMARY KEY (`idProfession`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profession`
--

INSERT INTO `profession` (`idProfession`, `nomProfession`) VALUES
(1, 'etudiants'),
(2, 'Docteur'),
(3, 'qqqqqqq');

-- --------------------------------------------------------

--
-- Table structure for table `tmpindividu`
--

DROP TABLE IF EXISTS `tmpindividu`;
CREATE TABLE IF NOT EXISTS `tmpindividu` (
  `idtmpIndividu` int(225) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `nomPere` varchar(150) NOT NULL,
  `nomMere` varchar(150) NOT NULL,
  `lieunais` varchar(100) NOT NULL,
  `datenais` date DEFAULT NULL,
  `domicile` varchar(100) NOT NULL,
  `cicatrice` varchar(50) DEFAULT NULL,
  `longueur` float NOT NULL,
  `datelivrance` date DEFAULT NULL,
  `imgFaceFM` varchar(250) NOT NULL,
  `imgDosFM` varchar(250) NOT NULL,
  `idOrigine` int(11) NOT NULL,
  `idArrondissement` int(11) NOT NULL,
  `idProcedureCin` int(11) NOT NULL,
  `idProfession` int(20) NOT NULL,
  PRIMARY KEY (`idtmpIndividu`),
  KEY `idOrigine` (`idOrigine`),
  KEY `idArrondissement` (`idArrondissement`),
  KEY `idProcedureCin` (`idProcedureCin`),
  KEY `idProfession` (`idProfession`)
) ENGINE=MyISAM AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `attribut` varchar(15) NOT NULL,
  `identification` varchar(50) NOT NULL,
  `mdp` varchar(15) NOT NULL,
  `etatUtilisateur` varchar(25) DEFAULT 'actif',
  PRIMARY KEY (`idUtilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`idUtilisateur`, `attribut`, `identification`, `mdp`, `etatUtilisateur`) VALUES
(1, 'administrateur', 'nuno', 'nuno', 'actif'),
(2, 'user', 'kanto', '12345', 'actif'),
(3, 'user', 'nina-3', 'nina', 'actif'),
(4, 'user', 'xoxo', 'xxxx', 'actif'),
(5, 'administrateur', 'Lucien-5', 'ffff', 'actif'),
(6, 'user', 'nuna-6', 'nuna', 'actif');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
