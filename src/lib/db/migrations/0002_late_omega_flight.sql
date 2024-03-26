CREATE TABLE `container` (
	`id` varchar(191) NOT NULL,
	`page_container_id` varchar(256) NOT NULL,
	CONSTRAINT `container_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `container_component` (
	`id` varchar(191) NOT NULL,
	`component_name` varchar(256) NOT NULL,
	`container_id` varchar(256) NOT NULL,
	CONSTRAINT `container_component_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_container` (
	`id` varchar(191) NOT NULL,
	`page_id` int NOT NULL,
	`container_id` int NOT NULL,
	CONSTRAINT `page_container_id` PRIMARY KEY(`id`),
	CONSTRAINT `id_idx` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `text_block` (
	`id` varchar(191) NOT NULL,
	`content` text NOT NULL,
	`container_component_id` varchar(256) NOT NULL,
	CONSTRAINT `text_block_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `page` MODIFY COLUMN `id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `page` MODIFY COLUMN `user_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `page` ADD CONSTRAINT `page_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `container` ADD CONSTRAINT `container_page_container_id_page_container_id_fk` FOREIGN KEY (`page_container_id`) REFERENCES `page_container`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `container_component` ADD CONSTRAINT `container_component_container_id_container_id_fk` FOREIGN KEY (`container_id`) REFERENCES `container`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `text_block` ADD CONSTRAINT `text_block_container_component_id_container_component_id_fk` FOREIGN KEY (`container_component_id`) REFERENCES `container_component`(`id`) ON DELETE cascade ON UPDATE no action;