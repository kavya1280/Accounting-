let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

// Updated Selector: Use a generic selector for data rows within the main table structure (P&L table)
const tableRows = document.querySelectorAll(
  "#profitLossContent table tbody tr:not(.section-title):not(.category):not(.sub-total):not(.grand-total)"
);

const originalFy2425Data = new Map();

const months = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

function slideOne() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
  }
  displayValOne.textContent = months[sliderOne.value];
  fillColor();
  applySliderImpact();
}
function slideTwo() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderTwo.value = parseInt(sliderOne.value) + minGap;
  }
  displayValTwo.textContent = months[sliderTwo.value];
  fillColor();
  applySliderImpact();
}

function fillColor() {
  percent1 = (sliderOne.value / sliderMaxValue) * 100;
  percent2 = (sliderTwo.value / sliderMaxValue) * 100;
  sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}

function applySliderImpact() {
  const minMonth = parseInt(sliderOne.value);
  const maxMonth = parseInt(sliderTwo.value);
  const numberOfMonthsSelected = maxMonth - minMonth + 1;
  const totalPossibleMonths = 12; // April to March

  // Use the P&L data rows for the impact calculation
  tableRows.forEach((row) => {
    const fy2425Cell = row.querySelector(".year-data.fy-24-25");
    if (fy2425Cell) {
      const originalData = originalFy2425Data.get(fy2425Cell);
      if (originalData) {
        const originalValue = originalData.value;
        const originalPercentageHTML = originalData.percentageHTML;

        // Calculate impact factor based on the number of selected months
        // This is appropriate for P&L items (flow variables)
        const impactFactor = numberOfMonthsSelected / totalPossibleMonths;
        const newValue = originalValue * impactFactor;

        // Update the displayed value, keeping the original percentage HTML
        const formattedValue = new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(newValue);

        const insightTriggerSpan = fy2425Cell.querySelector(".insight-trigger");
        if (insightTriggerSpan) {
          // Set the text content (the numerical value)
          insightTriggerSpan.childNodes[0].nodeValue = formattedValue;
          // Remove any existing percentage span (if dynamically added)
          const existingPcntSpan =
            insightTriggerSpan.querySelector(".percentage-impact");
          if (existingPcntSpan) existingPcntSpan.remove();
          // Re-insert the original hard-coded percentage HTML
          if (originalPercentageHTML) {
            insightTriggerSpan.insertAdjacentHTML(
              "beforeend",
              originalPercentageHTML
            );
          }
        }
      }
    }
  });
  // For balance sheet, percentages are explicitly kept unchanged by the slider,
  // so `calculateAndDisplayPercentages()` is not called here.
}


document.addEventListener("DOMContentLoaded", () => {
  let revenueDonutChart;
  let exceptionCombinedChart;
  let totalImpactPercentage = 0;
  let firstImpactPercentage = 0;

  // --- NEW FAQ MODAL FUNCTIONALITY ---
  const faqButton = document.getElementById("faqButton");
  const faqModal = document.getElementById("faqModal");
  const faqModalCloseBtn = document.getElementById("faqModalCloseBtn");

  // Note: Since the HTML provided doesn't explicitly show the FAQ button/modal, 
  // we assume these IDs exist if the user includes the necessary HTML structure.

  if (faqButton) {
    faqButton.addEventListener("click", function () {
      faqModal.style.display = "flex"; // Show the modal
    });
  }

  if (faqModalCloseBtn) {
    faqModalCloseBtn.addEventListener("click", function () {
      faqModal.style.display = "none"; // Hide the modal
    });
  }

  // Optional: Close FAQ modal if user clicks outside of the modal content
  if (faqModal) {
    faqModal.addEventListener("click", function (event) {
      if (event.target === faqModal) {
        faqModal.style.display = "none";
      }
    });
  }
  // --- END NEW FAQ MODAL FUNCTIONALITY ---

  slideOne();
  slideTwo();

  // --- Collapsible Functionality ---
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
    
  // --- Category Toggle Functionality (New Addition) ---
  document.querySelectorAll(".category").forEach(function(row) {
    row.addEventListener("click", function() {
      const target = this.getAttribute("data-target");
      const childRows = document.querySelectorAll(`.child.${target}`);

      childRows.forEach(child => {
        // Toggle between visible and hidden
        if (child.style.display === "table-row") {
          child.style.display = "none";
        } else {
          child.style.display = "table-row";
        }
      });
    });
  });
  // ----------------------------------------------------


  // --- Insight Modal Functionality ---
  const insightTriggers = document.querySelectorAll(".insight-trigger");
  const insightModal = document.getElementById("insightModal"); // Assuming insightModal exists in HTML
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  insightTriggers.forEach((trigger) => {
    trigger.addEventListener("click", async function (event) {
      event.preventDefault();
      // console.log("clicked");
      if (revenueDonutChart) {
        revenueDonutChart.destroy();
      }
      if (exceptionCombinedChart) {
        exceptionCombinedChart.destroy();
      }
      const url = "/assets/" + this.dataset.insightUrl;
      // console.log(url);
      if (url) {
        let json;
        try {
            const response = await fetch(url);
            json = await response.json();
        } catch (error) {
            console.error("Error fetching insight data:", error);
            // Handle error, maybe show a default empty modal or a warning
            return; 
        }

        // console.log(json);
        insightModal.style.display = "flex";

        function getCssVar(varName) {
          return getComputedStyle(document.documentElement)
            .getPropertyValue(varName)
            .trim();
        }

        // --- Business Impact Table Data ---
        const impactRows = json.table || [];

        const totalImpactAmount = impactRows.reduce(
          (sum, item) => sum + item.amount,
          0
        );

        const impactTableBody = document.querySelector(".impact-table tbody");
        impactTableBody.innerHTML = "";

        totalImpactPercentage = 0; // Reset for each new insight modal
        firstImpactPercentage = 0; // Reset for each new insight modal

        impactRows.forEach((item, index) => {
          // Handle potential division by zero
          const impactPercentage = totalImpactAmount === 0 
            ? 0 
            : ((item.amount / totalImpactAmount) * 100).toFixed(2);

          // Store the first item's percentage in a separate variable
          if (index === 0) {
            firstImpactPercentage = parseFloat(impactPercentage);
          }

          totalImpactPercentage += parseFloat(impactPercentage);

          let percentageClass = "green"; // Default color
          if (impactPercentage > 70) {
            percentageClass = "red";
          } else if (impactPercentage > 40 && impactPercentage <= 70) {
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
            <span class="legend-color" style="background-color: ${chartColors[index]}"></span>
          `;
          legendContainer.appendChild(li);
        });

        // --- Combined Line & Bar Chart (Profit & Loss Impact Over Time) ---
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

        // NOTE: These historical values (1, 1, 1, 2) are placeholder data carried from the original script
        const monthlyImpactAmounts = [1, 1, 1, 2, firstImpactPercentage];
        const monthlyInsightCounts = [0, 0, 0, 0, firstImpactPercentage]; 

        exceptionCombinedChart = new Chart(ctxCombined, {
          data: {
            labels: combinedChartLabels,
            datasets: [
              {
                type: "bar",
                label: "Impact Amount",
                data: monthlyImpactAmounts,
                backgroundColor: getCssVar("--bar-color"),
                hoverBackgroundColor: getCssVar("--bar-hover-color"),
                yAxisID: "y",
                borderRadius: 4,
                maxBarThickness: 30,
              },
              {
                type: "line",
                label: "% of total impact",
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
  });

  insightModal.addEventListener("click", function (event) {
    if (event.target === insightModal) {
      insightModal.style.display = "none";
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

  // NOTE: In the provided HTML, nav links are <a> tags, not buttons, and don't have nav-btn class.
  // We adapt the logic to use the .nav-item class from the provided P&L HTML structure.
  
  // Re-define navigation logic for the P&L page context:
  const navLinks = document.querySelectorAll('.main-nav-links .nav-item');

  function setActiveNavLink(element) {
    navLinks.forEach(link => link.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
  }

  // If the P&L page is loaded, the P&L link in the HTML is already marked 'active'.
  // We need to manage the "View All Years" button separately.

  // --- Year Visibility Functionality ---
  const allYearColumns = document.querySelectorAll(".year-column");
  const allYearDataCells = document.querySelectorAll(".year-data");
  const sectionTitleCells = document.querySelectorAll(
    "tr.section-title td, tr.category td"
  );

  const defaultYears = ["24-25", "23-24","22-23","21-22"];

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
    // Assuming 'View All Years' is now the 'View More' button in the KPI dashboard
    // If the 'View More' button is used for navigation, we might need a separate 'viewAllYearsBtn'
    // Since the P&L HTML provided has a dedicated "View More" button for navigating to 'duplicate-pl.html',
    // we must ensure we have a functional View All Years button if needed.
    // For now, let's assume `viewAllYearsBtn` is a placeholder or not used on this view.
  }

  // If a View All Years button were present:
  // if (viewAllYearsBtn) {
  //   viewAllYearsBtn.addEventListener("click", function () {
  //     showAllYears();
  //     calculateAndDisplayPercentages();
  //   });
  // }

  // Initial state: Show only default years when the page loads
  hideOtherYears();

  // --- Percentage Calculation Logic ---
  function cleanValue(value) {
    // Allows for optional parenthesis content (the percentage) and commas
    return (
      parseFloat(
        String(value)
          .replace(/\s\(.*?\%\)$/, "")
          .replace(/,/g, "")
          .replace(/\(|\)/g, "") // Remove remaining parentheses for negative values
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

  // `tableRows` is defined globally above and includes the correct P&L data rows.

  function calculateAndDisplayPercentages() {
    tableRows.forEach((row) => {
      const dataCells = Array.from(row.querySelectorAll("td.year-data"));

      // 1. Capture original data for FY 24-25 (only happens once on load)
      const fy2425Cell = row.querySelector(".year-data.fy-24-25");
      if (fy2425Cell && !originalFy2425Data.has(fy2425Cell)) {
        const insightTriggerSpan = fy2425Cell.querySelector(".insight-trigger");
        if (insightTriggerSpan) {
          // Get the raw text node value (the number)
          const rawValueNode = insightTriggerSpan.childNodes[0]?.nodeValue || "";
          const originalValue = cleanValue(rawValueNode);
          
          const percentageSpan =
            insightTriggerSpan.querySelector(".percentage-impact");
          const originalPercentageHTML = percentageSpan
            ? percentageSpan.outerHTML
            : "";

          originalFy2425Data.set(fy2425Cell, {
            value: originalValue,
            percentageHTML: originalPercentageHTML,
          });
        }
      }

      for (let i = 0; i < dataCells.length; i++) {
        const currentCell = dataCells[i];
        const currentYear = currentCell.dataset.year;

        // Skip hidden cells
        if (currentCell.style.display === "none") {
          const existingPercentageSpan =
            currentCell.querySelector(".percentage-impact");
          if (existingPercentageSpan) {
            existingPercentageSpan.remove();
          }
          continue;
        }

        let insightTriggerSpan = currentCell.querySelector(".insight-trigger");
        
        let currentCellValueText;
        if (insightTriggerSpan) {
             currentCellValueText = insightTriggerSpan.childNodes[0]?.nodeValue || insightTriggerSpan.textContent;
        } else {
             currentCellValueText = currentCell.textContent;
        }
        currentCellValueText = currentCellValueText.trim();
        const originalNumericalValue = cleanValue(currentCellValueText);

        let percentageDisplaySpan =
          currentCell.querySelector(".percentage-impact");
        
        

        if (currentYear === "24-25") {
          // 2. Handle FY 24-25 (Slider impacted data + hard-coded percentage)
          const originalData = originalFy2425Data.get(currentCell);

          if (originalData) {
            // The numerical value might be changed by the slider, so we retrieve the current displayed value
            // (The slider changes the nodeValue directly in applySliderImpact)
            let currentDisplayedValue = insightTriggerSpan 
                ? insightTriggerSpan.childNodes[0]?.nodeValue 
                : currentCell.textContent;
                
            currentDisplayedValue = currentDisplayedValue.trim();

            if (originalData.percentageHTML) {
              if (insightTriggerSpan) {
                // Keep the current (slider-adjusted) value display
                insightTriggerSpan.childNodes[0].nodeValue = currentDisplayedValue; 
                
                // Remove existing percentage span before re-inserting the original hardcoded one
                const existingPcntSpan =
                  insightTriggerSpan.querySelector(".percentage-impact");
                if (existingPcntSpan) existingPcntSpan.remove();
                
                insightTriggerSpan.insertAdjacentHTML(
                  "beforeend",
                  originalData.percentageHTML
                );
              }
            } else {
              // No hard-coded percentage, ensure none is displayed
              if (percentageDisplaySpan) percentageDisplaySpan.remove();
              if (insightTriggerSpan) {
                insightTriggerSpan.textContent = currentDisplayedValue;
              } else {
                currentCell.textContent = currentDisplayedValue;
              }
            }
          }
          continue; // Skip further calculation for FY 24-25
        }

        // 3. Calculate year-over-year percentage change for other years
        const nextVisibleCell = dataCells
          .slice(i + 1)
          .find((cell) => cell.style.display !== "none");

        let percentageChange;
        let shouldDisplayPercentage = true;

        if (nextVisibleCell) {
          let previousCellValueText =
            nextVisibleCell.querySelector(".insight-trigger")?.childNodes[0]
              ?.nodeValue || nextVisibleCell.textContent;
          previousCellValueText = previousCellValueText.trim();
          const previousYearValue = cleanValue(previousCellValueText);

          if (previousYearValue === 0) {
            percentageChange = originalNumericalValue === 0 ? 0 : 100;
          } else {
            percentageChange =
              ((originalNumericalValue - previousYearValue) /
                previousYearValue) *
              100;
          }
        } else {
          // This is the last visible historical year (e.g., FY 21-22 if all are visible)
          shouldDisplayPercentage = false;
          percentageChange = 0;
        }

        // Handle display for calculated percentages
        if (shouldDisplayPercentage) {
          percentageChange = parseFloat(percentageChange.toFixed(2));
          
          if (!percentageDisplaySpan) {
            percentageDisplaySpan = document.createElement("span");
            percentageDisplaySpan.classList.add("percentage-impact");
            
            if (insightTriggerSpan) {
              insightTriggerSpan.appendChild(percentageDisplaySpan);
              // Ensure only the value is the text node
              insightTriggerSpan.childNodes[0].nodeValue = currentCellValueText;
            } else {
              currentCell.innerHTML = `${currentCellValueText}`;
              currentCell.appendChild(percentageDisplaySpan);
            }
          } else {
            // If span exists, ensure it's positioned correctly
            if (
              insightTriggerSpan &&
              !insightTriggerSpan.contains(percentageDisplaySpan)
            ) {
              insightTriggerSpan.appendChild(percentageDisplaySpan);
            }
            // Ensure the main text part of the cell/insight-trigger is correct
            if (insightTriggerSpan) {
              insightTriggerSpan.childNodes[0].nodeValue = currentCellValueText;
            } else {
              currentCell.childNodes[0].nodeValue = currentCellValueText;
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
        } else {
          // If no percentage should be displayed, remove it if it exists
          if (percentageDisplaySpan) {
            percentageDisplaySpan.remove();
          }
          // Also, ensure the text content is just the value if no percentage is shown
          if (insightTriggerSpan) {
            insightTriggerSpan.textContent = currentCellValueText;
          } else {
            currentCell.textContent = currentCellValueText;
          }
        }
      }
    });
  }

  // --- Initial Data Capture (Needed by slider and percentage calculations) ---
  // Must run before `calculateAndDisplayPercentages()` to populate `originalFy2425Data` map.
  tableRows.forEach((row) => {
    const fy2425Cell = row.querySelector(".year-data.fy-24-25");
    if (fy2425Cell && !originalFy2425Data.has(fy2425Cell)) {
      const insightTriggerSpan = fy2425Cell.querySelector(".insight-trigger");
      if (insightTriggerSpan) {
        // We need to capture the text node value and the original percentage HTML
        const originalValue = cleanValue(
          insightTriggerSpan.childNodes[0]?.nodeValue || ""
        );
        const percentageSpan =
          insightTriggerSpan.querySelector(".percentage-impact");
        const originalPercentageHTML = percentageSpan
          ? percentageSpan.outerHTML
          : "";
        originalFy2425Data.set(fy2425Cell, {
          value: originalValue,
          percentageHTML: originalPercentageHTML,
        });
      }
    }
  });


  calculateAndDisplayPercentages(); // Initial run

  // Re-calculate percentages when "View All Years" is simulated (if needed)
  if (viewAllYearsBtn) {
    viewAllYearsBtn.addEventListener("click", () => {
      showAllYears();
      calculateAndDisplayPercentages(); // Recalculate for all years
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