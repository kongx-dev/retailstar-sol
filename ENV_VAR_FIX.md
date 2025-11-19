# Environment Variables Fix

## Problem
The app was crashing in production because Supabase environment variables were `undefined`. This happened because:

1. **Vite embeds env vars at BUILD TIME** - not runtime
2. If env vars aren't available during `npm run build`, they'll be `undefined` in the production bundle
3. The Dockerfile was building without passing env vars to the build process

## Solution

We've implemented a **dual approach** that works in both scenarios:

### 1. Build-Time Configuration (Preferred)
- Dockerfile now accepts build arguments for env vars
- These are passed to Vite during the build process
- Env vars are baked into the JavaScript bundle

### 2. Runtime Configuration (Fallback)
- Created `runtime-config.js` that can be generated at container startup
- App checks both build-time vars AND runtime config
- Works even if build-time vars weren't set

## How It Works

### Build-Time (Docker)
```bash
docker build \
  --build-arg VITE_SUPABASE_URL=https://your-project.supabase.co \
  --build-arg VITE_SUPABASE_ANON_KEY=your-key \
  -t retailstar .
```

### Runtime (Docker Compose)
The entrypoint script automatically generates `runtime-config.js` from environment variables when the container starts:

```yaml
environment:
  - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
  - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
```

### Code Flow
1. App checks `import.meta.env.VITE_SUPABASE_URL` (build-time)
2. If not found, checks `window.__RUNTIME_CONFIG__.VITE_SUPABASE_URL` (runtime)
3. If still not found, app runs in fallback mode (no database features)

## Files Changed

1. **`src/lib/supabase.ts`** - Now checks both build-time and runtime config
2. **`Dockerfile`** - Accepts build args and generates runtime config on startup
3. **`docker-compose.yml`** - Passes env vars as both build args and runtime env
4. **`scripts/generate-runtime-config.js`** - Generates runtime config from env vars
5. **`index.html`** - Loads runtime-config.js before app bundle
6. **`public/runtime-config.js`** - Template runtime config file

## Deployment Instructions

### Option 1: Docker Compose (Recommended)
1. Create a `.env` file in the project root:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

2. Build and run:
   ```bash
   docker compose up --build
   ```

### Option 2: Docker Build with Args
```bash
docker build \
  --build-arg VITE_SUPABASE_URL=https://your-project.supabase.co \
  --build-arg VITE_SUPABASE_ANON_KEY=your-anon-key \
  -t retailstar .

docker run -p 8080:80 \
  -e VITE_SUPABASE_URL=https://your-project.supabase.co \
  -e VITE_SUPABASE_ANON_KEY=your-anon-key \
  retailstar
```

### Option 3: Manual Runtime Config
If you can't set env vars during build, you can manually edit `public/runtime-config.js` before building, or replace it after deployment.

## Verification

After deployment, check the browser console:
- ✅ Should see: `ENV SOURCE: Build-time` or `ENV SOURCE: Runtime config`
- ✅ Should see: `✅ Supabase initialized: https://...`
- ❌ If you see warnings, env vars aren't set correctly

## Troubleshooting

### Still seeing `undefined`?
1. **Check build logs** - Are env vars being passed during build?
2. **Check container logs** - Is runtime-config.js being generated?
3. **Check browser console** - What does "ENV SOURCE" say?
4. **Verify file exists** - Can you access `/runtime-config.js` in browser?

### App works but database features don't?
- This is expected if Supabase isn't configured
- App will run in fallback mode with static data
- Check console for warnings about missing Supabase








