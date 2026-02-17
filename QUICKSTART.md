# Quick Start Guide

## Test Locally (Right Now!)

1. Open Terminal in this directory
2. Run: `./serve.sh` (or `python3 -m http.server 8000`)
3. Open browser: http://localhost:8000
4. Start making predictions!

## Deploy to GitHub Pages (5 minutes)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `esg-predictor` (or any name you prefer)
3. Set to Public
4. Click "Create repository"

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag and drop ALL files from this folder
3. Commit changes

**Option B: Using Git Command Line**
```bash
git init
git add .
git commit -m "Initial commit: ESG Predictor Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/esg-predictor.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Click "Pages" in left sidebar
3. Under "Source", select "main" branch
4. Click Save
5. Wait 1-2 minutes for deployment

### Step 4: Access Your Dashboard

Your dashboard will be live at:
```
https://YOUR_USERNAME.github.io/esg-predictor/
```

## Example Usage

### Scenario 1: U.S. Tech Company Environmental Violation

**Inputs:**
- Company Home Country: United States
- Market Analysis: All Markets
- Violation Type: Environmental
- Baseline Volume: 5000

**What to expect:**
- Map showing global impact
- Higher impact in culturally distant countries
- LTO influence on predictions
- 30-day decay timeline

### Scenario 2: German Auto Maker Governance Issue

**Inputs:**
- Company Home Country: Germany
- Market Analysis: Specific Markets (select: France, Italy, Spain, UK, Netherlands)
- Violation Type: Governance
- Baseline Volume: 8000

**What to expect:**
- European market analysis
- Unemployment effects on predictions
- Lower psychic distances = different impact patterns

### Scenario 3: Chinese Manufacturing Social Violation

**Inputs:**
- Company Home Country: China
- Market Analysis: All Markets
- Violation Type: Social
- Baseline Volume: 3000

**What to expect:**
- Global social media response
- Unemployment rate influences
- Distance-based variance

## Troubleshooting

### Issue: Blank page or no data

**Solution:** Make sure all JSON files are in the same directory as index.html:
- estimates.json
- distances.json
- lto.json
- unemployment.json

### Issue: "Cannot GET /" error

**Solution:** You need to run a web server, not just open index.html directly
- Use: `python3 -m http.server 8000`
- Or use the provided `serve.sh` script

### Issue: Country not found

**Solution:** Check the exact spelling in the dropdown. Some countries may have limited data.

### Issue: No predictions generated

**Solution:**
- Ensure home country is different from selected markets
- Check that distance data exists for the country pair
- Try selecting "All Markets" to see which countries have data

## Customization

### Change Color Scheme

Edit `styles.css`:
```css
.btn-primary {
    background-color: #YOUR_COLOR;
}
```

### Modify Decay Rate

Edit `app.js`, line ~180:
```javascript
const decayFactor = Math.exp(-0.05 * (day - 1)); // Change 0.05 to adjust decay
```

### Add More Statistics

Edit the `displayResults()` function in `app.js` to add custom metrics.

## Data Updates

To update the underlying data:

1. Replace Excel files:
   - Estimates.xlsx
   - Distances.xlsx
   - LTO.xlsx
   - Unemployment.xlsx

2. Regenerate JSON files:
   ```bash
   python3 -c "import pandas as pd; import json; ..."
   ```
   (Or re-run the data conversion script)

3. Upload new JSON files to GitHub repository

## Advanced Features

### Add More Models

1. Add coefficients to `estimates.json`
2. Update the model calculation logic in `calculatePrediction()`
3. Add new option to violation type dropdown

### Integrate Additional Variables

1. Create new JSON file with country-level data
2. Load in `loadData()` function
3. Reference in prediction calculations

### Custom Visualizations

The app uses Plotly.js. You can add:
- Bar charts
- Scatter plots
- Additional map layers
- Custom animations

See Plotly.js documentation: https://plotly.com/javascript/

## Support

Need help? Check:
- Full README.md for detailed documentation
- Browser console (F12) for error messages
- GitHub Issues in your repository

Happy predicting!
