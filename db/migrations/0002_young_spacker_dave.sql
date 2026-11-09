ALTER TABLE "profile" ADD COLUMN "display_name" text NOT NULL DEFAULT '';--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "terminal_user" text NOT NULL DEFAULT '';--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "display_name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "terminal_user" DROP DEFAULT;
