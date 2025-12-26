-- Custom SQL migration file, put your code below! ---- -- -- -- -- -- -- -- -- -- -- -- --
-- The following is for migration 0001:
INSERT INTO
    metadata (id)
VALUES
    ('curatorMetadata');

--> statement-breakpoint
INSERT INTO
    users (id, name, email) OVERRIDING SYSTEM VALUE
VALUES
    (
        '019911be-0680-7fb9-84aa-694831111dad',
        'SYSTEM',
        'system@curator.local'
    );

--> statement-breakpoint
INSERT INTO
    users (id, name, email) OVERRIDING SYSTEM VALUE
VALUES
    (
        '019b35b9-1589-7168-90db-3d71095448e4',
        'admin',
        'admin@curator.local'
    );

--> statement-breakpoint
INSERT INTO
    museums (id, name, safe_name, created_by) OVERRIDING SYSTEM VALUE
VALUES
    (
        '019911c3-0611-7f70-8432-085904fd7cc2',
        'Default Museum',
        'default-museum',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    galleries (id, name, safe_name, museum_id, created_by) OVERRIDING SYSTEM VALUE
VALUES
    (
        '019911c8-bfac-7f90-9e05-f9b681338ccc',
        'ROOT',
        'root',
        '019911c3-0611-7f70-8432-085904fd7cc2',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    exhibit_types (id, name, created_by)
VALUES
    (
        '019911c8-27fc-7e81-9293-6f6cd3265e5a',
        'YouTube Channel',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    exhibit_types (id, name, created_by)
VALUES
    (
        '019911c8-781f-7e79-8dc5-bc1c798cc5dc',
        'YouTube Video',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    exhibit_types (id, name, created_by)
VALUES
    (
        '019b35b9-72d5-7081-8125-83909ba9fb96',
        'Debug',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    artifact_types (id, name, created_by)
VALUES
    (
        '019911c8-a343-770d-9b91-4dc6ed8f68cc',
        'Audio Recording',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    artifact_types (id, name, created_by)
VALUES
    (
        '019911c9-9c4a-7515-9190-72f78e3fd93b',
        'Video Recording',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    artifact_types (id, name, created_by)
VALUES
    (
        '019911c9-8ab8-7532-a2b6-74a0fbfed011',
        'Image',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    artifact_types (id, name, created_by)
VALUES
    (
        '019b35b9-dac5-7d19-aeee-9b605cb02297',
        'Note',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    repository_types (id, name, safe_name, created_by)
VALUES
    (
        '019911ca-1ad8-70fc-a897-6e7f5c37eaa5',
        'Local Filesystem',
        'local_filesystem',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    repositories (
        id,
        repository_type_id,
        name,
        safe_name,
        role,
        created_by
    ) OVERRIDING SYSTEM VALUE
VALUES
    (
        '019911c0-d39b-737b-95b8-9c20dbc87db0',
        '019911ca-1ad8-70fc-a897-6e7f5c37eaa5',
        'Media',
        'media',
        'media',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    repositories (
        id,
        repository_type_id,
        name,
        safe_name,
        role,
        created_by
    ) OVERRIDING SYSTEM VALUE
VALUES
    (
        '0199151e-3b59-78db-a24b-de3301ee279a',
        '019911ca-1ad8-70fc-a897-6e7f5c37eaa5',
        'TEMP',
        'temp',
        'temp',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    repositories (
        id,
        repository_type_id,
        name,
        safe_name,
        role,
        created_by
    ) OVERRIDING SYSTEM VALUE
VALUES
    (
        '01991518-1159-7aad-860d-fc553377b794',
        '019911ca-1ad8-70fc-a897-6e7f5c37eaa5',
        'Ingest',
        'ingest',
        'ingest',
        '019911be-0680-7fb9-84aa-694831111dad'
    );

--> statement-breakpoint
INSERT INTO
    rt_local_filesystem (repository_id, path)
VALUES
    (
        '019911c0-d39b-737b-95b8-9c20dbc87db0',
        '/app/.repositories/media'
    )
    --> statement-breakpoint
INSERT INTO
    rt_local_filesystem (repository_id, path)
VALUES
    (
        '01991518-1159-7aad-860d-fc553377b794',
        '/app/.repositories/ingest'
    )
    --> statement-breakpoint
INSERT INTO
    rt_local_filesystem (repository_id, path)
VALUES
    (
        '0199151e-3b59-78db-a24b-de3301ee279a',
        '/app/.repositories/temp'
    )
    --> statement-breakpoint
    -- End of things for migration 0001
    -- -- -- -- -- -- -- -- -- -- -- --