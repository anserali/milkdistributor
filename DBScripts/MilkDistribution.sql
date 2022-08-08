-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 08, 2022 at 02:41 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `MilkDistribution`
--

-- --------------------------------------------------------

--
-- Table structure for table `MilkCapacity`
--

CREATE TABLE `MilkCapacity` (
  `CapacityId` int(11) NOT NULL,
  `Date` date NOT NULL DEFAULT current_timestamp(),
  `Capacity` int(11) DEFAULT NULL,
  `InsertUtc` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateUtc` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `OrderId` int(11) NOT NULL,
  `Title` varchar(50) DEFAULT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `Capacity` int(11) NOT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `MobileNumber` varchar(10) NOT NULL,
  `OrderStatus` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'placed - 0 ,packed -1,dispatched -2, delivered -3',
  `DeliveryDate` timestamp NULL DEFAULT NULL,
  `IsActive` tinyint(4) NOT NULL DEFAULT 1,
  `InsertUtc` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateUtc` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `MilkCapacity`
--
ALTER TABLE `MilkCapacity`
  ADD PRIMARY KEY (`CapacityId`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`OrderId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `MilkCapacity`
--
ALTER TABLE `MilkCapacity`
  MODIFY `CapacityId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `OrderId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
