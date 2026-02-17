# Complete Guide: Deploy Dashboard to GitHub Pages

## Prerequisites

- GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer (check by running `git --version`)

If Git is not installed:
- **Mac**: Install via Homebrew: `brew install git`
- **Windows**: Download from https://git-scm.com/download/win

---

## Step 1: Create GitHub Repository

### Option A: Via GitHub Website (Easiest)

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name**: `esg-violation-predictor` (or your preferred name)
   - **Description**: "Interactive dashboard for predicting social media responses to ESG violations"
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** check "Add a README file"
   - **DO NOT** add .gitignore or license yet
3. Click **"Create repository"**

### Option B: Via Command Line

```bash
# We'll do this in Step 2
```

---

## Step 2: Prepare Your Local Repository

Open Terminal in your App directory:

```bash
# Navigate to your dashboard directory
cd "/Users/raoulvkubler/Dropbox/Project implementation Corporate Unethical Behavior/Revision/App"

# Check you're in the right place
ls
# You should see: index.html, app.js, styles.css, etc.
```

---

## Step 3: Initialize Git Repository

```bash
# Initialize Git repository
git init

# Check Git status
git status
# This shows which files will be added
```

---

## Step 4: Configure Git (First Time Only)

If this is your first time using Git, configure your identity:

```bash
# Set your name (use your real name)
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"
```

---

## Step 5: Add Files to Repository

```bash
# Add all dashboard files
git add index.html app.js styles.css
git add estimates.json distances.json lto.json unemployment.json
git add README.md QUICKSTART.md .gitignore

# Check what's staged
git status
```

**Note:** The Excel files (.xlsx) and some documentation files will be ignored (that's good - we only need the JSON and web files).

---

## Step 6: Create First Commit

```bash
# Create your first commit
git commit -m "Initial commit: ESG Violation Predictor Dashboard"

# Verify the commit
git log --oneline
```

---

## Step 7: Connect to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/esg-violation-predictor.git

# Verify remote is added
git remote -v
```

Example:
```bash
git remote add origin https://github.com/jsmith/esg-violation-predictor.git
```

---

## Step 8: Push to GitHub

```bash
# Create main branch and push
git branch -M main
git push -u origin main
```

**If you get an authentication error:**

GitHub requires a Personal Access Token (not password) for HTTPS. Two options:

### Option A: Use Personal Access Token (Recommended)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "ESG Dashboard Upload"
4. Select scopes: Check `repo` (all sub-items)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. When pushing, use the token as your password:
   - Username: your GitHub username
   - Password: paste the token

### Option B: Use SSH (More Secure)

See: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

## Step 9: Enable GitHub Pages

### Via GitHub Website:

1. Go to your repository: `https://github.com/YOUR_USERNAME/esg-violation-predictor`
2. Click **"Settings"** (tab at the top)
3. Click **"Pages"** in the left sidebar
4. Under "Source":
   - Select **"Deploy from a branch"**
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
5. Click **"Save"**

### Wait for Deployment

- A message appears: "Your site is ready to be published at..."
- After 1-2 minutes, refresh the page
- You'll see: "Your site is live at `https://YOUR_USERNAME.github.io/esg-violation-predictor/`"

---

## Step 10: Access Your Live Dashboard

Your dashboard is now live at:

```
https://YOUR_USERNAME.github.io/esg-violation-predictor/
```

Example: `https://jsmith.github.io/esg-violation-predictor/`

**Bookmark this URL!** This is what you'll share in your paper.

---

## Step 11: Verify Everything Works

1. Open the URL in your browser
2. Test the dashboard:
   - Select a home country
   - Choose "All Markets"
   - Select a violation type
   - Set baseline negativity to 20%
   - Click "Calculate Predictions"
3. Verify:
   - Map displays correctly
   - Timeline chart appears
   - Table populates with data
   - Export CSV works

---

## Troubleshooting

### Problem: 404 Error - Site Not Found

**Solution:**
- Wait 2-3 minutes (deployment takes time)
- Check GitHub Actions tab - deployment must complete
- Verify GitHub Pages is enabled (Step 9)
- Ensure repository is public

### Problem: Blank Page

**Solution:**
- Open browser console (F12)
- Check for errors
- Verify all JSON files are committed: `git ls-files | grep json`
- Ensure file names are exactly correct (case-sensitive)

### Problem: Push Rejected

**Solution:**
```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

### Problem: Authentication Failed

**Solution:**
- Use Personal Access Token (see Step 8)
- Or use SSH keys

### Problem: Large File Warning

**Solution:**
- distances.json is large (1.8MB) but should work
- If GitHub complains, it's still under 100MB limit
- GitHub Pages supports files up to 100MB

---

## Updating Your Dashboard

After making changes to your dashboard:

```bash
# Check what changed
git status

# Add changed files
git add index.html app.js styles.css
# Or add all: git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically redeploy (takes 1-2 minutes).

---

## Best Practices

### File Organization

```
esg-violation-predictor/
├── index.html              ← Main page
├── app.js                  ← Application logic
├── styles.css              ← Styling
├── estimates.json          ← Model coefficients
├── distances.json          ← Psychic distances
├── lto.json               ← Long-term orientation
├── unemployment.json       ← Unemployment data
├── README.md              ← Documentation
├── QUICKSTART.md          ← User guide
└── .gitignore             ← Git ignore rules
```

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good
git commit -m "Fix calculation error in governance model"
git commit -m "Add interpretation guide for negative impacts"
git commit -m "Update unemployment data to 2024"

# Bad
git commit -m "fixes"
git commit -m "update"
```

### Regular Updates

```bash
# Update data quarterly/annually
git add unemployment.json
git commit -m "Update unemployment data to Q1 2025"
git push origin main
```

---

## Adding Collaborators

To allow others to contribute:

1. Go to repository Settings → Collaborators
2. Click "Add people"
3. Enter their GitHub username
4. They can now push changes

---

## Custom Domain (Optional)

To use a custom domain like `esg-dashboard.youruniversity.edu`:

1. Buy/configure domain with your DNS provider
2. In GitHub: Settings → Pages → Custom domain
3. Enter your domain
4. Add DNS records (GitHub provides instructions)
5. Wait for DNS propagation (24-48 hours)

---

## Citing Your Dashboard

In your paper's web appendix:

```
The interactive dashboard is publicly available at:
https://YOUR_USERNAME.github.io/esg-violation-predictor/

Source code: https://github.com/YOUR_USERNAME/esg-violation-predictor
```

---

## Complete Command Summary

Here's the complete sequence from start to finish:

```bash
# Navigate to directory
cd "/Users/raoulvkubler/Dropbox/Project implementation Corporate Unethical Behavior/Revision/App"

# Initialize Git
git init
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Add files
git add index.html app.js styles.css
git add estimates.json distances.json lto.json unemployment.json
git add README.md QUICKSTART.md .gitignore

# Commit
git commit -m "Initial commit: ESG Violation Predictor Dashboard"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/esg-violation-predictor.git

# Push
git branch -M main
git push -u origin main
```

Then enable GitHub Pages via website (Settings → Pages).

---

## Getting Help

- **GitHub Documentation**: https://docs.github.com/en/pages
- **Git Tutorial**: https://git-scm.com/book/en/v2
- **GitHub Support**: https://support.github.com/

---

## Success Checklist

- [ ] Repository created on GitHub
- [ ] Files pushed successfully
- [ ] GitHub Pages enabled
- [ ] Dashboard accessible at public URL
- [ ] All features working (map, timeline, table)
- [ ] CSV export functional
- [ ] URL documented in paper

**Your dashboard is now live and citable!** 🎉
