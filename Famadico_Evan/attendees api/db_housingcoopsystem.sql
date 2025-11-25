-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2025 at 03:13 PM
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
-- Table structure for table `tbl_announcements`
--

CREATE TABLE `tbl_announcements` (
  `announcementID` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `type` enum('Meeting','Notice','Announcement','Advisory') NOT NULL,
  `dateTime` datetime(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_announcements`
--

INSERT INTO `tbl_announcements` (`announcementID`, `title`, `description`, `type`, `dateTime`) VALUES
(1, 'Water Service Interruption – Scheduled Maintenance', 'Please be informed that there will be a temporary water supply interruption on November 25, 2025, from 8:00 AM to 3:00 PM due to pipeline maintenance. Residents are advised to store enough water for the duration of the outage.', 'Advisory', '2025-11-23 21:30:00.00'),
(2, 'Community Clean-Up Drive This Saturday', 'We invite all residents to join our community clean-up drive this Saturday. Assembly will be at the Barangay Hall at 6:30 AM. Cleaning materials will be provided. Let\'s work together in keeping our surroundings clean and safe!', 'Announcement', '2025-11-24 14:10:00.00'),
(3, 'Important Security Notice for All Residents', 'We remind all residents to remain vigilant, especially during late hours. Please ensure gates are locked and report any suspicious activities to barangay security hotlines. Thank you for your cooperation.', 'Notice', '2025-11-23 18:20:00.94'),
(4, 'Barangay General Assembly – All Residents Invited', 'A general assembly will be held to discuss upcoming community projects, budget updates, and resident concerns. Attendance is highly encouraged as important matters will be addressed.', 'Meeting', '2025-11-25 12:00:00.00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_attendees`
--

CREATE TABLE `tbl_attendees` (
  `attendeeID` int(10) NOT NULL,
  `anouncementID` int(10) NOT NULL,
  `residentID` int(10) NOT NULL,
  `status` enum('Going','Not Going') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_attendees`
--

INSERT INTO `tbl_attendees` (`attendeeID`, `anouncementID`, `residentID`, `status`) VALUES
(1, 4, 2, 'Going'),
(2, 4, 4, 'Not Going');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_maintenance`
--

CREATE TABLE `tbl_maintenance` (
  `requestID` int(10) NOT NULL,
  `residentID` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `priority` enum('High','Medium','Low') NOT NULL,
  `status` enum('Pending','Completed') NOT NULL,
  `dateSubmitted` date NOT NULL,
  `dateResolved` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_maintenance`
--

INSERT INTO `tbl_maintenance` (`requestID`, `residentID`, `title`, `description`, `priority`, `status`, `dateSubmitted`, `dateResolved`) VALUES
(1, 1, 'Broken Light Fixture', 'The hallway light is flickering and occasionally turning off completely. Possible wiring issue or bulb socket damage.', 'Medium', 'Pending', '2025-11-22', '0000-00-00'),
(2, 3, 'Air Conditioner Not Cooling', 'The AC unit is running but only blowing warm air. Might need cleaning, coolant refill, or filter replacement.', 'High', 'Pending', '2025-11-21', '0000-00-00'),
(5, 4, 'Cracked Windowpane', 'Small crack on the bedroom windowpane, not broken through but spreading slowly. Needs replacement before it worsens.', 'Low', 'Pending', '2025-11-21', '0000-00-00'),
(6, 2, 'Clogged Bathroom Drain', 'Bathroom sink is draining extremely slowly even after using drain cleaner. Likely a blockage deeper in the pipe.', 'High', 'Pending', '2025-11-22', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_residents`
--

CREATE TABLE `tbl_residents` (
  `id` int(10) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `phoneNumber` bigint(11) NOT NULL,
  `unitNumber` int(5) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_residents`
--

INSERT INTO `tbl_residents` (`id`, `firstName`, `lastName`, `phoneNumber`, `unitNumber`, `status`) VALUES
(1, 'Arvin', 'Posadas', 9234567819, 1, 'Inactive'),
(2, 'Julien', 'Villanueva', 9871234567, 1, 'Active'),
(3, 'James', 'Dimapilis', 9900112234, 3, 'Active'),
(4, 'Evan', 'Famadico', 9221343256, 4, 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_announcements`
--
ALTER TABLE `tbl_announcements`
  ADD PRIMARY KEY (`announcementID`);

--
-- Indexes for table `tbl_attendees`
--
ALTER TABLE `tbl_attendees`
  ADD PRIMARY KEY (`attendeeID`),
  ADD KEY `anouncementID` (`anouncementID`),
  ADD KEY `residentID` (`residentID`);

--
-- Indexes for table `tbl_maintenance`
--
ALTER TABLE `tbl_maintenance`
  ADD PRIMARY KEY (`requestID`),
  ADD KEY `residentID` (`residentID`);

--
-- Indexes for table `tbl_residents`
--
ALTER TABLE `tbl_residents`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_announcements`
--
ALTER TABLE `tbl_announcements`
  MODIFY `announcementID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_attendees`
--
ALTER TABLE `tbl_attendees`
  MODIFY `attendeeID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_maintenance`
--
ALTER TABLE `tbl_maintenance`
  MODIFY `requestID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_residents`
--
ALTER TABLE `tbl_residents`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_attendees`
--
ALTER TABLE `tbl_attendees`
  ADD CONSTRAINT `tbl_attendees_ibfk_1` FOREIGN KEY (`anouncementID`) REFERENCES `tbl_announcements` (`announcementID`),
  ADD CONSTRAINT `tbl_attendees_ibfk_2` FOREIGN KEY (`residentID`) REFERENCES `tbl_residents` (`id`);

--
-- Constraints for table `tbl_maintenance`
--
ALTER TABLE `tbl_maintenance`
  ADD CONSTRAINT `tbl_maintenance_ibfk_1` FOREIGN KEY (`residentID`) REFERENCES `tbl_residents` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
