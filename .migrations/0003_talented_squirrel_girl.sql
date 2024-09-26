CREATE TABLE IF NOT EXISTS "addresses" (
	"id" char(24) PRIMARY KEY NOT NULL,
	"zip" char(8) NOT NULL,
	"place" text NOT NULL,
	"number" varchar(20) NOT NULL,
	"complement" varchar(20),
	"district" varchar NOT NULL,
	"city" varchar NOT NULL,
	"state" char(2) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "address_id" char(24) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schools" ADD CONSTRAINT "schools_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
