# Dashboard Update: Added Negative Impact Explanations

## Summary of Changes

I've implemented **Option 2** - adding comprehensive explanations throughout the dashboard to help users understand what negative impact values mean.

## What Was Fixed

### 1. Model Calculation (CRITICAL FIX)
**File:** `app.js`

**Changed from:** Including all main effects (psychic distance, LTO, unemployment)
**Changed to:** Only using incident-related interaction terms

**Why:** Based on your manuscript, the panel fixed effects model uses:
- Main effects as **control variables** (baseline differences between countries)
- **Incident × Variable** interactions to predict impact when incident occurs

The dashboard predicts impact **when incident = 1**, so we only apply incident-related terms.

### 2. UI Enhancements

#### Added to Left Panel (Input Section):
- **"Understanding Results" box** with clear definitions:
  - Positive Impact = Increased social media volume
  - Negative Impact = Reduced attention/consumers care less
  - Special note about governance violations

#### Added to Results Section:
- **Interpretation Alert** - Appears when negative values are detected
  - Explains how many markets show negative impact
  - Provides context specific to violation type
  - Special message for governance violations

- **Updated Summary Statistics:**
  - Changed "Peak Impact Day" → "Markets w/ Positive Impact"
  - Shows count: "X / Total" markets with positive impact
  - Added label under avg impact: "Above baseline" or "Below baseline"

- **Enhanced Table:**
  - Icons for impact levels:
    - 🔴 High (>2%)
    - 🟠 Medium (1-2%)
    - 🟢 Low (0-1%)
    - ⬇️ Reduced Attention (<0%)
  - "(reduced attention)" label on negative values
  - Color-coded text

- **Added Legend** above the table explaining all impact levels

#### Enhanced Model Info Box:
- Now shows only incident-related coefficients
- Added "Expected patterns" section for each model type
- Specific warning for governance model about possible negative values

### 3. Documentation Updates

**README.md:**
- Added new section: "Understanding Negative Impact Values"
- Explains what negative values mean
- When they occur (governance + distance + unemployment)
- How to interpret them

## Files Modified

1. ✅ `app.js` - Fixed calculation logic + added explanation displays
2. ✅ `index.html` - Added UI elements for explanations
3. ✅ `styles.css` - Enhanced visual styling for impact levels
4. ✅ `README.md` - Added documentation section

## New User Experience

### Before:
- User sees "-3.5%" average impact
- Confused why violation causes negative effect
- No context provided

### After:
1. **Input Panel** shows guide: "Negative = Reduced Attention"

2. **Model Info** warns: "Governance may be negative in distant + high unemployment markets"

3. **Results Show:**
   - Alert: "23 markets show negative impact (reduced attention)..."
   - Statistics: "45 / 68 Markets w/ Positive Impact"
   - Average: "-1.2%" with note "(Below baseline)"

4. **Table displays:**
   ```
   Brazil    5.4    ⬇️ -2.3% (reduced attention)    975    29,250    1,000
   Japan     3.2    🔴 +5.8%                      1,058   31,740    1,058
   ```

5. **Legend explains** what each icon means

## Theoretical Accuracy

All explanations are based on your manuscript findings:

✅ **H5c**: Psychic distance attenuates governance violations (β = -0.007, p < 0.01)
✅ **H8**: Unemployment reduces governance violation impact (β = -0.001, p < 0.05)

**Quote from your paper:**
> "During periods of high unemployment... consumers are less likely to prioritize [governance violations] when focused on immediate financial survival."

## Testing Recommendations

Test these scenarios to see the new features:

1. **Governance Violation**
   - Home: United States  
   - Markets: All
   - Type: Governance
   - Volume: 1000
   - **Expected:** Some negative values, interpretation alert appears

2. **Environmental Violation**
   - Home: China
   - Markets: All
   - Type: Environmental
   - Volume: 1000
   - **Expected:** All positive values, LTO amplification

3. **Social Violation**
   - Home: Germany
   - Markets: Select 5-6 countries
   - Type: Social
   - Volume: 500
   - **Expected:** Positive values, unemployment effect

## Next Steps

1. **Test the dashboard** - Refresh browser and try different scenarios
2. **Review explanations** - Ensure wording matches your research framing
3. **Customize if needed** - Easy to adjust text in the code
4. **Deploy** - Push updated files to GitHub Pages

---

**All changes maintain scientific accuracy while improving user understanding!**
