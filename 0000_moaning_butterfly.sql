CREATE TABLE `play_sessions` (
	`user_id` text NOT NULL,
	`id` text NOT NULL,
	`started_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`status` text NOT NULL,
	`answer_count` integer NOT NULL,
	`revision` integer NOT NULL,
	`payload` text NOT NULL,
	PRIMARY KEY(`user_id`, `id`)
);
--> statement-breakpoint
CREATE INDEX `idx_play_sessions_user_started` ON `play_sessions` (`user_id`,`started_at`);