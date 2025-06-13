CREATE TABLE "artifact_type_audio" (
	"artifact_id" text PRIMARY KEY NOT NULL,
	"artifact_type_id" text,
	"length_seconds" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artifact_type_image" (
	"artifact_id" text PRIMARY KEY NOT NULL,
	"artifact_type_id" text,
	"width_px" integer NOT NULL,
	"height_px" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artifact_type_video" (
	"artifact_id" text PRIMARY KEY NOT NULL,
	"artifact_type_id" text,
	"length_seconds" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exhibit_type_youtube_channels" (
	"exhibit_id" text PRIMARY KEY NOT NULL,
	"exhibit_type_id" text,
	"youtube_id" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "exhibit_type_youtube_channels_youtube_id_unique" UNIQUE("youtube_id")
);
--> statement-breakpoint
CREATE TABLE "exhibit_type_youtube_videos" (
	"exhibit_id" text PRIMARY KEY NOT NULL,
	"youtube_id" text NOT NULL,
	"youtube_channel_id" text NOT NULL,
	"exhibit_type_id" text,
	"title" text NOT NULL,
	"description" text,
	"upload_date" timestamp NOT NULL,
	CONSTRAINT "exhibit_type_youtube_videos_youtube_id_unique" UNIQUE("youtube_id")
);
--> statement-breakpoint
CREATE TABLE "repository_type_local_filesystem" (
	"repository_id" text PRIMARY KEY NOT NULL,
	"repository_type_id" text,
	"path" text NOT NULL,
	"capacity_mb" bigint
);
--> statement-breakpoint
CREATE TABLE "artifact_types" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"is_alias" boolean DEFAULT false NOT NULL,
	"aliased_type_id" text,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "artifact_types_display_name_unique" UNIQUE("display_name")
);
--> statement-breakpoint
CREATE TABLE "artifacts" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text,
	"file_name" text NOT NULL,
	"file_format" text NOT NULL,
	"size_bytes" integer NOT NULL,
	"artifact_type_id" text NOT NULL,
	"museum_id" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exhibit_types" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"is_alias" boolean DEFAULT false NOT NULL,
	"aliased_type_id" text,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "exhibit_types_display_name_unique" UNIQUE("display_name")
);
--> statement-breakpoint
CREATE TABLE "exhibits" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"exhibit_type_id" text NOT NULL,
	"gallery_id" text NOT NULL,
	"museum_id" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "exhibits_display_name_unique" UNIQUE("display_name")
);
--> statement-breakpoint
CREATE TABLE "galleries" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"parent_gallery_id" text,
	"resultant_policy" jsonb,
	"museum_id" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "galleries_policies" (
	"policy_id" text,
	"gallery_id" text,
	CONSTRAINT "galleries_policies_policy_id_gallery_id_pk" PRIMARY KEY("policy_id","gallery_id")
);
--> statement-breakpoint
CREATE TABLE "metadata" (
	"id" text PRIMARY KEY DEFAULT 'curatorMetadata' NOT NULL,
	"is_initialized" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "museums" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "museums_display_name_unique" UNIQUE("display_name")
);
--> statement-breakpoint
CREATE TABLE "policies" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"policy_type_id" text NOT NULL,
	CONSTRAINT "policies_display_name_unique" UNIQUE("display_name")
);
--> statement-breakpoint
CREATE TABLE "policy_types" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"is_alias" boolean DEFAULT false NOT NULL,
	"aliased_type_id" text,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "policy_types_display_name_unique" UNIQUE("display_name")
);
--> statement-breakpoint
CREATE TABLE "repositories" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"museum_id" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "repositories_display_name_unique" UNIQUE("display_name")
);
--> statement-breakpoint
CREATE TABLE "repository_types" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"is_alias" boolean DEFAULT false NOT NULL,
	"aliased_type_id" text,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "repository_types_display_name_unique" UNIQUE("display_name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"user_password" text,
	"display_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name")
);
--> statement-breakpoint
ALTER TABLE "artifact_type_audio" ADD CONSTRAINT "artifact_type_audio_artifact_id_artifacts_id_fk" FOREIGN KEY ("artifact_id") REFERENCES "public"."artifacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifact_type_audio" ADD CONSTRAINT "artifact_type_audio_artifact_type_id_artifact_types_id_fk" FOREIGN KEY ("artifact_type_id") REFERENCES "public"."artifact_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifact_type_image" ADD CONSTRAINT "artifact_type_image_artifact_id_artifacts_id_fk" FOREIGN KEY ("artifact_id") REFERENCES "public"."artifacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifact_type_image" ADD CONSTRAINT "artifact_type_image_artifact_type_id_artifact_types_id_fk" FOREIGN KEY ("artifact_type_id") REFERENCES "public"."artifact_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifact_type_video" ADD CONSTRAINT "artifact_type_video_artifact_id_artifacts_id_fk" FOREIGN KEY ("artifact_id") REFERENCES "public"."artifacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifact_type_video" ADD CONSTRAINT "artifact_type_video_artifact_type_id_artifact_types_id_fk" FOREIGN KEY ("artifact_type_id") REFERENCES "public"."artifact_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibit_type_youtube_channels" ADD CONSTRAINT "exhibit_type_youtube_channels_exhibit_id_exhibits_id_fk" FOREIGN KEY ("exhibit_id") REFERENCES "public"."exhibits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibit_type_youtube_channels" ADD CONSTRAINT "exhibit_type_youtube_channels_exhibit_type_id_exhibit_types_id_fk" FOREIGN KEY ("exhibit_type_id") REFERENCES "public"."exhibit_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibit_type_youtube_videos" ADD CONSTRAINT "exhibit_type_youtube_videos_exhibit_id_exhibits_id_fk" FOREIGN KEY ("exhibit_id") REFERENCES "public"."exhibits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibit_type_youtube_videos" ADD CONSTRAINT "exhibit_type_youtube_videos_youtube_channel_id_exhibit_type_youtube_channels_youtube_id_fk" FOREIGN KEY ("youtube_channel_id") REFERENCES "public"."exhibit_type_youtube_channels"("youtube_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibit_type_youtube_videos" ADD CONSTRAINT "exhibit_type_youtube_videos_exhibit_type_id_exhibit_types_id_fk" FOREIGN KEY ("exhibit_type_id") REFERENCES "public"."exhibit_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repository_type_local_filesystem" ADD CONSTRAINT "repository_type_local_filesystem_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repository_type_local_filesystem" ADD CONSTRAINT "repository_type_local_filesystem_repository_type_id_repository_types_id_fk" FOREIGN KEY ("repository_type_id") REFERENCES "public"."repository_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifact_types" ADD CONSTRAINT "artifact_types_aliased_type_id_artifact_types_id_fk" FOREIGN KEY ("aliased_type_id") REFERENCES "public"."artifact_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifact_types" ADD CONSTRAINT "artifact_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_artifact_type_id_artifact_types_id_fk" FOREIGN KEY ("artifact_type_id") REFERENCES "public"."artifact_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_museum_id_museums_id_fk" FOREIGN KEY ("museum_id") REFERENCES "public"."museums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibit_types" ADD CONSTRAINT "exhibit_types_aliased_type_id_exhibit_types_id_fk" FOREIGN KEY ("aliased_type_id") REFERENCES "public"."exhibit_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibit_types" ADD CONSTRAINT "exhibit_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_exhibit_type_id_exhibit_types_id_fk" FOREIGN KEY ("exhibit_type_id") REFERENCES "public"."exhibit_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_gallery_id_galleries_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."galleries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_museum_id_museums_id_fk" FOREIGN KEY ("museum_id") REFERENCES "public"."museums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_parent_gallery_id_galleries_id_fk" FOREIGN KEY ("parent_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_museum_id_museums_id_fk" FOREIGN KEY ("museum_id") REFERENCES "public"."museums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries_policies" ADD CONSTRAINT "galleries_policies_policy_id_policies_id_fk" FOREIGN KEY ("policy_id") REFERENCES "public"."policies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries_policies" ADD CONSTRAINT "galleries_policies_gallery_id_galleries_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."galleries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "museums" ADD CONSTRAINT "museums_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policies" ADD CONSTRAINT "policies_policy_type_id_policy_types_id_fk" FOREIGN KEY ("policy_type_id") REFERENCES "public"."policy_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policy_types" ADD CONSTRAINT "policy_types_aliased_type_id_policy_types_id_fk" FOREIGN KEY ("aliased_type_id") REFERENCES "public"."policy_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policy_types" ADD CONSTRAINT "policy_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_museum_id_museums_id_fk" FOREIGN KEY ("museum_id") REFERENCES "public"."museums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repository_types" ADD CONSTRAINT "repository_types_aliased_type_id_repository_types_id_fk" FOREIGN KEY ("aliased_type_id") REFERENCES "public"."repository_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repository_types" ADD CONSTRAINT "repository_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;