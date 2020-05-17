-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 15, 2019 at 11:38 AM
-- Server version: 5.7.23-0ubuntu0.16.04.1
-- PHP Version: 7.2.11-2+ubuntu16.04.1+deb.sury.org+1
​
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
​
​
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
​
--
-- Database: `336_final`
--
​
-- --------------------------------------------------------
​
--
-- Table structure for table `admin`
--
​
CREATE TABLE `admin` (
  `id` tinyint(4) NOT NULL,
  `username` varchar(8) NOT NULL,
  `password` varchar(72) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
​
--
-- Dumping data for table `admin`
--
​
INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2a$10$06ofFgXJ9wysAOzQh0D0..RcDp1w/urY3qhO6VuUJL2c6tzAJPfj6');
​
-- --------------------------------------------------------
​
--
-- Table structure for table `cart`
--
​
CREATE TABLE `cart` (
  `userId` int(10) NOT NULL,
  `itemId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
​
-- --------------------------------------------------------
​
--
-- Table structure for table `inventory`
--
​
CREATE TABLE `inventory` (
  `id` tinyint(4) NOT NULL,
  `make` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `year` int(4) NOT NULL,
  `price` int(8) NOT NULL,
  `color` varchar(10) NOT NULL,
  `type` varchar(10) NOT NULL,
  `imageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
​
--
-- Dumping data for table `inventory`
--
​
INSERT INTO `inventory` (`id`, `make`, `model`, `year`, `price`, `color`, `type`, `imageUrl`) VALUES
(15, 'Audi', 'A8', 2020, 83800, 'white', 'Sedan', ''),
(16, 'Audi', 'A3', 2017, 27000, 'white', 'sedan', ''),
(17, 'Ford', 'Explorer', 2020, 36600, 'grey', 'suv', ''),
(18, 'Ford', 'Expedition', 2019, 52130, 'grey', 'suv', ''),
(19, 'Ford', 'Fiesta', 2019, 14260, 'blue', 'sedan', ''),
(20, 'Hyundai', 'Accent', 2019, 14999, 'yellow', 'sedan', ''),
(35, 'Jaguar', 'XF', 2016, 23000, 'white', 'Coupe', 'http://www.regcheck.org.uk/image.aspx/@MjAxNiBKYWd1YXIgWEYgW29iamVjdCBIVE1MU2VsZWN0RWxlbWVudF0='),
(36, 'Audi', 'A4', 2019, 54000, 'black', 'Coupe', 'http://www.regcheck.org.uk/image.aspx/@MjAxOSBBdWRpIEE0IFtvYmplY3QgSFRNTFNlbGVjdEVsZW1lbnRd'),
(38, 'Bentley', 'Flying Spur', 2016, 45000, 'white', 'Sedan', 'http://www.regcheck.org.uk/image.aspx/@MjAxNiBCZW50bGV5IEZseWluZyBTcHVyIFtvYmplY3QgSFRNTFNlbGVjdEVsZW1lbnRd'),
(39, 'Maserati', 'GranTurismo', 2019, 95000, 'white', 'Sedan', 'http://www.regcheck.org.uk/image.aspx/@MjAxOSBNYXNlcmF0aSBHcmFuVHVyaXNtbyBbb2JqZWN0IEhUTUxTZWxlY3RFbGVtZW50XQ=='),
(40, 'GMC', 'Sierra 1500', 2019, 23000, 'white', 'Coupe', 'http://www.regcheck.org.uk/image.aspx/@MjAxNSBDaGV2cm9sZXQgU2lsdmVyYWRvIDE1MDAgW29iamVjdCBIVE1MU2VsZWN0RWxlbWVudF0='),
(41, 'GMC', 'Sierra 3500HD', 2019, 23000, 'green', 'Coupe', 'http://www.regcheck.org.uk/image.aspx/@MjAxOSBHTUMgU2llcnJhIDM1MDBIRCBbb2JqZWN0IEhUTUxTZWxlY3RFbGVtZW50XQ=='),
(42, 'Infiniti', 'Q50', 2019, 14000, 'red', 'SUV', 'http://www.regcheck.org.uk/image.aspx/@MjAxOSBJbmZpbml0aSBRNTAgW29iamVjdCBIVE1MU2VsZWN0RWxlbWVudF0='),
(43, 'Infiniti', 'Q70', 2019, 23000, 'white', 'SUV', 'http://www.regcheck.org.uk/image.aspx/@MjAxOSBJbmZpbml0aSBRNzAgW29iamVjdCBIVE1MU2VsZWN0RWxlbWVudF0='),
(45, 'Bentley', 'Flying Spur', 2019, 45000, 'white', 'Sedan', 'http://www.regcheck.org.uk/image.aspx/@MjAxOSBCZW50bGV5IEZseWluZyBTcHVyIFtvYmplY3QgSFRNTFNlbGVjdEVsZW1lbnRd'),
(46, 'Audi', 'A4', 2019, 70000, 'black', 'Sedan', ''),
(47, 'Acura', 'MDX', 2018, 12000, 'white', 'Sedan', ''),
(48, 'Bentley', 'Continental GT', 2019, 100000, 'black', 'Sedan', 'http://www.regcheck.org.uk/image.aspx/@MjAxOSBCZW50bGV5IENvbnRpbmVudGFsIEdUIFtvYmplY3QgSFRNTFNlbGVjdEVsZW1lbnRd'),
(49, 'BMW', '3 Series', 2019, 99999, 'white', 'Coupe', 'http://www.regcheck.org.uk/image.aspx/@MjAxOSBCTVcgMyBTZXJpZXMgW29iamVjdCBIVE1MU2VsZWN0RWxlbWVudF0='),
(50, 'Audi', 'A5', 2019, 2300, 'black', 'Sedan', 'http://www.regcheck.org.uk/image.aspx/@MjAxOSBBdWRpIEE1IFtvYmplY3QgSFRNTFNlbGVjdEVsZW1lbnRd'),
(51, 'Lamborghini', 'Gallardo', 2011, 100000, 'white', 'Coupe', 'http://www.regcheck.org.uk/image.aspx/@MjAxMSBMYW1ib3JnaGluaSBHYWxsYXJkbyBbb2JqZWN0IEhUTUxTZWxlY3RFbGVtZW50XQ=='),
(52, 'Audi', 'A7', 2019, 120000, 'white', 'Sedan', 'http://www.regcheck.org.uk/image.aspx/@MjAxOSBBdWRpIEE3IFtvYmplY3QgSFRNTFNlbGVjdEVsZW1lbnRd');
​
-- --------------------------------------------------------
​
--
-- Table structure for table `orders`
--
​
CREATE TABLE `orders` (
  `id` tinyint(4) NOT NULL,
  `userId` tinyint(4) NOT NULL,
  `itemId` tinyint(4) NOT NULL,
  `count` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
​
--
-- Dumping data for table `orders`
--
​
INSERT INTO `orders` (`id`, `userId`, `itemId`, `count`) VALUES
(1, 1, 7, 0),
(2, 1, 8, 1);
​
-- --------------------------------------------------------
​
--
-- Table structure for table `user`
--
​
CREATE TABLE `user` (
  `id` tinyint(4) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL,
  `postalCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
​
--
-- Dumping data for table `user`
--
​
INSERT INTO `user` (`id`, `firstName`, `lastName`, `city`, `state`, `postalCode`) VALUES
(1, 'John', 'Doe', 'San Diego', 'California', '92119');
​
--
-- Indexes for dumped tables
--
​
--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);
​
--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);
​
--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);
​
--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
​
--
-- AUTO_INCREMENT for dumped tables
--
​
--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;