# ESG Violation Social Media Impact Predictor

A web-based dashboard application that predicts social media reactions to corporate ESG (Environmental, Social, Governance) violations across different markets worldwide using panel fixed effects models.

## Features

- **Interactive World Map**: Visualize predicted social media impact across countries
- **30-Day Timeline**: Track how social media volume changes over time post-incident
- **Multiple ESG Categories**: Analyze Overall, Environmental, Social, or Governance violations
- **Market Analysis**: Predict impact for all markets or specific selected markets
- **Detailed Predictions**: View country-specific predictions with psychic distance and impact metrics
- **Export Functionality**: Download predictions as CSV for further analysis

## Model Specifications

The application uses four panel fixed effects models:

### Overall Model
- Incident effect
- Psychic distance
- Incident × Psychic distance interaction

### Environmental Model
- Incident effect
- Psychic distance
- Long-term Orientation (LTO)
- All two-way and three-way interactions

### Social Model
- Incident effect
- Psychic distance
- Unemployment rate
- All two-way and three-way interactions

### Governance Model
- Incident effect
- Psychic distance
- Unemployment rate
- All two-way and three-way interactions

## Data Sources

The models use the following data:
- **Psychic Distances**: Mahalanobis distances (2015) between country pairs
- **Hofstede LTO**: Long-term Orientation cultural dimension scores
- **Unemployment Rates**: 2024 unemployment data by country

## How to Use

### Input Parameters

1. **Company Home Country**: Select the country where the violating company is headquartered
2. **Market Analysis**: Choose to analyze:
   - All markets (global analysis)
   - Specific markets (select individual countries)
3. **ESG Violation Type**: Select the type of violation (Overall, Environmental, Social, or Governance)
4. **Baseline Daily Volume**: Enter the average daily social media mentions before the incident

### Output

The dashboard provides:
- Summary statistics (markets analyzed, average impact, total volume, peak day)
- Interactive world map showing impact by country
- 30-day timeline chart for top 10 affected markets
- Detailed table with predictions for all markets
- CSV export option

## Deployment

### GitHub Pages (Recommended)

1. Create a new repository on GitHub
2. Upload all files:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `estimates.json`
   - `distances.json`
   - `lto.json`
   - `unemployment.json`

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select main branch as source
   - Save

4. Your app will be available at: `https://yourusername.github.io/repository-name/`

### Local Testing

1. Install a simple HTTP server (Python example):
   ```bash
   python3 -m http.server 8000
   ```

2. Open browser and navigate to:
   ```
   http://localhost:8000
   ```

### Web Hosting

Upload all files to any web hosting service that supports static websites (Netlify, Vercel, AWS S3, etc.).

## Technical Details

### Technologies Used

- **HTML5/CSS3**: Structure and styling
- **Bootstrap 5**: Responsive UI framework
- **Plotly.js**: Interactive visualizations (maps and charts)
- **Vanilla JavaScript**: Application logic

### Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

### File Structure

```
App/
├── index.html          # Main HTML file
├── app.js              # Application logic
├── styles.css          # Custom styling
├── estimates.json      # Model coefficients
├── distances.json      # Psychic distances
├── lto.json           # Long-term orientation scores
├── unemployment.json   # Unemployment rates
└── README.md          # This file
```

## Calculation Logic

The prediction algorithm:

1. Retrieves model coefficients based on violation type
2. Looks up psychic distance between home country and target market
3. Fetches additional variables (LTO for Environmental, Unemployment for Social/Governance)
4. Calculates effect size using the regression equation:
   - Base effect + distance effects + interaction effects
5. Applies effect to baseline volume to get predicted daily volume
6. Generates 30-day timeline using exponential decay (5% per day)
7. Calculates total monthly volume

### Example Calculation (Environmental Model)

```
Effect = β₀(Incident)
       + β₁(PsychDistance)
       + β₂(Incident × PsychDistance)
       + β₃(LTO)
       + β₄(Incident × LTO)
       + β₅(LTO × PsychDistance)
       + β₆(Incident × LTO × PsychDistance)

Daily Volume = Baseline × (1 + Effect)
Monthly Volume = Daily Volume × 30
```

## Understanding Negative Impact Values

The dashboard may show **negative impact values** for some markets, particularly for governance violations. This is not an error - it reflects important findings from the research:

### What Negative Values Mean

The dependent variable is the **share of negative sentiment tweets**. Therefore:

- **Positive impact (+X%)** = Incident INCREASES negative sentiment by X percentage points (backlash)
- **Negative impact (-X%)** = Incident DECREASES negative sentiment by X percentage points (muted response)

A negative value means the violation **doesn't generate the expected backlash** in that market. Consumers either:
- Don't perceive it as problematic
- Don't care about this type of violation
- Don't engage with the issue

### When This Occurs

**Governance Violations** are most likely to show negative impacts in:
- Psychically distant markets (high cultural/institutional distance)
- High unemployment markets (consumers focused on economic survival)

The research found that consumers under economic stress prioritize immediate concerns over abstract governance issues like board mismanagement or executive pay scandals.

### Interpretation

- **Positive Impact Markets**: Strong consumer backlash, increased negative sentiment, high engagement
- **Negative Impact Markets**: Muted response, violation doesn't resonate, little to no backlash

This heterogeneity is a key finding - ESG violations don't resonate uniformly across all markets.

## Limitations

- Predictions are based on historical patterns and may not account for unique circumstances
- Missing data (LTO or unemployment) for some countries may affect prediction accuracy
- Model assumes linear relationships between variables
- Does not account for company size, brand reputation, or media coverage differences
- Negative predictions indicate reduced attention, not positive sentiment

## Support

For issues or questions, please contact the research team or submit an issue in the repository.

## Citation

If using this tool for research, please cite the underlying panel fixed effects models and data sources.

## License

This application is provided for research and educational purposes.
