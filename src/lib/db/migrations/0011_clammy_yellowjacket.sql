CREATE TABLE `footers` (
	`id` varchar(191) NOT NULL,
	`name` varchar(256) NOT NULL,
	`props` json NOT NULL,
	`styles` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `footers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `site_footers` ADD CONSTRAINT `site_footers_footer_id_footers_id_fk` FOREIGN KEY (`footer_id`) REFERENCES `footers`(`id`) ON DELETE cascade ON UPDATE no action;