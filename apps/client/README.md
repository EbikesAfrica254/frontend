# eBikes Customer Portal

Customer-facing web portal for eBikes Africa users.

## What It Does

Provides authenticated access for customers to:

- Place and track delivery orders
- Manage account information
- View order history
- Track delivery status
- Manage payment methods

## Setup

### 1. Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Configure the following variables in `.env.local`:

```bash
# Keycloak Configuration
KEYCLOAK_CLIENT_ID=ebikes-resources
KEYCLOAK_CLIENT_SECRET=your-resources-secret-from-keycloak
KEYCLOAK_ISSUER=https://keycloak.yourdomain.com/realms/ebikes

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
```

**Getting Keycloak credentials:**

1. Access Keycloak Admin Console
2. Navigate to Clients → `ebikes-client`
3. Copy Client ID and Client Secret
4. Issuer URL follows pattern: `https://{keycloak-domain}/realms/{realm-name}`

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### 2. Install Dependencies

From monorepo root:

```bash
pnpm install
```

### 3. Run Development Server

```bash
cd apps/resources
pnpm dev
```

Access at: http://localhost:3000

## Authentication Flow

1. Navigate to http://localhost:3000
2. Automatically redirects to Keycloak login
3. After successful authentication, redirects back to portal
4. Session persists via JWT stored in HTTP-only cookies

## Production Build

```bash
pnpm build
pnpm start
```

## Port Configuration

Default: `3000` (configured in `package.json` dev script)

To change port:

```bash
next dev --port 3001
```

Update `NEXTAUTH_URL` in `.env.local` accordingly.
