CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(100) NOT NULL,
	"lastName" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"zip" varchar(50) NOT NULL,
	"notes" varchar(255) NOT NULL,
	"timezone" varchar(255) NOT NULL,
	"language" varchar(50) NOT NULL,
	"ldapDn" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "admins_email_unique" UNIQUE("email"),
	CONSTRAINT "admins_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"book" date NOT NULL,
	"start" date NOT NULL,
	"end" date NOT NULL,
	"hash" varchar(20) NOT NULL,
	"location" varchar(255) NOT NULL,
	"color" varchar(255) NOT NULL,
	"status" varchar(20) NOT NULL,
	"notes" text,
	"customer_id" integer,
	"provider_id" integer,
	"service_id" integer,
	"google_calendar_id" varchar(255),
	"caldav_calendar_id" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "availabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"provider_id" integer,
	"service_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(100) NOT NULL,
	"lastName" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"zip" varchar(50) NOT NULL,
	"timezone" varchar(255) NOT NULL,
	"language" varchar(50) NOT NULL,
	"ldapDn" varchar(255) NOT NULL,
	"notes" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "customers_email_unique" UNIQUE("email"),
	CONSTRAINT "customers_phone_unique" UNIQUE("phone"),
	CONSTRAINT "customers_address_unique" UNIQUE("address"),
	CONSTRAINT "customers_city_unique" UNIQUE("city"),
	CONSTRAINT "customers_zip_unique" UNIQUE("zip"),
	CONSTRAINT "customers_timezone_unique" UNIQUE("timezone"),
	CONSTRAINT "customers_language_unique" UNIQUE("language"),
	CONSTRAINT "customers_ldapDn_unique" UNIQUE("ldapDn"),
	CONSTRAINT "customers_notes_unique" UNIQUE("notes")
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(100),
	"lastName" varchar(100),
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"zip" varchar(50) NOT NULL,
	"timezone" varchar(255) NOT NULL,
	"language" varchar(50) NOT NULL,
	"ldapDn" varchar(255) NOT NULL,
	"notes" varchar(255) NOT NULL,
	"is_private" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "providers_email_unique" UNIQUE("email"),
	CONSTRAINT "providers_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "secretaries" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(100),
	"lastName" varchar(100),
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"zip" varchar(50) NOT NULL,
	"notes" varchar(255) NOT NULL,
	"timezone" varchar(255) NOT NULL,
	"language" varchar(50) NOT NULL,
	"ldapDn" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "secretaries_email_unique" UNIQUE("email"),
	CONSTRAINT "secretaries_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"duration" integer NOT NULL,
	"price" integer NOT NULL,
	"currency" varchar(10) DEFAULT 'USD' NOT NULL,
	"location" varchar(255),
	"description" text,
	"availabilities_type" varchar(50) DEFAULT 'fixed' NOT NULL,
	"attendants_number" integer DEFAULT 1 NOT NULL,
	"is_private" boolean DEFAULT false NOT NULL,
	"service_category_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "services_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "settings_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "unavailabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"book" date NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"hash" varchar(20) NOT NULL,
	"location" varchar(255) NOT NULL,
	"notes" text,
	"provider_id" integer NOT NULL,
	"google_calendar_id" varchar(255),
	"caldav_calendar_id" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_service_category_id_services_categories_id_fk" FOREIGN KEY ("service_category_id") REFERENCES "public"."services_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unavailabilities" ADD CONSTRAINT "unavailabilities_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE no action ON UPDATE no action;