CREATE TABLE IF NOT EXISTS "schools" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"tax_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "schools_email_unique" UNIQUE("email"),
	CONSTRAINT "schools_tax_id_unique" UNIQUE("tax_id")
);
