-- -- -- -- -- -- -- -- -- -- -- -- --
-- The following is for migration 0001:
INSERT INTO
    metadata (id)
VALUES
    ('curatorMetadata');

--> statement-breakpoint
INSERT INTO
    users (id, eid, user_id, display_name) OVERRIDING SYSTEM VALUE
VALUES
    (1, '44AXOdad', 'system', 'SYSTEM');

--> statement-breakpoint
INSERT INTO
    museums (id, eid, display_name, created_by) OVERRIDING SYSTEM VALUE
VALUES
    (1, 'sU4ywaaa', 'Default', 1);

--> statement-breakpoint
INSERT INTO
    galleries (id, eid, display_name, museum_id, created_by) OVERRIDING SYSTEM VALUE
VALUES
    (1, "nei2EWUP", 'ROOT', 1, 1,);

--> statement-breakpoint
INSERT INTO
    exhibit_types (eid, display_name, created_by)
VALUES
    ('3q9qai4i', 'YouTube Channel', 1);

--> statement-breakpoint
INSERT INTO
    exhibit_types (eid, display_name, created_by)
VALUES
    ('PM2FReUH', 'YouTube Video', 1);

--> statement-breakpoint
INSERT INTO
    artifact_types (eid, display_name, created_by)
VALUES
    ('H5VgagDq', 'Audio Recording', 1);

--> statement-breakpoint
INSERT INTO
    artifact_types (eid, display_name, created_by)
VALUES
    ('MrHYJMGm', 'Video Recording', 1);

--> statement-breakpoint
INSERT INTO
    artifact_types (eid, display_name, created_by)
VALUES
    ('VbbYaRNr', 'Image', 1);

--> statement-breakpoint
INSERT INTO
    repository_types (eid, display_name, museum_id, created_by)
VALUES
    ('ALDCUTTR', 'Local Filesystem', 1, 1);

--> statement-breakpoint
-- End of things for migration 0001
-- -- -- -- -- -- -- -- -- -- -- --