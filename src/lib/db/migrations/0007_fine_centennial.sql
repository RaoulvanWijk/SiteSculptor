CREATE TABLE `navbars` (
	`id` varchar(191) NOT NULL,
	`props` json NOT NULL,
	`stylese` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `navbars_id` PRIMARY KEY(`id`)
);
