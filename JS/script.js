document.addEventListener('DOMContentLoaded', () => {
    // --- Collapsible Functionality ---
    const collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(collapsible => {
        collapsible.addEventListener('click', function() {
            const parentTd = this.closest('td');
            const explanation = parentTd ? parentTd.querySelector('.explanation') : null;
            if (explanation) {
                explanation.style.display = explanation.style.display === 'block' ? 'none' : 'block';
                // No 'active' class toggling on collapsible directly as the icon is hidden
            }
        });
    });

    // --- Insight Modal Functionality ---
    const insightTriggers = document.querySelectorAll('.insight-trigger');
    const insightModal = document.getElementById('insightModal');
    const insightIframe = document.getElementById('insightIframe');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');

    insightTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent any default link behavior
            const url = this.dataset.insightUrl;
            if (url) {
                insightIframe.src = url;
                // Use the text content of the insight-trigger span for the modal title
                // We need to exclude the appended percentage text when setting the modal title
                const originalText = this.textContent.replace(/\s\(.*?\%\)$/, '').trim();
                modalTitle.textContent = originalText + " Insights";
                insightModal.style.display = 'flex'; // Show modal
            }
        });
    });

    modalCloseBtn.addEventListener('click', function() {
        insightModal.style.display = 'none'; // Hide modal
        insightIframe.src = ''; // Clear iframe content
    });

    // Close modal if clicked outside content
    insightModal.addEventListener('click', function(event) {
        if (event.target === insightModal) {
            insightModal.style.display = 'none';
            insightIframe.src = '';
        }
    });

    // --- Navigation Buttons (ensuring it's included and active state is managed) ---
    const balanceSheetBtn = document.getElementById('balanceSheetBtn');
    const profitLossBtn = document.getElementById('profitLossBtn');

    if (balanceSheetBtn) {
        balanceSheetBtn.addEventListener('click', function() {
            // Already has onclick in HTML to navigate, so active state is for visual feedback
            this.classList.add('active');
            if (profitLossBtn) profitLossBtn.classList.remove('active');
        });
    }

    if (profitLossBtn) {
        profitLossBtn.addEventListener('click', function() {
            this.classList.add('active');
            if (balanceSheetBtn) balanceSheetBtn.classList.remove('active');
        });
    }

    // Initialize button state based on current page
    if (window.location.pathname.includes('profit&loss.html')) {
        if (profitLossBtn) profitLossBtn.classList.add('active');
        if (balanceSheetBtn) balanceSheetBtn.classList.remove('active');
    } else {
        // Assuming 'Balancesheet.html' is the default if not profit&loss
        if (balanceSheetBtn) balanceSheetBtn.classList.add('active');
        if (profitLossBtn) profitLossBtn.classList.remove('active');
    }


    // Helper to clean and parse numerical values
    function cleanValue(value) {
        // Ensure values like "0.00" are handled correctly, and remove percentage text if present
        return parseFloat(String(value).replace(/\s\(.*?\%\)$/, '').replace(/,/g, '')) || 0;
    }

    // Helper to determine percentage color class
    function getPercentageClass(percentage) {
        // Define ranges for good, warning, bad based on growth rates.
        // These can be customized based on business logic.
        if (percentage >= 25) { // Significant positive growth
            return 'percent-green';
        } else if (percentage >= 5) { // Moderate positive growth
            return 'percent-yellow';
        } else if (percentage >= -5) { // Stagnant or slight decline
            return 'percent-orange';
        } else { // Significant decline
            return 'percent-red';
        }
    }

    // --- Define categorization for value coloring (used for items with no previous year for comparison) ---
    // These arrays are not directly used in the current logic where percentage change drives coloring.
    // They are left here in case future logic needs to apply static good/bad classes based on row type.
    const goodWhenHigh = [
        'Revenue From Operations [Gross]', 'Revenue From Operations [Net]', 'Total Operating Revenues',
        'Other Income', 'Total Revenue', 'Profit/Loss Before Exceptional, ExtraOrdinary Items And Tax',
        'Profit/Loss Before Tax', 'Profit/Loss After Tax And Before ExtraOrdinary Items',
        'Profit/Loss From Continuing Operations', 'Profit/Loss For The Period',
        'Basic EPS (Rs.)', 'Diluted EPS (Rs.)', 'Equity Share Dividend', 'Equity Dividend Rate (%)'
    ];

    const goodWhenLow = [
        'Less: Excise/Sev. Tax/Other Levies', 'Cost Of Materials Consumed', 'Purchase Of Stock-In Trade',
        'Operating And Direct Expenses', 'Employee Benefit Expenses', 'Finance Costs',
        'Depreciation And Amortisation Expenses', 'Other Expenses',
        'Less: Transfer To / From Investment / Fixed Assets / Others', 'Less: Amounts Transfer To Capital Accounts',
        'Total Expenses', 'Exceptional Items', 'Current Tax', 'Deferred Tax', 'Total Tax Expenses'
    ];

    const neutralUnlessNegative = [
        'Profit Loss From Discontinuing Operations', 'Net Profit Loss From Discontinuing Operations'
    ];


    const tableRows = document.querySelectorAll('tbody tr:not(.section-title):not(.category):not(.sub-total):not(.grand-total)'); // Exclude totals and categories

    tableRows.forEach(row => {
        // Get all data cells (excluding the first 'Particulars' cell)
        const dataCells = Array.from(row.querySelectorAll('td:not(:first-child)'));

        // Process columns from right to left (oldest year to newest) to correctly calculate impact against an older year.
        // Or, more accurately, we'll calculate impact *for* each column by looking at the column to its right (the previous year).
        // Let's iterate from the first data column (FY 24-25) up to the second to last (FY 21-22 for comparison with 20-21).
        // The last column (FY 20-21) will not have a subsequent year for comparison, so its impact will be randomized.

        for (let i = 0; i < dataCells.length; i++) {
            const currentCell = dataCells[i]; // This is the cell whose impact we are calculating relative to the next one
            const nextCell = dataCells[i + 1]; // This is the "previous year" for comparison

            // Get the raw text content for the current year's value
            let currentCellValueText = currentCell.querySelector('.insight-trigger')?.textContent || currentCell.textContent;
            currentCellValueText = currentCellValueText.replace(/\s\(.*?\%\)$/, '').trim(); // Remove any existing percentage
            const currentYearValue = cleanValue(currentCellValueText);

            let percentageChange;

            if (nextCell) { // If there's a next cell (i.e., not the last year column)
                // Get the raw text content for the previous year's value
                let previousCellValueText = nextCell.querySelector('.insight-trigger')?.textContent || nextCell.textContent;
                previousCellValueText = previousCellValueText.replace(/\s\(.*?\%\)$/, '').trim(); // Remove any existing percentage
                const previousYearValue = cleanValue(previousCellValueText);

                if (previousYearValue === 0) {
                    percentageChange = currentYearValue === 0 ? 0 : 100; // If previous is 0, and current is non-zero, it's 100% growth. If both 0, then 0.
                } else {
                    percentageChange = ((currentYearValue - previousYearValue) / previousYearValue) * 100;
                }
            } else { // This is the last data column (FY 20-21 in your structure)
                // Generate a random percentage for the last column as there's no older data to compare
                // Example: Random percentage between -50 and 50
                percentageChange = (Math.random() * 100) - 50;
            }

            percentageChange = parseFloat(percentageChange.toFixed(2));

            // Find or create the percentage display span
            let percentageDisplaySpan = currentCell.querySelector('.percentage-impact');
            if (!percentageDisplaySpan) {
                percentageDisplaySpan = document.createElement('span');
                percentageDisplaySpan.classList.add('percentage-impact');
                // Append to the .insight-trigger if it exists, otherwise directly to the td
                const insightTriggerSpan = currentCell.querySelector('.insight-trigger');
                if (insightTriggerSpan) {
                    insightTriggerSpan.appendChild(percentageDisplaySpan);
                } else {
                    // Ensure the original value is preserved if no insight-trigger
                    currentCell.innerHTML = `${currentCellValueText}`; // Reset content
                    currentCell.appendChild(percentageDisplaySpan);
                }
            }

            // Update text content and apply color class
            percentageDisplaySpan.textContent = ` (${percentageChange}%)`;
            
            // Remove previous percentage color classes from the percentageDisplaySpan
            percentageDisplaySpan.classList.remove('percent-green', 'percent-yellow', 'percent-orange', 'percent-red');
            percentageDisplaySpan.classList.add(getPercentageClass(percentageChange));
        }
    });

    // Handle styling for sub-total and grand-total rows, if specific rules apply
    // For now, they don't have percentages, so this block might be empty or handle other logic.
    document.querySelectorAll('tr.sub-total, tr.grand-total').forEach(row => {
        // You can add specific styling logic here if needed,
        // e.g., coloring based on the sum being positive/negative.
        // This example just ensures their text isn't affected by percentage logic.
        Array.from(row.querySelectorAll('td:not(:first-child)')).forEach(cell => {
            const valueText = cell.textContent.trim().replace(/,/g, '');
            const value = parseFloat(valueText);
            if (!isNaN(value)) {
                // Example: Apply value-good/value-bad class based on the value itself
                if (row.classList.contains('grand-total')) {
                    if (value > 0) {
                        cell.classList.add('value-good');
                    } else if (value < 0) {
                        cell.classList.add('value-bad');
                    } else {
                        cell.classList.add('value-neutral');
                    }
                }
            }
        });
    });
});