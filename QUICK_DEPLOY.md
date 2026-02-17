# Quick Deploy Reference

## Option 1: Use the Automated Script (Easiest!)

```bash
./deploy.sh
```

Follow the prompts, then:

1. Create repository at https://github.com/new
2. Run: `git push -u origin main` (use Personal Access Token as password)
3. Enable Pages: Settings → Pages → Source: main branch
4. Done! Access at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

---

## Option 2: Manual Commands (5 Minutes)

### Step 1: Create GitHub repository
- Go to: https://github.com/new
- Name: `esg-violation-predictor`
- Public, no README
- Create

### Step 2: Initialize and push
```bash
cd "/Users/raoulvkubler/Dropbox/Project implementation Corporate Unethical Behavior/Revision/App"

# Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Initialize
git init
git add index.html app.js styles.css *.json README.md QUICKSTART.md .gitignore
git commit -m "Initial commit: ESG Dashboard"

# Connect and push (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/esg-violation-predictor.git
git branch -M main
git push -u origin main
```

**Authentication:** Use Personal Access Token from https://github.com/settings/tokens

### Step 3: Enable GitHub Pages
1. Go to: `https://github.com/YOUR_USERNAME/esg-violation-predictor/settings/pages`
2. Source: "Deploy from a branch"
3. Branch: "main" (root)
4. Save

### Step 4: Access dashboard (wait 1-2 minutes)
```
https://YOUR_USERNAME.github.io/esg-violation-predictor/
```

---

## Updating After Changes

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

Dashboard updates automatically in 1-2 minutes.

---

## Troubleshooting

**404 Error:** Wait 2-3 minutes for deployment

**Blank Page:** Check browser console (F12) for errors

**Authentication Failed:** Use Personal Access Token, not password
- Get token: https://github.com/settings/tokens
- Scope: Select `repo`

**Need Help:** See `GITHUB_DEPLOYMENT_GUIDE.md` for detailed instructions

---

## Your URLs (save these!)

- **Dashboard:** `https://YOUR_USERNAME.github.io/REPO_NAME/`
- **Repository:** `https://github.com/YOUR_USERNAME/REPO_NAME`
- **Settings:** `https://github.com/YOUR_USERNAME/REPO_NAME/settings/pages`

---

**That's it! Your dashboard is now live!** 🎉
