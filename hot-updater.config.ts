import {bare} from '@hot-updater/bare';
import {d1Database, r2Storage} from '@hot-updater/cloudflare';
import {config} from 'dotenv';
import {defineConfig} from 'hot-updater';

config({path: '.env.hotupdater'});

export default defineConfig({
  console: {
    port: 3001,
  },
  build: bare({enableHermes: true}),
  storage: r2Storage({
    bucketName: process.env.HOT_UPDATER_CLOUDFLARE_R2_BUCKET_NAME!,
    accountId: process.env.HOT_UPDATER_CLOUDFLARE_ACCOUNT_ID!,
    cloudflareApiToken: process.env.HOT_UPDATER_CLOUDFLARE_API_TOKEN!,
  }),
  database: d1Database({
    databaseId: process.env.HOT_UPDATER_CLOUDFLARE_D1_DATABASE_ID!,
    accountId: process.env.HOT_UPDATER_CLOUDFLARE_ACCOUNT_ID!,
    cloudflareApiToken: process.env.HOT_UPDATER_CLOUDFLARE_API_TOKEN!,
  }),
  updateStrategy: 'appVersion', // or "fingerprint"
});
