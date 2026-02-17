#!/bin/bash

# ESG Dashboard Deployment Script
# This script helps you deploy your dashboard to GitHub Pages

echo "🚀 ESG Dashboard Deployment Helper"
echo "===================================="
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   Mac: brew install git"
    echo "   Windows: Download from https://git-scm.com"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if this is already a Git repository
if [ -d .git ]; then
    echo "📁 Git repository already exists"
    echo ""
    echo "To push updates, run:"
    echo "  git add ."
    echo "  git commit -m 'Your update message'"
    echo "  git push origin main"
    exit 0
fi

# Get user information
echo "Please provide the following information:"
echo ""

read -p "Your full name: " USER_NAME
read -p "Your email: " USER_EMAIL
read -p "Your GitHub username: " GITHUB_USERNAME
read -p "Repository name (default: esg-violation-predictor): " REPO_NAME
REPO_NAME=${REPO_NAME:-esg-violation-predictor}

echo ""
echo "📋 Configuration:"
echo "   Name: $USER_NAME"
echo "   Email: $USER_EMAIL"
echo "   GitHub: $GITHUB_USERNAME"
echo "   Repo: $REPO_NAME"
echo ""

read -p "Is this correct? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "❌ Cancelled. Please run the script again."
    exit 1
fi

echo ""
echo "🔧 Setting up Git repository..."

# Configure Git
git config --global user.name "$USER_NAME"
git config --global user.email "$USER_EMAIL"

# Initialize repository
git init

# Add files
echo "📦 Adding files..."
git add index.html app.js styles.css
git add estimates.json distances.json lto.json unemployment.json unemployment_iso.json
git add README.md QUICKSTART.md DEPLOYMENT_CHECKLIST.md PROJECT_SUMMARY.md
git add .gitignore

# Create commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: ESG Violation Predictor Dashboard"

# Add remote
echo "🔗 Connecting to GitHub..."
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Create main branch
git branch -M main

echo ""
echo "✅ Local repository configured!"
echo ""
echo "📤 Next steps:"
echo ""
echo "1. Create the repository on GitHub:"
echo "   → Go to: https://github.com/new"
echo "   → Repository name: $REPO_NAME"
echo "   → Make it PUBLIC"
echo "   → Do NOT initialize with README"
echo "   → Click 'Create repository'"
echo ""
echo "2. Push your code:"
echo "   → Run: git push -u origin main"
echo "   → You'll need a Personal Access Token"
echo "   → Get one at: https://github.com/settings/tokens"
echo ""
echo "3. Enable GitHub Pages:"
echo "   → Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages"
echo "   → Source: Deploy from branch 'main' (root)"
echo "   → Click 'Save'"
echo ""
echo "4. Access your dashboard:"
echo "   → https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "🎉 Setup complete! Follow the steps above to deploy."
echo ""
echo "Need help? See GITHUB_DEPLOYMENT_GUIDE.md for detailed instructions."
