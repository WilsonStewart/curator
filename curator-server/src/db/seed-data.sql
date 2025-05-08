-- -- -- -- -- -- -- -- -- -- -- -- --
-- The following is for migration 0001:

INSERT INTO
    users (id, user_id)
VALUES
    ('0196c522-b498-764d-b9a5-1899a93bbee2', 'SYSTEM');

--> statement-breakpoint
INSERT INTO
    museums (id, name, created_by)
VALUES
    (
        '0196c524-461b-7821-b45a-b0dd02d76aa8',
        'default',
        '0196c522-b498-764d-b9a5-1899a93bbee2'
    );

--> statement-breakpoint
INSERT INTO
    galleries (id, name, created_by, museum_id)
VALUES
    (
        '0196c525-2859-7906-af98-9f29606ccc0f',
        'root',
        '0196c522-b498-764d-b9a5-1899a93bbee2',
        '0196c524-461b-7821-b45a-b0dd02d76aa8'
    );

--> statement-breakpoint
INSERT INTO
    exhibit_types (id, name, display_name, created_by)
VALUES
    (
        '0196c52d-46b3-78aa-886e-b22e72f85274',
        'youtube_channel',
        'YouTube Channel',
        '0196c522-b498-764d-b9a5-1899a93bbee2'
    );
--> statement-breakpoint
INSERT INTO
    exhibit_types (id, name, display_name, created_by)
VALUES
    (
        '0196c52f-e0d5-7022-8267-a679af2c71fc',
        'youtube_video',
        'YouTube Video',
        '0196c522-b498-764d-b9a5-1899a93bbee2'
    );
--> statement-breakpoint
INSERT INTO
    artifact_types (id, name, display_name, created_by)
VALUES
    (
        '0196c531-29bb-7b17-837c-f7d9fe520b8a',
        'audio',
        'Audio Recording',
        '0196c522-b498-764d-b9a5-1899a93bbee2'
    );
--> statement-breakpoint
INSERT INTO
    artifact_types (id, name, display_name, created_by)
VALUES
    (
        '0196c531-467b-7957-8357-006459a26d06',
        'video',
        'Video Recording',
        '0196c522-b498-764d-b9a5-1899a93bbee2'
    );
--> statement-breakpoint
INSERT INTO
    artifact_types (id, name, display_name, created_by)
VALUES
    (
        '0196c540-29be-7c74-ac3c-ea33acf88e11',
        'image',
        'Image',
        '0196c522-b498-764d-b9a5-1899a93bbee2'
    );
--> statement-breakpoint
INSERT INTO
    artifact_types (id, name, display_name, is_alias, aliased_type_id, created_by)
VALUES
    (
        '0196c536-2f90-7003-95e6-888fa7d71be7',
        'youtube_video_thumbnail',
        'YouTube Video Thumbnail',
        true,
        '0196c540-29be-7c74-ac3c-ea33acf88e11'
        '0196c522-b498-764d-b9a5-1899a93bbee2'
    );
--> statement-breakpoint
INSERT INTO
    artifact_types (id, name, display_name, is_alias, aliased_type_id, created_by)
VALUES
    (
        '0196c541-1eab-7195-bcb3-7240fedbc32d',
        'youtube_channel_thumbnail',
        'YouTube Channel Thumbnail',
        true,
        '0196c540-29be-7c74-ac3c-ea33acf88e11'
        '0196c522-b498-764d-b9a5-1899a93bbee2'
    );
--> statement-breakpoint

-- End of things for migration 0001
-- -- -- -- -- -- -- -- -- -- -- --