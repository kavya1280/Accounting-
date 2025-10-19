document.addEventListener('DOMContentLoaded', function() {
    // This is a workaround to get CSS variables into Chart.js dynamically.
    // It's better to define colors directly in JS for Chart.js, or pass them.
    // However, if you want to strictly use CSS vars, this is one way.
    const rootStyles = getComputedStyle(document.documentElement);
    const textColorDark = rootStyles.getPropertyValue('--text-color-dark').trim();
    const borderColor = rootStyles.getPropertyValue('--border-color').trim();

    Chart.register(ChartDataLabels);

    // Area Chart
    const areaCtx = document.getElementById('areaChart').getContext('2d');
    new Chart(areaCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Amount',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                borderColor: 'rgba(74, 144, 226, 1)',
                tension: 0.4,
                pointBackgroundColor: 'rgba(74, 144, 226, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(74, 144, 226, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
                datalabels: {
                    display: false, // Hide datalabels for clarity on line charts
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Period',
                        color: textColorDark, // Using the dynamically retrieved color
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amount',
                        color: textColorDark, // Using the dynamically retrieved color
                    },
                    beginAtZero: true,
                    grid: {
                        color: borderColor // Using the dynamically retrieved color
                    }
                }
            }
        }
    });

    // Balance Sheet Bar Chart
    const balanceCtx = document.getElementById('balanceSheetChart').getContext('2d');
    new Chart(balanceCtx, {
        type: 'bar',
        data: {
            labels: ['Assets', 'Liabilities', 'Equity'],
            datasets: [{
                label: 'Amount',
                data: [120000, 70000, 50000],
                backgroundColor: [
                    'rgba(74, 144, 226, 0.8)',
                    'rgba(138, 43, 226, 0.8)',
                    'rgba(30, 144, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(74, 144, 226, 1)',
                    'rgba(138, 43, 226, 1)',
                    'rgba(30, 144, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: function(value) {
                        return '$' + value.toLocaleString();
                    },
                    color: textColorDark, // Using the dynamically retrieved color
                    font: {
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Balance Sheet Heading',
                        color: textColorDark, // Using the dynamically retrieved color
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amount',
                        color: textColorDark, // Using the dynamically retrieved color
                    },
                    beginAtZero: true,
                    grid: {
                        color: borderColor // Using the dynamically retrieved color
                    }
                }
            }
        }
    });

    // Profit & Loss Bar Chart
    const profitLossCtx = document.getElementById('profitLossChart').getContext('2d');
    new Chart(profitLossCtx, {
        type: 'bar',
        data: {
            labels: ['Revenue', 'Cost of Goods Sold', 'Gross Profit', 'Operating Expenses', 'Net Profit'],
            datasets: [{
                label: 'Amount',
                data: [250000, 100000, 150000, 60000, 90000],
                backgroundColor: [
                    'rgba(74, 144, 226, 0.8)',
                    'rgba(255, 99, 132, 0.8)', // COGS often red
                    'rgba(138, 43, 226, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderColor: [
                    'rgba(74, 144, 226, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(138, 43, 226, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: function(value) {
                        return '$' + value.toLocaleString();
                    },
                    color: textColorDark, // Using the dynamically retrieved color
                    font: {
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'P&L Account Heading',
                        color: textColorDark, // Using the dynamically retrieved color
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amount',
                        color: textColorDark, // Using the dynamically retrieved color
                    },
                    beginAtZero: true,
                    grid: {
                        color: borderColor // Using the dynamically retrieved color
                    }
                }
            }
        }
    });

    // World Map Initialization (Placeholder)
    // To implement a real interactive map with heatmap, you would integrate a library here.
    // Example using a hypothetical map library (jVectorMap):
    /*
    // You would typically include jVectorMap's JS files (jquery.jvectormap.min.js and a map file like world_mill_en.js)
    // BEFORE script.js in your HTML.
    if (typeof jvm !== 'undefined') { // Check if jVectorMap is loaded
        new jvm.Map({
            container: document.getElementById('worldMap'),
            map: 'world_mill', // 'world_mill' is a common map type
            backgroundColor: 'transparent', // Match card background
            series: {
                regions: [{
                    values: {
                        US: 750, DE: 500, GB: 400, FR: 300, JP: 600, AU: 200, BR: 450, CN: 900
                    },
                    scale: ['#CCE0FF', '#4A90E2'], // Example color scale for heatmap
                    normalizeFunction: 'polynomial' // or 'linear'
                }]
            },
            onRegionTipShow: function(e, el, code){
                const data = {
                    US: "USA: $750M", DE: "Germany: $500M", GB: "UK: $400M", FR: "France: $300M", 
                    JP: "Japan: $600M", AU: "Australia: $200M", BR: "Brazil: $450M", CN: "China: $900M"
                };
                el.html(el.html()+' ('+ (data[code] || 'N/A') +')');
            }
        });
    } else {
        console.warn("jVectorMap or similar library not loaded. World map will remain a placeholder.");
    }
    */
});