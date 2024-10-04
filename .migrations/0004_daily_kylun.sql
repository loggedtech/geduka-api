ALTER TABLE "addresses" ALTER COLUMN "complement" SET DATA TYPE varchar(60);--> statement-breakpoint
ALTER TABLE "schools" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" char(11) NOT NULL;