# Environment Switching Guide

This guide explains how to quickly switch between development and production Convex environments.

## Quick Commands

### Switch to Development
```bash
npm run env:dev
```

### Switch to Production
```bash
npm run env:prod
```

After switching, **restart your dev server**:
1. Stop the current server (Ctrl+C)
2. Run: `npm run dev`

## Current Environments

### Development (disciplined-quail-9)
- **Deployment**: `dev:disciplined-quail-9`
- **URL**: https://disciplined-quail-9.convex.cloud
- **Dashboard**: https://dashboard.convex.dev/d/disciplined-quail-9
- **Use for**: Testing, experimentation, development work

### Production (sensible-ermine-579)
- **Deployment**: `prod:sensible-ermine-579`
- **URL**: https://sensible-ermine-579.convex.cloud
- **Dashboard**: https://dashboard.convex.dev/d/sensible-ermine-579
- **Use for**: Real data, live workflows, end users

## What Gets Changed

The switch command updates `.env.local` with the following variables:
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL`

All other environment variables (Azure auth, API keys, etc.) remain unchanged.

## Workflow Example

**Working on a new feature:**
```bash
# 1. Switch to dev
npm run env:dev

# 2. Restart server
npm run dev

# 3. Build and test your feature
# ... make changes ...

# 4. When ready to deploy, switch to prod
npm run env:prod

# 5. Restart server to connect to production
npm run dev

# 6. Test in production environment
```

## Important Notes

1. **Restart Required**: Changes only take effect after restarting the dev server
2. **Database Isolation**: Dev and prod have completely separate databases
3. **User Accounts**: You may need to log in separately for each environment
4. **Admin Roles**: Admin roles are set per environment (check Convex dashboard)
5. **Workflows**: Workflows don't automatically sync between environments (use migration script)

## Checking Current Environment

### In Terminal
```bash
# View dev environment variables
npm run convex:env

# View prod environment variables
npm run convex:env:prod
```

### In Browser Console
```javascript
// Check which environment you're connected to
console.log(process.env.NEXT_PUBLIC_CONVEX_URL);
```

### In Application
Look at the browser URL bar - the application always runs on `http://localhost:3000` but connects to different Convex backends.

## Troubleshooting

### "Still seeing old data after switching"
- Clear browser cache and cookies
- Hard refresh the page (Ctrl+Shift+R)
- Check `.env.local` to verify the switch took effect

### "Admin features not working after switch"
- Admin roles are per-environment
- Set your role in the Convex dashboard for the active environment
- Log out and back in after setting the role

### "Can't switch environments"
- Ensure the script has execute permissions
- Check that `.env.local` exists
- Verify the file structure matches the expected format

## Manual Switching (Alternative)

If the script doesn't work, you can manually edit `.env.local`:

1. Open `.env.local` in a text editor
2. Find the "Production (ACTIVE)" section
3. Change the three Convex variables to desired environment
4. Save the file
5. Restart the dev server

## Related Documentation

- [Admin Guide](docs/ADMIN-GUIDE.md) - For workflow migration between environments
- [User Guide](docs/USER-GUIDE.md) - For general usage
- [CLAUDE.md](CLAUDE.md) - For API key architecture and Convex setup
