# Development Authentication Bypass

This system allows you to bypass authentication during development when the backend is unavailable or being refactored.

## Quick Start

1. **Enable bypass mode**: The `.env.local` file has been created with `VITE_BYPASS_AUTH=true`
2. **Start development server**: `npm run dev` or `pnpm dev`
3. **Access dashboard directly**: Navigate to any dashboard route (e.g., `/demo-company/admin/dashboard`)

## Environment Variables

Configure these in `.env.local`:

```bash
# Enable/disable bypass (true/false)
VITE_BYPASS_AUTH=true

# Mock tenant slug for development
VITE_DEV_TENANT_SLUG=demo-company

# Mock user role (TENANT_ADMIN or MEMBER)
VITE_DEV_USER_ROLE=TENANT_ADMIN
```

## Direct Dashboard Access

With bypass enabled, you can directly access:

- **Admin Dashboard**: `/demo-company/admin/dashboard`
- **Products**: `/demo-company/admin/products`
- **Orders**: `/demo-company/admin/orders`
- **Settings**: `/demo-company/admin/settings`
- **Analytics**: `/demo-company/admin/analytics`

## Visual Indicators

- **Orange banner** at top of page shows when bypass is active
- **Console logs** with 🔧 emoji indicate bypass operations
- **Mock user data** appears as "John Doe (Dev)" in UI

## Switching Back to Real Auth

1. **Disable bypass**: Set `VITE_BYPASS_AUTH=false` in `.env.local`
2. **Restart dev server**: Required for env var changes
3. **Normal auth flow**: Will redirect to `/login` as expected

## Mock Data Details

**User Profile:**

- Name: John Doe (Dev)
- Email: dev@example.com
- Role: TENANT_ADMIN (configurable)
- Tenant: demo-company (configurable)

**Tokens:**

- Access Token: dev-access-token-123
- CSRF Token: dev-csrf-token-123
- Expires: 24 hours from startup

## Troubleshooting

**Issue: Still redirecting to login**

- Check `.env.local` exists and has `VITE_BYPASS_AUTH=true`
- Restart development server after env changes
- Clear browser cache/localStorage

**Issue: Wrong dashboard URL**

- Update `VITE_DEV_TENANT_SLUG` in `.env.local`
- Restart dev server

**Issue: Permission errors**

- Check `VITE_DEV_USER_ROLE` is set correctly
- Use `TENANT_ADMIN` for full access

## Security Note

⚠️ **Important**: This bypass is automatically disabled in production builds. The `.env.local` file should never be committed to version control.
