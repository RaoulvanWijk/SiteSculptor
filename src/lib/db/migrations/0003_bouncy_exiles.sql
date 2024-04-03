CREATE TABLE `verificationtoken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationtoken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `component_allowed_children_types` (
	`id` varchar(191) NOT NULL,
	`component_types_id` int,
	`component_id` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `component_allowed_children_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `components` (
	`id` varchar(191) NOT NULL,
	`name` varchar(256) NOT NULL,
	`type` varchar(256) NOT NULL,
	`props` json NOT NULL,
	`styles` json NOT NULL,
	`has_children` tinyint NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `components_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `component_types` (
	`id` varchar(191) NOT NULL,
	`name` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `component_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_components` (
	`id` varchar(191) NOT NULL,
	`index` int NOT NULL,
	`props` json NOT NULL,
	`styles` json NOT NULL,
	`page_id` varchar(256) NOT NULL,
	`parent_id` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `page_components_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` varchar(191) NOT NULL,
	`title` varchar(30) NOT NULL,
	`slug` varchar(30) NOT NULL,
	`navbar_id` int NOT NULL,
	`footer_id` int NOT NULL,
	`site_id` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `pages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sites` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`name` varchar(50) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `sites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `verificationToken`;--> statement-breakpoint
DROP TABLE `container`;--> statement-breakpoint
DROP TABLE `container_component`;--> statement-breakpoint
DROP TABLE `page`;--> statement-breakpoint
DROP TABLE `page_container`;--> statement-breakpoint
DROP TABLE `text_block`;--> statement-breakpoint
ALTER TABLE `component_allowed_children_types` ADD CONSTRAINT `component_allowed_children_types_component_id_components_id_fk` FOREIGN KEY (`component_id`) REFERENCES `components`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `components` ADD CONSTRAINT `components_type_component_types_id_fk` FOREIGN KEY (`type`) REFERENCES `component_types`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `page_components` ADD CONSTRAINT `page_components_page_id_pages_id_fk` FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `page_components` ADD CONSTRAINT `page_components_parent_id_page_components_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `page_components`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pages` ADD CONSTRAINT `pages_site_id_sites_id_fk` FOREIGN KEY (`site_id`) REFERENCES `sites`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sites` ADD CONSTRAINT `sites_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;