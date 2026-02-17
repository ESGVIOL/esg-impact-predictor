# Deployment Checklist

## ✅ Pre-Deployment Verification

### Files Present (11 files)
- [ ] index.html (Main application)
- [ ] app.js (Application logic)
- [ ] styles.css (Styling)
- [ ] estimates.json (Model coefficients)
- [ ] distances.json (Psychic distances)
- [ ] lto.json (Long-term orientation)
- [ ] unemployment.json (Unemployment data)
- [ ] README.md (Documentation)
- [ ] QUICKSTART.md (Quick guide)
- [ ] serve.sh (Local server)
- [ ] .gitignore (Git ignore)

### Data Verification
- [x] Estimates: 4 models loaded
- [x] Distances: 22,350 country pairs
- [x] LTO: 109 countries
- [x] Unemployment: 180 countries

## 🧪 Local Testing

### Step 1: Start Local Server
```bash
./serve.sh
```
Or:
```bash
python3 -m http.server 8000
```

### Step 2: Open Browser
Navigate to: http://localhost:8000

### Step 3: Test Functionality

**Test Case 1: Basic Prediction**
- [ ] Select "United States" as home country
- [ ] Choose "All Markets"
- [ ] Select "Overall" violation type
- [ ] Enter 1000 as baseline volume
- [ ] Click "Calculate Predictions"
- [ ] Verify map displays
- [ ] Verify timeline chart shows
- [ ] Verify table populates

**Test Case 2: Environmental Model**
- [ ] Select any country with LTO data
- [ ] Choose "Environmental" type
- [ ] Verify predictions calculate
- [ ] Check model info shows LTO variables

**Test Case 3: Specific Markets**
- [ ] Select "Specific Markets"
- [ ] Choose 3-5 countries
- [ ] Calculate predictions
- [ ] Verify only selected markets appear

**Test Case 4: Export**
- [ ] Click "Export CSV" button
- [ ] Verify CSV downloads
- [ ] Open CSV and check data

## 🚀 GitHub Pages Deployment

### Step 1: Create Repository
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ESG Predictor Dashboard"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Name: `esg-violation-predictor`
3. Visibility: Public
4. Do NOT initialize with README
5. Click "Create repository"

### Step 3: Push to GitHub
```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/esg-violation-predictor.git

# Push code
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Repository → Settings
2. Pages (left sidebar)
3. Source: Deploy from a branch
4. Branch: main, folder: / (root)
5. Click Save

### Step 5: Wait for Deployment
- Usually takes 1-2 minutes
- Check Actions tab for build status
- Green checkmark = deployed

### Step 6: Access Your Site
```
https://YOUR_USERNAME.github.io/esg-violation-predictor/
```

## 📋 Post-Deployment Checklist

### Functionality Test on Live Site
- [ ] Page loads without errors
- [ ] Country dropdowns populate
- [ ] All violation types work
- [ ] Map renders correctly
- [ ] Timeline chart displays
- [ ] Table shows data
- [ ] Export CSV works
- [ ] Responsive design (test on mobile)

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

### Performance Check
- [ ] Page loads in < 5 seconds
- [ ] Predictions calculate quickly
- [ ] No console errors (F12)

## 🔧 Troubleshooting

### Issue: 404 Not Found
**Cause:** GitHub Pages not enabled or still building
**Solution:** Wait 2-3 minutes, check Actions tab

### Issue: Blank Page
**Cause:** JavaScript errors loading data
**Solution:** 
- Open browser console (F12)
- Check for CORS or file loading errors
- Verify all JSON files are committed

### Issue: No Countries in Dropdown
**Cause:** Data files not loading
**Solution:**
- Check browser console for errors
- Verify JSON file paths are correct
- Ensure files are in root directory

### Issue: Map Not Displaying
**Cause:** Plotly.js not loaded or data issue
**Solution:**
- Check internet connection (Plotly loads from CDN)
- Verify browser supports JavaScript
- Check console for errors

## 📊 Usage Analytics (Optional)

To track usage, add Google Analytics:

1. Get tracking ID from analytics.google.com
2. Add to `<head>` in index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎨 Customization Ideas

### Change Brand Colors
Edit `styles.css`:
```css
.btn-primary {
    background-color: #YOUR_COLOR;
}
```

### Add Logo
Edit `index.html` navbar:
```html
<span class="navbar-brand mb-0 h1">
    <img src="logo.png" height="30"> ESG Predictor
</span>
```

### Custom Domain
1. Buy domain (namecheap, godaddy, etc.)
2. Repository Settings → Pages
3. Add custom domain
4. Update DNS records

## 📧 Share Your Dashboard

Once deployed, share:
- Direct link to dashboard
- QR code (use qr-code-generator.com)
- Embed in website via iframe:
```html
<iframe src="https://YOUR_USERNAME.github.io/esg-violation-predictor/" 
        width="100%" height="800px"></iframe>
```

## 🎯 Next Steps

After successful deployment:
- [ ] Share with stakeholders
- [ ] Gather user feedback
- [ ] Track usage patterns
- [ ] Plan enhancements
- [ ] Update data periodically

---

**Ready to deploy?** Follow the steps above!

**Need help?** Check README.md or QUICKSTART.md

**Local test:** http://localhost:8000
