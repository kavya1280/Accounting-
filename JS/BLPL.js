document.addEventListener("DOMContentLoaded", () => {
  let revenueDonutChart;
  let exceptionCombinedChart;
  let totalImpactPercentage = 0;
  let firstImpactPercentage = 0;
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
  const insightTriggers = document.querySelectorAll(".insight-trigger");
  const insightModal = document.getElementById("insightModal");
  const insightIframe = document.getElementById("insightIframe");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalTitle = document.getElementById("modalTitle");

  insightTriggers.forEach((trigger) => {
    trigger.addEventListener("click", async function (event) {
      event.preventDefault();
      if (revenueDonutChart) {
        revenueDonutChart.destroy();
      }
      if (exceptionCombinedChart) {
        exceptionCombinedChart.destroy();
      }
      const url = "/assets/" + this.dataset.insightUrl;
      if (url) {
        // insightIframe.src = url;
        // const originalText = this.textContent.replace(/\s\(.*?\%\)$/, '').trim();
        // modalTitle.textContent = originalText + " Insights";
        const response = await fetch(url);
        const json = await response.json();
        insightModal.style.display = "flex";

        function getCssVar(varName) {
          return getComputedStyle(document.documentElement)
            .getPropertyValue(varName)
            .trim();
        }

        // Update the header insight category name

        // --- Business Impact Table Data ---
        const impactRows = json.table;

        const totalImpactAmount = impactRows.reduce(
          (sum, item) => sum + item.amount,
          0
        );

        const impactTableBody = document.querySelector(".impact-table tbody");
        impactTableBody.innerHTML = "";

        impactRows.forEach((item, index) => {
          const impactPercentage = (
            (item.amount / totalImpactAmount) *
            100
          ).toFixed(2);

          // Store the first item's percentage in a separate variable
          if (index === 0) {
            firstImpactPercentage = parseFloat(impactPercentage);
          }

          totalImpactPercentage += parseFloat(impactPercentage);

          console.log("First Impact Percentage:", firstImpactPercentage);

          

          // create and append rows...

          let percentageClass = "green"; // Default color
          // Example: Apply 'red' for higher impact, 'yellow' for medium
          if (impactPercentage > 70) {
            // Example threshold
            percentageClass = "red";
          } else if (impactPercentage > 40 && impactPercentage < 70) {
            // Example threshold
            percentageClass = "yellow";
          }

          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${item.insight}</td>
                <td class="impact-amount" style="text-align: right;">${new Intl.NumberFormat(
                  "en-US"
                ).format(item.amount)}</td>
                <td class="percentage-impact ${percentageClass}" style="text-align: right;">${impactPercentage}%</td>
                <td>${item.description}</td>
            `;
          impactTableBody.appendChild(row);
        });

// Set the total in the donut chart overlay
document.getElementById("donutTotalAmount").textContent =
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalImpactAmount);

// --- Balance Sheet Impact Distribution Donut Chart ---
const ctxDonut = document
  .getElementById("revenueDonutChart")
  .getContext("2d");

// Map and sort the data (smallest → largest)
const donutData = impactRows
  .map((item) => ({
    label: item.insight,
    amount: item.amount,
  }))
  .sort((a, b) => a.amount - b.amount); // 🔹 Sort ascending order

const chartColors = [
  getCssVar("--color-product-sales"), // Red
  getCssVar("--color-service-revenue"), // Teal
  getCssVar("--color-subscriptions"),
  getCssVar("--color-consulting"),
  getCssVar("--color-licensing"),
  getCssVar("--color-training"),
  getCssVar("--color-misc"),
  getCssVar("--color-gray"),
  getCssVar("--color-red"),
  getCssVar("--color-pink"),
  getCssVar("--color-purple"),
  // Add more colors if needed
];

// Create the chart
revenueDonutChart = new Chart(ctxDonut, {
  type: "doughnut",
  data: {
    labels: donutData.map((d) => d.label),
    datasets: [
      {
        data: donutData.map((d) => d.amount),
        backgroundColor: chartColors.slice(0, donutData.length),
        hoverOffset: 8,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) label += ": ";
            if (context.parsed !== null) {
              const value = new Intl.NumberFormat("en-US").format(
                context.parsed
              );
              const currentTotal = context.dataset.data.reduce(
                (sum, val) => sum + val,
                0
              );
              const percentage = (
                (context.parsed / currentTotal) *
                100
              ).toFixed(2);
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

// --- Legend Setup ---
const legendContainer = document.getElementById("revenueChartLegend");
legendContainer.innerHTML = ""; // Clear existing legend

donutData.forEach((item, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="legend-color" style="background-color: ${
      chartColors[index]
    }"></span>
  `;
  legendContainer.appendChild(li);
});
        // --- Combined Line & Bar Chart (Balance Sheet Impact Over Time) ---
        const ctxCombined = document
          .getElementById("exceptionCombinedChart")
          .getContext("2d");

        // Data for the combined chart, representing monthly impact (example values)
        const combinedChartLabels = [
          "FY 20-21",
          "FY 21-22",
          "FY 22-23",
          "FY 23-24",
          "FY 24-25",
        ];

        const monthlyImpactAmounts = [5, 5, 5, 5, firstImpactPercentage];
        // Example: Number of new insights/issues identified per month
        const monthlyInsightCounts = [2, 2, 2, 2, firstImpactPercentage];

        exceptionCombinedChart = new Chart(ctxCombined, {
          data: {
            labels: combinedChartLabels,
            datasets: [
              {
                type: "bar",
                label: "Impact Percentage",
                data: monthlyImpactAmounts,
                backgroundColor: getCssVar("--bar-color"),
                hoverBackgroundColor: getCssVar("--bar-hover-color"),
                yAxisID: "y",
                borderRadius: 4,
                maxBarThickness: 30,
              },
              {
                type: "line",
                label: "Number of Insights",
                data: monthlyInsightCounts,
                borderColor: getCssVar("--line-color"),
                backgroundColor: "transparent",
                pointBackgroundColor: getCssVar("--line-point-bg"),
                pointBorderColor: getCssVar("--line-point-border"),
                pointRadius: 5,
                pointHoverRadius: 7,
                yAxisID: "y1",
                tension: 0.3,
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: true,
                position: "top",
                align: "end",
                labels: {
                  usePointStyle: true,
                  font: {
                    size: 13,
                    family: "Inter",
                  },
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
                    if (label) {
                      label += ": ";
                    }
                    if (context.dataset.type === "bar") {
                      label += `${new Intl.NumberFormat("en-US").format(
                        context.parsed
                      )}`;
                    } else {
                      label += `${context.formattedValue}%`;
                    }
                    return label;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  font: { size: 12 },
                  color: getCssVar("--text-muted"),
                },
                title: { display: false },
              },
              y: {
                type: "linear",
                position: "left",
                beginAtZero: true,
                grid: { color: getCssVar("--border-color") },
                ticks: {
                  display: false, // 👈 hides left y-axis numbers
                },
                title: { display: false },
              },
              y1: {
                type: "linear",
                position: "right",
                beginAtZero: true,
                grid: { drawOnChartArea: false },
                ticks: {
                  display: false, // 👈 hides right y-axis numbers
                },
                title: { display: false },
              },
            },
          },
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
          root: null, // relative to the viewport
          rootMargin: "0px",
          threshold: 0.1, // callback fires when 10% of item is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
              observer.unobserve(entry.target); // Stop observing once animated
            }
          });
        }, observerOptions);

        // Observe the main card and its child sections
        const insightCard = document.querySelector(".combined-insight-card");
        if (insightCard) {
          observer.observe(insightCard);
        }

        const tableContainer = document.querySelector(".table-container");
        if (tableContainer) {
          observer.observe(tableContainer);
        }

        const chartSummaryCard = document.querySelector(".chart-summary-card");
        if (chartSummaryCard) {
          observer.observe(chartSummaryCard);
        }

        const combinedChartSection = document.querySelector(
          ".combined-chart-section"
        );
        if (combinedChartSection) {
          observer.observe(combinedChartSection);
        }
      }
    });
  });
  modalCloseBtn.addEventListener("click", function () {
    insightModal.style.display = "none";
    // insightIframe.src = '';
  });

  insightModal.addEventListener("click", function (event) {
    if (event.target === insightModal) {
      insightModal.style.display = "none";
      // insightIframe.src = '';
    }
  });

  // --- Navigation Buttons (ensuring it's included and active state is managed) ---
  const balanceSheetBtn = document.getElementById("balanceSheetBtn");
  const profitLossBtn = document.getElementById("profitLossBtn");
  const viewAllYearsBtn = document.getElementById("viewAllYearsBtn");

  function setActiveNavButton(button) {
    document
      .querySelectorAll(".nav-btn")
      .forEach((btn) => btn.classList.remove("active"));
    if (button) button.classList.add("active");
  }

  if (balanceSheetBtn) {
    balanceSheetBtn.addEventListener("click", function () {
      setActiveNavButton(this);
      hideOtherYears(); // This now implicitly handles Balance Sheet's default view
      calculateAndDisplayPercentages(); // Recalculate for default years
    });
  }

  if (profitLossBtn) {
    profitLossBtn.addEventListener("click", function () {
      setActiveNavButton(this);
      hideOtherYears(); // For Profit & Loss, also show default years initially
      calculateAndDisplayPercentages(); // Recalculate for default years
    });
  }

  // Initialize button state based on current page
  if (window.location.pathname.includes("profit&loss.html")) {
    setActiveNavButton(profitLossBtn);
  } else {
    setActiveNavButton(balanceSheetBtn);
  }

  // --- NEW: Year Visibility Functionality ---

  const allYearColumns = document.querySelectorAll(".year-column");
  const allYearDataCells = document.querySelectorAll(".year-data");
  const sectionTitleCells = document.querySelectorAll(
    "tr.section-title td, tr.category td"
  );

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

  function showAllYears() {
    let visibleYearCount = 0;
    allYearColumns.forEach((col) => {
      col.style.display = "table-cell";
      visibleYearCount++;
    });
    allYearDataCells.forEach((cell) => {
      cell.style.display = "table-cell";
    });
    updateColspans(visibleYearCount);
  }

  function hideOtherYears() {
    showYears(defaultYears);
    if (viewAllYearsBtn) viewAllYearsBtn.classList.remove("active");
  }

  if (viewAllYearsBtn) {
    viewAllYearsBtn.addEventListener("click", function () {
      showAllYears();
      setActiveNavButton(this);
      calculateAndDisplayPercentages(); // Recalculate for all years
    });
  }

  // Initial state: Show only default years when the page loads
  hideOtherYears();

  // --- Existing Percentage Calculation Logic ---
  function cleanValue(value) {
    return (
      parseFloat(
        String(value)
          .replace(/\s\(.*?\%\)$/, "")
          .replace(/,/g, "")
      ) || 0
    );
  }

  function getPercentageClass(percentage) {
    if (percentage >= 25) {
      return "percent-green";
    } else if (percentage >= 5) {
      return "percent-yellow";
    } else if (percentage >= -5) {
      return "percent-orange";
    } else {
      return "percent-red";
    }
  }

  const tableRows = document.querySelectorAll(
    "tbody tr:not(.section-title):not(.category):not(.sub-total):not(.grand-total)"
  );

  function calculateAndDisplayPercentages() {
    tableRows.forEach((row) => {
      const dataCells = Array.from(row.querySelectorAll("td.year-data"));

      for (let i = 0; i < dataCells.length; i++) {
        const currentCell = dataCells[i];

        if (currentCell.style.display === "none") {
          const existingPercentageSpan =
            currentCell.querySelector(".percentage-impact");
          if (existingPercentageSpan) {
            existingPercentageSpan.remove();
          }
          continue;
        }

        const nextVisibleCell = dataCells
          .slice(i + 1)
          .find((cell) => cell.style.display !== "none");

        let percentageChange;

        if (nextVisibleCell) {
          let previousCellValueText =
            nextVisibleCell.querySelector(".insight-trigger")?.textContent ||
            nextVisibleCell.textContent;
          previousCellValueText = previousCellValueText
            .replace(/\s\(.*?\%\)$/, "")
            .trim();
          const previousYearValue = cleanValue(previousCellValueText);

          if (previousYearValue === 0) {
            percentageChange = currentYearValue === 0 ? 0 : 100;
          } else {
            percentageChange =
              ((currentYearValue - previousYearValue) / previousYearValue) *
              100;
          }
        } else {
          // Set percentage to 0 when there's no previous visible year for comparison
          percentageChange = 0;
        }

        percentageChange = parseFloat(percentageChange.toFixed(2));

        let percentageDisplaySpan =
          currentCell.querySelector(".percentage-impact");
        if (!percentageDisplaySpan) {
          percentageDisplaySpan = document.createElement("span");
          percentageDisplaySpan.classList.add("percentage-impact");
          const insightTriggerSpan =
            currentCell.querySelector(".insight-trigger");
          if (insightTriggerSpan) {
            insightTriggerSpan.appendChild(percentageDisplaySpan);
          } else {
            // Ensure the original content is preserved if no insight-trigger
            currentCell.innerHTML = `${currentCellValueText}`;
            currentCell.appendChild(percentageDisplaySpan);
          }
        } else {
          const insightTriggerSpan =
            currentCell.querySelector(".insight-trigger");
          if (
            insightTriggerSpan &&
            !insightTriggerSpan.contains(percentageDisplaySpan)
          ) {
            insightTriggerSpan.appendChild(percentageDisplaySpan);
          }
        }

        percentageDisplaySpan.textContent = ` (${percentageChange}%)`;
        percentageDisplaySpan.classList.remove(
          "percent-green",
          "percent-yellow",
          "percent-orange",
          "percent-red"
        );
        percentageDisplaySpan.classList.add(
          getPercentageClass(percentageChange)
        );
      }
    });
  }

  calculateAndDisplayPercentages(); // Initial run

  // Re-calculate percentages when "View All Years" is clicked
  if (viewAllYearsBtn) {
    viewAllYearsBtn.addEventListener("click", () => {
      showAllYears();
      setActiveNavButton(viewAllYearsBtn);
      calculateAndDisplayPercentages(); // Recalculate for all years
    });
  }

  // Also re-calculate if the Balance Sheet button is clicked (to reset to default years)
  if (balanceSheetBtn) {
    balanceSheetBtn.addEventListener("click", () => {
      setActiveNavButton(balanceSheetBtn);
      hideOtherYears(); // This function calls showYears(defaultYears)
      calculateAndDisplayPercentages(); // Recalculate for default years
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


