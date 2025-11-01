# Azure Deployment Guide - Zustand React App

## 📋 Table of Contents

- [What We Did](#what-we-did)
- [Prerequisites](#prerequisites)
- [Step-by-Step Process](#step-by-step-process)
- [Understanding the Components](#understanding-the-components)
- [Your Deployment Details](#your-deployment-details)
- [How to Update Your App](#how-to-update-your-app)
- [Troubleshooting](#troubleshooting)

---

## 🎯 What We Did

We successfully deployed your React application (a website) to Microsoft Azure's cloud platform. Think of this like moving your website from your personal computer to a powerful online server where anyone in the world can access it 24/7.

**Simple Analogy:**
Imagine you wrote a book on your computer. Deploying it to Azure is like publishing that book in a library where anyone can read it anytime, from anywhere in the world.

---

## ✅ Prerequisites

Before deployment, we made sure these tools were installed:

### 1. **Azure CLI (Command Line Interface)**

- **What it is:** A tool that lets you talk to Azure services using text commands
- **Why we need it:** To create and manage Azure resources from your computer
- **What we did:**
  - Checked if it was installed
  - Found it was corrupted, so we uninstalled it
  - Reinstalled it using Windows Package Manager (winget)
  - Final version installed: 2.77.0

### 2. **Static Web Apps CLI**

- **What it is:** A specialized tool for deploying static websites (like React apps)
- **Why we need it:** It simplifies the process of uploading your website to Azure
- **What we did:** Installed it globally using npm (Node Package Manager)

---

## 📝 Step-by-Step Process

### Step 1: Verify Azure Login ✓

**What happened:** We checked if you were already logged into your Azure account.

**Result:** You were already logged in as:

- **Email:** Piyal.Chatterjee@neudesic.com
- **Organization:** Neudesic
- **Subscription:** FSI Innovation (initially)

**Simple Explanation:** This is like checking if you're signed into your online banking before trying to make a transaction.

---

### Step 2: Initialize Static Web App Configuration ✓

**Command Used:** `npx swa init --yes`

**What happened:**
The Static Web Apps CLI automatically detected your project settings:

- **Framework:** Vite (the tool used to build your React app)
- **App Location:** `.` (root folder - where your code lives)
- **Output Location:** `dist` (where the final, optimized website files are created)
- **Build Command:** `npm run build` (command to create the final version)
- **Dev Server:** `http://localhost:5173` (local testing address)

**Result:** Created a configuration file called `swa-cli.config.json`

**Simple Explanation:** This is like filling out a form that tells Azure exactly where to find your website files and how to prepare them.

---

### Step 3: Build the Application ✓

**Command Used:** `npx swa build`

**What happened:**
The build process transformed your development code into optimized files ready for production:

- Compiled TypeScript to JavaScript
- Bundled all your code files together
- Optimized images and assets
- Minified (compressed) the code for faster loading

**Files Created:**

```
dist/
  ├── index.html (1.21 kB)
  ├── assets/
      ├── bootstrap-icons-BtvjY1KL.woff2 (130.40 kB)
      ├── bootstrap-icons-BOrJxbIo.woff (176.03 kB)
      ├── index-BOaKMwTs.css (76.42 kB)
      └── index-DKqlyFOj.js (200.62 kB)
```

**Simple Explanation:** This is like packing your belongings neatly into boxes before moving to a new house. Everything is organized and ready to be transported.

---

### Step 4: Handle Deployment Permissions 🔄

**Challenge:** We encountered permission issues with your default Azure subscription.

**Error:** "The client does not have authorization to perform action 'Microsoft.Web/staticSites/read'"

**What we did:**

1. Listed all available Azure subscriptions
2. Found three subscriptions:
   - VS-Ent-Dev-Naresh.Kumar
   - **Visual Studio Professional Subscription** (we used this one)
   - FSI Innovation (default)
3. Switched to "Visual Studio Professional Subscription" which had proper permissions

**Simple Explanation:** This is like trying to use your credit card, but it's declined. So you switch to another card that works.

---

### Step 5: Handle Company Policy Requirements 🔄

**Challenge:** Neudesic has a company policy requiring all Azure resources to have an "owner" tag.

**Error:** "Resource was disallowed by policy. Reasons: 'Please specify owner tag with Neudesic.com email address'"

**Solution:**
We manually created resources with the required tag:

- **Tag:** owner=Piyal.Chatterjee@neudesic.com

**Simple Explanation:** Your company has rules that every resource must have a label showing who owns it (like putting your name on your lunchbox in the office fridge).

---

### Step 6: Create Resource Group ✓

**Command Used:**

```bash
az group create --name zustand-react-rg --location eastus --tags owner=Piyal.Chatterjee@neudesic.com
```

**What is a Resource Group?**
A container that holds related Azure resources together. Think of it as a folder on your computer that contains related files.

**Details:**

- **Name:** `zustand-react-rg`
- **Location:** East US (initially, but we had to change this)
- **Tag:** owner=Piyal.Chatterjee@neudesic.com

**Simple Explanation:** We created a dedicated folder in Azure to hold all the components of your website.

---

### Step 7: Handle Region Availability 🔄

**Challenge:** Static Web Apps weren't available in the "East US" region.

**Error:** "The provided location 'eastus' is not available for resource type 'Microsoft.Web/staticSites'"

**Available Regions:** westus2, centralus, eastus2, westeurope, eastasia

**Solution:** Changed the location to **East US 2** (eastus2)

**Simple Explanation:** This is like trying to open a branch of a store in one city, only to find out that type of store can only operate in certain cities. So we picked the nearest available city.

---

### Step 8: Create Static Web App Resource ✓

**Command Used:**

```bash
az staticwebapp create --name zustand-react-app --resource-group zustand-react-rg --location eastus2 --sku Free --tags owner=Piyal.Chatterjee@neudesic.com
```

**What happened:**
Azure created your Static Web App resource with these details:

- **Name:** zustand-react-app
- **Resource Group:** zustand-react-rg
- **Location:** East US 2
- **Pricing Tier:** Free
- **Default URL:** wonderful-river-0de728d0f.3.azurestaticapps.net

**Simple Explanation:** We reserved a space on Azure's servers and got a web address where your site will live. The Free tier means you don't pay anything unless you need advanced features.

---

### Step 9: Get Deployment Token 🔑

**Command Used:**

```bash
az staticwebapp secrets list --name zustand-react-app --resource-group zustand-react-rg
```

**What is a Deployment Token?**
A secret password that allows the deployment tool to upload files to your Azure Static Web App.

**Simple Explanation:** This is like getting a temporary key card to access a building. Only someone with this key can upload files to your website.

---

### Step 10: Deploy the Application ✓

**Command Used:**

```bash
npx swa deploy ./dist --deployment-token [SECRET_TOKEN] --env production
```

**What happened:**

1. The CLI tool connected to Azure using the deployment token
2. Uploaded all files from the `dist` folder to Azure
3. Azure configured the web server to serve your website
4. Generated the final public URL

**Deployment Details:**

- **Source Folder:** ./dist (your built application)
- **Environment:** production (live website)
- **Deployment Time:** A few seconds

**Simple Explanation:** We uploaded all your website files to Azure's servers, and they turned on the website so people can visit it.

---

## 🏗️ Understanding the Components

### What is a Static Web App?

A website that consists of HTML, CSS, and JavaScript files that are sent directly to users' browsers. Your React app falls into this category because:

- It doesn't need a traditional server to run
- All the code runs in the user's browser
- It can connect to APIs if needed, but the website files themselves are "static"

**Real-world Example:** Think of it like a brochure or a book - the content is fixed and doesn't change based on who's reading it (although it can be interactive once opened).

---

### What is Azure?

Microsoft Azure is a cloud computing platform. Instead of buying and maintaining your own physical servers, you rent space and computing power from Microsoft's data centers around the world.

**Benefits:**

- **Always Available:** Your website is online 24/7
- **Fast:** Served from data centers close to your users
- **Scalable:** Can handle sudden increases in traffic
- **Secure:** Microsoft handles security updates and backups
- **No Maintenance:** You don't need to worry about hardware or server maintenance

---

### What is a Resource Group?

A logical container that groups related Azure resources together.

**In Your Case:**

- **Resource Group:** zustand-react-rg
- **Contains:** Your Static Web App

**Why it's useful:**

- Organize resources by project
- Apply permissions to all resources at once
- Easily delete all related resources together
- Track costs per project

---

### What is a Deployment Token?

A secret authentication key that grants permission to deploy (upload) files to your Azure Static Web App.

**Security Note:** Keep this token secret! Anyone with this token can modify your website.

---

## 🎉 Your Deployment Details

### Access Your Website

**Live URL:** https://wonderful-river-0de728d0f.3.azurestaticapps.net

**What you'll see:**
Your Zustand React application with the task management interface, exactly as it looks on your local computer.

---

### Azure Resources Created

| Resource Type  | Name              | Location  | Purpose                     |
| -------------- | ----------------- | --------- | --------------------------- |
| Resource Group | zustand-react-rg  | East US 2 | Container for all resources |
| Static Web App | zustand-react-app | East US 2 | Hosts your website          |

---

### Cost Information

**Current Tier:** Free

**What's Included:**

- 100 GB bandwidth per month
- 0.5 GB storage
- Free SSL certificate (HTTPS)
- Custom domains (if you want to add one)
- Global CDN (Content Delivery Network)

**Will you be charged?**
No, as long as you stay within the Free tier limits, which are more than enough for most personal projects and small applications.

---

### Configuration Files Created

#### 1. `swa-cli.config.json`

Located in your project root folder.

```json
{
  "$schema": "https://aka.ms/azure/static-web-apps-cli/schema",
  "configurations": {
    "zustand-react": {
      "appLocation": ".",
      "outputLocation": "dist",
      "appBuildCommand": "npm run build",
      "run": "npm run dev",
      "appDevserverUrl": "http://localhost:5173"
    }
  }
}
```

**What it does:** Tells the deployment tool where to find your files and how to build your project.

---

#### 2. `.env` (Hidden File)

Contains your deployment credentials.

**⚠️ IMPORTANT:** This file should be added to `.gitignore` to prevent accidentally sharing your deployment token publicly.

---

## 🔄 How to Update Your App

Whenever you make changes to your code and want to deploy the updates:

### Option 1: Quick Deployment (Recommended)

```bash
# 1. Build your app
npm run build

# 2. Deploy to Azure
npx swa deploy --env production
```

### Option 2: Using SWA CLI Build + Deploy

```bash
# Builds and deploys in one command
npx swa build
npx swa deploy --env production
```

### What Happens When You Deploy:

1. Your latest code is built into optimized files
2. Old files on Azure are replaced with new ones
3. Your website updates automatically (usually within seconds)
4. The same URL continues to work

**Simple Explanation:** It's like updating a document on Google Drive - you save your changes, and the new version is immediately available to everyone.

---

## 🔧 Troubleshooting

### Problem: "Permission Denied" Error

**Cause:** You don't have the right permissions on the Azure subscription.

**Solution:**

- Ask your Azure administrator to grant you "Contributor" or "Static Web App Contributor" role
- Or use a different subscription where you have permissions

---

### Problem: "Policy Violation" Error

**Cause:** Your organization requires specific tags (like "owner") on all resources.

**Solution:**
Always include the required tags when creating resources:

```bash
--tags owner=Piyal.Chatterjee@neudesic.com
```

---

### Problem: "Location Not Available" Error

**Cause:** The Azure service isn't available in the selected region.

**Solution:**
Use one of these regions for Static Web Apps:

- westus2 (West US 2)
- centralus (Central US)
- eastus2 (East US 2) ← We used this
- westeurope (West Europe)
- eastasia (East Asia)

---

### Problem: Website Shows Old Version

**Cause:** Browser cache or CDN cache hasn't updated yet.

**Solution:**

- Wait 1-2 minutes for CDN to refresh
- Clear your browser cache (Ctrl + Shift + Delete)
- Try opening in incognito/private mode
- Hard refresh the page (Ctrl + F5)

---

### Problem: Deployment Takes Too Long

**Cause:** Network issues or large file sizes.

**Solution:**

- Check your internet connection
- Ensure build output in `dist` folder isn't excessively large
- Try deploying again

---

## 📚 Key Terms Glossary

**Azure:** Microsoft's cloud computing platform

**Static Web App:** A website made of HTML, CSS, and JavaScript files that don't require server-side processing

**CLI (Command Line Interface):** A text-based tool for running commands on your computer

**Deployment:** The process of uploading your code to a server and making it available online

**Build:** Converting your development code into optimized files ready for production

**Resource Group:** A container in Azure that holds related resources

**SKU (Stock Keeping Unit):** In Azure, this refers to the pricing tier (Free, Standard, etc.)

**CDN (Content Delivery Network):** A network of servers around the world that deliver your website faster by serving it from a location close to the user

**Token:** A secret key used for authentication

**Production Environment:** The live version of your website that real users access

**Dist Folder:** Short for "distribution" - contains the final, optimized version of your code

---

## 🎓 What You've Accomplished

✅ Installed and configured Azure CLI  
✅ Set up Static Web Apps CLI  
✅ Built your React application for production  
✅ Handled Azure permissions and policies  
✅ Created Azure resources with proper tags  
✅ Successfully deployed your app to Azure  
✅ Made your app accessible worldwide at: https://wonderful-river-0de728d0f.3.azurestaticapps.net

---

## 📞 Next Steps & Recommendations

### 1. Set Up Continuous Deployment (CI/CD)

Connect your GitHub repository to Azure so that every time you push code, it automatically deploys.

**Benefits:**

- No manual deployment needed
- Automatic builds on code changes
- Preview environments for testing

---

### 2. Add a Custom Domain

Instead of `wonderful-river-0de728d0f.3.azurestaticapps.net`, use your own domain like `www.yourname.com`

**How:**

- Buy a domain from a domain registrar (GoDaddy, Namecheap, etc.)
- Add it in the Azure Portal under your Static Web App settings
- Update DNS records

---

### 3. Monitor Your App

Azure provides built-in monitoring to see:

- How many people visit your site
- Where they're from
- How fast your site loads
- Any errors that occur

**Access:** Azure Portal → Your Static Web App → Monitoring section

---

### 4. Add Authentication

If you want to add user login functionality, Azure Static Web Apps supports:

- GitHub
- Google
- Facebook
- Twitter
- Azure Active Directory

---

### 5. Environment Variables

Store sensitive information (like API keys) securely as environment variables in Azure instead of in your code.

---

## 📖 Additional Resources

- **Azure Static Web Apps Documentation:** https://docs.microsoft.com/azure/static-web-apps/
- **Azure CLI Documentation:** https://docs.microsoft.com/cli/azure/
- **SWA CLI Documentation:** https://azure.github.io/static-web-apps-cli/

---

## 🎉 Congratulations!

Your React application is now live on the internet and accessible to anyone in the world. You've successfully navigated the deployment process, handled permission issues, complied with company policies, and published your first app to Azure!

**Your Live Website:** https://wonderful-river-0de728d0f.3.azurestaticapps.net

---

_Document created on: November 1, 2025_  
_Last updated: November 1, 2025_
