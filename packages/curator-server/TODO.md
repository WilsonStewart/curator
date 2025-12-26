# TODO: Implement convertRealSemverToSplitVersion Function

## Information Gathered

- The function exists but is incomplete in `/workspaces/curator/packages/curator-server/src/lib/version.ts`
- Need to handle anything after patch version (pre-release identifiers and build metadata)
- The function should return an object with major, minor, patch, and notes properties
- If nothing exists after patch, notes should be empty string
- Do NOT modify SEMVER_REGEX - make this standalone

## Plan

1. Implement `convertRealSemverToSplitVersion` function to:
   - Parse semantic version strings with optional pre-release/build metadata
   - Extract major, minor, patch numbers using regex
   - Extract notes (everything after patch: "-rc.1", "-beta+build.1", etc.)
   - Return object with major, minor, patch, and notes properties
   - Handle empty notes case

## Dependent Files to be edited

- `/workspaces/curator/packages/curator-server/src/lib/version.ts` - Implement the function

## Followup steps

- Test the function with various semver formats
