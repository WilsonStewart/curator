CREATE TABLE "artifact_types_videos" (
	"artifactId" uuid PRIMARY KEY NOT NULL,
	"lengthSeconds" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exhibit_type_youtube_channels" (
	"exhibitId" uuid PRIMARY KEY NOT NULL,
	"youtubeId" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "exhibit_type_youtube_channels_youtubeId_unique" UNIQUE("youtubeId")
);
--> statement-breakpoint
CREATE TABLE "exhibit_type_youtube_videos" (
	"exhibitId" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"uploadDate" timestamp NOT NULL,
	"youtubeId" text NOT NULL,
	"youtubeChannelId" text NOT NULL,
	CONSTRAINT "exhibit_type_youtube_videos_youtubeId_unique" UNIQUE("youtubeId")
);
--> statement-breakpoint
CREATE TABLE "artifact_type_aliases" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "artifact_type_aliases_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "artifact_types" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "artifact_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "artifacts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"fileName" text NOT NULL,
	"fileFormat" text NOT NULL,
	"sizeBytes" integer NOT NULL,
	"artifactTypeId" uuid NOT NULL,
	"artifactTypeAliasId" uuid,
	"museum_id" uuid NOT NULL,
	"created_by" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"modifiedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "exhibit_types" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "exhibit_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "exhibits" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"exhibitTypeId" uuid NOT NULL,
	"galleryId" uuid NOT NULL,
	"museum_id" uuid NOT NULL,
	"created_by" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"modifiedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "galleries" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"parentGalleryId" uuid,
	"resultantPolicy" jsonb,
	"museum_id" uuid NOT NULL,
	"created_by" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"modifiedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "galleries_policies" (
	"policyId" uuid,
	"galleryId" uuid,
	CONSTRAINT "galleries_policies_policyId_galleryId_pk" PRIMARY KEY("policyId","galleryId")
);
--> statement-breakpoint
CREATE TABLE "museums" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_by" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"modifiedAt" timestamp,
	CONSTRAINT "museums_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "policies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"policyTypeId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "policy_types" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "policy_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"firstName" text,
	"lastName" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"modifiedAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "artifact_types_videos" ADD CONSTRAINT "artifact_types_videos_artifactId_artifacts_id_fk" FOREIGN KEY ("artifactId") REFERENCES "public"."artifacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibit_type_youtube_channels" ADD CONSTRAINT "exhibit_type_youtube_channels_exhibitId_exhibits_id_fk" FOREIGN KEY ("exhibitId") REFERENCES "public"."exhibits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibit_type_youtube_videos" ADD CONSTRAINT "exhibit_type_youtube_videos_exhibitId_exhibits_id_fk" FOREIGN KEY ("exhibitId") REFERENCES "public"."exhibits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibit_type_youtube_videos" ADD CONSTRAINT "exhibit_type_youtube_videos_youtubeChannelId_exhibit_type_youtube_channels_youtubeId_fk" FOREIGN KEY ("youtubeChannelId") REFERENCES "public"."exhibit_type_youtube_channels"("youtubeId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_artifactTypeId_artifact_types_id_fk" FOREIGN KEY ("artifactTypeId") REFERENCES "public"."artifact_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_artifactTypeAliasId_artifact_type_aliases_id_fk" FOREIGN KEY ("artifactTypeAliasId") REFERENCES "public"."artifact_type_aliases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_museum_id_museums_id_fk" FOREIGN KEY ("museum_id") REFERENCES "public"."museums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_exhibitTypeId_exhibit_types_id_fk" FOREIGN KEY ("exhibitTypeId") REFERENCES "public"."exhibit_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_galleryId_galleries_id_fk" FOREIGN KEY ("galleryId") REFERENCES "public"."galleries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_museum_id_museums_id_fk" FOREIGN KEY ("museum_id") REFERENCES "public"."museums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_parentGalleryId_galleries_id_fk" FOREIGN KEY ("parentGalleryId") REFERENCES "public"."galleries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_museum_id_museums_id_fk" FOREIGN KEY ("museum_id") REFERENCES "public"."museums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries_policies" ADD CONSTRAINT "galleries_policies_policyId_policies_id_fk" FOREIGN KEY ("policyId") REFERENCES "public"."policies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries_policies" ADD CONSTRAINT "galleries_policies_galleryId_galleries_id_fk" FOREIGN KEY ("galleryId") REFERENCES "public"."galleries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "museums" ADD CONSTRAINT "museums_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policies" ADD CONSTRAINT "policies_policyTypeId_policy_types_id_fk" FOREIGN KEY ("policyTypeId") REFERENCES "public"."policy_types"("id") ON DELETE no action ON UPDATE no action;