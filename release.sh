#!/usr/bin/env bash
# Local reproduction of .github/workflows/build_test_publish.yml.
# Runs the React test matrix, npm publish, and Cloudflare Pages deploy inside
# ephemeral Docker containers, pulling secrets from 1Password on demand so
# nothing lands on disk or in the host environment long-term.

set -eo pipefail

cd "$(dirname "$0")"

IMAGE="node:$(cat .node-version)"
PM_SPEC=$(node -p "require('./package.json').packageManager" 2>/dev/null || echo "pnpm@8.15.3")
OP_NPM="op://Private/react-social-icons/npm_token"
OP_CF="op://Private/react-social-icons/cloudflare_token"

usage() {
  cat <<'EOF'
Usage: ./release.sh <subcommand>

Subcommands:
  test          Run the React 16/17/18/19 test matrix in Docker containers.
                Mirrors the `test` job in .github/workflows/build_test_publish.yml.
  publish       Publish the current package.json version to npm.
                Pulls the npm token from 1Password at:
                  op://Private/react-social-icons/npm_token
  deploy-docs   Build the documentation site and deploy to Cloudflare Pages.
                Pulls the Cloudflare API token from 1Password at:
                  op://Private/react-social-icons/cloudflare_token
  all           Run test -> publish -> deploy-docs (full CI parity).
  help          Show this message.

Prerequisites:
  - Docker running locally (the node image will be pulled on first use).
  - 1Password CLI (`op`) installed and signed in (`eval $(op signin)`).
  - Items exist at the op:// paths listed above.

Notes:
  - Phases run in ephemeral containers via a tar-pipe of the working tree;
    your host node_modules and pnpm-lock.yaml are NOT modified by the
    React matrix sweep.
  - The package version comes from the current package.json - bump and
    commit before running `publish`.
EOF
}

die() { echo "error: $*" >&2; exit 1; }

preflight_docker() {
  command -v docker >/dev/null 2>&1 || die "docker not found on PATH"
  docker info >/dev/null 2>&1 || die "docker daemon not reachable - is Docker running?"
}

preflight_op() {
  command -v op >/dev/null 2>&1 || die "1Password CLI (op) not found on PATH"
  op whoami >/dev/null 2>&1 || die "1Password CLI not signed in. Run: eval \$(op signin)"
}

# Tar-pipe the repo into an ephemeral container and run a shell command.
# Usage: run_in_container [docker-run-flags...] -- "shell command"
# Pass -e NAME (value inherited from caller's env) to forward secrets without
# putting them in docker's argv.
run_in_container() {
  local -a docker_args=()
  local cmd=""
  while [[ $# -gt 0 ]]; do
    if [[ "$1" == "--" ]]; then
      shift; cmd="$*"; break
    fi
    docker_args+=("$1"); shift
  done
  [[ -n "$cmd" ]] || die "run_in_container: missing command"

  # COPYFILE_DISABLE=1 keeps BSD tar (macOS) from emitting AppleDouble `._*`
  # companion files for entries that carry extended attributes — those would
  # otherwise extract as siblings in the container and break globs/readdir.
  COPYFILE_DISABLE=1 tar \
    --exclude=./node_modules \
    --exclude=./.git \
    --exclude=./dist \
    --exclude=./www/dist \
    --exclude=./.DS_Store \
    -cf - . \
  | docker run --rm -i -w /work -e _PM_SPEC="$PM_SPEC" "${docker_args[@]}" "$IMAGE" \
      bash -ec "tar xf - && npm install -g \"\$_PM_SPEC\" >/dev/null 2>&1 && $cmd"
}

cmd_test() {
  preflight_docker
  local failed=0
  for v in 16 17 18 19; do
    echo "──────────────── React $v ────────────────"
    local rtl_update="@testing-library/react"
    [[ "$v" -lt 18 ]] && rtl_update="@testing-library/react@12"
    if run_in_container -- "
      set -e
      pnpm install
      pnpm update react@$v react-dom@$v $rtl_update
      pnpm test
    "; then
      echo "✓ React $v passed"
    else
      echo "✗ React $v failed"
      failed=1
    fi
  done
  [[ "$failed" -eq 0 ]] || die "one or more React matrix runs failed"
  echo "✓ matrix passed"
}

cmd_publish() {
  preflight_docker
  preflight_op
  echo "Reading npm token from 1Password..."
  local token
  token=$(op read "$OP_NPM") || die "failed to read $OP_NPM"
  [[ -n "$token" ]] || die "empty token from $OP_NPM"
  export NODE_AUTH_TOKEN="$token"
  # Write .npmrc inside the container so the token never lands on the host
  # filesystem. pnpm interpolates ${NODE_AUTH_TOKEN} at read time.
  run_in_container -e NODE_AUTH_TOKEN -- '
    set -e
    printf "//registry.npmjs.org/:_authToken=\${NODE_AUTH_TOKEN}\n" > "$HOME/.npmrc"
    pnpm install
    pnpm publish --no-git-checks
  '
  unset NODE_AUTH_TOKEN
  echo "✓ publish complete"
}

cmd_deploy_docs() {
  preflight_docker
  preflight_op
  echo "Reading Cloudflare token from 1Password..."
  local token
  token=$(op read "$OP_CF") || die "failed to read $OP_CF"
  [[ -n "$token" ]] || die "empty token from $OP_CF"
  export CLOUDFLARE_API_TOKEN="$token"
  run_in_container -e CLOUDFLARE_API_TOKEN -- '
    set -e
    pnpm install
    ./cli build:www
    pnpm wrangler pages deploy --project-name react-social-icons www/dist
  '
  unset CLOUDFLARE_API_TOKEN
  echo "✓ docs deployed"
}

cmd_all() {
  cmd_test
  cmd_publish
  cmd_deploy_docs
}

case "${1:-help}" in
  test)        cmd_test ;;
  publish)     cmd_publish ;;
  deploy-docs) cmd_deploy_docs ;;
  all)         cmd_all ;;
  help|-h|--help) usage ;;
  *)           usage; exit 1 ;;
esac
