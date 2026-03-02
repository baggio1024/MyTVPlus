# Cloudflare 构建脚本
$env:BUILD_TARGET = 'cloudflare'
pnpm gen:manifest
npx @opennextjs/cloudflare build