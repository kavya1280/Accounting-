document.addEventListener('DOMContentLoaded', () => {
    // --- Sample Data (UPDATED from your image) ---
    const allInsightsData = [
  {
    insightCategory: "Strategy",
    insightID: "SAEX01",
    insight: "Cost Driver Analysis",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Identifies inefficiencies and potential cost reductions affecting production expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAEX02",
    insight: "ROI of Strategic Initiatives",
    pnlAccount: "Other Income",
    lable: "Other Income",
    pnlImpactDescription: "Gains or losses from strategic projects impact profit or loss recognition.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html/roi"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAEX03",
    insight: "Risk Mitigation",
    pnlAccount: "Insurance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Reduced potential losses lower expense recognition.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAEX04",
    insight: "Risk Identification",
    pnlAccount: "Risk Management Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Identified risks may require allocation for mitigation costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAEX05",
    insight: "Risk Prioritization",
    pnlAccount: "Admin Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Helps allocate resources efficiently, optimizing expense structures.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAFO01",
    insight: "Budget Overruns",
    pnlAccount: "Operating Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Increases total expenses and reduces profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAFO02",
    insight: "Market Share Trends",
    pnlAccount: "Research and Development Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Changes in market share directly affect sales volume and revenue recognition.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAFO03",
    insight: "Demand Volatility Analysis",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Demand fluctuations impact revenue consistency and cost matching.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAFO04",
    insight: "Seasonality & Trend Analysis",
    pnlAccount: "Markting and Business Development Cost",
    lable: "Other Expenses",
    pnlImpactDescription: "Anticipated trends guide promotional spending and revenue timing.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAFO05",
    insight: "Scenario Planning",
    pnlAccount: "Admin Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Incurred modeling and analysis costs appear as operational expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAIG01",
    insight: "Plant Efficiency Test",
    pnlAccount: "Research and Development Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Improved efficiency reduces production costs and enhances margins.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAIG02",
    insight: "Customer Sentiment",
    pnlAccount: "Markting and Business Development Cost",
    lable: "Other Expenses",
    pnlImpactDescription: "Positive sentiment drives sales; negative sentiment increases promotional or service recovery costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html/csst"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAIG03",
    insight: "ESG Dashboard",
    pnlAccount: "Legal & Compliance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "ESG tracking introduces additional compliance or sustainability-related costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAQT01",
    insight: "Defect vs Return Rate",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Increased defect or return rates directly increase sales return and warranty costs, and may lead to higher production rework or scrap costs, impacting overall profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/quality-management.html"
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAQT02",
    insight: "Supplier Defect Rate",
    pnlAccount: "Purchase Returns",
    lable: "Purchase Of Stock-In Trade",
    pnlImpactDescription: "High supplier defect rates increase rework and inspection costs, and may cause purchase return losses or credit/debit note adjustments, impacting procurement-related expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/quality-management.html"
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAQT03",
    insight: "Non Compliance Incidents",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Non-compliance incidents can lead to penalties, rework, scrapping costs, and additional quality-related expenses, directly impacting operational profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/quality-management.html"
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAQT04",
    insight: "Payment without Quality Clearance",
    pnlAccount: "Purchase Returns",
    lable: "Purchase Of Stock-In Trade",
    pnlImpactDescription: "If the material later fails quality inspection, it may result in write-offs or additional expense recognition instead of capitalization, directly affecting the P&L.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/quality-management.html"
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAQT05",
    insight: "Quality Rejected Items Issued to Production",
    pnlAccount: "Cost of Goods Manufactured",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Using defective materials increases wastage and rework, resulting in higher production costs or losses, directly impacting profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/quality-management.html"
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAOT01",
    insight: "Low Recovery against Standard Norms",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Low recovery increases material usage per output, leading to higher cost of production, increased variance losses, and reduced gross margins. This directly affects profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/quality-management.html"
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAOT02",
    insight: "Customer Complaints",
    pnlAccount: "Markting and Business Development Cost",
    lable: "Other Expenses",
    pnlImpactDescription: "Quality-related complaints may result in sales returns or discounts, reducing revenue. Additional costs for investigating, reworking, or improving quality due to complaints increase operating expenses. Costs incurred to replace or repair defective goods are charged as warranty or claim expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/quality-management.html"
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAOT03",
    insight: "Supplier Quality Audit Score",
    pnlAccount: "Purchase Returns",
    lable: "Purchase Of Stock-In Trade",
    pnlImpactDescription: "Low-quality supplies due to poor supplier audit results may increase rejections, resulting in purchase return or rejection costs. Increased audit or inspection activities to monitor low-scoring suppliers raise operating costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/quality-management.html"
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAOT04",
    insight: "Process Deviation Reports",
    pnlAccount: "Manufacturing Expense / Rework Cost",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Deviations often lead to reprocessing or additional testing, which increases manufacturing or rework costs. Non-conformance caused by deviations can increase scrap and waste, reducing overall efficiency and increasing losses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/quality-management.html"
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAOT05",
    insight: "On Time Delivery Performance",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Late deliveries may cause revenue deferral or cancellation of orders, directly impacting sales. Expedited shipping to meet delayed commitments can increase freight or logistics costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/quality-management.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAMD01",
    insight: "GL Master Anomalies",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "Misclassification risk of revenues and expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAMD02",
    insight: "Financial Performance",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "Issues in financial data analysis or setup (Master Data) mean the calculated Deferred Tax Liabilities (the tax you'll owe later) are likely wrong. The Net balance is inaccurate.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAMD03",
    insight: "Flux Analysis",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "Issues in financial data analysis or setup (Master Data) mean the calculated Deferred Tax Liabilities (the tax you'll owe later) are likely wrong. The Net balance is inaccurate.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAMD04",
    insight: "Ratio Identification and Prioritization",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "Issues in financial data analysis or setup (Master Data) mean the calculated Deferred Tax Liabilities (the tax you'll owe later) are likely wrong. The Net balance is inaccurate.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAEM01",
    insight: "Cost Centre Variance Analysis",
    pnlAccount: "Operating Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Variances suggest costs are not matching budget, directly affecting the P&L.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAEM02",
    insight: "Direct Expense Payment",
    pnlAccount: "Operating Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Incorrect or unnecessary payments increase expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAEM03",
    insight: "Duplicate Payment",
    pnlAccount: "Operating Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "incorrect expense recording until recovery",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAEM04",
    insight: "Expense Policy Violation",
    pnlAccount: "Operating Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Unnecessary/unauthorized spending",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAEM05",
    insight: "Scenario Planning",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "Depends on Scenario",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html  "
  },
  {
    insightCategory: "Finance",
    insightID: "FAIO01",
    insight: "Configuration Check",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "If cost centers, GL codes, or project mappings are incorrect, expenses may be recorded in the wrong place or duplicated Also can cause over/under-reported sales",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAIO02",
    insight: "Unauthorised Postings",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "Risk of fraud or error that misstate any  P&L account.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAIO03",
    insight: "High Value JVs",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "Risk of fraud or error impacting any account used in the JV.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAMD01",
    insight: "Suspicious Duplicate Vendor with opposite o/p balance",
    pnlAccount: "Operating Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Risk of duplicate payment affect GST input tax credit claims.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAMD02",
    insight: "Dormant Vendor Account Used for Payment",
    pnlAccount: "Operating Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Risk of fraudulent payments inflating expenses",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAMD03",
    insight: "Mismatching Updates in Master",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "Errors in master data (e.g., account codes, cost centers) can cause wrong expense or revenue recognition.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAMD04",
    insight: "Vendor and Customer Names are same & not disclosed",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Income and expenses may be overstated or understated if transactions are not at arm’s length",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAMD05",
    insight: "One Time Vendor Anomalies",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Fraudulent or duplicate payments inflate expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPR01",
    insight: "Invalid PO Delivery Address",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Purchase Of Stock-In Trade",
    pnlImpactDescription: "Payments may be made for goods not received or recorded under incorrect accounts",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPR02",
    insight: "Single Source Vendor",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Lack of competitive bidding may result in inflated prices.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPR03",
    insight: "Procurement of Contracted Material at Higher Price",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Higher material costs",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPR04",
    insight: "Invoice Date Prior to PO Date",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Expenses may be recognized in the wrong period or without a valid PO, distorting financial results.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPR05",
    insight: "Split PR/PO",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Fragmented orders may result in inconsistent expense recognition or concealment of high-value purchases.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPA01",
    insight: "Home Account Changed and Rerouted",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Duplicate or unauthorized payments increase expense totals.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPA02",
    insight: "Duplicate Vendor Invoices",
    pnlAccount: "Operating Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Temporary loss",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPA03",
    insight: "Payment not in name of Vendor or alternate payee",
    pnlAccount: "Operating Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Fraud risk(Misclassification)",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPA04",
    insight: "Delay in payment to MSME Vendor",
    pnlAccount: "Finance Cost",
    lable: "Finance Costs",
    pnlImpactDescription: "Interest on delayed MSME payments must be recognized as an expense under the MSMED Act but may be omitted.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPA05",
    insight: "Payment against blocked Invoice/Vendor",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Unverified or duplicate payments can lead to overstated expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAOT01",
    insight: "Some Expenses for PO and Non PO transaction",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Duplicate or unapproved expenses inflate overall costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAOT02",
    insight: "Inter Plant Variation in Material Price",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Higher material prices in some plants increase overall production cost.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAOT03",
    insight: "Excessive Bank Charges",
    pnlAccount: "Bank Charges",
    lable: "Finance Costs",
    pnlImpactDescription: "Directly increases non-operating expenses",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAOT04",
    insight: "Deviation in liability compares to base rate and quantity",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Expenses may be recorded higher/lower than actual agreed rate or quantity.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAOT05",
    insight: "IV Quantity exceeds GR Quantity",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Paying for goods not received",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAMD01",
    insight: "Customer Credit Limit Check",
    pnlAccount: "Bad Debt Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Higher risk of uncollected sales",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAMD02",
    insight: "Duplicate Customers",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "revenue recognition errors.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAMD03",
    insight: "Customer Recon Account not defined",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "This stops the revenue cycle. It leads to inaccurate invoicing or tracking of customer payments. The company may stop shipping goods to customers with unclear accounts, directly causing lost sales and unrecognised revenue.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAMD04",
    insight: "Key Fields Missing",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Missing data (e.g., revenue account or recognition key) can cause incorrect or delayed posting of sales revenue",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAMD05",
    insight: "Mismatching Updates in Master",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Incorrect or mismatched pricing/tax data may result in overstatement or understatement of sales revenue.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OASA01",
    insight: "Sales Return quantity greater than Sales Quantity",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Invalid returns reduce revenue",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OASA02",
    insight: "Sales Return price greater than Sales Price",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Excessive return value reduces net revenue more than actual, leading to revenue understatement.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OASA03",
    insight: "Sales Return of Expired/Short Expiry Material",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Sales returns reduce revenue recognized earlier. If the return is due to expiry, it reflects poor sales planning and may distort revenue trends. Returned goods may not be reusable, resulting in additional write-offs or destruction costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OASA04",
    insight: "Delivery in excess of Sales Order Tolerance Limit",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Deliveries beyond agreed limits may be billed without valid customer authorization, inflating revenue. Cost recognition increases due to additional goods issued, possibly reducing gross margin.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OASA05",
    insight: "Excess Delivery to Customer",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Over-delivery inflates sales and COGS; impacts gross margin accuracy.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAIN01",
    insight: "Anomalies to Credit Notes",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Incorrect revenue reversal leads to misstated revenue and profit",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAIN02",
    insight: "Sale Price of Same Material with 2 prices in Same Invoice",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Risk of understating revenue if the lower price is used incorrectly.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAIN03",
    insight: "Sale Order Price set manual",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Manual override can over/understate sales; distorts profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAIN04",
    insight: "Sale of product at Free of Cost",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Revenue is zero for these items",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAOT01",
    insight: "Change in Delivery Address",
    pnlAccount: "Transport Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Wrong delivery address could cause sales returns, freight adjustments, or additional logistics costs, leading to revenue reduction or increased expenses. (Fraud/loss risk)",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAOT02",
    insight: "Business Partner Credit Check Missing",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Potential non-recovery of receivables leads to increased bad debt expense and write-offs, reducing profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAOT03",
    insight: "Over Stocked Material",
    pnlAccount: "Material Handling Expenses",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Overstocking causes higher warehousing and obsolescence costs. If items become unsellable or expire, they may need to be written off, reducing profits.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAOT04",
    insight: "TAT - Sales Order to Invoice to Dispatch",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Delay in invoicing postpones sales recognition, affecting reported revenue and profitability within the accounting period.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAOT05",
    insight: "Sale of Expired Stocks",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Sale of expired items often occurs at discounted prices or as scrap, reducing revenue and increasing potential losses or write-offs in the income statement.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAAC01",
    insight: "Customer to Customer/Vendor Transfers",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Generally, these transfers affect only balance sheet accounts; however, if write‑offs or adjustments occur due to errors, they may impact P&L through bad debt expense or other income/expense accounts.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAAC02",
    insight: "Prior Period Invoice Processing",
    pnlAccount: "Prior Period Adjustment",
    lable: "Exceptional Items",
    pnlImpactDescription: "Expenses or revenues may be recorded in the wrong accounting period, distorting the current year’s profitability and affecting prior period comparability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAAC03",
    insight: "Vendor to Vendor/Customer Transfers",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "If such transfers are not correctly accounted for, they may result in over/understatement of expenses (e.g., duplicate or missing vendor payments) or income adjustments (in case of customer transfers).",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAAC04",
    insight: "Payment Beyond 60/180 Days since Due Date",
    pnlAccount: "Interest Expense",
    lable: "Finance Costs",
    pnlImpactDescription: "Extended payment terms beyond contractual due dates may attract interest, late fees, or penalties, increasing expenses in the P&L.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAAC05",
    insight: "Repeated Vendor Invoice in the Same Fiscal Year",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "The same expense is recorded more than once, inflating total expenses and reducing reported profit for the fiscal year.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RATA01",
    insight: "GST having same Document Reference number",
    pnlAccount: "Indirect Tax Expense",
    lable: "Excise/Sevice Tax/Other Levies",
    pnlImpactDescription: "If GST entries are duplicated or missed due to duplicate references, tax expenses could be incorrectly reported, leading to incorrect profit figures.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RATA02",
    insight: "GST Duplicate Invoices",
    pnlAccount: "Indirect Tax Expense",
    lable: "Excise/Sevice Tax/Other Levies",
    pnlImpactDescription: "Duplicate GST postings can inflate tax expenses or revenues recorded against a single transaction, leading to misstated profit.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RATA03",
    insight: "GST Interest Loss due to non payment (180 days)",
    pnlAccount: "Interest Expense",
    lable: "Finance Costs",
    pnlImpactDescription: "Non-payment of GST within 180 days results in disallowance of input tax credit and accrual of interest liability, increasing expenses in P&L.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RATA04",
    insight: "GST Interest Loss due to non payment (60 days)",
    pnlAccount: "Interest Expense",
    lable: "Finance Costs",
    pnlImpactDescription: "Delay in payment of GST beyond the due date (60 days) results in interest liability on outstanding tax, increasing finance costs in P&L.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RATA05",
    insight: "Tax Number Validation",
    pnlAccount: "Indirect Tax Expense",
    lable: "Excise/Sevice Tax/Other Levies",
    pnlImpactDescription: "If tax credits are disallowed due to invalid tax registration, expenses increase as the company cannot claim GST input.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAOT01",
    insight: "Country/Bank Validation",
    pnlAccount: "Exchange Gain/Loss",
    lable: "Other Income",
    pnlImpactDescription: "Errors in bank or country configuration may trigger wrong currency conversion or additional bank charges, impacting P&L.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAOT02",
    insight: "Unauthorised Posting",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "Unauthorized entries could manipulate income or expense accounts, distorting profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAOT03",
    insight: "High Value JVs",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "Large JVs may be used to adjust income or expenses significantly. Incorrect or unsupported entries can distort profitability and financial performance.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAPR01",
    insight: "Multiple Shelf Life for Some Material/Batch",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Misstated shelf life can delay or accelerate recognition of inventory losses, distorting gross margin and profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAPR02",
    insight: "Deviation in Standard v/s Actual Consumption",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "When actual material consumption differs significantly from the standard, it causes inaccurate cost recording. Overconsumption inflates production costs, reducing gross profit; underconsumption may lead to overstated profits.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAPR03",
    insight: "Abnormal movement vs production",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Purchase Of Stock-In Trade",
    pnlImpactDescription: "Abnormal material movements (e.g., excess issues, unplanned transfers, or scrap beyond normal limits) inflate production costs and reduce profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAPR04",
    insight: "Scrap Sales",
    pnlAccount: "Other Income",
    lable: "Other Income",
    pnlImpactDescription: "Scrap generated during production, when sold, should reduce inventory value and record revenue appropriately. Incorrect posting may overstate/understate sales income or inventory valuation.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAPR05",
    insight: "Actual Yield Loss v/s Standard Yield Loss",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "A higher actual yield loss compared to the standard yield loss indicates production inefficiency or wastage. This increases production cost and reduces inventory valuation, impacting gross profit. Lower actual loss than standard improves margins.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAIM01",
    insight: "Consumption Booked post Output Generation",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Purchase Of Stock-In Trade",
    pnlImpactDescription: "When material consumption is booked after output generation, it leads to timing mismatches between production and consumption. This can temporarily overstate inventory and understate COGS, distorting gross margin and inventory valuation until corrected.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAIM02",
    insight: "Expired Material Issued to production order",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Purchase Of Stock-In Trade",
    pnlImpactDescription: "The use of expired materials increases production cost or results in write‑offs, overstating COGS or scrap expense, thereby reducing profit margins.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAIM03",
    insight: "Anomalies from Physical Verification of Inventory",
    pnlAccount: "Inventory Write-off Expense",
    lable: "Exceptional Items",
    pnlImpactDescription: "Shortages result in write-offs (expense), while excess quantities may be recorded as gains, directly impacting profit or loss for the period.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAIM04",
    insight: "Anomalies to Event Log Analysis",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "If event log discrepancies result in incorrect consumption or production entries, it can cause inaccurate expense recognition (COGS) or unrecorded inventory losses/gains, impacting profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAIM05",
    insight: "Non Routine Movement",
    pnlAccount: "Inventory Adjustment Account",
    lable: "Exceptional Items",
    pnlImpactDescription: "When non‑routine inventory movements are recorded (e.g., scrapping obsolete stock or revaluation adjustments), they result in gains or losses that impact profitability through expense or income recognition.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAME01",
    insight: "Idle Inventory Ageing",
    pnlAccount: "Inventory Write-off Expense",
    lable: "Exceptional Items",
    pnlImpactDescription: "When idle or obsolete inventory is identified, the write‑down or provision expense hits the P&L, reducing net profit through increased expenses or losses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAME02",
    insight: "Changes to useful Life of Assets",
    pnlAccount: "Depreciation Expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "The key is the timing difference! Changing the useful life changes the gap between Accounting Depreciation and fixed Tax Depreciation, which dictates the movement in your P&L Deferred Tax Expense.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAME03",
    insight: "Sales Return of Expired/Short Expiry Goods",
    pnlAccount: "Other Income",
    lable: "Other Income",
    pnlImpactDescription: "Sales returns reduce sales revenue, while related COGS are reversed. If the returned goods are unsellable (expired), an inventory write‑off expense is recorded, impacting profitability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAME04",
    insight: "Anomalies to Sampling",
    pnlAccount: "Inventory Write-off Expense",
    lable: "Exceptional Items",
    pnlImpactDescription: "Sampling anomalies increase production or quality control costs. If defective items are found, related expenses (e.g., material loss, testing waste) hit the P&L as COGS or quality-related expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAME05",
    insight: "Changes to Expiry Dates",
    pnlAccount: "Inventory Write-off Expense",
    lable: "Exceptional Items",
    pnlImpactDescription: "Changes leading to write‑offs or adjustments for expired goods impact P&L via increased expense recognition for obsolete or unusable inventory.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IASA01",
    insight: "Client Set to Modifiable",
    pnlAccount: "IT Maintenance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Risk of unauthorized configuration changes increases corrective maintenance costs",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IASA02",
    insight: "Table Logging",
    pnlAccount: "IT Maintenance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Increased system logging costs impact operating expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IASA03",
    insight: "Direct Changes to SAP",
    pnlAccount: "Software Development Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Direct modifications may lead to errors requiring remediation costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IASA04",
    insight: "Key Fields Missing",
    pnlAccount: "Admin Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Missing fields can cause data inconsistencies needing manual reconciliations.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IASA05",
    insight: "TR Analysis",
    pnlAccount: "Software Development Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Tracking transport requests ensures compliance, increasing audit costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAGR01",
    insight: "Access to Critical BASIS transactions",
    pnlAccount: "Risk Management Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Weak controls may cause operational or fraud losses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAGR02",
    insight: "User modified their own access",
    pnlAccount: "Security Violation Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Self-access modifications can lead to misuse and financial loss.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAGR03",
    insight: "Access to SAP Audit Logs",
    pnlAccount: "Legal & Compliance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Regular review adds cost to internal audit and monitoring.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAGR04",
    insight: "Access to SAP_ALL/SAP_NEW",
    pnlAccount: "Risk Management Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Excessive access can lead to unauthorized transactions impacting expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAGR05",
    insight: "Client Opening Logs",
    pnlAccount: "IT Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Missing or tampered client logs may lead to security breaches and potential compliance costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIT01",
    insight: "Entry to DEVACCESS",
    pnlAccount: "IT Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Unauthorized developer access increases the risk of manipulation and potential financial loss.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIT02",
    insight: "Usage of DEVACCESS Key",
    pnlAccount: "IT Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Improper DEVACCESS usage could lead to unauthorized system changes affecting data reliability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIT03",
    insight: "Non Usage Accounts",
    pnlAccount: "Research and Development Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Wasted license costs",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIT04",
    insight: "Log Management & Mining",
    pnlAccount: "IT Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Poor log management can result in missed anomaly detection; investment in better systems may be needed.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIS01",
    insight: "Unused Super IDs",
    pnlAccount: "Deferred tax expense",
    lable: "Deferred Tax",
    pnlImpactDescription: "This changes the yearly Accounting Depreciation. Since the tax depreciation rate is typically fixed, the change directly alters the size of the temporary difference between the asset's book value and its tax base. This change in the temporary difference is reflected as a movement (increase or decrease) in the Deferred Tax Liability, which in turn becomes the Deferred Tax Expense (or Credit) on the P&L.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIS02",
    insight: "Changes to Password Parameters",
    pnlAccount: "IT Maintenance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Weak password policies may cause data breaches leading to cyber incident expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIS03",
    insight: "Change Management",
    pnlAccount: "IT Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Improper change controls lead to system inefficiencies or capital project misclassification.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIS04",
    insight: "Inactive Accounts",
    pnlAccount: "IT Maintenance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Dormant user accounts increase risk of misuse, possibly resulting in fraud-related costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIS05",
    insight: "Users having Privileged Access",
    pnlAccount: "Legal & Compliance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Inadequate restriction of privileged accounts may cause financial data manipulation risk.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/it-management.html"
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SACU01",
    insight: "Date Retention",
    pnlAccount: "IT Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Failure to manage retention timelines can lead to compliance fines or excess storage cost capitalization.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/supply-chain.html"
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SACU02",
    insight: "API Access Management",
    pnlAccount: "IT Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Uncontrolled API access risks data exposure or system breaches causing financial loss.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/supply-chain.html"
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SACU03",
    insight: "Process Owner Mapping",
    pnlAccount: "Admin Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Undefined ownership causes accountability gaps leading to process inefficiency expenses.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/supply-chain.html"
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SACU04",
    insight: "Due Diligence and Risk Rating",
    pnlAccount: "Procurement Expense",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Weak due diligence can result in unreliable vendor performance or losses from poor contracts.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/supply-chain.html"
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SACU05",
    insight: "Segmentation for Access and RCM",
    pnlAccount: "IT Control Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Improper access segmentation causes internal control weaknesses and potential data errors.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/supply-chain.html"
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SAAS01",
    insight: "Inconsistence Performance Metrics and KPIs across units",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "(Inefficiency costs",
    insighturl: "https://altex.dev/complibear/dashboards/Category/supply-chain.html"
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SAAS02",
    insight: "Process Bottlenecks",
    pnlAccount: "Cost of Goods Sold (COGS)",
    lable: "Cost Of Materials Consumed",
    pnlImpactDescription: "Downtime/Rework costs",
    insighturl: "https://altex.dev/complibear/dashboards/Category/supply-chain.html"
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SAAS03",
    insight: "Dynamic Pricing",
    pnlAccount: "Revenue From Operations",
    lable: "Revenue From Operations [Gross]",
    pnlImpactDescription: "Risk of mispricing/loss of margin",
    insighturl: "https://altex.dev/complibear/dashboards/Category/supply-chain.html"
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SAAS04",
    insight: "Environmental Monitoring",
    pnlAccount: "Sustainability Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Non-compliance with environmental standards may cause penalties or asset write-downs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/supply-chain.html"
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SAAS05",
    insight: "Confidentiality Enforcement",
    pnlAccount: "Legal & Compliance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Legal fees/fines for breaches",
    insighturl: "https://altex.dev/complibear/dashboards/Category/supply-chain.html"
  },
  {
    insightCategory: "Marketing",
    insightID: "MAEM01",
    insight: "ROI Calculator",
    pnlAccount: "Research and Development Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Evaluates marketing campaign effectiveness; over/under-performance affects expenses and revenue recognition, altering ROI metrics.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/marketing.html"
  },
  {
    insightCategory: "Marketing",
    insightID: "MAEM02",
    insight: "Compliance with Spend Budget",
    pnlAccount: "Marketing Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Ensures marketing costs stay within approved budgets; overspend increases expenses and liabilities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/marketing.html"
  },
  {
    insightCategory: "Marketing",
    insightID: "MAEM03",
    insight: "Product Recommendation",
    pnlAccount: "Marketing Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Data-driven recommendations increase sales and incur analytics costs; may result in capitalization of developed recommendation tools.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/marketing.html"
  },
  {
    insightCategory: "Marketing",
    insightID: "MAEM04",
    insight: "Churn Analytics",
    pnlAccount: "Business Development Cost",
    lable: "Other Expenses",
    pnlImpactDescription: "Identifies and reduces customer attrition; impacts future revenue recognition and provisions for doubtful debts.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/marketing.html"
  },
  {
    insightCategory: "Marketing",
    insightID: "MAEM05",
    insight: "A/B Testing Process",
    pnlAccount: "Marketing Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Experimental spend on testing ads or strategies; may increase R&D costs or deferred marketing prepayments.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/marketing.html"
  },
  {
    insightCategory: "Marketing",
    insightID: "MAOT01",
    insight: "Lead Source Validation",
    pnlAccount: "Marketing Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Validating lead quality ensures real sales conversion; prevents false revenue recognition and wasted spend.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/marketing.html"
  },
  {
    insightCategory: "Marketing",
    insightID: "MAOT02",
    insight: "Customer Data Privacy",
    pnlAccount: "Legal & Compliance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Costs arise from maintaining or breaching data compliance (e.g., GDPR); penalties or provisions affect financial statements.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/marketing.html"
  },
  {
    insightCategory: "Marketing",
    insightID: "MAOT03",
    insight: "Click Fraud Detection",
    pnlAccount: "Marketing Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Detecting ad fraud minimizes wasted ad spend; software investment may be capitalized as an IT asset.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/marketing.html"
  },
  {
    insightCategory: "Marketing",
    insightID: "MAOT04",
    insight: "CRM Segmentation",
    pnlAccount: "Marketing Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Better customer targeting increases sales; CRM system costs may be capitalized, improving efficiency over time.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/marketing.html"
  },
  {
    insightCategory: "Marketing",
    insightID: "MAOT05",
    insight: "Intellectual Property Compliance",
    pnlAccount: "Impairment Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Ensures proper use of intellectual property; violations may cause fines or asset impairment.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/marketing.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAPA01",
    insight: "Salary Output not as per Master",
    pnlAccount: "Employee Benefit Expense",
    lable: "Employee Benefit Expenses",
    pnlImpactDescription: "Variance between actual and master salaries leads to over/understatement of payroll expense and liabilities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAPA02",
    insight: "Mismatching Salary Processed, Payable and Actual",
    pnlAccount: "Employee Benefit Expense",
    lable: "Employee Benefit Expenses",
    pnlImpactDescription: "Incorrect salary processing affects expense accuracy and payroll accruals or cash balances.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAPA03",
    insight: "Ghost Employees",
    pnlAccount: "Employee Benefit Expense",
    lable: "Employee Benefit Expenses",
    pnlImpactDescription: "Payments made to non-existent employees inflate payroll expense and reduce cash assets.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAPA04",
    insight: "Unauthorized Update in Employee Master",
    pnlAccount: "Employee Benefit Expense",
    lable: "Employee Benefit Expenses",
    pnlImpactDescription: "Unauthorized changes can cause incorrect salary payments and misstated liabilities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAPA05",
    insight: "Employee Benefit Obligation Adjustment",
    pnlAccount: "Employee Benefit Expense",
    lable: "Employee Benefit Expenses",
    pnlImpactDescription: "Adjustments impact actuarial gains/losses or employee benefit obligations (e.g., gratuity, leave encashment).",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAOT01",
    insight: "Active Vendor for Employees Group",
    pnlAccount: "Admin Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Conflict of interest between employees and vendors may result in inflated expenses or fraudulent payments.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAOT02",
    insight: "Same Vendor and Employee",
    pnlAccount: "Admin Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Payments to employees acting as vendors could lead to duplicate or fraudulent expense recognition.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAOT03",
    insight: "Employee modifying own access",
    pnlAccount: "HR Expense",
    lable: "Employee Benefit Expenses",
    pnlImpactDescription: "Increases fraud risk; potential unrecorded losses if misuse of access leads to fraudulent disbursements.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAOT04",
    insight: "Expense Recurrence Transactions",
    pnlAccount: "Admin Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Repeated transactions may lead to double booking or prepaid cost buildup affecting expense recognition.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAOT05",
    insight: "SOP & Policy Violations",
    pnlAccount: "Legal & Compliance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Non-adherence to HR policies results in penalties or inefficiencies increasing operational costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HASC01",
    insight: "PO-PR-GRN Same User",
    pnlAccount: "Procurement Expense",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Segregation of duty conflict risks fraudulent purchases or false inventory valuation.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HASC02",
    insight: "Creation of GRN and Payment by Same User",
    pnlAccount: "Procurement Expense",
    lable: "Operating And Direct Expenses",
    pnlImpactDescription: "Fraud risk due to lack of control; could result in unauthorized payments and misstated liabilities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Human Resource",
    insightID: "HASC03",
    insight: "Access Control and Dynamic SOD Conflicts",
    pnlAccount: "Legal & Compliance Expense",
    lable: "Other Expenses",
    pnlImpactDescription: "Weak access control may allow manipulation of financial data or payroll processing.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html"
  },
  {
    insightCategory: "Strategy",
    insightID: "SAEX06",
    insight: "Research and Development Expenditure Analysis and Trend Outliers",
    pnlAccount: "",
    lable: "",
    pnlImpactDescription: "",
    insighturl: "https://altex.dev/complibear/dashboards/Category/strategy.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAOT01",
    insight: "Optimal Investment Opportunity",
    pnlAccount: "",
    lable: "",
    pnlImpactDescription: "",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAOT02",
    insight: "Repayment and WC management analytics",
    pnlAccount: "",
    lable: "",
    pnlImpactDescription: "",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAOT03",
    insight: "Investment Threshold Analytics",
    pnlAccount: "",
    lable: "",
    pnlImpactDescription: "",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Finance",
    insightID: "FAOT04",
    insight: "Repayment Schedule Segmentation and Planning",
    pnlAccount: "",
    lable: "",
    pnlImpactDescription: "",
    insighturl: "https://altex.dev/complibear/dashboards/Category/finance.html"
  },
  {
    insightCategory: "Taxation",
    insightID: "FAOT05",
    insight: "Tax Comparative against industry peers",
    pnlAccount: "Current Tax",
    lable: "",
    pnlImpactDescription: "",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html"
  }
];

  let currentPage = 1; // Renamed pageNumber to currentPage for clarity
  const pageSize = 8; // Number of items per page
  let filteredInsightsData = []; // To store data after category filter

  // --- DOM Elements ---
  const insightsTableBody = document.querySelector("#insightsTable tbody");
  const insightCategoryList = document.getElementById("insightCategoryList");
  const pageNumbersContainer = document.getElementById("pageNumbers"); // New container for page number links
  const nextPageButton = document.getElementById("nextPage");
  const prevPageButton = document.getElementById("prevPage");

  // Function to render the table rows based on current page and filter
  const renderTableRows = (data) => {
    insightsTableBody.innerHTML = ""; // Clear existing rows

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    if (paginatedData.length === 0 && currentPage > 1) {
      // If no data on current page after filtering, go back one page if possible
      currentPage = Math.max(1, currentPage - 1);
      renderTableRows(data); // Re-render with new currentPage
      return;
    }

    paginatedData.forEach((item) => {
      const row = insightsTableBody.insertRow();
      row.insertCell().textContent = item.insightID;
      row.insertCell().textContent = item.insightCategory;
      row.insertCell().textContent = item.insight;
      row.insertCell().textContent = item.pnlAccount;
      row.insertCell().textContent = item.pnlImpactDescription;

      const actionCell = row.insertCell();
      const viewButton = document.createElement("a");
      viewButton.href = item.insighturl || "#";
      viewButton.textContent = "Insight";
      viewButton.classList.add("view-insight-btn");
      actionCell.appendChild(viewButton);
    });
  };

  // Helper to create and append page links or ellipsis
  const appendPageLink = (text, className = "page-link") => {
    const link = document.createElement(className === "page-link" ? "a" : "span");
    link.textContent = text;
    link.classList.add(className);
    if (className === "page-link") {
      link.href = "#"; // Prevent default navigation
      link.dataset.page = text; // Store page number
      if (parseInt(text) === currentPage) {
        link.classList.add("active");
      }
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const clickedPage = parseInt(e.target.dataset.page);
        if (clickedPage && clickedPage !== currentPage) {
          currentPage = clickedPage;
          renderTableAndPagination();
        }
      });
    }
    pageNumbersContainer.appendChild(link);
  };

  // Function to render the pagination controls
  const renderPaginationControls = (totalItems) => {
    pageNumbersContainer.innerHTML = ""; // Clear existing page numbers
    const totalPages = Math.ceil(totalItems / pageSize);

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages || totalPages === 0;

    // Logic to display pagination links like the image (1 2 ... 4 5)
    // where 4 is currentPage and 5 is currentPage + 1
    const maxVisiblePages = 5; // e.g., "1 2 ... 4 5" or "1 2 3 4 5"

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small enough
      for (let i = 1; i <= totalPages; i++) {
        appendPageLink(i);
      }
    } else {
      // Logic for showing first two, ellipsis, current/next, ellipsis, last two
      const showPagesAtEnds = 2; // Always show first 'showPagesAtEnds' and last 'showPagesAtEnds'
      const showPagesAroundCurrent = 1; // Show current, current-1, current+1

      const pages = new Set(); // Use a Set to avoid duplicate page numbers

      // Add first few pages
      for (let i = 1; i <= showPagesAtEnds; i++) {
        pages.add(i);
      }

      // Add pages around the current page
      for (let i = currentPage - showPagesAroundCurrent; i <= currentPage + showPagesAroundCurrent; i++) {
        if (i > showPagesAtEnds && i < totalPages - showPagesAtEnds + 1) { // Ensure not overlapping with fixed end pages
          pages.add(i);
        }
      }

      // Add last few pages
      for (let i = totalPages - showPagesAtEnds + 1; i <= totalPages; i++) {
        pages.add(i);
      }

      // Convert Set to Array and sort
      const sortedPages = Array.from(pages).sort((a, b) => a - b);

      // Append links and add ellipsis where gaps exist
      let lastAppendedPage = 0;
      sortedPages.forEach(page => {
        if (page > lastAppendedPage + 1) {
          appendPageLink("...", "pagination-ellipsis");
        }
        appendPageLink(page);
        lastAppendedPage = page;
      });
    }
  };


  // Main rendering function that combines table and pagination
  const renderTableAndPagination = () => {
    const selectedCategoryElement = insightCategoryList.querySelector("li.active");
    const selectedCategory = selectedCategoryElement ? selectedCategoryElement.dataset.category : "All";

    filteredInsightsData =
      selectedCategory && selectedCategory !== "All"
        ? allInsightsData.filter((item) => item.lable === selectedCategory) // Note: using item.lable for filter
        : allInsightsData;

    // If current page is now out of bounds for the filtered data, reset to 1
    const totalPagesForFilteredData = Math.ceil(filteredInsightsData.length / pageSize);
    if (currentPage > totalPagesForFilteredData && totalPagesForFilteredData > 0) {
        currentPage = totalPagesForFilteredData; // Go to last page if current is too high
    } else if (totalPagesForFilteredData === 0) {
        currentPage = 1; // If no data, reset to page 1
    }

    renderTableRows(filteredInsightsData);
    renderPaginationControls(filteredInsightsData.length);
  };

  // --- Event Listeners ---

  nextPageButton.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredInsightsData.length / pageSize);
    if (currentPage < totalPages) {
      currentPage++;
      renderTableAndPagination();
    }
  });

  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTableAndPagination();
    }
  });

  insightCategoryList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      insightCategoryList.querySelectorAll("li").forEach((li) => li.classList.remove("active"));
      event.target.classList.add("active");

      currentPage = 1; // Reset to first page on category change
      renderTableAndPagination();
    }
  });

  // Initial render when the page loads
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const selectedValue = params.get("selected"); // "selected" parameter in URL

  if (selectedValue) {
    const element = document.querySelector(`[data-category="${selectedValue}"]`);
    if (element) {
      element.classList.add("active");
    } else {
      // If URL category doesn't exist, activate the first category in the list
      // Or default to 'All' if you have an 'All' option
      insightCategoryList.querySelector("li")?.classList.add("active");
    }
  } else {
    // No selected category in URL, activate the first one or 'All'
    insightCategoryList.querySelector("li")?.classList.add("active");
  }

  renderTableAndPagination();
});