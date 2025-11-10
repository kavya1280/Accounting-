let revenueDonutChart;
let exceptionCombinedChart;

// Utility function to get CSS variable values
function getCssVar(varName) {
    // This assumes the CSS variables are defined in the global scope (e.g., in :root or body)
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

/**
 * Handles the display and population of the detailed insight modal.
 * This logic is adapted directly from BL.js.
 * @param {string} url The path to the JSON insight data.
 * @param {string} nodeLabel The label of the node clicked.
 */
async function showInsightModal(url, nodeLabel) {
    const insightModal = document.getElementById("insightModal");
    const modalTitle = document.getElementById("modalTitle");

    // Destroy existing charts before loading new data
    if (revenueDonutChart) {
        revenueDonutChart.destroy();
    }
    if (exceptionCombinedChart) {
        exceptionCombinedChart.destroy();
    }

    modalTitle.textContent = `${nodeLabel} - Detailed Insights`;
    insightModal.style.display = "flex";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch insight data: ${response.statusText}`);
        }
        const json = await response.json();

        // --- Business Impact Table Data ---
        const impactRows = json.table;
        const totalImpactAmount = impactRows.reduce((sum, item) => sum + item.amount, 0);
        const impactTableBody = document.querySelector("#insightModal .impact-table tbody");
        impactTableBody.innerHTML = "";

        let totalImpactPercentage = 0;
        let firstImpactPercentage = 0;

        impactRows.forEach((item, index) => {
            const impactPercentage = ((item.amount / totalImpactAmount) * 100).toFixed(2);

            if (index === 0) {
                firstImpactPercentage = parseFloat(impactPercentage);
            }

            totalImpactPercentage += parseFloat(impactPercentage);

            let percentageClass = "green";
            if (impactPercentage > 70) {
                percentageClass = "red";
            } else if (impactPercentage > 40 && impactPercentage < 70) {
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
        document.getElementById("donutTotalAmount").textContent = new Intl.NumberFormat(
            "en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        ).format(totalImpactAmount);

        // --- Balance Sheet Impact Distribution Donut Chart ---
        const ctxDonut = document.getElementById("revenueDonutChart").getContext("2d");

        const donutData = impactRows
            .map((item) => ({
                label: item.insight,
                amount: item.amount,
            }))
            .sort((a, b) => a.amount - b.amount);

        const chartColors = [
            getCssVar("--color-product-sales"),
            getCssVar("--color-service-revenue"),
            getCssVar("--color-subscriptions"),
            getCssVar("--color-consulting"),
            getCssVar("--color-licensing"),
            getCssVar("--color-training"),
            getCssVar("--color-misc"),
            getCssVar("--color-gray"),
        ];

        revenueDonutChart = new Chart(ctxDonut, {
            type: "doughnut",
            data: {
                labels: donutData.map((d) => d.label),
                datasets: [{
                    data: donutData.map((d) => d.amount),
                    backgroundColor: chartColors.slice(0, donutData.length),
                    hoverOffset: 8,
                }, ],
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
                            label: function(context) {
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
                                    const percentage = ((context.parsed / currentTotal) * 100).toFixed(2);
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
        legendContainer.innerHTML = "";
        donutData.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="legend-color-box" style="background-color: ${chartColors[index]}"></span>
                <span>${item.label}</span>
            `;
            legendContainer.appendChild(li);
        });


        // --- Combined Line & Bar Chart (Impact Over Time) ---
        const ctxCombined = document.getElementById("exceptionCombinedChart").getContext("2d");
        const combinedChartLabels = ["FY 20-21", "FY 21-22", "FY 22-23", "FY 23-24", "FY 24-25"];

        // Dummy data generation based on first impact percentage for simulation
        const monthlyImpactAmounts = [
            totalImpactAmount * 0.5 / 5, 
            totalImpactAmount * 0.7 / 5,
            totalImpactAmount * 0.9 / 5,
            totalImpactAmount * 1.0 / 5,
            totalImpactAmount * 1.1 / 5,
        ]; 
        
        // Dummy percentage data (line chart)
        const monthlyInsightCounts = [15, 20, 30, 45, firstImpactPercentage];

        exceptionCombinedChart = new Chart(ctxCombined, {
            data: {
                labels: combinedChartLabels,
                datasets: [{
                        type: "bar",
                        label: "Impact Amount (M)",
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
                    },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || "";
                                if (label) {
                                    label += ": ";
                                }
                                if (context.dataset.type === "bar") {
                                    label += `₹${new Intl.NumberFormat("en-US").format(
                                        context.parsed.toFixed(2)
                                    )} M`;
                                } else {
                                    label += `${context.formattedValue}%`;
                                }
                                return label;
                            },
                        },
                    },
                },
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        type: "linear",
                        position: "left",
                        beginAtZero: true,
                        grid: { color: getCssVar("--border-color") },
                        ticks: { display: false },
                        title: { display: false },
                    },
                    y1: {
                        type: "linear",
                        position: "right",
                        beginAtZero: true,
                        grid: { drawOnChartArea: false },
                        ticks: { display: false },
                        title: { display: false },
                    },
                },
            },
        });

    } catch (error) {
        console.error("Error loading insight data:", error);
        alert("Failed to load detailed insights. Check the console for errors.");
        insightModal.style.display = "none";
    }
}


document.addEventListener("DOMContentLoaded", function () {
  // --- NAVIGATION BAR LOGIC ---
  const header = document.getElementById("main-header");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
  const animatedElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // --- INSIGHT MODAL LISTENERS ---
  const insightModal = document.getElementById("insightModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", function () {
        insightModal.style.display = "none";
    });
  }

  if (insightModal) {
    insightModal.addEventListener("click", function (event) {
        if (event.target === insightModal) {
            insightModal.style.display = "none";
        }
    });
  }

  // =======================================================
  // == HIERARCHY VISUALIZATION CODE ==
  // =======================================================
const hierarchySection = document.getElementById("hierarchy-visualization");
  const svgContainer = document.querySelector(".tree-connectors");

  if (hierarchySection) {
    // Observer setup to run initialization when element is visible
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
            console.log("Hierarchy section intersecting:", entry.isIntersecting);
            initializeHierarchy();
            observer.unobserve(entry.target);

        });
      },
      { threshold: 0.4 }
    ).observe(hierarchySection);
  }

  // --- Core Utility Functions ---

  function mountNode(node, nodeIndex) {
    // 1. CRITICAL FIX: Ensure the element is displayed before animating
    // (This allows getBoundingClientRect to calculate its real position)
    node.style.display = "flex";

    // Use a small delay for staggered appearance
    setTimeout(() => {
      node.style.opacity = "1";
      node.style.transform = "translateY(0)";
      const bar = node.querySelector(".node-bar");
      if (bar) {
        bar.style.width = `${node.dataset.value}%`;
      }
      
      // Set up click listener after mounting
      setupNodeClickListener(node);
      console.log("Node mounted:", node);
      
    }, nodeIndex * 150); // Increased stagger delay for smoother reveal
  }
  
  function setupNodeClickListener(node) {
    // Ensure we only attach one listener
    node.removeEventListener('click', handleNodeClickOrInsight); 
    
    // Attach the main click handler
    node.addEventListener("click", handleNodeClickOrInsight);
  }
  
  /**
   * Universal handler for node clicks: either expands or shows insight modal.
   */
  function handleNodeClickOrInsight(event) {
    console.log("Node clicked:", event.currentTarget);
      const node = event.currentTarget;
      
      // 1. Check for Insight URL (Level 4/Leaf Node Action)
      const insightLabel = node.querySelector('.node-label');
      const insightUrl = insightLabel ? insightLabel.dataset.insightUrl : null;
      const nodeLabelText = insightLabel ? insightLabel.textContent : node.querySelector('.node-label').textContent;

      if (insightUrl) {
          // If a data-insight-url is present, show the modal
          event.stopPropagation(); // Prevent expansion if it's a leaf node
          showInsightModal(`/assets/${insightUrl}`, nodeLabelText); // Assuming assets/ path for JSON
          return;
      }
      
      // 2. Handle Expansion (Internal Node Action)
      const childClass = node.dataset.children;
      if (!childClass) return; // Not an expandable node

      const nodeChildren = document.getElementsByClassName(childClass);
      const childrenArray = Array.from(nodeChildren);
      
      // Debounce: If the first child is already visible, stop.
      if (childrenArray.length > 0 && childrenArray[0].style.opacity === '1') {
          return;
      }

      childrenArray.forEach((child, index) => {
        // Reveal and animate the child
        mountNode(child, index);
      });

      // CRITICAL FIX: Delay drawing connectors until all children have finished mounting 
      // and their positions are stable in the DOM (350ms + staggered mount time)
      const totalMountTime = childrenArray.length * 150 + 200; 
      
      setTimeout(() => {
          drawConnectors(childrenArray, svgContainer);
      }, totalMountTime);
  }
  
  // --- Initialization and View All ---
  
  // Replaces the flawed `animateHierarchy` logic
  function initializeHierarchy() {
    // 1. Ensure all non-root nodes start hidden (CSS should help, but this enforces it)
    const allNodes = document.querySelectorAll(".tree-node");
    allNodes.forEach(node => {
        if (node.dataset.id !== 'balance-sheet') {
            node.style.opacity = "0";
            node.style.transform = "translateY(20px)";
            // node.style.display = "none"; 
        }
    });

    // 2. Initialize and mount the root node immediately
    const rootNode = document.querySelector('.tree-level[data-level="1"] .tree-node');
    console.log("Root node:", rootNode);
    if (rootNode) {
        // Index 0 starts the animation immediately (0 * 150ms delay)
        mountNode(rootNode, 0); 
        console.log("Root node mounted:", rootNode);
    }
  }


document.getElementById("view-all-fds").addEventListener("click", viewAll);

function viewAll() {
  const allNodes = document.querySelectorAll(".tree-node");
  const container = document.querySelector(".tree-container");
  console.log("All nodes:", allNodes);
  // 1. Reveal all nodes instantly
  allNodes.forEach((node) => {
      // Use 'flex' for layout integrity
      node.style.opacity = "1";
      node.style.transform = "none";
      node.style.display = "flex"; 
      node.style.visibility = "visible"; // (If visibility was used)

      const bar = node.querySelector(".node-bar");
      if (bar) {
           bar.style.width = `${node.dataset.value}%`;
      }
      setupNodeClickListener(node); // Ensure clickability remains
  });

  // 2. Clear existing connectors and redraw all connections
  svgContainer.innerHTML = "";
  
  // Find all parent nodes that have children and draw the connections
  allNodes.forEach(parentNode => {
      const childClass = parentNode.dataset.children;
      if (childClass) {
          const childNodes = Array.from(document.getElementsByClassName(childClass));
          if (childNodes.length > 0) {
               drawConnectors(childNodes, svgContainer, true); // Pass true for instant draw
          }
      }
  });

  // 3. Scroll container
  if (container) {
    container.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

  // --- Connector Drawing (Using Cubic Bezier for smoother arcs) ---
  
  function drawConnectors(childNodes, svg, instant = false) {
    if (!svg || childNodes.length === 0) return;
    
    // Get the container position relative to the viewport
    const containerRect = svg.getBoundingClientRect();
    const controlOffset = 80; // Control point separation

    childNodes.forEach((child) => {
      const parentId = child.dataset.parent;
      const parentNode = document.querySelector(
        `.tree-node[data-id="${parentId}"]`
      );
      if (!parentNode) return;

      const parentRect = parentNode.getBoundingClientRect();
      const childRect = child.getBoundingClientRect();

      // Calculate coordinates relative to the SVG container's top-left corner
      const startX = parentRect.right - containerRect.left;
      const startY = parentRect.top - containerRect.top + parentRect.height / 2;
      const endX = childRect.left - containerRect.left;
      const endY = childRect.top - containerRect.top + childRect.height / 2;

      // Cubic Bezier Control Points (C1 handles parent end, C2 handles child end)
      const controlX1 = startX + controlOffset; 
      const controlX2 = endX - controlOffset;
      
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("class", "connector-path");
      path.setAttribute(
        "d",
        `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`
      );
      
      // Ensure styling properties used for animation are present
      path.style.stroke = "#ccc";
      path.style.strokeWidth = "2px";
      path.style.transition = "none"; // Reset transition for calculation

      svg.appendChild(path);
      
      const length = path.getTotalLength();
      
      if (!instant) {
        // Animate the path drawing
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        // Use requestAnimationFrame for smooth transition application
        requestAnimationFrame(() => {
           path.style.transition = "stroke-dashoffset 0.8s ease-in-out";
           path.style.strokeDashoffset = "0";
        });
      } else {
        // Instant draw
        path.style.strokeDashoffset = "0";
      }
    });
  }

  // =======================================================
  // == SUNBURST CHART LOGIC ==
  // =======================================================
// --- Start JS Block ---


var balanceSheetData = {
  name: "Balance Sheet", shortName: "B/S",
  children: [
    {
      name: "Equities and Liabilities", shortName: "E & Liabilities",
      children: [
        {
          name: "Shareholder's Funds", shortName: "S/H Funds",
          children: [
            { name: "Equity Share Capital", shortName: "Eq. Cap.", value: 120 },
            { name: "Reserves & Surplus", shortName: "R & S", value: 130 }
          ]
        },
        {
          name: "Non-Current Liabilities", shortName: "NCL",
          children: [
            { name: "Long-term Borrowings", shortName: "LT Borrow.", value: 110 },
            { name: "Deferred Tax Liabilities [Net]", shortName: "DTL [Net]", value: 90 },
            { name: "Long Term Provisions", shortName: "LT Prov.", value: 80 }
          ]
        },
        {
          name: "Current Liabilities", shortName: "CL",
          children: [
            { name: "Short Term Borrowings", shortName: "ST Borrow.", value: 70 },
            { name: "Trade Payables", shortName: "T/P", value: 90 },
            { name: "Other Current Liabilities", shortName: "Other CL", value: 60 },
            { name: "Short Term Provisions", shortName: "ST Prov.", value: 60 }
          ]
        }
      ]
    },
    {
      name: "Assets", shortName: "Assets",
      children: [
        {
          name: "Non-Current Assets", shortName: "NCA",
          children: [
            { name: "Tangible Assets", shortName: "Tangibles", value: 130 },
            { name: "Intangible Assets", shortName: "Intangibles", value: 120 },
            { name: "Capital Work In Progress", shortName: "CWIP", value: 90 },
            { name: "Intangible Assets Under Development", shortName: "IAUD", value: 80 },
            { name: "Fixed Assets", shortName: "F/A", value: 90 },
            { name: "Non-Current Investments", shortName: "NCI", value: 100 },
            { name: "Long Term Loans & Advances", shortName: "LT L&A", value: 80 },
            { name: "Deferred Tax Assets", shortName: "DTA", value: 70 }
          ]
        },
        {
          name: "Current Assets", shortName: "CA",
          children: [
            { name: "Other Non-Current Assets", shortName: "Other NCA", value: 60 },
            { name: "Current Investments", shortName: "CI", value: 80 },
            { name: "Inventories", shortName: "Inv.", value: 90 },
            { name: "Trade Receivables", shortName: "T/R", value: 90 },
            { name: "Cash & Cash Equivalents", shortName: "C&CE", value: 80 },
            { name: "Short Term Loans & Advances", shortName: "ST L&A", value: 70 },
            { name: "Other Current Assets", shortName: "Other CA", value: 70 }
          ]
        }
      ]
    }
  ]
};

am5.ready(function() {

    // Create root element
    var root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create wrapper container
    var container = root.container.children.push(am5.Container.new(root, {
      width: am5.percent(100),
      height: am5.percent(100),
      layout: root.verticalLayout
    }));

    // Create series
    var series = container.children.push(am5hierarchy.Sunburst.new(root, {
      singleBranchOnly: true,
      downDepth: 10,
      // Set to 3 to display 3 rings initially
      initialDepth: 3, 
      valueField: "value",
      categoryField: "name",
      childDataField: "children"
    }));
    
    // Set Balance Sheet data
    series.data.setAll([balanceSheetData]);
    series.set("selectedDataItem", series.dataItems[0]);


    // ==========================================================
    // TOOLTIP CUSTOMIZATION (Requirement: Show Full Name on hover)
    // ==========================================================
    
    series.slices.template.set("tooltipText", "{name}: {value}");
    // Optionally customize the tooltip appearance
    series.slices.template.set("tooltip", am5.Tooltip.new(root, {
        getFillFromData: true
    }));


    // ==========================================================
    // LABEL CUSTOMIZATION (Existing logic for Short Name display)
    // ==========================================================
    
    series.labels.template.setAll({
        fill: am5.color(0xFFFFFF), // Set all labels to WHITE
        text: "{name}", 
        textType: "radial" 
    });

    // ADAPTER 1: Controls the text content (Short Name vs. Full Name) and alignment
    series.labels.template.adapters.add("text", function(text, target) {
        var dataItem = target.dataItem;
        if (!dataItem) return text;

        var data = dataItem.dataContext;
        
        // Check if the currently selected item is the main root item (the initial, non-drilled state)
        var isInitialView = (series.get("selectedDataItem") === series.dataItems[0]);

        if (isInitialView && data.shortName) {
            // In initial full view: Use short name and regular (horizontal) alignment
            target.set("textType", "regular"); 
            return data.shortName;
        }
        
        // If drilled down: Use full name and radial alignment
        target.set("textType", "radial");
        return data.name;
    });


    // ADAPTER 2: Controls visibility, ensuring short names are seen in the initial state
    series.labels.template.adapters.add("visible", function(currentVisible, target) {
        if (currentVisible) return true; 

        var dataItem = target.dataItem;
        if (!dataItem) return false;
        
        var data = dataItem.dataContext;
        var isInitialView = (series.get("selectedDataItem") === series.dataItems[0]);

        // If we are in the initial view and this item has a short name, force visibility 
        // to ensure the dense initial display is navigable.
        if (isInitialView && data.shortName) {
            return true;
        }

        return currentVisible;
    });
    
    // ==========================================================

    // Make stuff animate on load
    series.appear(1000, 100);

}); // end am5.ready()
  // =======================================================
  // == TREEMAP CHART LOGIC ==
  // =======================================================
// --- Start JS Block ---

// Define the mapping for full names to short names (Used for both Sankey and Treemap)
var nameMap = {
    // Corrected keys to match the P&L tree structure provided in the Treemap data
    "Revenue From Operations [Gross]": "Rev Op [Gross]",
    "Less: Excise/Service Tax/Other Levies": "Less: Tax Levies",
    "Revenue From Operations [Net]": "Rev Op [Net]",
    "Other Income": "Other Inc",
    "Total Revenue (Source)": "Total Revenue", // Note: This node name might not exist in the Treemap, but safe to include.
    "Cost Of Materials Consumed": "Mat. Consumed",
    "Purchase Of Stock-In Trade": "Purch. Stock",
    "Operating And Direct Expenses": "Op. & Direct Exp.",
    
    // Adjusted key to match the Treemap data exactly
    "Changes In Inventories Of FG, WIP And Stock-In Trade": "Changes in Inv.", 
    
    "Employee Benefit Expenses": "Emp. Ben. Exp.",
    "Finance Costs": "Fin. Costs",
    "Depreciation And Amortisation Expenses": "D&A Expenses",
    "Other Expenses": "Other Exp.",
    
    // Adjusted key to match the Treemap data exactly
    "Profit/Loss Before Exceptional, Extraordinary Items And Tax": "P/L Before E/E & Tax", 
    
    "Exceptional Items": "Exceptional",
    "Profit/Loss Before Tax": "P/L Before Tax",
    "Tax Expenses – Continued Operations": "Tax Exp.", // Adding short name for tax group
    "Total Tax Expenses (Net Deduction)": "Total Tax Exp.", // Note: This name might not exist in the Treemap, but safe to include.
    "Profit/Loss For The Period": "Final P/L"
};


am5.ready(function() {

// Create root element
// NOTE: Ensure your HTML contains <div id="treemap-chart"></div> with a defined height in CSS.
var root = am5.Root.new("treemap-chart");

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);

// Define custom colors (Hex codes verified)
var colorGreen = am5.color(0x2E8B57);  // Elegant deep green
var colorBlue = am5.color(0x1E90FF);   // Professional vivid blue
var colorOrange = am5.color(0xFF8C00); // Refined warm orange

// Create wrapper container
var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series
var series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    upDepth: -1,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 0,
    nodePaddingInner: 0
  })
);

series.rectangles.template.setAll({
  strokeWidth: 2
});

// ==========================================================
// 1. LABEL & TOOLTIP CUSTOMIZATION
// ==========================================================

// Set tooltip to show the full name
series.labels.template.set("tooltipText", "{name}");

// Set the label adapter to use short names
series.labels.template.adapters.add("text", function(text, target) {
    var dataItem = target.dataItem;
    if (dataItem) {
        // Retrieve the full name from the data context
        var fullName = dataItem.dataContext.name; 
        
        // Check if a short name exists in the map
        if (nameMap[fullName]) {
            return nameMap[fullName];
        }
        
        // If no short name is defined, return the original text
        return fullName; 
    }
    return text;
});

// Optional: Adjust label settings for better fit
series.labels.template.setAll({
    maxWidth: 150, 
    fontSize: 15
});

// ==========================================================
// 2. COLOR CUSTOMIZATION (Preserved from previous solution)
// ==========================================================

var data = {
  name: "Profit and Loss Statement Structure",
  children: [
    {
      name: "INCOME",
      children: [
        { name: "Revenue From Operations [Gross]", value: 20 },
        { name: "Less: Excise/Service Tax/Other Levies", value: 10 },
        { name: "Revenue From Operations [Net]", value: 18 },
        { name: "Other Income", value: 12 },
      ]
    },
    {
      name: "EXPENSES",
      children: [
        { name: "Cost Of Materials Consumed", value: 16 },
        { name: "Purchase Of Stock-In Trade", value: 14 },
        { name: "Operating And Direct Expenses", value: 15 },
        { name: "Changes In Inventories Of FG, WIP And Stock-In Trade", value: 17 },
        { name: "Employee Benefit Expenses", value: 16 },
        { name: "Finance Costs", value: 13 },
        { name: "Depreciation And Amortisation Expenses", value: 14 },
        { name: "Other Expenses", value: 13 },
      ]
    },
    {
      name: "PROFIT / LOSS",
      children: [
        { name: "Exceptional Items", value: 11 },
        { name: "Profit/Loss Before Tax", value: 13 },
        { name: "Current Tax", value: 12 },
        { name: "Deferred Tax", value: 11 },
        { name: "Total Tax Expenses", value: 12 },
        { name: "Profit/Loss From Continuing Operations", value: 14 },
      ]
    }
  ]
};

// Set up Color Set for shades (Base colors for generating gradients)
var colors = {
    "INCOME": am5.ColorSet.new(root, { baseColor: colorGreen }),
    "EXPENSES": am5.ColorSet.new(root, { baseColor: colorBlue }),
    "PROFIT / LOSS": am5.ColorSet.new(root, { baseColor: colorOrange })
};


// Add Fill Adapter
series.rectangles.template.adapters.add("fill", function(fill, target) {
    var dataItem = target.dataItem;
    console.log({dataItem});
    if (!dataItem) return fill;

    var level = dataItem.get("level");
    
    // Find the Level 1 parent (the root section: INCOME, EXPENSES, PROFIT/LOSS)
    var parentDataItem = dataItem.get("parent");
    // console.log({parentDataItem});  
    while (parentDataItem && parentDataItem.get("level") > 1) {
        parentDataItem = parentDataItem.parent;
    }

    if (parentDataItem) {
        console.log({parentDataItem});
        var category = parentDataItem.dataContext.name;
        console.log({category,colors});
        console.log("parentDataItem",parentDataItem.dataContext);
        
        if (colors[category]) {
            var colorSet = colors[category];
            console.log({colorSet,level});
            // For the main sections (Level 1), apply the solid base color
            if (category === "INCOME") return colorGreen;
            if (category === "EXPENSES") return colorBlue;
            if (category === "PROFIT / LOSS") return colorOrange;

            // For children (Level > 1), use the color set to iterate through shades.
            return colorSet.next().color;
        }
    }
    
    return fill;
});


series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);

}); // end am5.ready()
// --- End JS Block ---// =======================================================
// == SANKEY2 CHART LOGIC (ENHANCED & COMPLETE) ==
  // =======================================================

// --- Start JS Block ---

// Define the mapping for full names to short names
var nameMap = {
    "Revenue From Operations [Gross]": "Rev Op [Gross]",
    "Less: Excise/Service Tax/Other Levies": "Less: Tax Levies",
    "Revenue From Operations [Net]": "Rev Op [Net]",
    "Other Income": "Other Inc",
    "Total Revenue (Source)": "Total Revenue",
    "Cost Of Materials Consumed": "Mat. Consumed",
    "Purchase Of Stock-In Trade": "Purch. Stock",
    "Operating And Direct Expenses": "Op. & Direct Exp.",
    "Changes In Inventories...": "Changes in Inv.",
    "Employee Benefit Expenses": "Emp. Ben. Exp.",
    "Finance Costs": "Fin. Costs",
    "Depreciation And Amortisation Expenses": "D&A Expenses",
    "Other Expenses": "Other Exp.",
    "Exceptional Items": "Exceptional",
    "P/L Before Exceptional, ExtraOrdinary Items And Tax": "P/L Before Exceptional",
    "Profit/Loss Before Tax": "P/L Before Tax",
    "Profit/Loss For The Period": "Final P/L"
};


am5.ready(function() {

// Create root element
var root = am5.Root.new("sankey2-chart");


// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create series
var series = root.container.children.push(am5flow.Sankey.new(root, {
  sourceIdField: "from",
  targetIdField: "to",
  valueField: "value",
  paddingRight: 100,
}));

series.nodes.get("colors").set("step", 2);

// ==========================================================
// NODE CUSTOMIZATION (Labels and Tooltips)
// ==========================================================

// 1. Configure Tooltip to show the full name
series.nodes.labels.template.set("tooltipText", "{name}");

// 2. Configure Label Text using an adapter for short names
series.nodes.labels.template.adapters.add("text", function(text, target) {
    var dataItem = target.dataItem;
    if (dataItem) {
        var fullName = dataItem.get("id"); // The category/name is stored as the ID
        
        // Check if a short name exists in the map
        if (nameMap[fullName]) {
            return nameMap[fullName];
        }
        
        // If no short name is defined, return the original text (which is {name})
        return fullName; 
    }
    return text;
});

// Optional: Adjust label settings for better fit
series.nodes.labels.template.setAll({
    maxWidth: 150, // Limit width to prevent excessive horizontal spread
    overflow: "visible", // Ensure labels aren't hidden
    fontSize: 12
    
});

// ==========================================================


// Set data
series.data.setAll([
  // --- INCOME & REVENUE FLOW (Source: Revenue From Operations [Gross] = 5,57,163)
  { from: "Revenue From Operations [Gross]", to: "Less: Excise/Service Tax/Other Levies", value: 39814 },
  { from: "Revenue From Operations [Gross]", to: "Revenue From Operations [Net]", value: 517349 }, 
  
  // --- TOTAL REVENUE SOURCE (Total Revenue = 5,33,443)
  { from: "Revenue From Operations [Net]", to: "Total Revenue (Source)", value: 517349 },
  { from: "Other Income", to: "Total Revenue (Source)", value: 16094 }, 

  // --- EXPENSES FLOW (Total Expenses = 5,09,913)
  { from: "Total Revenue (Source)", to: "Cost Of Materials Consumed", value: 384021 },
  { from: "Total Revenue (Source)", to: "Purchase Of Stock-In Trade", value: 15864 },
  { from: "Total Revenue (Source)", to: "Operating And Direct Expenses", value: 43003 },
  { from: "Total Revenue (Source)", to: "Changes In Inventories...", value: 4052 },
  { from: "Total Revenue (Source)", to: "Employee Benefit Expenses", value: 8690 },
  { from: "Total Revenue (Source)", to: "Finance Costs", value: 10054 },
  { from: "Total Revenue (Source)", to: "Depreciation And Amortisation Expenses", value: 31105 },
  { from: "Total Revenue (Source)", to: "Other Expenses", value: 21228 },
  
  // --- FLOW TO PROFIT BEFORE EXCEPTIONAL ITEMS (23,530)
  { from: "Total Revenue (Source)", to: "P/L Before Exceptional, ExtraOrdinary Items And Tax", value: 23530 },

  // --- EXCEPTIONAL ITEMS & PBT (PBT = 23,319)
  { from: "P/L Before Exceptional, ExtraOrdinary Items And Tax", to: "Exceptional Items", value: 211 },
  { from: "P/L Before Exceptional, ExtraOrdinary Items And Tax", to: "Profit/Loss Before Tax", value: 23319 },

  // --- TAX & FINAL PROFIT (Final P/L = 19,323)
  // This models the net deduction of 3,996 (the Total Tax Expenses value) from PBT.
  { from: "Profit/Loss Before Tax", to: "Total Tax Expenses (Net Deduction)", value: 3996 }, 
  { from: "Profit/Loss Before Tax", to: "Profit/Loss For The Period", value: 19323 }
]);


// Make stuff animate on load
series.appear(1000, 100);

}); // end am5.ready()
  // =======================================================
  // == SANKEY CHART LOGIC (ENHANCED & COMPLETE) ==
  // =======================================================
am5.ready(function() {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("sankey-chart");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create series
// https://www.amcharts.com/docs/v5/charts/flow-charts/
var series = root.container.children.push(
  am5flow.ChordDirected.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    sort: "ascending"
  })
);

series.links.template.set("fillStyle", "source");

series.nodes.get("colors").set("step", 2);
series.nodes.data.setAll([
  { id: "A" },
  { id: "B" },
  { id: "C" },
  { id: "D" },
  { id: "E" },
  { id: "F" }
]);

series.nodes.get("colors").set("step", 2);

series.bullets.push(function (_root, _series, dataItem) {
  var bullet = am5.Bullet.new(root, {
    locationY: Math.random(),
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: dataItem.get("source").get("fill")
    })
  });

  bullet.animate({
    key: "locationY",
    to: 1,
    from: 0,
    duration: Math.random() * 1000 + 2000,
    loops: Infinity
  });

  return bullet;
});

series.nodes.labels.template.setAll({
  textType: "regular",
  fill: root.interfaceColors.get("background"),
  fontSize: "1.1em",
  radius: -5
});

series.nodes.bullets.push(function (_root, _series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 20,
      fill: dataItem.get("fill")
    })
  });
});

series.children.moveValue(series.bulletsContainer, 0);

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
  { from: "A", to: "D", value: 10 },
  { from: "B", to: "C", value: 8 },
  { from: "B", to: "D", value: 4 },
  { from: "B", to: "E", value: 2 },
  { from: "C", to: "A", value: 14 },
  { from: "C", to: "E", value: 4 },
  { from: "E", to: "D", value: 8 },
  { from: "F", to: "A", value: 7 },
  { from: "D", to: "B", value: 2 }
]);

// Make stuff animate on load
series.appear(1000, 100);

}); // end am5.ready()

// =======================================================
// ====Bubble chart ======================================
// =======================================================
am5.ready(function() {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("bubblechart");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

var data = {
  value: 0,
  children: [
    {
      name: "Flora",
      children: [
        {
          name: "Black Tea",
          value: 1
        },
        {
          name: "Floral",
          children: [
            {
              name: "Chamomile",
              value: 1
            },
            {
              name: "Rose",
              value: 1
            },
            {
              name: "Jasmine",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Fruity",
      children: [
        {
          name: "Berry",
          children: [
            {
              name: "Blackberry",
              value: 1
            },
            {
              name: "Raspberry",
              value: 1
            },
            {
              name: "Blueberry",
              value: 1
            },
            {
              name: "Strawberry",
              value: 1
            }
          ]
        },
        {
          name: "Dried Fruit",
          children: [
            {
              name: "Raisin",
              value: 1
            },
            {
              name: "Prune",
              value: 1
            }
          ]
        },
        {
          name: "Other Fruit",
          children: [
            {
              name: "Coconut",
              value: 1
            },
            {
              name: "Cherry",
              value: 1
            },
            {
              name: "Pomegranate",
              value: 1
            },
            {
              name: "Pineapple",
              value: 1
            },
            {
              name: "Grape",
              value: 1
            },
            {
              name: "Apple",
              value: 1
            },
            {
              name: "Peach",
              value: 1
            },
            {
              name: "Pear",
              value: 1
            }
          ]
        },
        {
          name: "Citrus Fruit",
          children: [
            {
              name: "Grapefruit",
              value: 1
            },
            {
              name: "Orange",
              value: 1
            },
            {
              name: "Lemon",
              value: 1
            },
            {
              name: "Lime",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Sour/Fermented",
      children: [
        {
          name: "Sour",
          children: [
            {
              name: "Sour Aromatics",
              value: 1
            },
            {
              name: "Acetic Acid",
              value: 1
            },
            {
              name: "Butyric Acid",
              value: 1
            },
            {
              name: "Isovaleric Acid",
              value: 1
            },
            {
              name: "Citric Acid",
              value: 1
            },
            {
              name: "Malic Acid",
              value: 1
            }
          ]
        },
        {
          name: "Alcohol/Fremented",
          children: [
            {
              name: "Winey",
              value: 1
            },
            {
              name: "Whiskey",
              value: 1
            },
            {
              name: "Fremented",
              value: 1
            },
            {
              name: "Overripe",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Green/Vegetative",
      children: [
        {
          name: "Olive Oil",
          value: 1
        },
        {
          name: "Raw",
          value: 1
        },
        {
          name: "Green/Vegetative",
          children: [
            {
              name: "Under-ripe",
              value: 1
            },
            {
              name: "Peapod",
              value: 1
            },
            {
              name: "Fresh",
              value: 1
            },
            {
              name: "Dark Green",
              value: 1
            },
            {
              name: "Vegetative",
              value: 1
            },
            {
              name: "Hay-like",
              value: 1
            },
            {
              name: "Herb-like",
              value: 1
            }
          ]
        },
        {
          name: "Beany",
          value: 1
        }
      ]
    },
    {
      name: "Other",
      children: [
        {
          name: "Papery/Musty",
          children: [
            {
              name: "Stale",
              value: 1
            },
            {
              name: "Cardboard",
              value: 1
            },
            {
              name: "Papery",
              value: 1
            },
            {
              name: "Woody",
              value: 1
            },
            {
              name: "Moldy/Damp",
              value: 1
            },
            {
              name: "Musty/Dusty",
              value: 1
            },
            {
              name: "Musty/Earthy",
              value: 1
            },
            {
              name: "Animalic",
              value: 1
            },
            {
              name: "Meaty Brothy",
              value: 1
            },
            {
              name: "Phenolic",
              value: 1
            }
          ]
        },
        {
          name: "Chemical",
          children: [
            {
              name: "Bitter",
              value: 1
            },
            {
              name: "Salty",
              value: 1
            },
            {
              name: "Medicinal",
              value: 1
            },
            {
              name: "Petroleum",
              value: 1
            },
            {
              name: "Skunky",
              value: 1
            },
            {
              name: "Rubber",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Roasted",
      children: [
        {
          name: "Pipe Tobacco",
          value: 1
        },
        {
          name: "Tobacco",
          value: 1
        },
        {
          name: "Burnt",
          children: [
            {
              name: "Acrid",
              value: 1
            },
            {
              name: "Ashy",
              value: 1
            },
            {
              name: "Smoky",
              value: 1
            },
            {
              name: "Brown, Roast",
              value: 1
            }
          ]
        },
        {
          name: "Cereal",
          children: [
            {
              name: "Grain",
              value: 1
            },
            {
              name: "Malt",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Spices",
      children: [
        {
          name: "Pungent",
          value: 1
        },
        {
          name: "Pepper",
          value: 1
        },
        {
          name: "Brown Spice",
          children: [
            {
              name: "Anise",
              value: 1
            },
            {
              name: "Nutmeg",
              value: 1
            },
            {
              name: "Cinnamon",
              value: 1
            },
            {
              name: "Clove",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Nutty/Cocoa",
      children: [
        {
          name: "Nutty",
          children: [
            {
              name: "Peanuts",
              value: 1
            },
            {
              name: "Hazelnut",
              value: 1
            },
            {
              name: "Almond",
              value: 1
            }
          ]
        },
        {
          name: "Cocoa",
          children: [
            {
              name: "Chocolate",
              value: 1
            },
            {
              name: "Dark Chocolate",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Sweet",
      children: [
        {
          name: "Brown Sugar",
          children: [
            {
              name: "Molasses",
              value: 1
            },
            {
              name: "Maple Syrup",
              value: 1
            },
            {
              name: "Caramelized",
              value: 1
            },
            {
              name: "Honey",
              value: 1
            }
          ]
        },
        {
          name: "Vanilla",
          value: 1
        },
        {
          name: "Vanillin",
          value: 1
        },
        {
          name: "Overall Sweet",
          value: 1
        },
        {
          name: "Sweet Aromatics",
          value: 1
        }
      ]
    }
  ]
};

var zoomableContainer = root.container.children.push(
  am5.ZoomableContainer.new(root, {
    width: am5.p100,
    height: am5.p100,
    wheelable: true,
    pinchZoom: true
  })
);

var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
  target: zoomableContainer
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
  maskContent:false, //!important with zoomable containers
  singleBranchOnly: false,
  downDepth: 2,
  topDepth: 1,
  initialDepth: 3,
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  idField: "name",
  linkWithField: "linkWith",
  manyBodyStrength: -10,
  centerStrength: 0.8
}));

series.get("colors").setAll({
  step: 2
});

series.links.template.set("strength", 0.5);
series.labels.template.set("minScale", 0);

series.data.setAll([data]);

series.set("selectedDataItem", series.dataItems[0]);


// Make stuff animate on load
series.appear(1000, 100);

}); // end am5.ready()

  // =======================================================
  // == PROFIT & LOSS CHART ANIMATION (D3/CSS Version) ==
  // =======================================================
  const chartData = [
    { label: "Apr 2024", value: 80 },
    { label: "May 2024", value: 120 },
    { label: "Jun 2024", value: 150 },
    { label: "Jul 2024", value: 180 },
    { label: "Aug 2024", value: 220 },
    { label: "Sep 2024", value: 250 },
    { label: "Oct 2024", value: 280 },
    { label: "Nov 2024", value: 300 },
    { label: "Dec 2024", value: 350 },
    { label: "Jan 2025", value: 380 },
    { label: "Feb 2025", value: 420 },
    { label: "Mar 2025", value: 450 },
  ];
  const chartContainer = document.getElementById("profit-chart");
  if (chartContainer) {
    const maxChartValue = Math.max(...chartData.map((d) => d.value));
    chartData.forEach((item) => {
      const bar = document.createElement("div");
      bar.className = "chart-bar";
      bar.dataset.height = (item.value / maxChartValue) * 100;
      const valueSpan = document.createElement("span");
      valueSpan.className = "value";
      valueSpan.textContent = `₹${item.value}k`;
      const labelSpan = document.createElement("span");
      labelSpan.className = "label";
      labelSpan.textContent = item.label;
      bar.appendChild(valueSpan);
      bar.appendChild(labelSpan);
      chartContainer.appendChild(bar);
    });
    const chartObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll(".chart-bar");
            bars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.height = `${bar.dataset.height}%`;
                bar.classList.add("visible");
              }, index * 100);
            });
            setTimeout(
              () => drawLineChart(chartContainer, chartData, maxChartValue),
              bars.length * 100 + 500
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    chartObserver.observe(chartContainer);
  }

  // =======================================================
  // == DRAW LINE CHART FUNCTION (FOR PROFIT & LOSS) ==
  // =======================================================
  function drawLineChart(container, data, maxValue) {
    const containerRect = container.getBoundingClientRect();
    const bars = container.querySelectorAll(".chart-bar");
    if (bars.length === 0) return;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("class", "line-chart-svg")
      .attr("width", containerRect.width)
      .attr("height", containerRect.height);

    const points = Array.from(bars).map((bar, i) => {
      const barRect = bar.getBoundingClientRect();
      const x = barRect.left - containerRect.left + barRect.width / 2;
      const y = containerRect.height * (1 - data[i].value / maxValue);
      return { x, y, value: data[i].value };
    });

    const lineGenerator = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveMonotoneX);

    const path = svg
      .append("path")
      .datum(points)
      .attr("d", lineGenerator);

    const totalLength = path.node().getTotalLength();
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    svg
      .selectAll(".line-point")
      .data(points)
      .enter()
      .append("circle")
      .attr("class", "line-point")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 0)
      .transition()
      .delay(1000)
      .duration(500)
      .attr("r", 5);
  }
});