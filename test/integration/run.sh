#!/usr/bin/env bash

thisdir=$(dirname "$0")
rootdir="$thisdir/../.."

run_next_integration_test() {
	targetdir="$1"

	node_version=$(cat "$rootdir/.node-version" | tr -d " \t\n")
	git_repo="couetilc/react-social-icons"

	docker build --no-cache --progress plain \
		--build-arg "NODE_VERSION=$node_version" \
		-t "$git_repo:test-integration-$targetdir" \
		"$thisdir/$targetdir"

	docker run -a STDOUT -a STDERR "$git_repo:test-integration-$targetdir"

	errno="$?"

	if [ "$errno" -eq "1" ]; then
		echo "🚨 Test Failure"
		trap 'exit 1' EXIT
	else
		echo "✅ Test Success"
	fi
}

setup
run_next_integration_test "next-without-router"
run_next_integration_test "next-with-router"
