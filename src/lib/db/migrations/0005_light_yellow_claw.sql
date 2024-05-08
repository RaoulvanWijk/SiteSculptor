CREATE TABLE `site_footers` (
	`id` varchar(191) NOT NULL,
	`site_id` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `site_footers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_navbars` (
	`id` varchar(191) NOT NULL,
	`site_id` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `site_navbars_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `site_footers` ADD CONSTRAINT `site_footers_site_id_sites_id_fk` FOREIGN KEY (`site_id`) REFERENCES `sites`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `site_navbars` ADD CONSTRAINT `site_navbars_site_id_sites_id_fk` FOREIGN KEY (`site_id`) REFERENCES `sites`(`id`) ON DELETE cascade ON UPDATE no action;