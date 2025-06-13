-- -- -- -- -- -- -- -- -- -- -- -- --
-- The following is for migration 0001:
INSERT INTO
    metadata (id)
VALUES
    ('curatorMetadata');

--> statement-breakpoint
INSERT INTO
    users (id, name, email) OVERRIDING SYSTEM VALUE
VALUES
    ('01JXJWRHD2N17HVE9KZZZDADDY', 'system', 'system@curator.bellbellbell.com');

--> statement-breakpoint
INSERT INTO
    museums (id, display_name, created_by) OVERRIDING SYSTEM VALUE
VALUES
    ('01JXJYQXH6A9GXPJF5V50Q1WES', 'Default', '01JXJWRHD2N17HVE9KZZZDADDY');

--> statement-breakpoint
INSERT INTO
    galleries (id, display_name, museum_id, created_by) OVERRIDING SYSTEM VALUE
VALUES
    ('01JXJXWGH0X1Q1KZFY6PDDZT43', 'ROOT', '01JXJYQXH6A9GXPJF5V50Q1WES', '01JXJWRHD2N17HVE9KZZZDADDY');

--> statement-breakpoint
INSERT INTO
    exhibit_types (id, display_name, created_by)
VALUES
    ('01JXJXZJCREM9Q5W9XX3WB1C13', 'YouTube Channel', '01JXJWRHD2N17HVE9KZZZDADDY');

--> statement-breakpoint
INSERT INTO
    exhibit_types (id, display_name, created_by)
VALUES
    ('01JXJY0510HN94TB4Z4S9C5ZKM', 'YouTube Video', '01JXJWRHD2N17HVE9KZZZDADDY');

--> statement-breakpoint
INSERT INTO
    artifact_types (id, display_name, created_by)
VALUES
    ('01JXJY0J4JBHR56N63CR082AZQ', 'Audio Recording', '01JXJWRHD2N17HVE9KZZZDADDY');

--> statement-breakpoint
INSERT INTO
    artifact_types (id, display_name, created_by)
VALUES
    ('01JXJY0ZXVECEKEMJT548BMWP6', 'Video Recording', '01JXJWRHD2N17HVE9KZZZDADDY');

--> statement-breakpoint
INSERT INTO
    artifact_types (id, display_name, created_by)
VALUES
    ('01JXJY18WSJ31PP536WWN4XRPV', 'Image', '01JXJWRHD2N17HVE9KZZZDADDY');

--> statement-breakpoint
INSERT INTO
    repository_types (id, display_name, created_by)
VALUES
    ('01JXJY1FGVHRWFC9BTYE7W9F9F', 'Local Filesystem', '01JXJWRHD2N17HVE9KZZZDADDY');

--> statement-breakpoint
-- End of things for migration 0001
-- -- -- -- -- -- -- -- -- -- -- --