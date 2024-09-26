ALTER TABLE "members" ALTER COLUMN "school_id" SET DATA TYPE char(24);--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "user_id" SET DATA TYPE char(24);--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "role" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "schools" ALTER COLUMN "id" SET DATA TYPE char(24);--> statement-breakpoint
ALTER TABLE "schools" ALTER COLUMN "name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "schools" ALTER COLUMN "email" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "schools" ALTER COLUMN "phone" SET DATA TYPE char(11);--> statement-breakpoint
ALTER TABLE "schools" ALTER COLUMN "tax_id" SET DATA TYPE varchar(14);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE char(24);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar;