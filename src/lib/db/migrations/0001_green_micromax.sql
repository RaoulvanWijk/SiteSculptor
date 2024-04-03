CREATE TABLE `page` (
	`id` varchar(255) NOT NULL,
	`user_id` int,
	`title` varchar(30) NOT NULL,
	`slug` varchar(30) NOT NULL,
	`page_navbar_id` int,
	`page_footer_id` int,
	CONSTRAINT `page_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`user_id` varchar(255) NOT NULL,
	`stripe_customer_id` varchar(255) NOT NULL,
	`stripe_subscription_id` varchar(255),
	`stripe_price_id` varchar(255),
	`stripe_current_period_end` timestamp,
	CONSTRAINT `subscriptions_user_id_stripe_customer_id_pk` PRIMARY KEY(`user_id`,`stripe_customer_id`),
	CONSTRAINT `subscriptions_user_id_unique` UNIQUE(`user_id`),
	CONSTRAINT `subscriptions_stripe_customer_id_unique` UNIQUE(`stripe_customer_id`),
	CONSTRAINT `subscriptions_stripe_subscription_id_unique` UNIQUE(`stripe_subscription_id`)
);
