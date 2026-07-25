# @D0C CLI - AI Premium Studio Monorepo

A modern development toolkit for the AI Premium Studio monorepo with 7 Micro Frontend (MFE) applications.

## Quick Start

```bash
# Start all MFEs in development mode
yarn dev

# Build all packages and applications
yarn build

# Run the interactive shell + MFE demo
yarn demo

# Display the architecture diagram
yarn arch
```

## Installation

The CLI is automatically available after `yarn install`. No additional setup required!

## Available Commands

### `yarn dev [--app name]`

Start development servers for all MFEs or a specific app.

**Options:**
- `--app <name>` - Start only a specific app (e.g., `mfe-admin`, `mfe-auth`)

**Examples:**
```bash
# Start all MFEs
yarn dev

# Start only mfe-admin
yarn dev --app admin

# Start all apps containing "mfe-"
yarn dev --app mfe
```

**Features:**
- Starts Vite dev servers for Vue apps
- Hot module reloading enabled
- Parallel startup with staggered port allocation
- Color-coded output for easy debugging

### `yarn build [--app name]`

Compile all packages and applications or specific ones.

**Options:**
- `--app <name>` - Build only matching app/package

**Examples:**
```bash
# Build everything
yarn build

# Build specific app
yarn build --app shared

# Build all apps containing "mfe-"
yarn build --app mfe
```

**Output:**
- Compiled packages placed in each app's `dist/` directory
- Success/failure summary at the end
- Exits with error code if any build fails

### `yarn serve --app <name> [--port 3000]`

Serve a previously built application via HTTP server.

**Options:**
- `--app <name>` - **Required.** App to serve (from `apps/<name>/dist`)
- `--port <number>` - Port to listen on (default: 3000)

**Examples:**
```bash
# Serve mfe-admin on default port 3000
yarn serve --app admin

# Serve mfe-catalog on custom port
yarn serve --app catalog --port 3001
```

### `yarn demo`

Run an interactive demonstration of the shell + MFE architecture.

Simulates:
1. MFE registration in the shell
2. Module initialization and bootstrap
3. Route mapping across all MFEs
4. Inter-module communication via EventBus
5. Event emission and handling

**Example Output:**
```
✓ Shell initialized with 7 MFEs
✓ 18 total routes registered
✓ EventBus ready for inter-module communication
```

### `yarn arch`

Display a detailed ASCII diagram of the monorepo architecture.

Shows:
- Shell application structure
- 9 MFE applications and their ports
- EventBus communication pattern
- Data flow between modules
- Benefits and advantages of the architecture

## Project Structure

```
ai-premium.studio/
├── apps/                           # Micro Frontend applications
│   ├── mfe-admin/                 # Analytics dashboard
│   ├── mfe-auth/                  # Authentication & profile
│   ├── mfe-catalog/               # Gallery & content
│   ├── mfe-commerce/              # Checkout & cart
│   ├── mfe-launch/                # Funnel stepper
│   ├── mfe-legal/                 # Legal pages
│   ├── mfe-marketing/             # Landing, home, marketing
│   └── shell/                     # Host shell application
│
├── packages/                       # Shared packages
│   └── shared/                    # @d0c/shared - Types, stores, utilities
│
├── @d0c/                          # Local @d0c namespace packages
│   ├── cr1bl3-cli/               # Build tool & dev server
│   └── cr1bl3-lib/               # Frontend framework
│
├── scripts/                        # Development scripts
│   ├── cli.js                    # Root CLI entry point
│   ├── dev.js                    # Dev server launcher
│   ├── build.js                  # Build all packages
│   ├── serve.js                  # HTTP server for built apps
│   ├── demo.js                   # Architecture demo
│   ├── architecture.js           # Architecture diagram
│   └── ...                       # Other utilities
│
└── package.json                   # Root monorepo config
```

## Package Namespace

All packages use the `@d0c` namespace:
- `@d0c/shared` - Shared utilities, types, stores, composables
- `@d0c/mfe-admin` - Admin MFE
- `@d0c/mfe-auth` - Auth MFE
- `@d0c/mfe-catalog` - Catalog MFE
- `@d0c/mfe-commerce` - Commerce MFE
- `@d0c/mfe-launch` - Launch MFE
- `@d0c/mfe-legal` - Legal MFE
- `@d0c/mfe-marketing` - Marketing MFE
- `@d0c/shell` - Shell host
- `@d0c/cr1bl3-cli` - Build tool
- `@d0c/cr1bl3-lib` - Framework library

## Development Workflow

### 1. Development Mode

```bash
# Terminal 1: Start all MFEs
yarn dev

# Or start just one:
yarn dev --app admin
```

Each MFE runs on its own port and has hot module reloading.

### 2. Building for Production

```bash
# Build all apps
yarn build

# Verify the build succeeded
ls -la apps/mfe-admin/dist/
```

### 3. Serving Built Apps

```bash
# Serve a built app locally
yarn serve --app admin --port 3001

# Open http://localhost:3001 in your browser
```

### 4. Testing Integration

```bash
# Run the architectural demo
yarn demo

# Display the architecture diagram
yarn arch
```

## Workspace Management

### Adding Dependencies

```bash
# Add to a specific package
cd apps/mfe-admin
yarn add axios

# Add to all packages
yarn workspaces add axios
```

### Installing Dependencies

```bash
# Install all dependencies across the monorepo
yarn install

# Clean and reinstall
rm -rf node_modules && yarn install
```

## Environment Variables

Each app can use environment variables for configuration:

```bash
# .env.local (in each app directory)
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=MyApp
```

Variables are accessible via `import.meta.env.*` in Vite apps.

## Troubleshooting

### Port Already in Use

If you see "Address already in use", either:
1. Kill the process using the port
2. Use a different port with `--port` option
3. Wait a few seconds and try again

### Build Failures

```bash
# Clear node_modules and reinstall
yarn clean
yarn install

# Build with verbose output
yarn build --verbose
```

### Dependency Issues

```bash
# Reset yarn cache
yarn cache clean

# Reinstall everything
rm -rf node_modules yarn.lock
yarn install
```

## Advanced Usage

### Custom Root CLI Command

After `yarn install`, you can use the global `ai-studio` command:

```bash
ai-studio dev
ai-studio build
ai-studio demo
```

### Running Individual App Scripts

Each app has its own scripts:

```bash
# Run app-specific build
cd apps/mfe-admin && yarn build

# Run app-specific dev server
cd apps/mfe-auth && yarn dev
```

## Architecture Benefits

✅ **Scalability** - Add new MFEs without affecting others
✅ **Maintenance** - Each module evolves independently
✅ **Testability** - Isolated unit tests per module
✅ **Teams** - Multiple teams work in parallel
✅ **Deployment** - Deploy single MFE without full redeploy
✅ **Resilience** - One module failure doesn't crash the app

## For More Information

- See `scripts/architecture.js` for detailed architecture overview
- Check individual app `package.json` files for app-specific scripts
- Review `packages/shared/` for shared types and utilities
- Explore `@d0c/cr1bl3-cli/` for build tool documentation
