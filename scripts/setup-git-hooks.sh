#!/bin/sh

set -eu

repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

git config --local core.hooksPath .githooks
echo "Enabled tracked Git hooks for this clone (core.hooksPath=.githooks)."
