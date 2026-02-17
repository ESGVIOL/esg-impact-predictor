# Corrected Interpretation of Impact Values

## What Was Wrong

**Previous interpretation:**
- Positive impact = Increased attention/volume
- Negative impact = Reduced attention

**Why this was wrong:**
The dependent variable is **share of negative sentiment tweets**, not total volume or attention.

## Correct Interpretation

**Dependent Variable:** Share of negative sentiment tweets (percentage points)

**What coefficients mean:**
- **Positive effect (+5%)**: Incident increases negative sentiment by 5 percentage points → MORE BACKLASH
- **Negative effect (-5%)**: Incident decreases negative sentiment by 5 percentage points → LESS BACKLASH (muted response)

## What Negative Values Actually Mean

When a market shows **negative impact** (e.g., -3%):
- The violation **reduces** the share of negative tweets
- OR: The violation **doesn't generate the expected backlash**
- Consumers either:
  - Don't perceive it as problematic
  - Don't care about this type of violation  
  - Don't engage with the issue

This is NOT "reduced attention" - it's **reduced negative sentiment**.

## Updated Terminology Throughout Dashboard

### Before → After

1. **Understanding Results Box:**
   - "Reduced attention" → "Less negative sentiment than baseline (muted response)"

2. **Interpretation Alert:**
   - "reduced attention" → "less negative sentiment than baseline"
   - "less engaged" → "doesn't generate backlash"

3. **Table Labels:**
   - "(reduced attention)" → "(muted response)"

4. **Legend:**
   - "High/Medium/Low (>2%, 1-2%, 0-1%)" → "High/Medium/Low Backlash"
   - "Reduced Attention (<0%)" → "Muted Response (<0%)"

5. **README:**
   - Added clear explanation of share of negative tweets
   - Positive = increased negative sentiment (backlash)
   - Negative = decreased negative sentiment (muted response)

## Important Note on Volume Calculation

The model predicts **change in share**, not **total volume**.

Current approximation:
```javascript
dailyVolume = baselineVolume * (1 + effect)
```

This treats the effect as proportional to total volume, which is a simplification.

### More Accurate Interpretation

If we wanted to be precise:
- User inputs: Total baseline volume (e.g., 1000 tweets/day)
- User needs: Baseline share of negative tweets (e.g., 20%)
- Calculation:
  - Baseline negative: 1000 × 20% = 200 negative tweets
  - Effect: +5% (percentage points)
  - New share: 20% + 5% = 25%
  - New negative: 1000 × 25% = 250 negative tweets

But we don't ask for baseline negativity %, so we use the approximation.

## Files Updated

1. ✅ `index.html` - Updated all labels and explanations
2. ✅ `app.js` - Updated interpretation text and comments
3. ✅ `README.md` - Clarified what negative values mean

## Theoretical Accuracy

The new interpretation correctly reflects:
- **H5c**: Psychic distance **attenuates** governance violations (reduces backlash)
- **H8**: Unemployment **weakens** governance violations (reduces backlash)

Negative values mean the violation **doesn't generate backlash**, which is theoretically correct for:
- Distant markets that don't care about governance
- Economically stressed markets focused on survival

---

**Summary:** Negative impact = Muted response / Less backlash, NOT reduced attention.
