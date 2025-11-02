-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2025 at 02:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_housingcoopsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `phoneNumber` bigint(15) NOT NULL,
  `unitNumber` int(5) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `firstName`, `lastName`, `phoneNumber`, `unitNumber`, `status`) VALUES
(1, 'Arvin', 'Posadas', 9234567819, 1, 'ACTIVE'),
(2, 'Julien', 'Villanueva', 9931236547, 2, 'INACTIVE'),
(3, 'Harriet', 'Dimapilis', 9987654321, 3, 'ACTIVE'),
(4, 'Evan', 'Famadico', 9871234567, 4, 'INACTIVE'),
(5, 'Marc ', 'Spector', 9105550001, 5, 'ACTIVE'),
(6, 'Steven', 'Grant', 9105550002, 6, 'INACTIVE'),
(7, 'Jake ', 'Lockley', 9105550003, 7, 'INACTIVE'),
(8, 'Arthur', 'Harrow', 9105550004, 8, 'INACTIVE'),
(9, 'Reed', 'Richards', 9105550005, 9, 'ACTIVE'),
(10, 'Johnny ', 'Storm', 9105550006, 10, 'INACTIVE'),
(11, 'Sue ', 'Storm', 9605555002, 11, 'ACTIVE'),
(12, 'Ben', 'Grimm', 9805557001, 12, 'INACTIVE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
