document.addEventListener("DOMContentLoaded", () => {
    let revenueDonutChart;
    let exceptionCombinedChart;
    let balanceSheetData = null; // To store the loaded JSON data
    let currentInsightData = null; // Stores data for the currently open insight modal

    const monthSlider = document.getElementById("monthSlider");
    const selectedMonthDisplay = document.getElementById("selectedMonthDisplay");

    // --- Fiscal Year Definitions ---
    const fiscalYearPeriods = [
        { label: "FY 23-24", dataYear: "23-24", startMonth: 3, startYear: 2023, endMonth: 2, endYear: 2024 },
        { label: "FY 24-25", dataYear: "24-25", startMonth: 3, startYear: 2024, endMonth: 2, endYear: 2025 }
    ];

    // Initialize slider max value based on fiscalYearPeriods length
    monthSlider.max = fiscalYearPeriods.length - 1;
    monthSlider.value = fiscalYearPeriods.length - 1; // Default to the latest FY

    function updateFiscalYearDisplay(sliderValue) {
        const fiscalYearIndex = parseInt(sliderValue, 10);
        if (fiscalYearIndex >= 0 && fiscalYearIndex < fiscalYearPeriods.length) {
            selectedMonthDisplay.textContent = fiscalYearPeriods[fiscalYearIndex].label;
        } else {
            selectedMonthDisplay.textContent = "N/A";
        }
        selectedMonthDisplay.classList.add("animate");
        setTimeout(() => {
            selectedMonthDisplay.classList.remove("animate");
        }, 300);
    }

    updateFiscalYearDisplay(monthSlider.value);

    // Function to fetch balance sheet data
    async function fetchBalanceSheetData() {
        if (!balanceSheetData) {
            try {
                const response = await fetch("/assets/balance-sheet-value.json");
                balanceSheetData = await response.json();
                console.log("Balance Sheet Data Loaded:", balanceSheetData);
            } catch (error) {
                console.error("Error loading balance sheet data:", error);
                return;
            }
        }
        updateTableWithData();
    }

    // Function to get data for a specific line item and fiscal year
    function getLineItemData(itemName, fiscalYearLabel) {
        if (balanceSheetData && balanceSheetData[itemName] && balanceSheetData[itemName][fiscalYearLabel]) {
            return balanceSheetData[itemName][fiscalYearLabel];
        }
        return { amount: 0, percentage: 0 }; // Default if data not found
    }

    // Function to update the table with data from the JSON
    function updateTableWithData() {
        const tableRows = document.querySelectorAll(
            "tbody tr:not(.section-title):not(.category):not(.sub-total):not(.grand-total)"
        );

        tableRows.forEach(row => {
            const lineItemName = row.querySelector("td .collapsible").textContent.trim();
            const yearDataCells = Array.from(row.querySelectorAll("td.year-data"));

            yearDataCells.forEach(cell => {
                const fiscalYear = `FY ${cell.dataset.year}`; // e.g., "FY 24-25"
                const data = getLineItemData(lineItemName, fiscalYear);
                const insightTriggerSpan = cell.querySelector(".insight-trigger");
                let percentageDisplaySpan = cell.querySelector(".percentage-impact");

                if (!percentageDisplaySpan) {
                    percentageDisplaySpan = document.createElement("span");
                    percentageDisplaySpan.classList.add("percentage-impact");
                    insightTriggerSpan.appendChild(percentageDisplaySpan);
                }

                if (insightTriggerSpan) {
                    insightTriggerSpan.innerHTML = `${new Intl.NumberFormat("en-US").format(data.amount)}`;
                    if (data.percentage !== undefined) {
                        percentageDisplaySpan.textContent = ` (${data.percentage.toFixed(2)}%)`;
                        percentageDisplaySpan.classList.remove("green", "red", "yellow"); // Remove old classes
                        if (data.percentage > 0) percentageDisplaySpan.classList.add("green");
                        else if (data.percentage < 0) percentageDisplaySpan.classList.add("red");
                        else percentageDisplaySpan.classList.add("yellow"); // For 0% change or other neutral impact
                    } else {
                        percentageDisplaySpan.textContent = "";
                    }
                    if (data.impact_data_url) {
                         insightTriggerSpan.dataset.insightUrl = data.impact_data_url;
                    } else {
                        delete insightTriggerSpan.dataset.insightUrl; // Remove if no URL
                    }
                } else {
                     cell.textContent = new Intl.NumberFormat("en-US").format(data.amount);
                }
            });
        });

        calculateAndDisplaySubTotals();
        calculateAndDisplayGrandTotals();
        calculateAndDisplayPercentages(); // Recalculate based on newly loaded data
    }


    function calculateAndDisplaySubTotals() {
        const subTotalRows = document.querySelectorAll("tr.sub-total");
        subTotalRows.forEach(subTotalRow => {
            const subTotalName = subTotalRow.querySelector("td .collapsible").textContent.trim();
            const yearDataCells = subTotalRow.querySelectorAll("td.year-data");

            yearDataCells.forEach(cell => {
                const fiscalYear = `FY ${cell.dataset.year}`;
                let sum = 0;

                if (subTotalName === "Total Share Capital") {
                    const equityShareCapitalData = getLineItemData("Equity Share Capital", fiscalYear);
                    sum = equityShareCapitalData.amount; // Assuming only Equity Share Capital for now
                } else if (subTotalName === "Total Reserves and Surplus") {
                    const reservesAndSurplusData = getLineItemData("Reserves and Surplus", fiscalYear);
                    sum = reservesAndSurplusData.amount;
                } else if (subTotalName === "Fixed Assets") {
                    const tangible = getLineItemData("Tangible Assets", fiscalYear).amount;
                    const intangible = getLineItemData("Intangible Assets", fiscalYear).amount;
                    const cwp = getLineItemData("Capital Work-In-Progress", fiscalYear).amount;
                    const iad = getLineItemData("Intangible Assets Under Development", fiscalYear).amount;
                    sum = tangible + intangible + cwp + iad;
                }

                const insightTriggerSpan = cell.querySelector(".insight-trigger");
                if (insightTriggerSpan) {
                     insightTriggerSpan.textContent = new Intl.NumberFormat("en-US").format(sum);
                } else {
                    cell.textContent = new Intl.NumberFormat("en-US").format(sum);
                }
            });
        });
    }

    function calculateAndDisplayGrandTotals() {
        const grandTotalRows = document.querySelectorAll("tr.grand-total");

        grandTotalRows.forEach(grandTotalRow => {
            const grandTotalName = grandTotalRow.querySelector("td .collapsible").textContent.trim();
            const yearDataCells = grandTotalRow.querySelectorAll("td.year-data");

            yearDataCells.forEach(cell => {
                const fiscalYear = `FY ${cell.dataset.year}`;
                let total = 0;

                if (grandTotalName === "Total Shareholders Funds") {
                    const totalShareCapital = cleanValue(subTotalRowValue("Total Share Capital", fiscalYear));
                    const totalReservesAndSurplus = cleanValue(subTotalRowValue("Total Reserves and Surplus", fiscalYear));
                    total = totalShareCapital + totalReservesAndSurplus;
                } else if (grandTotalName === "Total Non-Current Liabilities") {
                    const longTermBorrowings = getLineItemData("Long Term Borrowings", fiscalYear).amount;
                    const deferredTaxLiabilities = getLineItemData("Deferred Tax Liabilities [Net]", fiscalYear).amount;
                    const longTermProvisions = getLineItemData("Long Term Provisions", fiscalYear).amount;
                    total = longTermBorrowings + deferredTaxLiabilities + longTermProvisions;
                } else if (grandTotalName === "Total Current Liabilities") {
                    const shortTermBorrowings = getLineItemData("Short Term Borrowings", fiscalYear).amount;
                    const tradePayables = getLineItemData("Trade Payables", fiscalYear).amount;
                    const otherCurrentLiabilities = getLineItemData("Other Current Liabilities", fiscalYear).amount;
                    const shortTermProvisions = getLineItemData("Short Term Provisions", fiscalYear).amount;
                    total = shortTermBorrowings + tradePayables + otherCurrentLiabilities + shortTermProvisions;
                } else if (grandTotalName === "Total Capital And Liabilities") {
                    const totalShareholdersFunds = cleanValue(grandTotalRowValue("Total Shareholders Funds", fiscalYear));
                    const totalNonCurrentLiabilities = cleanValue(grandTotalRowValue("Total Non-Current Liabilities", fiscalYear));
                    const totalCurrentLiabilities = cleanValue(grandTotalRowValue("Total Current Liabilities", fiscalYear));
                    total = totalShareholdersFunds + totalNonCurrentLiabilities + totalCurrentLiabilities;
                } else if (grandTotalName === "Total Non-Current Assets") {
                    const fixedAssets = cleanValue(subTotalRowValue("Fixed Assets", fiscalYear));
                    const nonCurrentInvestments = getLineItemData("Non-Current Investments", fiscalYear).amount;
                    const longTermLoansAndAdvances = getLineItemData("Long Term Loans And Advances", fiscalYear).amount;
                    const otherNonCurrentAssets = getLineItemData("Other Non-Current Assets", fiscalYear).amount;
                    total = fixedAssets + nonCurrentInvestments + longTermLoansAndAdvances + otherNonCurrentAssets;
                } else if (grandTotalName === "Total Current Assets") {
                    const currentInvestments = getLineItemData("Current Investments", fiscalYear).amount;
                    const inventories = getLineItemData("Inventories", fiscalYear).amount;
                    const tradeReceivables = getLineItemData("Trade Receivables", fiscalYear).amount;
                    const cashAndCashEquivalents = getLineItemData("Cash And Cash Equivalents", fiscalYear).amount;
                    const shortTermLoansAndAdvances = getLineItemData("Short Term Loans And Advances", fiscalYear).amount;
                    const otherCurrentAssets = getLineItemData("Other Current Assets", fiscalYear).amount;
                    total = currentInvestments + inventories + tradeReceivables + cashAndCashEquivalents + shortTermLoansAndAdvances + otherCurrentAssets;
                } else if (grandTotalName === "Total Assets") {
                    const totalNonCurrentAssets = cleanValue(grandTotalRowValue("Total Non-Current Assets", fiscalYear));
                    const totalCurrentAssets = cleanValue(grandTotalRowValue("Total Current Assets", fiscalYear));
                    total = totalNonCurrentAssets + totalCurrentAssets;
                }


                const insightTriggerSpan = cell.querySelector(".insight-trigger");
                if (insightTriggerSpan) {
                     insightTriggerSpan.textContent = new Intl.NumberFormat("en-US").format(total);
                } else {
                    cell.textContent = new Intl.NumberFormat("en-US").format(total);
                }
            });
        });
    }

    // Helper to get value for sub-total rows
    function subTotalRowValue(subTotalName, fiscalYear) {
        const row = Array.from(document.querySelectorAll("tr.sub-total")).find(r => r.querySelector("td .collapsible").textContent.trim() === subTotalName);
        if (row) {
            const cell = row.querySelector(`td.year-data[data-year="${fiscalYear.replace('FY ', '')}"]`);
            if (cell) {
                return cell.querySelector(".insight-trigger")?.textContent || cell.textContent;
            }
        }
        return "0";
    }

    // Helper to get value for grand-total rows
    function grandTotalRowValue(grandTotalName, fiscalYear) {
        const row = Array.from(document.querySelectorAll("tr.grand-total")).find(r => r.querySelector("td .collapsible").textContent.trim() === grandTotalName);
        if (row) {
            const cell = row.querySelector(`td.year-data[data-year="${fiscalYear.replace('FY ', '')}"]`);
            if (cell) {
                return cell.querySelector(".insight-trigger")?.textContent || cell.textContent;
            }
        }
        return "0";
    }


    // --- Existing Collapsible Functionality ---
    const collapsibles = document.querySelectorAll(".collapsible");
    collapsibles.forEach((collapsible) => {
        collapsible.addEventListener("click", function () {
            const parentTd = this.closest("td");
            const explanation = parentTd
                ? parentTd.querySelector(".explanation")
                : null;
            if (explanation) {
                explanation.style.display =
                    explanation.style.display === "block" ? "none" : "block";
            }
        });
    });

    // --- Existing Insight Modal Functionality ---
    const insightTriggers = document.querySelectorAll(".insight-trigger"); // Re-query after table update
    const insightModal = document.getElementById("insightModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalTitle = document.getElementById("modalTitle");
    const donutTotalAmount = document.getElementById("donutTotalAmount");

    // Function to get CSS variables
    function getCssVar(varName) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(varName)
            .trim();
    }

    // --- Function to update charts and table based on current impact data ---
    function updateModalChartsAndTable(impactData, selectedFiscalYearTotal) {
        if (revenueDonutChart) {
            revenueDonutChart.destroy();
        }
        if (exceptionCombinedChart) {
            exceptionCombinedChart.destroy();
        }

        const impactTableBody = document.querySelector(".impact-table tbody");
        impactTableBody.innerHTML = ""; // Clear existing rows

        impactData.forEach((item, index) => {
            const impactPercentage = ((item.amount / selectedFiscalYearTotal) * 100).toFixed(2);
            let percentageClass = "green";
            if (impactPercentage > 70) {
                percentageClass = "red";
            } else if (impactPercentage > 40 && impactPercentage <= 70) {
                percentageClass = "yellow";
            }

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.insight}</td>
                <td class="impact-amount" style="text-align: right;">${new Intl.NumberFormat("en-US").format(item.amount)}</td>
                <td class="percentage-impact ${percentageClass}" style="text-align: right;">${impactPercentage}%</td>
                <td>${item.description}</td>
            `;
            impactTableBody.appendChild(row);
        });

        donutTotalAmount.textContent = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(selectedFiscalYearTotal);

        // --- Balance Sheet Impact Distribution Donut Chart ---
        const ctxDonut = document.getElementById("revenueDonutChart").getContext("2d");
        const donutData = impactData.map(item => ({ label: item.insight, amount: item.amount }));

        const chartColors = [
            getCssVar("--color-product-sales"),
            getCssVar("--color-service-revenue"),
            getCssVar("--color-subscriptions"),
            getCssVar("--color-consulting"),
            getCssVar("--color-licensing"),
            getCssVar("--color-training"),
            getCssVar("--color-misc"),
            getCssVar("--color-gray"),
            getCssVar("--color-red"),
            getCssVar("--color-pink"),
            getCssVar("--color-purple"),
        ];

        revenueDonutChart = new Chart(ctxDonut, {
            type: "doughnut",
            data: {
                labels: donutData.map((d) => d.label),
                datasets: [{
                    data: donutData.map((d) => d.amount),
                    backgroundColor: chartColors.slice(0, donutData.length),
                    hoverOffset: 8,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || "";
                                if (label) label += ": ";
                                if (context.parsed !== null) {
                                    const value = new Intl.NumberFormat("en-US").format(context.parsed);
                                    const percentage = ((context.parsed / selectedFiscalYearTotal) * 100).toFixed(2);
                                    label += `Rs. ${value} (${percentage}%)`;
                                }
                                return label;
                            },
                        },
                    },
                },
                cutout: "70%",
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1000,
                    easing: "easeOutQuart",
                },
            },
        });

        const legendContainer = document.getElementById("revenueChartLegend");
        legendContainer.innerHTML = "";
        donutData.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="legend-color" style="background-color: ${chartColors[index]}"></span>
                ${item.label}
            `;
            legendContainer.appendChild(li);
        });

        // --- Combined Line & Bar Chart (Balance Sheet Impact Over Time) ---
        const ctxCombined = document.getElementById("exceptionCombinedChart").getContext("2d");

        // Dynamically get all available fiscal years from your main data structure
        const availableYears = Object.values(balanceSheetData).flatMap(item => Object.keys(item));
        const uniqueYears = Array.from(new Set(availableYears)).sort();

        // Filter for only valid fiscal years (e.g., "FY 20-21" to "FY 24-25")
        const combinedChartLabels = uniqueYears.filter(year => year.startsWith('FY'));

        const combinedImpactAmounts = combinedChartLabels.map(yearLabel => {
            // Calculate total impact for this year by summing all relevant line items
            let yearTotalImpact = 0;
            for (const itemKey in balanceSheetData) {
                if (balanceSheetData[itemKey][yearLabel] && balanceSheetData[itemKey][yearLabel].amount) {
                    yearTotalImpact += balanceSheetData[itemKey][yearLabel].amount;
                }
            }
            return yearTotalImpact;
        });

        const combinedInsightCounts = combinedChartLabels.map(yearLabel => {
            // Count insights for this year (simplified, just count items that have amount)
            let yearInsightCount = 0;
            for (const itemKey in balanceSheetData) {
                if (balanceSheetData[itemKey][yearLabel] && balanceSheetData[itemKey][yearLabel].amount > 0) {
                    yearInsightCount++;
                }
            }
            return yearInsightCount;
        });


        exceptionCombinedChart = new Chart(ctxCombined, {
            data: {
                labels: combinedChartLabels,
                datasets: [{
                    type: "bar",
                    label: "Total Impact (Millions)",
                    data: combinedImpactAmounts,
                    backgroundColor: getCssVar("--bar-color"),
                    hoverBackgroundColor: getCssVar("--bar-hover-color"),
                    yAxisID: "y",
                    borderRadius: 4,
                    maxBarThickness: 30,
                }, {
                    type: "line",
                    label: "Number of Insights",
                    data: combinedInsightCounts,
                    borderColor: getCssVar("--line-color"),
                    backgroundColor: "transparent",
                    pointBackgroundColor: getCssVar("--line-point-bg"),
                    pointBorderColor: getCssVar("--line-point-border"),
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    yAxisID: "y1",
                    tension: 0.3,
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: "index", intersect: false },
                plugins: {
                    title: { display: false },
                    legend: {
                        display: true,
                        position: "top",
                        align: "end",
                        labels: {
                            usePointStyle: true,
                            font: { size: 13, family: "Inter" },
                            color: getCssVar("--dark-text"),
                            padding: 20,
                        },
                    },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || "";
                                if (label) { label += ": "; }
                                if (context.dataset.type === "bar") {
                                    label += `Rs. ${new Intl.NumberFormat("en-US").format(context.parsed.y)}`;
                                } else {
                                    label += `${context.formattedValue}`;
                                }
                                return label;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 12 }, color: getCssVar("--text-muted") },
                        title: { display: false },
                    },
                    y: {
                        type: "linear", position: "left", beginAtZero: true,
                        grid: { color: getCssVar("--border-color") },
                        ticks: {
                            display: true,
                            callback: function (value) { return `Rs. ${new Intl.NumberFormat("en-US").format(value)}`; },
                        },
                        title: { display: false },
                    },
                    y1: {
                        type: "linear", position: "right", beginAtZero: true,
                        grid: { drawOnChartArea: false },
                        ticks: { display: true },
                        title: { display: false },
                    },
                },
            },
        });
    }

    // --- Insight Modal Trigger Logic ---
    // Re-select insight triggers after table is populated
    function attachInsightTriggerListeners() {
        const currentInsightTriggers = document.querySelectorAll(".insight-trigger");
        currentInsightTriggers.forEach((trigger) => {
            trigger.removeEventListener('click', handleInsightTriggerClick); // Prevent duplicate listeners
            trigger.addEventListener("click", handleInsightTriggerClick);
        });
    }

    async function handleInsightTriggerClick(event) {
        event.preventDefault();

        const url = "/assets/" + this.dataset.insightUrl; // URL from data-insight-url
        if (url && url !== "/assets/undefined") { // Check for valid URL
            try {
                const response = await fetch(url);
                const data = await response.json();
                currentInsightData = data.table; // Assuming the JSON contains a 'table' array
                modalTitle.textContent = this.closest('td').querySelector('.collapsible').textContent.trim() + " Insights"; // Set title dynamically

                // Calculate total impact for the selected fiscal year from the loaded insight data
                const totalImpactAmountForSelectedFY = currentInsightData.reduce(
                    (sum, item) => sum + item.amount, 0
                );

                insightModal.style.display = "flex";
                updateModalChartsAndTable(currentInsightData, totalImpactAmountForSelectedFY);

            } catch (error) {
                console.error("Error fetching insight data:", error);
                // Optionally display an error message in the modal
            }
        } else {
            console.warn("No valid insight URL found for this item.");
        }
    }


    monthSlider.addEventListener("input", () => {
        updateFiscalYearDisplay(monthSlider.value);
        updateTableWithData(); // Re-render table with data for the selected FY
        // If an insight modal is open, re-open it with data for the new FY (or close it)
        if (insightModal.style.display === "flex" && currentInsightData) {
            // You might need logic here to re-fetch the specific insight's data for the new FY,
            // or close the modal if the data isn't directly tied to the overall FY slider.
            // For now, let's just close it.
            insightModal.style.display = "none";
        }
    });


    modalCloseBtn.addEventListener("click", function () {
        insightModal.style.display = "none";
    });

    insightModal.addEventListener("click", function (event) {
        if (event.target === insightModal) {
            insightModal.style.display = "none";
        }
    });

    // --- Navigation Buttons ---
    const balanceSheetBtn = document.getElementById("balanceSheetBtn");
    const profitLossBtn = document.getElementById("profitLossBtn");
    // Removed viewAllYearsBtn as per your HTML update

    function setActiveNavButton(button) {
        document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.remove("active"));
        if (button) button.classList.add("active");
    }

    if (balanceSheetBtn) {
        balanceSheetBtn.addEventListener("click", function () {
            setActiveNavButton(this);
            // showYears(defaultYears); // Show default years on BS button click
            // calculateAndDisplayPercentages(); // Recalculate percentages
        });
    }

    // Profit & Loss button already has onclick event in HTML, but if you want JS control:
    // if (profitLossBtn) {
    //     profitLossBtn.addEventListener("click", function() {
    //         setActiveNavButton(this);
    //         window.location.href = 'profit&loss.html';
    //     });
    // }

    // Set initial active button
    if (window.location.pathname.includes("profit&loss.html")) {
        setActiveNavButton(profitLossBtn);
    } else {
        setActiveNavButton(balanceSheetBtn);
    }

    // --- Year Visibility Functionality ---
    const allYearColumns = document.querySelectorAll(".year-column");
    const allYearDataCells = document.querySelectorAll(".year-data");
    const sectionTitleCells = document.querySelectorAll("tr.section-title td, tr.category td");

    const defaultYears = ["24-25", "23-24"];

    function updateColspans(visibleCount) {
        const totalVisibleColumns = 1 + visibleCount; // Particulars + visible years
        sectionTitleCells.forEach((cell) => {
            cell.setAttribute("colspan", totalVisibleColumns);
        });
    }

    function showYears(yearsToShow) {
        let visibleYearCount = 0;
        allYearColumns.forEach((col) => {
            const year = col.dataset.year;
            if (yearsToShow.includes(year)) {
                col.style.display = "table-cell";
                visibleYearCount++;
            } else {
                col.style.display = "none";
            }
        });
        allYearDataCells.forEach((cell) => {
            const year = cell.dataset.year;
            if (yearsToShow.includes(year)) {
                cell.style.display = "table-cell";
            } else {
                cell.style.display = "none";
            }
        });
        updateColspans(visibleYearCount);
    }

    // Removed showAllYears and related button logic as it's not in the new HTML


    // Initial setup: fetch data, populate table, show default years, calculate percentages
    fetchBalanceSheetData().then(() => {
        showYears(defaultYears);
        attachInsightTriggerListeners(); // Attach listeners after data is loaded and table updated
    });


    // --- Percentage Calculation Logic ---
    function cleanValue(value) {
        // Handle values like "13,532.00 (0.09%)" by extracting only the number part
        const match = String(value).replace(/,/g, "").match(/(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }

    function getPercentageClass(percentage) {
        if (percentage >= 25) {
            return "green";
        } else if (percentage >= 5) {
            return "yellow";
        } else if (percentage >= -5) {
            return "orange"; // Assuming 'orange' for slight changes
        } else {
            return "red";
        }
    }

    function calculateAndDisplayPercentages() {
        const dataRows = document.querySelectorAll(
            "tbody tr:not(.section-title):not(.category)"
        );

        dataRows.forEach((row) => {
            const dataCells = Array.from(row.querySelectorAll("td.year-data"));
            const visibleDataCells = dataCells.filter(
                (cell) => cell.style.display !== "none"
            );

            for (let i = 0; i < visibleDataCells.length; i++) {
                const currentCell = visibleDataCells[i];
                const currentYearValue = cleanValue(currentCell.textContent); // Get value from the cell's content

                const nextVisibleCell = visibleDataCells[i + 1];

                let percentageChange = 0;

                if (nextVisibleCell) {
                    const previousYearValue = cleanValue(nextVisibleCell.textContent);

                    if (previousYearValue === 0) {
                        percentageChange = currentYearValue === 0 ? 0 : 100;
                    } else {
                        percentageChange =
                            ((currentYearValue - previousYearValue) / previousYearValue) * 100;
                    }
                }

                percentageChange = parseFloat(percentageChange.toFixed(2));

                let percentageDisplaySpan = currentCell.querySelector(".percentage-impact");
                if (!percentageDisplaySpan) {
                    percentageDisplaySpan = document.createElement("span");
                    percentageDisplaySpan.classList.add("percentage-impact");
                    const insightTriggerSpan = currentCell.querySelector(".insight-trigger");
                    if (insightTriggerSpan) {
                        insightTriggerSpan.appendChild(percentageDisplaySpan);
                    } else {
                        // If no insight trigger, append directly to cell and wrap content
                        const originalContent = currentCell.innerHTML;
                        currentCell.innerHTML = `<span class="numeric-value">${originalContent}</span>`;
                        currentCell.appendChild(percentageDisplaySpan);
                    }
                }

                percentageDisplaySpan.textContent = ` (${percentageChange}%)`;
                // Remove old percentage color classes and add new one
                percentageDisplaySpan.classList.remove("green", "yellow", "orange", "red");
                percentageDisplaySpan.classList.add(getPercentageClass(percentageChange));
            }
        });
    }

    // --- Footer Year Update ---
    const currentYearSpan = document.getElementById("currentYear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scroll for Footer Link (Optional) ---
    const footerLinkScroll = document.querySelector(".footer-link-scroll");
    if (footerLinkScroll) {
        footerLinkScroll.addEventListener("click", function (e) {
            e.preventDefault();
            const mainContent = document.querySelector("main.container");
            if (mainContent) {
                mainContent.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});