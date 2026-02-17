# Dashboard Update: Switched to Percentage Points Display

## Summary

Completely revamped the dashboard to show **percentage point changes in negative sentiment** instead of volumes. This is now fully accurate to your panel fixed effects model.

## What Changed

### Input
**Before:**
- "Baseline Daily Social Media Volume" (e.g., 1000 tweets)

**After:**
- "Baseline Negative Sentiment Share (%)" (e.g., 20%)
- This represents the percentage of tweets that are negative BEFORE the incident

### Output Metrics

**Before (Volume-based):**
- Daily Volume
- 30-Day Total Volume  
- Peak Day Volume

**After (Percentage Points):**
- Impact (pp) - Change in negative sentiment in percentage points
- Post-Incident Negativity - New share of negative tweets
- Avg Over 30 Days - Average negative sentiment over decay period

### Example

**User inputs:**
- Home Country: United States
- Market: Japan
- Type: Environmental
- Baseline Negativity: 20%

**Model predicts:**
- Impact: +5.2pp (percentage points)
- Interpretation: Negative sentiment increases by 5.2 percentage points
- Post-Incident: 25.2% of tweets are negative (up from 20%)
- 30-Day Average: 23.1% (accounting for decay)

## Key Formula

```javascript
// Calculate change in negative sentiment share
impactPercentagePoints = effect × 100

// Post-incident negativity
postIncidentNegativity = baselineNegativity + impactPercentagePoints

// With exponential decay over 30 days
dayNegativity = baselineNegativity + impactPercentagePoints × e^(-0.05×(day-1))
```

## UI Changes

### Summary Statistics
1. **Markets Analyzed** - Total markets (unchanged)
2. **Avg. Change in Negativity** - Average impact in pp (NEW)
3. **Markets w/ Backlash** - Count with positive impact (changed label)
4. **Max Impact** - Maximum absolute impact in pp (NEW)

### World Map
- Now color-coded by impact in percentage points
- Blue (negative/muted) → Gray (neutral) → Red (high backlash)
- Centered at 0 to show diverging impacts

### Timeline Chart
- Y-axis: "Negative Sentiment Share (%)"
- Shows how negativity evolves from baseline over 30 days
- Exponential decay applied

### Results Table
| Market | Distance | Impact (pp) | Post-Incident | Avg 30-Day |
|--------|----------|-------------|---------------|------------|
| Japan  | 3.2      | +5.2pp ↑    | 25.2%         | 23.1%      |
| Brazil | 5.4      | -2.3pp ↓ (muted) | 17.7%    | 18.5%      |

### Legend
- 🔴 High Backlash (>2pp)
- 🟠 Medium Backlash (1-2pp)
- 🟢 Low Backlash (0-1pp)
- ⬇️ Muted Response (<0pp)

## Interpretation Examples

### Positive Impact (+5pp)
- "Negative sentiment increases by 5 percentage points"
- If baseline was 20% negative, it's now 25% negative
- More backlash / stronger consumer reaction

### Negative Impact (-3pp)
- "Negative sentiment decreases by 3 percentage points"
- If baseline was 20% negative, it's now 17% negative
- Muted response / violation doesn't resonate

### Zero Impact (0pp)
- No change in negative sentiment
- Business as usual

## Benefits

✅ **Accurate to Model** - Matches exactly what your panel FE model predicts
✅ **Clear Interpretation** - Percentage points are intuitive
✅ **No Approximations** - No need to convert between share and volume
✅ **Scientifically Sound** - Direct representation of dependent variable
✅ **Better Comparisons** - Can compare across markets on same scale

## Files Modified

1. ✅ `index.html` - Updated all labels, input fields, table headers
2. ✅ `app.js` - Complete calculation overhaul
3. ✅ `styles.css` - No changes needed (labels still work)

## Testing

**Try this scenario:**
1. Home Country: United States
2. Markets: All Markets
3. Type: Governance
4. Baseline Negativity: 20%
5. Calculate

**Expected results:**
- Some markets show positive impact (+2-3pp) - backlash
- Some markets show negative impact (-1 to -5pp) - muted
- Map shows diverging colors (blue to red)
- Timeline shows negativity % over 30 days starting from 20%

## CSV Export

Now exports:
```csv
Market,Psychic Distance,Impact (pp),Post-Incident Negativity (%),Avg 30-Day Negativity (%)
Japan,3.234,+5.20,25.2,23.1
Brazil,5.412,-2.30,17.7,18.5
```

---

**Dashboard is now fully aligned with your research methodology!** 🎯
