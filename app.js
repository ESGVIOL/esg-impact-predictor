// Global data storage
let appData = {
    estimates: {},
    distances: [],
    lto: {},
    unemployment: {},
    countries: [],
    predictions: []
};

// Track selected target markets
let selectedMarkets = new Set();

// Continent mapping (country name → continent)
const COUNTRY_CONTINENT = {
    // Africa
    'Algeria': 'Africa', 'Angola': 'Africa', 'Benin': 'Africa', 'Botswana': 'Africa',
    'Burkina Faso': 'Africa', 'Burundi': 'Africa', 'Cabo Verde': 'Africa',
    'Cape Verde': 'Africa', 'Cameroon': 'Africa', 'Central African Republic': 'Africa',
    'Chad': 'Africa', 'Comoros': 'Africa', 'Congo': 'Africa', 'Congo, Dem. Rep.': 'Africa',
    'Congo, Rep.': 'Africa', "Cote d'Ivoire": 'Africa', 'Djibouti': 'Africa',
    'Egypt': 'Africa', 'Equatorial Guinea': 'Africa', 'Eritrea': 'Africa',
    'Eswatini': 'Africa', 'Swaziland': 'Africa', 'Ethiopia': 'Africa',
    'Gabon': 'Africa', 'Gambia': 'Africa', 'Ghana': 'Africa', 'Guinea': 'Africa',
    'Guinea-Bissau': 'Africa', 'Kenya': 'Africa', 'Lesotho': 'Africa',
    'Liberia': 'Africa', 'Libya': 'Africa', 'Madagascar': 'Africa', 'Malawi': 'Africa',
    'Mali': 'Africa', 'Mauritania': 'Africa', 'Mauritius': 'Africa', 'Morocco': 'Africa',
    'Mozambique': 'Africa', 'Namibia': 'Africa', 'Niger': 'Africa', 'Nigeria': 'Africa',
    'Rwanda': 'Africa', 'Sao Tome and Principe': 'Africa', 'Senegal': 'Africa',
    'Seychelles': 'Africa', 'Sierra Leone': 'Africa', 'Somalia': 'Africa',
    'South Africa': 'Africa', 'South Sudan': 'Africa', 'Sudan': 'Africa',
    'Tanzania': 'Africa', 'Togo': 'Africa', 'Tunisia': 'Africa', 'Uganda': 'Africa',
    'Zambia': 'Africa', 'Zimbabwe': 'Africa',
    // Asia
    'Afghanistan': 'Asia', 'Armenia': 'Asia', 'Azerbaijan': 'Asia', 'Bahrain': 'Asia',
    'Bangladesh': 'Asia', 'Bhutan': 'Asia', 'Brunei': 'Asia', 'Brunei Darussalam': 'Asia',
    'Cambodia': 'Asia', 'China': 'Asia', 'Cyprus': 'Asia', 'Georgia': 'Asia',
    'Hong Kong': 'Asia', 'India': 'Asia', 'Indonesia': 'Asia', 'Iran': 'Asia',
    'Iraq': 'Asia', 'Israel': 'Asia', 'Japan': 'Asia', 'Jordan': 'Asia',
    'Kazakhstan': 'Asia', 'Kuwait': 'Asia', 'Kyrgyzstan': 'Asia', 'Laos': 'Asia',
    'Lebanon': 'Asia', 'Malaysia': 'Asia', 'Maldives': 'Asia', 'Mongolia': 'Asia',
    'Myanmar': 'Asia', 'Nepal': 'Asia', 'North Korea': 'Asia', 'Oman': 'Asia',
    'Pakistan': 'Asia', 'Palestine': 'Asia', 'Philippines': 'Asia', 'Qatar': 'Asia',
    'Saudi Arabia': 'Asia', 'Singapore': 'Asia', 'South Korea': 'Asia',
    'Korea, Rep.': 'Asia', "Korea, Dem. People's Rep.": 'Asia', 'Sri Lanka': 'Asia',
    'Syria': 'Asia', 'Taiwan': 'Asia', 'Tajikistan': 'Asia', 'Thailand': 'Asia',
    'Timor-Leste': 'Asia', 'Turkey': 'Asia', 'Turkmenistan': 'Asia',
    'United Arab Emirates': 'Asia', 'Uzbekistan': 'Asia', 'Vietnam': 'Asia', 'Yemen': 'Asia',
    // Europe
    'Albania': 'Europe', 'Andorra': 'Europe', 'Austria': 'Europe', 'Belarus': 'Europe',
    'Belgium': 'Europe', 'Bosnia and Herzegovina': 'Europe', 'Bulgaria': 'Europe',
    'Croatia': 'Europe', 'Czech Republic': 'Europe', 'Czechia': 'Europe',
    'Denmark': 'Europe', 'Estonia': 'Europe', 'Finland': 'Europe', 'France': 'Europe',
    'Germany': 'Europe', 'Greece': 'Europe', 'Hungary': 'Europe', 'Iceland': 'Europe',
    'Ireland': 'Europe', 'Italy': 'Europe', 'Kosovo': 'Europe', 'Latvia': 'Europe',
    'Liechtenstein': 'Europe', 'Lithuania': 'Europe', 'Luxembourg': 'Europe',
    'Malta': 'Europe', 'Moldova': 'Europe', 'Monaco': 'Europe', 'Montenegro': 'Europe',
    'Netherlands': 'Europe', 'North Macedonia': 'Europe', 'Macedonia': 'Europe',
    'Norway': 'Europe', 'Poland': 'Europe', 'Portugal': 'Europe', 'Romania': 'Europe',
    'Russia': 'Europe', 'San Marino': 'Europe', 'Serbia': 'Europe',
    'Slovakia': 'Europe', 'Slovenia': 'Europe', 'Spain': 'Europe', 'Sweden': 'Europe',
    'Switzerland': 'Europe', 'Ukraine': 'Europe', 'United Kingdom': 'Europe',
    // North America
    'Antigua and Barbuda': 'North America', 'Bahamas': 'North America',
    'Barbados': 'North America', 'Belize': 'North America', 'Canada': 'North America',
    'Costa Rica': 'North America', 'Cuba': 'North America', 'Dominica': 'North America',
    'Dominican Republic': 'North America', 'El Salvador': 'North America',
    'Grenada': 'North America', 'Guatemala': 'North America', 'Haiti': 'North America',
    'Honduras': 'North America', 'Jamaica': 'North America', 'Mexico': 'North America',
    'Nicaragua': 'North America', 'Panama': 'North America',
    'Saint Kitts and Nevis': 'North America', 'Saint Lucia': 'North America',
    'Saint Vincent and the Grenadines': 'North America',
    'Trinidad and Tobago': 'North America', 'United States': 'North America',
    // South America
    'Argentina': 'South America', 'Bolivia': 'South America', 'Brazil': 'South America',
    'Chile': 'South America', 'Colombia': 'South America', 'Ecuador': 'South America',
    'Guyana': 'South America', 'Paraguay': 'South America', 'Peru': 'South America',
    'Suriname': 'South America', 'Uruguay': 'South America', 'Venezuela': 'South America',
    // Oceania
    'Australia': 'Oceania', 'Fiji': 'Oceania', 'Kiribati': 'Oceania',
    'Marshall Islands': 'Oceania', 'Micronesia': 'Oceania', 'Nauru': 'Oceania',
    'New Zealand': 'Oceania', 'Palau': 'Oceania', 'Papua New Guinea': 'Oceania',
    'Samoa': 'Oceania', 'Solomon Islands': 'Oceania', 'Tonga': 'Oceania',
    'Tuvalu': 'Oceania', 'Vanuatu': 'Oceania'
};

const CONTINENT_ORDER = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Other'];

// Load all data files
async function loadData() {
    try {
        const [estimates, distances, lto, unemployment] = await Promise.all([
            fetch('estimates.json').then(r => r.json()),
            fetch('distances.json').then(r => r.json()),
            fetch('lto.json').then(r => r.json()),
            fetch('unemployment.json').then(r => r.json())
        ]);

        appData.estimates = estimates;
        appData.distances = distances;
        appData.lto = lto;
        appData.unemployment = unemployment;

        // Extract unique countries from distances
        const countriesSet = new Set();
        distances.forEach(d => {
            countriesSet.add(d.country_i);
            countriesSet.add(d.country_j);
        });
        appData.countries = Array.from(countriesSet).sort();

        // Populate dropdowns
        populateCountryDropdowns();

        console.log('Data loaded successfully');
    } catch (error) {
        console.error('Error loading data:', error);
        alert('Error loading data files. Please ensure all JSON files are present.');
    }
}

// Populate home country dropdown only
function populateCountryDropdowns() {
    const homeCountrySelect = document.getElementById('homeCountry');
    appData.countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        homeCountrySelect.appendChild(option);
    });
    buildTargetMarketsUI();
}

// Build the continent-organised target markets picker
function buildTargetMarketsUI() {
    // Group countries by continent
    const groups = {};
    CONTINENT_ORDER.forEach(c => { groups[c] = []; });

    appData.countries.forEach(country => {
        const continent = COUNTRY_CONTINENT[country] || 'Other';
        groups[continent].push(country);
    });

    const panel = document.getElementById('marketSelectionPanel');
    panel.innerHTML = '';

    CONTINENT_ORDER.forEach(continent => {
        const countries = groups[continent];
        if (countries.length === 0) return;

        const continentId = continent.replace(/\s+/g, '-').toLowerCase();

        // Outer wrapper
        const section = document.createElement('div');
        section.className = 'continent-section';

        // Header row
        const header = document.createElement('div');
        header.className = 'continent-header d-flex align-items-center justify-content-between px-2 py-1';
        header.innerHTML = `
            <button type="button"
                    class="btn btn-sm continent-toggle d-flex align-items-center gap-1"
                    data-bs-toggle="collapse"
                    data-bs-target="#continent-${continentId}"
                    aria-expanded="false">
                <i class="bi bi-chevron-right continent-chevron"></i>
                <span class="fw-semibold">${continent}</span>
                <span class="badge bg-secondary ms-1 continent-count" id="count-${continentId}">0 / ${countries.length}</span>
            </button>
            <button type="button"
                    class="btn btn-sm select-continent-btn"
                    data-continent="${continent}"
                    data-continent-id="${continentId}">All</button>
        `;

        // Collapsible country list
        const collapse = document.createElement('div');
        collapse.className = 'collapse';
        collapse.id = `continent-${continentId}`;

        const grid = document.createElement('div');
        grid.className = 'country-grid px-2 pb-2 pt-1';

        countries.forEach(country => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn btn-sm country-btn btn-outline-secondary';
            btn.textContent = country;
            btn.dataset.country = country;
            btn.dataset.continent = continent;
            btn.dataset.continentId = continentId;
            btn.addEventListener('click', () => toggleCountry(country, continent, continentId));
            grid.appendChild(btn);
        });

        collapse.appendChild(grid);
        section.appendChild(header);
        section.appendChild(collapse);
        panel.appendChild(section);

        // "All" button for continent
        header.querySelector('.select-continent-btn').addEventListener('click', () => {
            toggleAllInContinent(continent, continentId, countries);
        });

        // Rotate chevron on expand/collapse
        collapse.addEventListener('show.bs.collapse', () => {
            const chevron = header.querySelector('.continent-chevron');
            chevron.classList.replace('bi-chevron-right', 'bi-chevron-down');
        });
        collapse.addEventListener('hide.bs.collapse', () => {
            const chevron = header.querySelector('.continent-chevron');
            chevron.classList.replace('bi-chevron-down', 'bi-chevron-right');
        });
    });
}

// Toggle a single country button
function toggleCountry(country, continent, continentId) {
    if (selectedMarkets.has(country)) {
        selectedMarkets.delete(country);
    } else {
        selectedMarkets.add(country);
    }
    refreshCountryButton(country);
    refreshContinentCount(continent, continentId);
    refreshSelectedCount();
}

// Toggle all countries in a continent (select all / deselect all)
function toggleAllInContinent(continent, continentId, countries) {
    const allSelected = countries.every(c => selectedMarkets.has(c));
    countries.forEach(c => {
        if (allSelected) {
            selectedMarkets.delete(c);
        } else {
            selectedMarkets.add(c);
        }
        refreshCountryButton(c);
    });
    refreshContinentCount(continent, continentId);
    refreshSelectedCount();
}

// Update visual state of a single country button
function refreshCountryButton(country) {
    document.querySelectorAll('.country-btn').forEach(btn => {
        if (btn.dataset.country === country) {
            if (selectedMarkets.has(country)) {
                btn.classList.remove('btn-outline-secondary');
                btn.classList.add('btn-primary');
            } else {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-secondary');
            }
        }
    });
}

// Update the count badge for a continent
function refreshContinentCount(continent, continentId) {
    const badge = document.getElementById(`count-${continentId}`);
    if (!badge) return;
    let total = 0, selected = 0;
    document.querySelectorAll('.country-btn').forEach(btn => {
        if (btn.dataset.continent === continent) {
            total++;
            if (selectedMarkets.has(btn.dataset.country)) selected++;
        }
    });
    badge.textContent = `${selected} / ${total}`;
    badge.className = `badge ms-1 continent-count ${selected > 0 ? 'bg-primary' : 'bg-secondary'}`;
}

// Update the global "X markets selected" label
function refreshSelectedCount() {
    const el = document.getElementById('selectedMarketsCount');
    const n = selectedMarkets.size;
    if (n === 0) {
        el.textContent = 'No markets selected';
        el.className = 'text-muted';
    } else {
        el.textContent = `${n} market${n === 1 ? '' : 's'} selected`;
        el.className = 'text-primary fw-semibold';
    }
}

// Get psychic distance between two countries
function getDistance(country1, country2) {
    const distance = appData.distances.find(d =>
        (d.country_i === country1 && d.country_j === country2) ||
        (d.country_i === country2 && d.country_j === country1)
    );
    return distance ? distance.distance : null;
}

// Get LTO value for a country (with fuzzy matching)
function getLTO(country) {
    // Direct match
    if (appData.lto[country] !== undefined) {
        return appData.lto[country];
    }

    // Try case-insensitive match
    const lowerCountry = country.toLowerCase();
    for (let key in appData.lto) {
        if (key.toLowerCase() === lowerCountry) {
            return appData.lto[key];
        }
    }

    // Return null if not found (model will handle missing values)
    return null;
}

// Get unemployment rate for a country
function getUnemployment(country) {
    // Direct match
    if (appData.unemployment[country] !== undefined) {
        return appData.unemployment[country];
    }

    // Try case-insensitive match
    const lowerCountry = country.toLowerCase();
    for (let key in appData.unemployment) {
        if (key.toLowerCase() === lowerCountry) {
            return appData.unemployment[key];
        }
    }

    return null;
}

// Calculate prediction for a specific market
function calculatePrediction(homeCountry, marketCountry, violationType, baselineNegativity) {
    const model = appData.estimates[violationType];
    const distance = getDistance(homeCountry, marketCountry);

    if (distance === null) {
        return null; // Cannot calculate without distance
    }

    // Start with incident effect (when Incident = 1)
    // Note: We only use incident-related terms because we're predicting the impact
    // WHEN an incident occurs (Incident = 1). Main effects of distance, LTO, and
    // unemployment are control variables in the panel model, not part of incident effect.
    let effect = model.incident || 0;

    // Add interaction: incident * psychic distance
    if (model.incident_psych) {
        effect += model.incident_psych * distance;
    }

    // Environmental model: Add LTO incident effects
    if (violationType === 'environmental') {
        const lto = getLTO(marketCountry);
        if (lto !== null) {
            // Incident * LTO (not main effect of LTO)
            if (model.incident_lto) {
                effect += model.incident_lto * lto;
            }
            // Three-way interaction: Incident * LTO * Psychic Distance
            if (model.incident_lto_psych) {
                effect += model.incident_lto_psych * lto * distance;
            }
        }
    }

    // Social and Governance models: Add unemployment incident effects
    if (violationType === 'social_issue' || violationType === 'governance') {
        const unemployment = getUnemployment(marketCountry);
        if (unemployment !== null) {
            // Incident * Unemployment (not main effect of unemployment)
            if (model.incident_unemployment) {
                effect += model.incident_unemployment * unemployment;
            }
            // Three-way interaction: Incident * Unemployment * Psychic Distance
            if (model.incident_unemployment_psych) {
                effect += model.incident_unemployment_psych * unemployment * distance;
            }
        }
    }

    // The model DV is log(share of negative tweets).
    // Convert from log-scale effect to percentage-point change:
    //   post_share = baseline_share × exp(effect)
    //   impact_pp  = (post_share − baseline_share) × 100
    const baselineShare = baselineNegativity / 100;
    const postIncidentShare = baselineShare * Math.exp(effect);
    const impactPercentagePoints = (postIncidentShare - baselineShare) * 100;
    const postIncidentNegativity = postIncidentShare * 100;

    // Calculate decay over 30 days (exponential decay applied in log space,
    // then converted back to level for each day)
    const timeline = [];
    let avgNegativity = 0;
    for (let day = 1; day <= 30; day++) {
        const decayFactor = Math.exp(-0.05 * (day - 1)); // Decay rate of 5% per day
        const dayShare = baselineShare * Math.exp(effect * decayFactor);
        const dayNegativity = dayShare * 100;
        timeline.push({
            day: day,
            negativity: dayNegativity
        });
        avgNegativity += dayNegativity;
    }
    avgNegativity = avgNegativity / 30; // Average over 30 days

    return {
        market: marketCountry,
        distance: distance.toFixed(3),
        impactPP: impactPercentagePoints.toFixed(2),
        postIncidentNegativity: postIncidentNegativity.toFixed(1),
        avgNegativity30Days: avgNegativity.toFixed(1),
        timeline: timeline,
        lto: getLTO(marketCountry),
        unemployment: getUnemployment(marketCountry)
    };
}

// Main prediction function
function runPredictions(homeCountry, markets, violationType, baselineNegativity) {
    const predictions = [];

    markets.forEach(market => {
        if (market !== homeCountry) { // Skip home country
            const prediction = calculatePrediction(homeCountry, market, violationType, baselineNegativity);
            if (prediction) {
                predictions.push(prediction);
            }
        }
    });

    // Sort by absolute impact (descending)
    predictions.sort((a, b) => Math.abs(parseFloat(b.impactPP)) - Math.abs(parseFloat(a.impactPP)));

    return predictions;
}

// Display results
function displayResults(predictions, homeCountry, violationType, baselineNegativity) {
    // Hide welcome message, show results
    document.getElementById('welcomeMessage').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';

    // Update summary statistics
    const avgImpact = predictions.reduce((sum, p) => sum + parseFloat(p.impactPP), 0) / predictions.length;
    const positiveCount = predictions.filter(p => parseFloat(p.impactPP) > 0).length;
    const maxImpact = Math.max(...predictions.map(p => Math.abs(parseFloat(p.impactPP))));

    document.getElementById('statMarkets').textContent = predictions.length;
    document.getElementById('statAvgImpact').textContent = avgImpact > 0 ? `+${avgImpact.toFixed(2)}pp` : `${avgImpact.toFixed(2)}pp`;
    document.getElementById('statPositiveMarkets').textContent = `${positiveCount} / ${predictions.length}`;
    document.getElementById('statMaxImpact').textContent = `${maxImpact.toFixed(2)}pp`;

    // Generate visualizations
    generateWorldMap(predictions, homeCountry);
    generateTimeline(predictions.slice(0, 10)); // Top 10 markets by absolute impact
    populateTable(predictions);

    // Store predictions for export
    appData.predictions = predictions;
}

// Generate world map using Plotly
function generateWorldMap(predictions, homeCountry) {
    const countries = predictions.map(p => p.market);
    const values = predictions.map(p => parseFloat(p.impactPP));
    const text = predictions.map(p =>
        `${p.market}<br>Impact: ${p.impactPP}pp<br>Post-Incident: ${p.postIncidentNegativity}%`
    );

    // Trace 1: market impact heatmap
    const marketsTrace = {
        type: 'choropleth',
        locationmode: 'country names',
        locations: countries,
        z: values,
        text: text,
        hoverinfo: 'text',
        colorscale: [
            [0, '#1e3a8a'],   // Dark blue (negative/muted)
            [0.5, '#f3f4f6'], // Light gray (neutral)
            [1, '#dc2626']    // Red (high backlash)
        ],
        zmid: 0,
        colorbar: {
            title: 'Impact (pp)',
            thickness: 15,
            len: 0.7
        }
    };

    // Trace 2: home country highlighted in orange
    const homeTrace = {
        type: 'choropleth',
        locationmode: 'country names',
        locations: [homeCountry],
        z: [1],
        text: [`${homeCountry}<br><b>Violating company's home country</b>`],
        hoverinfo: 'text',
        colorscale: [[0, '#000000'], [1, '#000000']],
        showscale: false,
        marker: { line: { color: '#000000', width: 1.5 } }
    };

    const data = [marketsTrace, homeTrace];

    const layout = {
        geo: {
            projection: {
                type: 'natural earth'
            },
            showframe: false,
            showcoastlines: true,
            coastlinecolor: '#ccc'
        },
        margin: { t: 0, b: 0, l: 0, r: 0 },
        height: 500
    };

    Plotly.newPlot('worldMap', data, layout, { responsive: true });
}

// Generate timeline chart
function generateTimeline(topPredictions) {
    const traces = topPredictions.map(prediction => ({
        x: prediction.timeline.map(t => t.day),
        y: prediction.timeline.map(t => t.negativity),
        name: prediction.market,
        type: 'scatter',
        mode: 'lines',
        line: { width: 2 }
    }));

    const layout = {
        xaxis: {
            title: 'Days After Incident',
            showgrid: true,
            gridcolor: '#e5e7eb'
        },
        yaxis: {
            title: 'Negative Sentiment Share (%)',
            showgrid: true,
            gridcolor: '#e5e7eb'
        },
        margin: { t: 20, b: 50, l: 60, r: 20 },
        height: 400,
        hovermode: 'closest',
        legend: {
            orientation: 'v',
            x: 1.02,
            y: 1
        }
    };

    Plotly.newPlot('timelineChart', traces, layout, { responsive: true });
}

// Populate results table
function populateTable(predictions) {
    const tbody = document.getElementById('resultsTableBody');
    tbody.innerHTML = '';

    predictions.forEach(prediction => {
        const row = document.createElement('tr');

        const impactValue = parseFloat(prediction.impactPP);
        let impactClass = 'impact-low';
        let impactIcon = '';
        let impactLabel = '';

        if (impactValue < 0) {
            impactClass = 'text-muted';
            impactIcon = '<i class="bi bi-arrow-down-circle"></i> ';
            impactLabel = ' (muted)';
        } else if (impactValue > 2) {
            impactClass = 'impact-high';
            impactIcon = '<i class="bi bi-arrow-up-circle-fill"></i> ';
        } else if (impactValue > 1) {
            impactClass = 'impact-medium';
            impactIcon = '<i class="bi bi-arrow-up-circle"></i> ';
        } else if (impactValue > 0) {
            impactClass = 'impact-low';
            impactIcon = '<i class="bi bi-arrow-up"></i> ';
        }

        row.innerHTML = `
            <td><strong>${prediction.market}</strong></td>
            <td>${prediction.distance}</td>
            <td class="${impactClass}">
                ${impactIcon}${prediction.impactPP}pp${impactLabel}
            </td>
            <td>${prediction.postIncidentNegativity}%</td>
            <td>${prediction.avgNegativity30Days}%</td>
        `;
        tbody.appendChild(row);
    });
}

// Export to CSV
function exportToCSV() {
    if (appData.predictions.length === 0) {
        alert('No predictions to export');
        return;
    }

    const headers = ['Market', 'Psychic Distance', 'Impact (pp)', 'Post-Incident Negativity (%)', 'Avg 30-Day Negativity (%)'];
    const rows = appData.predictions.map(p => [
        p.market,
        p.distance,
        p.impactPP,
        p.postIncidentNegativity,
        p.avgNegativity30Days
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'esg_sentiment_predictions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Update model information display
function updateModelInfo() {
    const violationType = document.getElementById('violationType').value;
    const model = appData.estimates[violationType];

    if (!model) {
        return;
    }

    let info = `<strong>${violationType.replace('_', ' ').toUpperCase()} Model</strong><br>`;
    info += '<small>Coefficients (incident-related terms):</small><br>';

    const varNames = {
        'incident': 'Incident Effect',
        'incident_psych': 'Incident × Distance',
        'incident_lto': 'Incident × LTO',
        'incident_lto_psych': 'Incident × LTO × Distance',
        'incident_unemployment': 'Incident × Unemployment',
        'incident_unemployment_psych': 'Incident × Unemployment × Distance'
    };

    for (let key in model) {
        if (varNames[key]) {
            const coef = model[key];
            const sign = coef >= 0 ? '+' : '';
            info += `<small>• ${varNames[key]}: ${sign}${coef.toFixed(4)}</small><br>`;
        }
    }

    // Add interpretation
    info += '<br><small class="text-muted"><strong>Expected patterns:</strong><br>';

    if (violationType === 'overall') {
        info += 'Positive impact in all markets, slightly increasing with distance.</small>';
    } else if (violationType === 'environmental') {
        info += 'Strong positive impact, amplified in high long-term orientation cultures.</small>';
    } else if (violationType === 'social_issue') {
        info += 'Positive impact, stronger in markets with high unemployment.</small>';
    } else if (violationType === 'governance') {
        info += 'Positive in nearby, low-unemployment markets. <strong>May be negative</strong> in distant markets with high unemployment where consumers prioritize economic survival over governance issues.</small>';
    }

    document.getElementById('modelInfo').innerHTML = info;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    // Clear all selected markets
    document.getElementById('clearAllMarkets').addEventListener('click', () => {
        selectedMarkets.clear();
        document.querySelectorAll('.country-btn').forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline-secondary');
        });
        CONTINENT_ORDER.forEach(continent => {
            const continentId = continent.replace(/\s+/g, '-').toLowerCase();
            refreshContinentCount(continent, continentId);
        });
        refreshSelectedCount();
    });

    // Violation type selection
    document.getElementById('violationType').addEventListener('change', updateModelInfo);

    // Form submission
    document.getElementById('predictionForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const homeCountry = document.getElementById('homeCountry').value;
        const violationType = document.getElementById('violationType').value;
        const baselineNegativity = parseFloat(document.getElementById('baselineNegativity').value);

        const markets = Array.from(selectedMarkets);
        if (markets.length === 0) {
            alert('Please select at least one target market.');
            return;
        }

        // Show loading spinner
        document.getElementById('loadingSpinner').style.display = 'block';
        document.getElementById('resultsContainer').style.display = 'none';

        // Run predictions (with small delay for spinner to show)
        setTimeout(() => {
            const predictions = runPredictions(homeCountry, markets, violationType, baselineNegativity);

            if (predictions.length === 0) {
                alert('No predictions could be generated. Please check your selections.');
                document.getElementById('loadingSpinner').style.display = 'none';
                return;
            }

            displayResults(predictions, homeCountry, violationType, baselineNegativity);
            document.getElementById('loadingSpinner').style.display = 'none';
        }, 500);
    });

    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
});
