# CI/CD Pipeline Setup Guide

## 🚀 Automated Deployment Pipeline

Your project now has a fully automated CI/CD pipeline using GitHub Actions that deploys to Azure Static Web Apps.

## 📋 What the Pipeline Does

Every time you push code or create a pull request, the pipeline automatically:

1. ✅ **Checks out your code**
2. ✅ **Sets up Node.js environment** (v20)
3. ✅ **Installs dependencies** (`npm ci`)
4. ✅ **Runs linting** checks (`npm run lint`)
5. ✅ **Runs tests** (`npm run test`)
6. ✅ **Builds the application** (`npm run build`)
7. ✅ **Deploys to Azure Static Web Apps**

## 🔧 Setup Instructions

### Step 1: Create Azure Static Web App (if not already done)

If you haven't created an Azure Static Web App yet:

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Static Web App"
4. Click "Create"
5. Fill in the details:
   - **Subscription**: Choose your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `zustand-react` (or your preferred name)
   - **Plan type**: Free (for learning)
   - **Region**: Choose closest to you
   - **Source**: GitHub
   - **Organization**: PiyalChat
   - **Repository**: zustand-react
   - **Branch**: main
   - **Build Presets**: React
   - **App location**: `/`
   - **Output location**: `dist`

### Step 2: Get Your Deployment Token

After creating the Static Web App:

1. Go to your Static Web App in Azure Portal
2. Click on "Settings" → "Configuration"
3. Copy the **Deployment token**

### Step 3: Add Secret to GitHub Repository

1. Go to your GitHub repository: https://github.com/PiyalChat/zustand-react
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: Paste the deployment token from Azure
6. Click **Add secret**

### Step 4: Push Your Changes

```bash
git add .
git commit -m "Add CI/CD pipeline"
git push origin dev
```

## 🌟 How It Works

### On Push to `main` or `dev` Branch:

- Pipeline runs all checks (lint, test, build)
- If successful, deploys to Azure
- Your site is automatically updated!

### On Pull Request:

- Pipeline runs all checks
- Creates a **preview deployment** with a unique URL
- You can test changes before merging
- When PR is closed, preview environment is cleaned up

## 📊 Monitoring Deployments

### View Pipeline Status:

1. Go to your GitHub repository
2. Click on **Actions** tab
3. See all workflow runs and their status

### View Deployment in Azure:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Static Web App
3. Check deployment history

## 🔄 Branch Strategy

The pipeline is configured for:

- **`main`** branch → Production deployment
- **`dev`** branch → Development/staging deployment
- **Pull Requests** → Preview environments

## 🛠️ Customization Options

### Change Node.js Version

Edit `.github/workflows/azure-static-web-apps-ci-cd.yml`:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "20" # Change to 18, 20, 21, etc.
```

### Add Environment Variables

In `.github/workflows/azure-static-web-apps-ci-cd.yml`, add:

```yaml
- name: Build application
  run: npm run build
  env:
    VITE_API_URL: ${{ secrets.API_URL }}
    VITE_OTHER_VAR: ${{ secrets.OTHER_VAR }}
```

Then add these secrets in GitHub repository settings.

### Skip Tests (Not Recommended)

If you want to skip tests temporarily:

```yaml
- name: Run tests
  run: npm run test
  if: false # This will skip the step
```

## ⚠️ Troubleshooting

### Pipeline Fails on Test Step

```bash
# Run tests locally first
npm run test
```

### Pipeline Fails on Build Step

```bash
# Check build locally
npm run build
```

### Deployment Token Invalid

- Regenerate token in Azure Portal
- Update the GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN`

### Node Version Issues

- Ensure your local Node.js version matches pipeline
- Update `node-version` in workflow file if needed

## 🎯 Best Practices

1. ✅ Always test locally before pushing
2. ✅ Use feature branches and pull requests
3. ✅ Review deployment previews before merging
4. ✅ Keep dependencies up to date
5. ✅ Monitor pipeline failures and fix promptly

## 📝 Common Commands

```bash
# Test the build locally
npm run build

# Run tests
npm run test

# Lint your code
npm run lint

# Preview production build locally
npm run preview
```

## 🔗 Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Your GitHub Repository Actions](https://github.com/PiyalChat/zustand-react/actions)

## 🎉 Next Steps

1. Complete the setup steps above
2. Push your changes to trigger the first pipeline run
3. Watch your app deploy automatically!
4. Create a pull request to test preview deployments

---

**Note**: The first deployment might take 3-5 minutes. Subsequent deployments are usually faster (1-2 minutes).
