# Api_taxibe

Project taxibe cooperative api à Madagascar!

![alt text](1712936662635.jpg)



<!-- "SELECT `Bookings`.`id`, `Bookings`.`user_id`, `Bookings`.`trajet_id`, `Bookings`.`nb_mpandeha`, `Bookings`.`date_booking`, `Bookings`.`createdAt`, `Bookings`.`updatedAt`, `Bookings`.`route_id`, `Bookings`.`taxibe_id`, `Trajet`.`id` AS `Trajet.id`, `Trajet`.`date` AS `Trajet.date`, `User`.`id` AS `User.id`, `User`.`name` AS `User.name`, `User`.`email` AS `User.email`, `User`.`tel` AS `User.tel`, `User`.`image` AS `User.image` FROM `Bookings` AS `Bookings` LEFT OUTER JOIN `Trajets` AS `Trajet` ON `Bookings`.`trajet_id` = `Trajet`.`id` LEFT OUTER JOIN `Users` AS `User` ON `Bookings`.`user_id` = `User`.`id`;" -->