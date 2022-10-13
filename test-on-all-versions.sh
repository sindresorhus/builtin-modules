#!/usr/bin/env bash
set -Eeuo pipefail

for version in 6 8 10 12 14 16 17 18; do
	fnm use "$version"
	./node_modules/.bin/ava
done
