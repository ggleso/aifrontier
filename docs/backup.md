# Backup and recovery

## Sources of truth

- GitHub private repository: committed code, documentation, pull requests, and CI history
- Encrypted Time Machine: uncommitted work, local databases, OpenClaw configuration/workspace, and deployment configuration
- Dedicated secret managers: local, CI, and deployment credentials

## Required setup

Configure an encrypted Time Machine destination and verify a test restore. Keep an offline recovery procedure for API access, but never store credential values in Git or this document.

After persistent data or deployment is introduced, document backup frequency, retention, encryption, restore owner, recovery time objective, recovery point objective, and a periodic restore test.
