# Moovies Backend - Build & Run Guide

## What Has Been Fixed

### 1. ✅ Environment Variables Loading (.env support)
**File**: `src/index.ts`
- Added `import dotenv from 'dotenv'`
- Added `dotenv.config()` at startup
- **Result**: Now all variables in `.env` will be loaded and available via `process.env`

### 2. ✅ Proto Import Paths
**File**: `scripts/generate-proto.js`
- Fixed all generated imports to use `@/` aliases instead of relative paths
- Fixed proto wrapper generation to properly export namespaced types
- Added explicit type annotations to fix TypeScript strict mode errors
- **Result**: Generated code will compile without "Module not found" errors

### 3. ✅ TypeScript Type Annotations
**File**: `scripts/generate-proto.js`
- Service methods now have explicit `(payload: any): Promise<any>` signatures
- Proto wrapper exports have explicit `as any` type assertion
- **Result**: No more implicit `any` type errors

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 2: Build the Project
```bash
npm run build
# This runs: npm run proto:compile && tsc
```

The build process will:
1. ✅ Clean old generated files
2. ✅ Compile proto files → JS/TS files in `src/proto/`
3. ✅ Generate controllers in `src/controllers/`
4. ✅ Generate services in `src/services/`
5. ✅ Generate modules in `src/modules/`
6. ✅ Compile all TypeScript → JavaScript in `dist/`

### Step 3: Start the Server
```bash
npm start
# Runs: node dist/index.js
# Server starts on http://localhost:3000 (or PORT from .env)
```

## Environment Variables

### Critical Variables (Set in .env)
```env
PORT=3000                    # Server port (default: 3000)
NODE_ENV=development        # development or production
LOG_LEVEL=info              # Logging level
DATABASE_URL=...           # Database connection string
JWT_SECRET=...             # Secret for JWT tokens
```

### Optional Variables
See `.env.example` for complete list of available configuration options

## Project Structure

```
src/
├── index.ts                    # Entry point - loads dotenv
├── main.ts                     # Server setup (NestJS or Express)
├── proto/                      # Generated proto files
│   ├── billing.ts
│   ├── job.ts
│   └── scenario_pool.ts
├── controllers/                # Auto-generated from proto
│   └── index.ts               # Combines all controllers
├── services/                   # Auto-generated from proto
├── modules/                    # Auto-generated from proto
│   └── index.ts               # Exports all modules
└── shared/
    ├── logger.ts              # Logging utility
    ├── config.ts              # Configuration service
    └── middleware/            # Express middleware
```

## Build Troubleshooting

### Error: "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### Error: "Cannot find module '@/proto/...'"
The `@/` alias is defined in `tsconfig.json`. Make sure:
1. TypeScript version is 5.3.3 or newer
2. `tsconfig.json` has the path mapping configured
3. Run `npm run build` (not `tsc` directly)

### Error: "No such file or directory: proto"
The proto directory should be created automatically. If not:
```bash
mkdir -p src/proto
npm run build
```

## Testing the API

Once running, test the API:

```bash
# Check server is alive
curl http://localhost:3000/api

# Expected response:
# {
#   "name": "Moovies Gateway API",
#   "status": "ok",
#   "modules": [...]
# }
```

## Next Steps

1. **Configure the database** - Update `DATABASE_URL` in `.env`
2. **Add API authentication** - Implement JWT verification middleware
3. **Deploy** - Build and deploy the `dist/` folder

## Files Modified in This Session

- `src/index.ts` - Added dotenv loading
- `scripts/generate-proto.js` - Fixed import paths, type annotations, and wrapper generation

## Support

For issues:
1. Check that `npm install` completed successfully
2. Verify Node.js version: `node --version` (should be 18+)
3. Check `.env` file exists and is not gitignored
4. Review build output: `npm run build 2>&1 | tail -50`
