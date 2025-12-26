CREATE TABLE
	"repositories" (
		"id" uuid PRIMARY KEY DEFAULT uuidv7 () NOT NULL,
		"repository_type_id" uuid NOT NULL,
		"name" text NOT NULL,
		"safe_name" text NOT NULL,
		"role" text NOT NULL,
		"created_by" text NOT NULL,
		"created_at" timestamp DEFAULT now () NOT NULL,
		"updated_at" timestamp DEFAULT now () NOT NULL,
		CONSTRAINT "repositories_name_unique" UNIQUE ("name"),
		CONSTRAINT "repositories_safe_name_unique" UNIQUE ("safe_name")
	);

--> statement-breakpoint
CREATE TABLE
	"repository_types" (
		"id" uuid PRIMARY KEY DEFAULT uuidv7 () NOT NULL,
		"name" text NOT NULL,
		"safe_name" text NOT NULL,
		"is_alias" boolean DEFAULT false NOT NULL,
		"aliased_type_id" uuid,
		"created_by" text NOT NULL,
		"created_at" timestamp DEFAULT now () NOT NULL,
		"updated_at" timestamp DEFAULT now () NOT NULL,
		CONSTRAINT "repository_types_name_unique" UNIQUE ("name"),
		CONSTRAINT "repository_types_safe_name_unique" UNIQUE ("safe_name")
	);

--> statement-breakpoint
CREATE TABLE
	"rt_local_filesystem" (
		"repository_id" uuid PRIMARY KEY NOT NULL,
		"path" text NOT NULL,
		"capacity_mb" bigint
	);

--> statement-breakpoint
CREATE TABLE
	"policies" (
		"id" uuid PRIMARY KEY DEFAULT uuidv7 () NOT NULL,
		"name" text NOT NULL,
		"policy_type_id" uuid NOT NULL,
		CONSTRAINT "policies_name_unique" UNIQUE ("name")
	);

--> statement-breakpoint
CREATE TABLE
	"policy_types" (
		"id" uuid PRIMARY KEY DEFAULT uuidv7 () NOT NULL,
		"name" text NOT NULL,
		"safe_name" text NOT NULL,
		"is_alias" boolean DEFAULT false NOT NULL,
		"aliased_type_id" uuid,
		"created_by" text NOT NULL,
		"created_at" timestamp DEFAULT now () NOT NULL,
		"updated_at" timestamp DEFAULT now () NOT NULL,
		CONSTRAINT "policy_types_name_unique" UNIQUE ("name"),
		CONSTRAINT "policy_types_safe_name_unique" UNIQUE ("safe_name")
	);

--> statement-breakpoint
CREATE TABLE
	"galleries_policies" (
		"policy_id" uuid,
		"gallery_id" uuid,
		CONSTRAINT "galleries_policies_policy_id_gallery_id_pk" PRIMARY KEY ("policy_id", "gallery_id")
	);

--> statement-breakpoint
CREATE TABLE
	"museums" (
		"id" uuid PRIMARY KEY DEFAULT uuidv7 () NOT NULL,
		"name" text NOT NULL,
		"safe_name" text NOT NULL,
		"created_by" text NOT NULL,
		"created_at" timestamp DEFAULT now () NOT NULL,
		"updated_at" timestamp DEFAULT now () NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"et_debug" ("exhibit_id" uuid PRIMARY KEY NOT NULL);

--> statement-breakpoint
CREATE TABLE
	"et_youtube_channels" (
		"exhibit_id" uuid PRIMARY KEY NOT NULL,
		"youtube_id" text,
		"youtube_channel_handle" text,
		"name" text NOT NULL,
		CONSTRAINT "et_youtube_channels_youtube_id_unique" UNIQUE ("youtube_id"),
		CONSTRAINT "et_youtube_channels_youtube_channel_handle_unique" UNIQUE ("youtube_channel_handle")
	);

--> statement-breakpoint
CREATE TABLE
	"et_youtube_videos" (
		"exhibit_id" uuid PRIMARY KEY NOT NULL,
		"youtube_id" text NOT NULL,
		"youtube_channel_id" text,
		"title" text NOT NULL,
		"description" text,
		"upload_date" timestamp NOT NULL,
		CONSTRAINT "et_youtube_videos_youtube_id_unique" UNIQUE ("youtube_id")
	);

--> statement-breakpoint
CREATE TABLE
	"exhibit_types" (
		"id" uuid PRIMARY KEY DEFAULT uuidv7 () NOT NULL,
		"name" text NOT NULL,
		"is_alias" boolean DEFAULT false NOT NULL,
		"aliased_type_id" uuid,
		"created_by" text NOT NULL,
		"created_at" timestamp DEFAULT now () NOT NULL,
		"updated_at" timestamp DEFAULT now () NOT NULL,
		CONSTRAINT "exhibit_types_name_unique" UNIQUE ("name")
	);

--> statement-breakpoint
CREATE TABLE
	"exhibits" (
		"id" uuid PRIMARY KEY DEFAULT uuidv7 () NOT NULL,
		"name" text NOT NULL,
		"safe_name" text NOT NULL,
		"exhibit_type_id" uuid NOT NULL,
		"gallery_id" uuid NOT NULL,
		"museum_id" uuid NOT NULL,
		"created_by" text NOT NULL,
		"created_at" timestamp DEFAULT now () NOT NULL,
		"updated_at" timestamp DEFAULT now () NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"accounts" (
		"id" text PRIMARY KEY NOT NULL,
		"account_id" text NOT NULL,
		"provider_id" text NOT NULL,
		"user_id" text NOT NULL,
		"access_token" text,
		"refresh_token" text,
		"id_token" text,
		"access_token_expires_at" timestamp,
		"refresh_token_expires_at" timestamp,
		"scope" text,
		"password" text,
		"created_at" timestamp NOT NULL,
		"updated_at" timestamp NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"apikeys" (
		"id" text PRIMARY KEY NOT NULL,
		"name" text,
		"start" text,
		"prefix" text,
		"key" text NOT NULL,
		"user_id" text NOT NULL,
		"refill_interval" integer,
		"refill_amount" integer,
		"last_refill_at" timestamp,
		"enabled" boolean DEFAULT true,
		"rate_limit_enabled" boolean DEFAULT true,
		"rate_limit_time_window" integer DEFAULT 86400000,
		"rate_limit_max" integer DEFAULT 10,
		"request_count" integer,
		"remaining" integer,
		"last_request" timestamp,
		"permissions" text,
		"metadata" text,
		"expires_at" timestamp,
		"created_at" timestamp NOT NULL,
		"updated_at" timestamp NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"sessions" (
		"id" text PRIMARY KEY NOT NULL,
		"expires_at" timestamp NOT NULL,
		"token" text NOT NULL,
		"ip_address" text,
		"user_agent" text,
		"user_id" text NOT NULL,
		"created_at" timestamp NOT NULL,
		"updated_at" timestamp NOT NULL,
		CONSTRAINT "sessions_token_unique" UNIQUE ("token")
	);

--> statement-breakpoint
CREATE TABLE
	"users" (
		"id" text PRIMARY KEY NOT NULL,
		"name" text NOT NULL,
		"email" text NOT NULL,
		"email_verified" boolean DEFAULT false NOT NULL,
		"image" text,
		"created_at" timestamp DEFAULT now () NOT NULL,
		"updated_at" timestamp DEFAULT now () NOT NULL,
		CONSTRAINT "users_email_unique" UNIQUE ("email")
	);

--> statement-breakpoint
CREATE TABLE
	"verifications" (
		"id" text PRIMARY KEY NOT NULL,
		"identifier" text NOT NULL,
		"value" text NOT NULL,
		"expires_at" timestamp NOT NULL,
		"created_at" timestamp DEFAULT now (),
		"updated_at" timestamp DEFAULT now ()
	);

--> statement-breakpoint
CREATE TABLE
	"galleries" (
		"id" uuid PRIMARY KEY DEFAULT uuidv7 () NOT NULL,
		"name" text NOT NULL,
		"safe_name" text NOT NULL,
		"parent_gallery_id" uuid,
		"resultant_policy" jsonb,
		"museum_id" uuid NOT NULL,
		"created_by" text NOT NULL,
		"created_at" timestamp DEFAULT now () NOT NULL,
		"updated_at" timestamp DEFAULT now () NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"metadata" (
		"id" text PRIMARY KEY DEFAULT 'curatorMetadata' NOT NULL,
		"is_initialized" boolean DEFAULT false NOT NULL,
		"is_builtin_data_clean" boolean DEFAULT false NOT NULL,
		CONSTRAINT "id" CHECK ("metadata"."id" = 'curatorMetadata')
	);

--> statement-breakpoint
CREATE TABLE
	"artifact_types" (
		"id" uuid PRIMARY KEY DEFAULT uuidv7 () NOT NULL,
		"name" text NOT NULL,
		"is_alias" boolean DEFAULT false NOT NULL,
		"aliased_type_id" uuid,
		"created_by" text NOT NULL,
		"created_at" timestamp DEFAULT now () NOT NULL,
		"updated_at" timestamp DEFAULT now () NOT NULL,
		CONSTRAINT "artifact_types_name_unique" UNIQUE ("name")
	);

--> statement-breakpoint
CREATE TABLE
	"artifacts" (
		"id" uuid PRIMARY KEY DEFAULT uuidv7 () NOT NULL,
		"name" text NOT NULL,
		"safe_name" text NOT NULL,
		"file_name" text NOT NULL,
		"file_format" text NOT NULL,
		"size_bytes" integer NOT NULL,
		"artifact_type_id" uuid NOT NULL,
		"museum_id" uuid NOT NULL,
		"created_by" text NOT NULL,
		"created_at" timestamp DEFAULT now () NOT NULL,
		"updated_at" timestamp DEFAULT now () NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"at_audio_recordings" (
		"artifact_id" uuid PRIMARY KEY NOT NULL,
		"length_seconds" integer NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"at_images" (
		"artifact_id" uuid PRIMARY KEY NOT NULL,
		"width_px" integer NOT NULL,
		"height_px" integer NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"at_note" (
		"artifact_id" uuid PRIMARY KEY NOT NULL,
		"text" text
	);

--> statement-breakpoint
CREATE TABLE
	"at_videos" (
		"artifact_id" uuid PRIMARY KEY NOT NULL,
		"length_seconds" integer NOT NULL
	);

--> statement-breakpoint
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_repository_type_id_repository_types_id_fk" FOREIGN KEY ("repository_type_id") REFERENCES "public"."repository_types" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "repository_types" ADD CONSTRAINT "repository_types_aliased_type_id_repository_types_id_fk" FOREIGN KEY ("aliased_type_id") REFERENCES "public"."repository_types" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "repository_types" ADD CONSTRAINT "repository_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "rt_local_filesystem" ADD CONSTRAINT "rt_local_filesystem_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "policies" ADD CONSTRAINT "policies_policy_type_id_policy_types_id_fk" FOREIGN KEY ("policy_type_id") REFERENCES "public"."policy_types" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "policy_types" ADD CONSTRAINT "policy_types_aliased_type_id_policy_types_id_fk" FOREIGN KEY ("aliased_type_id") REFERENCES "public"."policy_types" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "policy_types" ADD CONSTRAINT "policy_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "galleries_policies" ADD CONSTRAINT "galleries_policies_policy_id_policies_id_fk" FOREIGN KEY ("policy_id") REFERENCES "public"."policies" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "galleries_policies" ADD CONSTRAINT "galleries_policies_gallery_id_galleries_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."galleries" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "museums" ADD CONSTRAINT "museums_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "et_debug" ADD CONSTRAINT "et_debug_exhibit_id_exhibits_id_fk" FOREIGN KEY ("exhibit_id") REFERENCES "public"."exhibits" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "et_youtube_channels" ADD CONSTRAINT "et_youtube_channels_exhibit_id_exhibits_id_fk" FOREIGN KEY ("exhibit_id") REFERENCES "public"."exhibits" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "et_youtube_videos" ADD CONSTRAINT "et_youtube_videos_exhibit_id_exhibits_id_fk" FOREIGN KEY ("exhibit_id") REFERENCES "public"."exhibits" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "et_youtube_videos" ADD CONSTRAINT "et_youtube_videos_youtube_channel_id_et_youtube_channels_youtube_id_fk" FOREIGN KEY ("youtube_channel_id") REFERENCES "public"."et_youtube_channels" ("youtube_id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "exhibit_types" ADD CONSTRAINT "exhibit_types_aliased_type_id_exhibit_types_id_fk" FOREIGN KEY ("aliased_type_id") REFERENCES "public"."exhibit_types" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "exhibit_types" ADD CONSTRAINT "exhibit_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_exhibit_type_id_exhibit_types_id_fk" FOREIGN KEY ("exhibit_type_id") REFERENCES "public"."exhibit_types" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_gallery_id_galleries_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."galleries" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_museum_id_museums_id_fk" FOREIGN KEY ("museum_id") REFERENCES "public"."museums" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "apikeys" ADD CONSTRAINT "apikeys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_parent_gallery_id_galleries_id_fk" FOREIGN KEY ("parent_gallery_id") REFERENCES "public"."galleries" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_museum_id_museums_id_fk" FOREIGN KEY ("museum_id") REFERENCES "public"."museums" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "artifact_types" ADD CONSTRAINT "artifact_types_aliased_type_id_artifact_types_id_fk" FOREIGN KEY ("aliased_type_id") REFERENCES "public"."artifact_types" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "artifact_types" ADD CONSTRAINT "artifact_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_artifact_type_id_artifact_types_id_fk" FOREIGN KEY ("artifact_type_id") REFERENCES "public"."artifact_types" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_museum_id_museums_id_fk" FOREIGN KEY ("museum_id") REFERENCES "public"."museums" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "at_audio_recordings" ADD CONSTRAINT "at_audio_recordings_artifact_id_artifacts_id_fk" FOREIGN KEY ("artifact_id") REFERENCES "public"."artifacts" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "at_images" ADD CONSTRAINT "at_images_artifact_id_artifacts_id_fk" FOREIGN KEY ("artifact_id") REFERENCES "public"."artifacts" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "at_note" ADD CONSTRAINT "at_note_artifact_id_artifacts_id_fk" FOREIGN KEY ("artifact_id") REFERENCES "public"."artifacts" ("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "at_videos" ADD CONSTRAINT "at_videos_artifact_id_artifacts_id_fk" FOREIGN KEY ("artifact_id") REFERENCES "public"."artifacts" ("id") ON DELETE no action ON UPDATE no action;