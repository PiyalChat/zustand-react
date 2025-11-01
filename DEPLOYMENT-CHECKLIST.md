# 🚀 Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment Checks

### Code Quality

- [ ] All tests passing (`npm run test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code builds successfully (`npm run build`)
- [ ] Preview build works locally (`npm run preview`)

### Code Review

- [ ] Code has been peer-reviewed (if applicable)
- [ ] All PR comments addressed
- [ ] Branch is up to date with main
- [ ] No merge conflicts

### Security

- [ ] No sensitive data in code (API keys, passwords, etc.)
- [ ] Environment variables properly configured
- [ ] Dependencies are up to date (`npm outdated`)
- [ ] No critical security vulnerabilities (`npm audit`)

### Documentation

- [ ] README updated with new features
- [ ] Code comments added where necessary
- [ ] CHANGELOG updated (if maintained)
- [ ] API documentation updated (if applicable)

### Azure Setup

- [ ] Azure Static Web App resource created
- [ ] Deployment token added to GitHub secrets
- [ ] Custom domain configured (if needed)
- [ ] SSL certificate active
- [ ] Environment variables set in Azure Portal

### GitHub Actions

- [ ] `AZURE_STATIC_WEB_APPS_API_TOKEN` secret configured
- [ ] Workflow file is in `.github/workflows/`
- [ ] Branch protection rules set (optional)
- [ ] Required checks configured (optional)

### Testing

- [ ] Test in development environment
- [ ] Test in staging/preview environment
- [ ] Cross-browser testing done
- [ ] Mobile responsiveness verified
- [ ] Accessibility checked

### Monitoring

- [ ] Azure Application Insights configured (optional)
- [ ] Error logging set up
- [ ] Performance monitoring enabled
- [ ] Deployment notifications configured

## Deployment Steps

1. **Merge to Main Branch**

   ```bash
   git checkout main
   git pull origin main
   git merge dev
   git push origin main
   ```

2. **Monitor GitHub Actions**

   - Go to: https://github.com/PiyalChat/zustand-react/actions
   - Watch the workflow run
   - Verify all steps complete successfully

3. **Verify Deployment**

   - Check Azure Portal for deployment status
   - Visit the production URL
   - Test critical functionality
   - Check browser console for errors

4. **Post-Deployment**
   - [ ] Verify app loads correctly
   - [ ] Test all major features
   - [ ] Check performance metrics
   - [ ] Monitor for errors in first 24 hours

## Rollback Plan

If deployment fails or issues are found:

1. **Quick Rollback via GitHub**

   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. **Or Redeploy Previous Version**

   - Go to GitHub Actions
   - Find last successful workflow
   - Re-run the workflow

3. **Emergency Hotfix**
   ```bash
   git checkout main
   git checkout -b hotfix/critical-fix
   # Make fixes
   git commit -m "hotfix: critical issue"
   git push origin hotfix/critical-fix
   # Create PR and merge immediately
   ```

## Useful Commands

```bash
# Check for outdated packages
npm outdated

# Security audit
npm audit

# Fix auto-fixable security issues
npm audit fix

# View deployment history
git log --oneline --graph --decorate

# Check current branch
git branch --show-current

# View remote URLs
git remote -v
```

## Contact & Support

- **GitHub Issues**: https://github.com/PiyalChat/zustand-react/issues
- **Azure Support**: https://portal.azure.com

---

**Last Updated**: November 1, 2025
