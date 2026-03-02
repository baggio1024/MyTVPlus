import type { OpenNextConfig } from '@opennextjs/cloudflare';

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      proxyExternalRequest: 'fetch',
      incrementalCache: 'dummy',
      tagCache: 'dummy',
      queue: 'dummy',
    },
    // 减小包体积的关键配置
    bundleFormat: 'esm',
    minify: true,
  },
  // 将更多依赖标记为 external，不打包进 Worker
  edgeExternals: [
    'node:crypto',
    'node:async_hooks',
    'node:buffer',
    'node:stream',
    'node:util',
    'node:events',
    'node:path',
    'node:url',
    'node:fs',
    'node:http',
    'node:https',
    'node:net',
    'node:tls',
    'node:dns',
    'node:os',
    'node:zlib',
    'node:vm',
    'node:child_process',
    'node:string_decoder',
    'node:tty',
    'node:assert',
    'node:punycode',
    'node:timers',
    'node:worker_threads',
    // 数据库相关
    'better-sqlite3',
    '@vercel/postgres',
    'redis',
    '@upstash/redis',
    // 解析器
    'cheerio',
    'xml2js',
    'nodemailer',
    // 视频播放器
    'hls.js',
    'flv.js',
    'mux.js',
    'anime4k-webgpu',
    'artplayer',
    'artplayer-plugin-danmuku',
    // Socket
    'socket.io',
    'socket.io-client',
    // 其他大依赖
    'framer-motion',
    'swiper',
    'react-markdown',
    'remark-gfm',
  ],
  middleware: {
    external: true,
    override: {
      wrapper: 'cloudflare-edge',
      converter: 'edge',
      proxyExternalRequest: 'fetch',
      incrementalCache: 'dummy',
      tagCache: 'dummy',
      queue: 'dummy',
    },
  },
  // 代码分割配置
  additionalExternalPackages: [
    'next-pwa',
    'workbox-*',
  ],
};

export default config;
