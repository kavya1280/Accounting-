document.addEventListener("DOMContentLoaded", () => {
  // --- Sample Data (UPDATED from your image) ---
const allInsightsData = [
  {
    insightCategory: "Strategy",
    insightID: "SAEX01",
    insight: "Cost Driver Analysis",
    balancesheetImpact: "Short Term Borrowings",
    lable: "Short Term Borrowings",
    bsImpactDescription:
      "Effective Cost Driver Analysis can lead to immediate operational efficiencies and reduced working capital needs, potentially decreasing the need for short-term financing (e.g., overdrafts, commercial paper) to cover day-to-day operations or unexpected shortfalls. Poor analysis, conversely, could increase the need.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAEX02",
    insight: "ROI of Strategic Initiatives",
    balancesheetImpact: "Capital Work-in-Progress (CWIP)",
    lable: "Capital Work-In-Progress",
    bsImpactDescription:
      "Successful strategic initiatives may be capitalized as new assets.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAEX03",
    insight: "Risk Mitigation",
    balancesheetImpact: "Long Term Borrowings",
    lable: "Long Term Borrowings",
    bsImpactDescription:
      "Successful Risk Mitigation reduces the likelihood and impact of major strategic threats (e.g., market shifts, regulatory changes). This can improve the company's long-term financial stability and credit rating, making it easier and cheaper to secure large, long-term loans (e.g., bonds, term loans) for capital projects, expansion, or acquisitions.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAEX04",
    insight: "Risk Identification",
    balancesheetImpact: "Long Term Borrowings",
    lable: "Long Term Borrowings",
    bsImpactDescription:
      "Risk Identification is the foundational step. Identifying significant long-term risks (e.g., technological obsolescence, political instability) allows a company to plan financially. These risks might necessitate long-term borrowings to fund major counter-measures, such as R&D into new technologies or diversification into new markets",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAEX05",
    insight: "Risk Prioritization",
    balancesheetImpact: "Long Term Borrowings",
    lable: "Long Term Borrowings",
    bsImpactDescription:
      "Risk Prioritization focuses resources on the most critical risks. Addressing high-priority, high-impact risks often requires substantial, multi-year investments (e.g., building redundant infrastructure, significant M&A). These major, enduring expenditures are typically financed through long-term debt.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAFO01",
    insight: "Budget Overruns",
    balancesheetImpact: "Short Term Borrowings",
    lable: "Short Term Borrowings",
    bsImpactDescription:
      "Inaccurate forecasting leading to Budget Overruns means the company has underestimated its immediate operational funding needs. The immediate, unexpected shortfall in cash must be covered quickly, most often through flexible short-term borrowings (e.g., line of credit).",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAFO02",
    insight: "Market Share Trends",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "A declining market share may increase unsold inventory or delayed receivables.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAFO03",
    insight: "Demand Volatility Analysis",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Volatile demand affects stock levels and liquidity management.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAFO04",
    insight: "Seasonality & Trend Analysis",
    balancesheetImpact: "Deferred Revenue",
    lable: "Other Current Assets",
    bsImpactDescription:
      "Seasonal adjustments lead to timing differences in asset and liability recognition.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAFO05",
    insight: "Scenario Planning",
    balancesheetImpact: "Long-Term Provisions",
    lable: "Long Term Borrowings",
    bsImpactDescription:
      "Scenario Planning for major, distant events (e.g., economic downturn, litigation) allows a company to estimate potential future liabilities. Instead of borrowing, this planning leads to the establishment of Long-Term Provisions or reserves on the balance sheet, ensuring funds are available when needed without having to scramble for high-cost debt later.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAIG01",
    insight: "Plant Efficiency Test",
    balancesheetImpact: "Property Plant & Equipment (PPE)",
    lable: "Tangible Assets",
    bsImpactDescription:
      "May affect asset utilization and depreciation recalibration.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAIG02",
    insight: "Customer Sentiment",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Poor sentiment may slow collections or increase unsold goods.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAIG03",
    insight: "ESG Dashboard",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription:
      "Investments in ESG improvements or certifications increase asset recognition.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAQT01",
    insight: "Defect vs Return Rate",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "High defect or return rates can lead to increased inventory of returned goods or provisions for returns. Returned goods pending inspection affect inventory valuation, and provisions may be required for expected customer returns.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/quality-management.html",
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAQT02",
    insight: "Supplier Defect Rate",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Defective supplies identified after goods receipt may lead to blocked stock, inventory revaluation,  or pending GR/IR adjustments. Supplier claims can also temporarily affect payables until resolution.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/quality-management.html",
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAQT03",
    insight: "Non Compliance Incidents",
    balancesheetImpact: "Provisions",
    lable: "Short Term Provisions",
    bsImpactDescription:
      "Non-compliance with quality or regulatory standards can result in creation of provisions for penalties, quarantined/blocked stock adjustments, or disclosure of contingent liabilities.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/quality-management.html",
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAQT04",
    insight: "Payment without Quality Clearance",
    balancesheetImpact: "Short Term Borrowings",
    lable: "Short Term Borrowings",
    bsImpactDescription:
      "Making Payment without Quality Clearance means the company is paying for potentially faulty goods or services. If these must be recalled, reworked, or replaced, the sudden, unplanned expenditure on materials, labor, and logistics creates an immediate working capital strain, necessitating short-term borrowings to bridge the gap.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/quality-management.html",
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAQT05",
    insight: "Quality Rejected Items Issued to Production",
    balancesheetImpact: "Inventory (Raw Material)",
    lable: "Inventories",
    bsImpactDescription:
      "Issuing rejected materials to production leads to incorrect valuation of inventory and production WIP. The value of unusable items remains capitalized, overstating assets.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/quality-management.html",
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAOT01",
    insight: "Low Recovery against Standard Norms",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Low recovery (i.e., lower yield of finished goods from input materials) results in higher consumption of raw materials per output unit, which may cause overvaluation of WIP or under-recorded finished goods inventory.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/quality-management.html",
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAOT02",
    insight: "Customer Complaints",
    balancesheetImpact: "Provision for Warranty ",
    lable: "Short Term Provisions",
    bsImpactDescription:
      "Customer complaints may lead to product returns or compensation obligations, requiring recognition or adjustment of warranty or claim provisions.\r\nIf customers dispute invoices due to quality issues, receivables may be delayed or written down.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/quality-management.html",
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAOT03",
    insight: "Supplier Quality Audit Score",
    balancesheetImpact: "Inventory (Raw Material)",
    lable: "Inventories",
    bsImpactDescription:
      "Poor supplier audit scores may indicate higher risk of substandard materials entering production, leading to potential inventory write-downs or revaluation.\r\nPayments may be withheld or delayed for suppliers failing quality audits until compliance is verified, affecting liability recognition.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/quality-management.html",
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAOT04",
    insight: "Process Deviation Reports",
    balancesheetImpact: "Inventory (WIP)",
    lable: "Inventories",
    bsImpactDescription:
      "Deviations in process parameters may result in off-spec or defective batches, requiring revaluation, write-downs, or segregation of inventory.\r\nSignificant or repeated deviations may cause materials or products to become unusable, requiring provisions for obsolescence or impairment",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/quality-management.html",
  },
  {
    insightCategory: "Quality Management",
    insightID: "QAOT05",
    insight: "On Time Delivery Performance",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Delayed deliveries can postpone customer invoicing and cash collection, temporarily increasing receivables.\r\nLate shipments cause accumulation of finished goods awaiting dispatch, increasing inventory carrying costs.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/quality-management.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAMD01",
    insight: "GL Master Anomalies",
    balancesheetImpact: "Deferred Tax",
    lable: "Deferred Tax Liabilities [Net]",
    bsImpactDescription: "Misclassification risk of assets and liabilities",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAMD02",
    insight: "Financial Performance",
    balancesheetImpact: "Deferred Tax",
    lable: "Deferred Tax Liabilities [Net]",
    bsImpactDescription:
      "Issues in financial data analysis or setup (Master Data) mean the calculated Deferred Tax Liabilities (the tax you'll owe later) are likely wrong. The Net balance is inaccurate.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAMD03",
    insight: "Flux Analysis",
    balancesheetImpact: "Deferred Tax",
    lable: "Deferred Tax Liabilities [Net]",
    bsImpactDescription:
      "Issues in financial data analysis or setup (Master Data) mean the calculated Deferred Tax Liabilities (the tax you'll owe later) are likely wrong. The Net balance is inaccurate.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAMD04",
    insight: "Ratio Identification and Prioritization",
    balancesheetImpact: "Deferred Tax",
    lable: "Deferred Tax Liabilities [Net]",
    bsImpactDescription:
      "Issues in financial data analysis or setup (Master Data) mean the calculated Deferred Tax Liabilities (the tax you'll owe later) are likely wrong. The Net balance is inaccurate.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAEM01",
    insight: "Cost Centre Variance Analysis",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription: "High inventory(Non Moving)",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAEM02",
    insight: "Direct Expense Payment",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription: "High cash outflow(i.e Reduces Cash)",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAEM03",
    insight: "Duplicate Payment",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription: "Results in unnecessary cash outflow",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAEM04",
    insight: "Expense Policy Violation",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription: "Unnecessary/unauthorized spending",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAEM05",
    insight: "Scenario Planning",
    balancesheetImpact: "Long Term Borrowings",
    lable: "Long Term Borrowings",
    bsImpactDescription:
      "In Expense Management, Scenario Planning for major future investments (e.g., upgrading a factory, expanding globally) helps determine the optimal financing mix. If the most efficient long-term scenario involves significant debt for a large capital expenditure, it directly leads to securing Long-Term Borrowings to fund the project.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAIO01",
    insight: "Configuration Check",
    balancesheetImpact: "Deferred Tax",
    lable: "Deferred Tax Liabilities [Net]",
    bsImpactDescription:
      "inventory valuation methods(Viz,FIFO,LIFO,Weighted Avg),asset classes or depreciation methods may misstate fixed assets,impact the aging and accuracy of AR/AP.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAIO02",
    insight: "Unauthorised Postings",
    balancesheetImpact: "Deferred Tax",
    lable: "Deferred Tax Liabilities [Net]",
    bsImpactDescription:
      "Risk of fraud or error that misstate any B/S Account",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAIO03",
    insight: "High Value JVs",
    balancesheetImpact: "Deferred Tax",
    lable: "Deferred Tax Liabilities [Net]",
    bsImpactDescription:
      "Risk of fraud or error impacting any account used in the JV.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAMD01",
    insight: "Suspicious Duplicate Vendor with opposite o/p balance",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription:
      "Shows incorrect outstanding balances and cash outflow may not match.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAMD02",
    insight: "Dormant Vendor Account Used for Payment",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription:
      "Risk of fraudulent payments (loss of cash) or payments to incorrect parties",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAMD03",
    insight: "Mismatching Updates in Master",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription:
      "Incorrect vendor or customer information may lead to payments or billings being posted to the wrong account.\r\nIncorrect bank details could result in payments made to unauthorized or wrong accounts.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAMD04",
    insight: "Vendor and Customer Names are same & not disclosed",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Balances may be misstated if receivables and payables between the same party are not reconciled or offset properly.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAMD05",
    insight: "One Time Vendor Anomalies",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription:
      "Unauthorized or erroneous payments reduce cash balance without valid support and Payments made to unverified one-time vendors may not correspond to legitimate liabilities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPR01",
    insight: "Invalid PO Delivery Address",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Goods delivered to an incorrect or unrecorded location may not be captured in inventory or asset registers.\r\nPayments could be processed for undelivered or misdirected items.\r\nLiability may be recognized without actual receipt of goods or services.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPR02",
    insight: "Single Source Vendor",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Delays or shortages from a single vendor may affect production and inventory levels.\r\nHeavy dependence on one supplier can impact payment terms and cash flow stability",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPR03",
    insight: "Procurement of Contracted Material at Higher Price",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription: "Higher valuation of Inventory",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPR04",
    insight: "Invoice Date Prior to PO Date",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Liability may be recorded before proper authorization or supporting PO documentation.\r\nPayments could be made for unapproved or premature purchases.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPR05",
    insight: "Split PR/PO",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Multiple smaller invoices or POs may obscure total vendor exposure.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPA01",
    insight: "Home Account Changed and Rerouted",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription:
      "Payments could be routed to unauthorized or fraudulent accounts.\r\nVendor balances may not match actual payments if funds are misdirected.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPA02",
    insight: "Duplicate Vendor Invoices",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription: "Leads to double payment (cash outflow)",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPA03",
    insight: "Payment not in name of Vendor or alternate payee",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription: "Risk of Misstatement and misappropriation",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPA04",
    insight: "Delay in payment to MSME Vendor",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Overdue MSME balances may not reflect accrued interest or disclosure requirements",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAPA05",
    insight: "Payment against blocked Invoice/Vendor",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Payments may be made against invalid or disputed invoices, distorting liability balances.\r\nPayments to blocked vendors could result in unrecoverable funds.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAOT01",
    insight: "Some Expenses for PO and Non PO transaction",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Non-PO transactions may not be properly matched to valid POs, leading to reconciliation issues.\r\nPayments may be made without adequate documentation or approval.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAOT02",
    insight: "Inter Plant Variation in Material Price",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Identical materials valued differently across plants, affecting inventory valuation and comparability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAOT03",
    insight: "Excessive Bank Charges",
    balancesheetImpact: "Cash/Bank",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription:
      "Higher-than-expected deductions reduce the cash balance",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAOT04",
    insight: "Deviation in liability compares to base rate and quantity",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Incorrect liability recognition due to deviation from contractual base rate.\r\nMaterial receipts valued incorrectly if based on wrong rate or quantity.\r\n",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Procure to Pay",
    insightID: "PAOT05",
    insight: "IV Quantity exceeds GR Quantity",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription: "Overstates AP and possibly inventory",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2p.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAMD01",
    insight: "Customer Credit Limit Check",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Failure to check limits increases the risk of bad debt, requiring a higher B/S provision",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAMD02",
    insight: "Duplicate Customers",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription: "Risk of misstated AR balances",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAMD03",
    insight: "Customer Recon Account not defined",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "The Customer Reconciliation Account is the main control account for all customer debt. If it's missing, the system can't properly summarize or track all individual customer balances, making the total Trade Receivables (money owed by customers) inaccurate on the Balance Sheet.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAMD04",
    insight: "Key Fields Missing",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Missing recon or customer account data leads to mispostings or failure to record customer balances.Missing payment terms or contact details impact AR follow-ups and bad debt provisioning.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAMD05",
    insight: "Mismatching Updates in Master",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Wrong customer account or reconciliation account mapping may lead to AR not matching GL balances.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OASA01",
    insight: "Sales Return quantity greater than Sales Quantity",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Indicates invalid returns, causing a loss in revenue and inflating inventory.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OASA02",
    insight: "Sales Return price greater than Sales Price",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Over-crediting customers results in incorrect AR balances or uncollectible receivables.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OASA03",
    insight: "Sales Return of Expired/Short Expiry Material",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Expired or short-expiry goods may be unsellable, leading to inventory write-downs or provisions.\r\nCredit notes or return adjustments reduce receivables; delays in recording can cause temporary AR overstatement.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OASA04",
    insight: "Delivery in excess of Sales Order Tolerance Limit",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Customers may dispute excess deliveries, leading to delayed payments or future credit notes.\r\nExcess goods delivered reduce stock more than contractually committed quantities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OASA05",
    insight: "Excess Delivery to Customer",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Excess goods issued reduce inventory; if billed, increases receivables; if unbilled, may create delivery-based liability.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAIN01",
    insight: "Anomalies to Credit Notes",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Incorrect or missing credit notes may overstate or understate customer balances.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAIN02",
    insight: "Sale Price of Same Material with 2 prices in Same Invoice",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Customer balance may be wrong; potential provision needed for disputes.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAIN03",
    insight: "Sale Order Price set manual",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Manual price changes may cause wrong billing, leading to later adjustments.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAIN04",
    insight: "Sale of product at Free of Cost",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Goods issued without billing reduce inventory without receivable generation.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAOT01",
    insight: "Change in Delivery Address",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Incorrect delivery location may lead to wrong customer billing, unbilled deliveries, or disputes, impacting receivables and inventory valuation.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAOT02",
    insight: "Business Partner Credit Check Missing",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Absence of credit checks may result in sales to high-risk customers, increasing the risk of bad debts and overstated receivables.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAOT03",
    insight: "Over Stocked Material",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Excess stock leads to higher carrying amounts in inventory which may not reflect realizable value, increasing the risk of overstatement",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAOT04",
    insight: "TAT - Sales Order to Invoice to Dispatch",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Longer turnaround time (TAT) between order, invoicing, and dispatch delays recognition of revenue and may result in higher pending receivables or unbilled revenue.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Order to Cash",
    insightID: "OAOT05",
    insight: "Sale of Expired Stocks",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Selling expired stock indicates poor inventory control and may require inventory write-downs or adjustments to reduce overstated asset values.",
        insighturl: "https://altex.dev/complibear/dashboards/Category/o2c.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAAC01",
    insight: "Customer to Customer/Vendor Transfers",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Incorrect transfers can cause misclassification between Accounts Receivable and Accounts Payable, leading to inaccurate representation of current assets and liabilities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAAC02",
    insight: "Prior Period Invoice Processing",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Invoices related to prior periods recorded in the current period can result in incorrect opening balances or misstatement of accrued liabilities/receivables.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAAC03",
    insight: "Vendor to Vendor/Customer Transfers",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Incorrect transfers between vendors or between vendor and customer accounts can lead to wrong balances in accounts payable, accounts receivable, or advances, affecting the accuracy of the balance sheet.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAAC04",
    insight: "Payment Beyond 60/180 Days since Due Date",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Delayed payments lead to prolonged outstanding payables on the balance sheet, which may inflate current liabilities and distort liquidity ratios.\r\nHolding cash longer may temporarily overstate cash balances compared to actual operational liabilities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAAC05",
    insight: "Repeated Vendor Invoice in the Same Fiscal Year",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Duplicate vendor invoices recorded in the same fiscal year inflate the accounts payable balance, leading to an overstatement of liabilities.\r\nOverstated expenses reduce net income, thereby reducing retained earnings in the balance sheet.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RATA01",
    insight: "GST having same Document Reference number",
    balancesheetImpact: "GST Payable",
    lable: "Other Current Liabilities",
    bsImpactDescription:
      "Duplicate document reference numbers may lead to double posting of GST entries — either overstatement of GST payable (liability) or GST input credit (asset).\r\nInvoices with the same reference may be posted multiple times, leading to incorrect vendor or customer balances.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RATA02",
    insight: "GST Duplicate Invoices",
    balancesheetImpact: "GST Payable",
    lable: "Other Current Liabilities",
    bsImpactDescription:
      "Duplicate GST invoices lead to multiple entries for the same transaction, overstating GST payable (if sales) or GST input credit (if purchases).\r\nDuplicate tax invoices may also cause duplication in AR or AP balances, leading to errors in working capital reporting.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RATA03",
    insight: "GST Interest Loss due to non payment (180 days)",
    balancesheetImpact: "GST Payable",
    lable: "Other Current Liabilities",
    bsImpactDescription:
      "Input Tax Credit availed earlier must be reversed, increasing GST payable or reducing GST receivable (asset).\r\nInterest due on delayed GST payment creates an additional accrued liability until settled.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RATA04",
    insight: "GST Interest Loss due to non payment (60 days)",
    balancesheetImpact: "GST Payable",
    lable: "Other Current Liabilities",
    bsImpactDescription:
      "Interest accrued on unpaid GST increases current liabilities until the payment is made.\r\nOnce the interest is paid, cash or bank balance decreases, reflecting the outflow of funds.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RATA05",
    insight: "Tax Number Validation",
    balancesheetImpact: "GST Payable",
    lable: "Other Current Liabilities",
    bsImpactDescription:
      "Incorrect or invalid tax number may lead to wrong GST claims or reporting errors, affecting GST receivable or payable balances.\r\nInvalid tax numbers can cause misclassification of vendor or customer tax reporting, impacting reconciliation with statutory filings.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAOT01",
    insight: "Country/Bank Validation",
    balancesheetImpact: "Bank Account",
    lable: "Cash And Cash Equivalents",
    bsImpactDescription:
      "Incorrect or unvalidated bank details may lead to errors in cash/bank balances, duplicate accounts, or misdirected payments\r\nWrong country or bank setup may result in payments/receipts being posted to incorrect entities or jurisdictions.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAOT02",
    insight: "Unauthorised Posting",
    balancesheetImpact: "Deferred Tax",
    lable: "Deferred Tax Liabilities [Net]",
    bsImpactDescription:
      "Unauthorized journal entries or postings may alter asset or liability balances without valid support, leading to incorrect reporting.\r\nIf unauthorized entries affect prior period adjustments or reserves, equity balances may be misstated.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Record to Report",
    insightID: "RAOT03",
    insight: "High Value JVs",
    balancesheetImpact: "Deferred Tax",
    lable: "Deferred Tax Liabilities [Net]",
    bsImpactDescription:
      "High-value JVs may impact key asset/liability balances if posted incorrectly or without proper authorization, leading to financial misstatements.\r\nIf JVs are recorded to correct or adjust prior period balances, they may alter retained earnings without proper disclosure.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/r2r.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAPR01",
    insight: "Multiple Shelf Life for Some Material/Batch",
    balancesheetImpact: "Inventory (Raw Material)",
    lable: "Inventories",
    bsImpactDescription:
      "Having multiple shelf lives for the same batch may result in incorrect valuation or recognition of obsolete inventory. Expired materials could still appear as active, inflating asset values.Inconsistent shelf life treatment may lead to non-compliance with accounting standards (e.g., IAS 2 / Ind AS 2) related to inventory valuation and obsolescence.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAPR02",
    insight: "Deviation in Standard v/s Actual Consumption",
    balancesheetImpact: "Inventory (Raw Material)",
    lable: "Inventories",
    bsImpactDescription:
      "Incorrect consumption data affects closing inventory valuation. Overstated consumption reduces inventory value, while understated consumption inflates it\r\nInconsistent standard costing and actual consumption variances can cause misleading disclosures on cost estimation and production efficiency.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAPR03",
    insight: "Abnormal movement vs production",
    balancesheetImpact: "Inventory (WIP)",
    lable: "Inventories",
    bsImpactDescription:
      "Abnormal material usage or loss affects closing inventory valuation — unaccounted movement may reduce material balances or inflate WIP/FG quantities inaccurately.\r\nAbnormal material movement distorts cost records and misrepresents operational efficiency in disclosures",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAPR04",
    insight: "Scrap Sales",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Scrap generated during production, when sold, should reduce inventory value and record revenue appropriately. Incorrect posting may overstate/understate sales income or inventory valuation.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAPR05",
    insight: "Actual Yield Loss v/s Standard Yield Loss",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "A higher actual yield loss compared to the standard yield loss indicates production inefficiency or wastage. This increases production cost and reduces inventory valuation, impacting gross profit. Lower actual loss than standard improves margins.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAIM01",
    insight: "Consumption Booked post Output Generation",
    balancesheetImpact: "Inventory (WIP)",
    lable: "Inventories",
    bsImpactDescription:
      "When material consumption is booked after output generation, it leads to timing mismatches between production and consumption. This can temporarily overstate inventory and understate COGS, distorting gross margin and inventory valuation until corrected.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAIM02",
    insight: "Expired Material Issued to production order",
    balancesheetImpact: "Inventory (WIP)",
    lable: "Inventories",
    bsImpactDescription:
      "When expired materials are issued, the inventory balance is reduced incorrectly (since the material has no realizable value), leading to potential overstatement of WIP or finished goods.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAIM03",
    insight: "Anomalies from Physical Verification of Inventory",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Physical count discrepancies (shortage or excess) cause overstatement or understatement of inventory on the balance sheet. Adjustments align book inventory with physical counts.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAIM04",
    insight: "Anomalies to Event Log Analysis",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Event log anomalies may indicate incorrect or untimely inventory postings (e.g., duplicate movements, missing goods receipt). This leads to temporary misstatement of inventory values or GR/IR clearing balances on the balance sheet",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAIM05",
    insight: "Non Routine Movement",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Non-routine movements (e.g., scrap adjustments, reclassification, manual inventory transfers) can lead to incorrect valuation or misstatement of inventory balances, affecting total assets on the balance sheet.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAME01",
    insight: "Idle Inventory Ageing",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Idle or slow-moving inventory increases the risk of obsolescence and may require provisioning or write-downs, impacting inventory valuation and asset representation on the balance sheet.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAME02",
    insight: "Changes to useful Life of Assets",
    balancesheetImpact: "Property Plant & Equipment (PPE)",
    lable: "Tangible Assets",
    bsImpactDescription:
      "Revising the useful life of assets changes the carrying value of PPE and the accumulated depreciation balance on the balance sheet. A longer useful life decreases annual depreciation and increases asset carrying amount; a shorter life increases accumulated depreciation.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAME03",
    insight: "Sales Return of Expired/Short Expiry Goods",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Returned goods (expired or short expiry) increase inventory temporarily if restocked or are written off. Accounts Receivable decreases as the sales return is recognized. Provisions may be adjusted if previously estimated.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAME04",
    insight: "Anomalies to Sampling",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "If sampling discrepancies lead to adjustments in stock quantity or quality, inventory valuation on the balance sheet is affected. Any abnormal or unusable samples may lead to provisions or write-downs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "Plan to Inventory",
    insightID: "PAME05",
    insight: "Changes to Expiry Dates",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "If expiry dates are modified, it may impact the valuation of stock. Incorrect extensions may overstate inventory value, while accurate adjustments can prevent overstatement of obsolete stock.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/p2i.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IASA01",
    insight: "Client Set to Modifiable",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription:
      "Potential impairment due to unapproved configuration changes affecting system stability.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IASA02",
    insight: "Table Logging",
    balancesheetImpact: "IT Infrastructure Asset",
    lable: "Tangible Assets",
    bsImpactDescription:
      "Additional storage capacity required for logs increases asset utilization.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IASA03",
    insight: "Direct Changes to SAP",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription:
      "May result in unrecorded system modifications impacting valuation.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IASA04",
    insight: "Key Fields Missing",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Data gaps can cause misstated balances in customer or stock accounts.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IASA05",
    insight: "TR Analysis",
    balancesheetImpact: "IT Work-in-Progress",
    lable: "Capital Work-In-Progress",
    bsImpactDescription:
      "Identified unauthorized transports may need reversal, affecting software asset balances.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAGR01",
    insight: "Access to Critical BASIS transactions",
    balancesheetImpact: "Provisions for Loss",
    lable: "Long Term Provisions",
    bsImpactDescription:
      "Potential financial exposure from control failures.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAGR02",
    insight: "User modified their own access",
    balancesheetImpact: "Provisions",
    lable: "Long Term Provisions",
    bsImpactDescription:
      "Fraud-related recoveries or write-offs may impact asset balances.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAGR03",
    insight: "Access to SAP Audit Logs",
    balancesheetImpact: "IT Infrastructure Asset",
    lable: "Tangible Assets",
    bsImpactDescription:
      "Secure log retention may require additional storage assets.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAGR04",
    insight: "Access to SAP_ALL/SAP_NEW",
    balancesheetImpact: "Provisions",
    lable: "Long Term Provisions",
    bsImpactDescription:
      "Risk exposure may require provisioning for potential misuse.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAGR05",
    insight: "Client Opening Logs",
    balancesheetImpact: "Non Current Assets",
    lable: "Other Non-Current Assets",
    bsImpactDescription:
      "Missing or tampered client logs may lead to security breaches and potential compliance costs.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIT01",
    insight: "Entry to DEVACCESS",
    balancesheetImpact: "Non Current Assets",
    lable: "Other Non-Current Assets",
    bsImpactDescription:
      "Unauthorized developer access increases the risk of manipulation and potential financial loss.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIT02",
    insight: "Usage of DEVACCESS Key",
    balancesheetImpact: "Non Current Assets",
    lable: "Other Non-Current Assets",
    bsImpactDescription:
      "Improper DEVACCESS usage could lead to unauthorized system changes affecting data reliability.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIT03",
    insight: "Non Usage Accounts",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription: "Wasted investment in software licenses",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIT04",
    insight: "Log Management & Mining",
    balancesheetImpact: "IT Infrastructure Asset",
    lable: "Tangible Assets",
    bsImpactDescription:
      "Poor log management can result in missed anomaly detection; investment in better systems may be needed.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIS01",
    insight: "Unused Super IDs",
    balancesheetImpact: "Non Current Assets",
    lable: "Tangible Assets",
    bsImpactDescription:
      "Highly powerful, Unused Super IDs (system accounts) are a security risk. If compromised, an attacker could improperly alter, dispose of, or write off Tangible Assets (equipment, servers) in the system, leading to a misstatement of your assets.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIS02",
    insight: "Changes to Password Parameters",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription:
      "Weak password policies may cause data breaches leading to cyber incident expenses.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIS03",
    insight: "Change Management",
    balancesheetImpact: "IT Infrastructure Asset",
    lable: "Tangible Assets",
    bsImpactDescription:
      "Improper change controls lead to system inefficiencies or capital project misclassification.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIS04",
    insight: "Inactive Accounts",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription:
      "Dormant user accounts increase risk of misuse, possibly resulting in fraud-related costs.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "IT Management",
    insightID: "IAIS05",
    insight: "Users having Privileged Access",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription:
      "Inadequate restriction of privileged accounts may cause financial data manipulation risk.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/it-management.html",
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SACU01",
    insight: "Date Retention",
    balancesheetImpact: "Data Storage Asset",
    lable: "Tangible Assets",
    bsImpactDescription:
      "Failure to manage retention timelines can lead to compliance fines or excess storage cost capitalization.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/supply-chain.html",
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SACU02",
    insight: "API Access Management",
    balancesheetImpact: "Provisions for Loss",
    lable: "Long Term Provisions",
    bsImpactDescription:
      "Uncontrolled API access risks data exposure or system breaches causing financial loss.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/supply-chain.html",
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SACU03",
    insight: "Process Owner Mapping",
    balancesheetImpact: "Equity Share Capital",
    lable: "Equity Share Capital",
    bsImpactDescription:
      "Undefined ownership causes accountability gaps leading to process inefficiency expenses.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/supply-chain.html",
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SACU04",
    insight: "Due Diligence and Risk Rating",
    balancesheetImpact: "Vendor Advances",
    lable: "Other Current Assets",
    bsImpactDescription:
      "Weak due diligence can result in unreliable vendor performance or losses from poor contracts.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/supply-chain.html",
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SACU05",
    insight: "Segmentation for Access and RCM",
    balancesheetImpact: "Equity Share Capital",
    lable: "Equity Share Capital",
    bsImpactDescription:
      "Improper access segmentation causes internal control weaknesses and potential data errors.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/supply-chain.html",
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SAAS01",
    insight: "Inconsistence Performance Metrics and KPIs across units",
    balancesheetImpact: "Equity Share Capital",
    lable: "Equity Share Capital",
    bsImpactDescription:
      "Inconsistent metrics and financial reporting lead to loss of investor confidence. While it doesn't directly change the number of shares, it reduces the market value and makes issuing new shares (increasing Equity Share Capital) extremely difficult and costly.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/supply-chain.html",
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SAAS02",
    insight: "Process Bottlenecks",
    balancesheetImpact: "Inventory (Finished Goods)",
    lable: "Inventories",
    bsImpactDescription:
      "Bottlenecks lead to excessive stock-ups before the choke point or obsolescence due to slow movement. This forces the company to hold either too much or stagnant inventory. In either case, the risk of impairment (write-down) increases, potentially reducing the total value of Finished Goods Inventory.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/supply-chain.html",
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SAAS03",
    insight: "Dynamic Pricing",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "This can be good for revenue, but it creates administrative complexity and potential customer disputes (e.g., if a customer sees a lower price later). This complexity can lead to slower collections and may increase the Allowance for Doubtful Accounts, thus reducing the net Accounts Receivable balance.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/supply-chain.html",
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SAAS04",
    insight: "Environmental Monitoring",
    balancesheetImpact: "Provision for Environmental Compliance",
    lable: "Short Term Provisions",
    bsImpactDescription:
      "Non-compliance with environmental standards may cause penalties or asset write-downs.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/supply-chain.html",
  },
  {
    insightCategory: "Supply Chain",
    insightID: "SAAS05",
    insight: "Confidentiality Enforcement",
    balancesheetImpact: "Contingent Liability",
    lable: "Contingent Liabilities",
    bsImpactDescription:
      "Weak confidentiality enforcement, often related to data security or IP, exposes the company to a higher risk of lawsuits or regulatory fines (e.g., for data breaches). This high risk requires the company to recognize a potential Contingent Liability on the Balance Sheet or disclose it in the financial notes.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/supply-chain.html",
  },
  {
    insightCategory: "Marketing",
    insightID: "MAEM01",
    insight: "ROI Calculator",
    balancesheetImpact: "Prepaid  Expense",
    lable: "Other Current Assets",
    bsImpactDescription:
      "Evaluates marketing campaign effectiveness; over/under-performance affects expenses and revenue recognition, altering ROI metrics.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/marketing.html",
  },
  {
    insightCategory: "Marketing",
    insightID: "MAEM02",
    insight: "Compliance with Spend Budget",
    balancesheetImpact: "Accrued Liabilities",
    lable: "Other Current Liabilities",
    bsImpactDescription:
      "Ensures marketing costs stay within approved budgets; overspend increases expenses and liabilities.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/marketing.html",
  },
  {
    insightCategory: "Marketing",
    insightID: "MAEM03",
    insight: "Product Recommendation",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription:
      "Data-driven recommendations increase sales and incur analytics costs; may result in capitalization of developed recommendation tools.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/marketing.html",
  },
  {
    insightCategory: "Marketing",
    insightID: "MAEM04",
    insight: "Churn Analytics",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Identifies and reduces customer attrition; impacts future revenue recognition and provisions for doubtful debts.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/marketing.html",
  },
  {
    insightCategory: "Marketing",
    insightID: "MAEM05",
    insight: "A/B Testing Process",
    balancesheetImpact: "Prepaid  Expense",
    lable: "Other Current Assets",
    bsImpactDescription:
      "Experimental spend on testing ads or strategies; may increase R&D costs or deferred marketing prepayments.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/marketing.html",
  },
  {
    insightCategory: "Marketing",
    insightID: "MAOT01",
    insight: "Lead Source Validation",
    balancesheetImpact: "Accounts Receivable",
    lable: "Trade Receivables",
    bsImpactDescription:
      "Validating lead quality ensures real sales conversion; prevents false revenue recognition and wasted spend.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/marketing.html",
  },
  {
    insightCategory: "Marketing",
    insightID: "MAOT02",
    insight: "Customer Data Privacy",
    balancesheetImpact: "Provision for Legal Contingencies",
    lable: "Short Term Provisions",
    bsImpactDescription:
      "Costs arise from maintaining or breaching data compliance (e.g., GDPR); penalties or provisions affect financial statements.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/marketing.html",
  },
  {
    insightCategory: "Marketing",
    insightID: "MAOT03",
    insight: "Click Fraud Detection",
    balancesheetImpact: "Prepaid  Expense",
    lable: "Other Current Assets",
    bsImpactDescription:
      "Detecting ad fraud minimizes wasted ad spend; software investment may be capitalized as an IT asset.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/marketing.html",
  },
  {
    insightCategory: "Marketing",
    insightID: "MAOT04",
    insight: "CRM Segmentation",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription:
      "Better customer targeting increases sales; CRM system costs may be capitalized, improving efficiency over time.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/marketing.html",
  },
  {
    insightCategory: "Marketing",
    insightID: "MAOT05",
    insight: "Intellectual Property Compliance",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription:
      "Ensures proper use of intellectual property; violations may cause fines or asset impairment.",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/marketing.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAPA01",
    insight: "Salary Output not as per Master",
    balancesheetImpact: "Salary Payable",
    lable: "Other Current Liabilities",
    bsImpactDescription:
      "Variance between actual and master salaries leads to over/understatement of payroll expense and liabilities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAPA02",
    insight: "Mismatching Salary Processed, Payable and Actual",
    balancesheetImpact: "Salary Payable",
    lable: "Other Current Liabilities",
    bsImpactDescription:
      "Incorrect salary processing affects expense accuracy and payroll accruals or cash balances.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAPA03",
    insight: "Ghost Employees",
    balancesheetImpact: "Salary Payable",
    lable: "Other Current Liabilities",
    bsImpactDescription:
      "Payments made to non-existent employees inflate payroll expense and reduce cash assets.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAPA04",
    insight: "Unauthorized Update in Employee Master",
    balancesheetImpact: "Salary Payable",
    lable: "Other Current Liabilities",
    bsImpactDescription:
      "Unauthorized changes can cause incorrect salary payments and misstated liabilities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAPA05",
    insight: "Employee Benefit Obligation Adjustment",
    balancesheetImpact: "Provision for Employee Benefits",
    lable: "Short Term Provisions",
    bsImpactDescription:
      "Adjustments impact actuarial gains/losses or employee benefit obligations (e.g., gratuity, leave encashment).",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAOT01",
    insight: "Active Vendor for Employees Group",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Conflict of interest between employees and vendors may result in inflated expenses or fraudulent payments.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAOT02",
    insight: "Same Vendor and Employee",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Payments to employees acting as vendors could lead to duplicate or fraudulent expense recognition.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAOT03",
    insight: "Employee modifying own access",
    balancesheetImpact: "Intangible Assets",
    lable: "Intangible Assets",
    bsImpactDescription:
      "Increases fraud risk; potential unrecorded losses if misuse of access leads to fraudulent disbursements.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAOT04",
    insight: "Expense Recurrence Transactions",
    balancesheetImpact: "Prepaid  Expense",
    lable: "Other Current Assets",
    bsImpactDescription:
      "Repeated transactions may lead to double booking or prepaid cost buildup affecting expense recognition.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HAOT05",
    insight: "SOP & Policy Violations",
    balancesheetImpact: "Provision for Fines",
    lable: "Short Term Provisions",
    bsImpactDescription:
      "Non-adherence to HR policies results in penalties or inefficiencies increasing operational costs.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HASC01",
    insight: "PO-PR-GRN Same User",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Segregation of duty conflict risks fraudulent purchases or false inventory valuation.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HASC02",
    insight: "Creation of GRN and Payment by Same User",
    balancesheetImpact: "Accounts Payable",
    lable: "Trade Payables",
    bsImpactDescription:
      "Fraud risk due to lack of control; could result in unauthorized payments and misstated liabilities.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Human Resource",
    insightID: "HASC03",
    insight: "Access Control and Dynamic SOD Conflicts",
    balancesheetImpact: "Non Current Assets",
    lable: "Other Non-Current Assets",
    bsImpactDescription:
      "Weak access control may allow manipulation of financial data or payroll processing.",
    insighturl: "https://altex.dev/complibear/dashboards/Category/hr.html",
  },
  {
    insightCategory: "Strategy",
    insightID: "SAEX06",
    insight:
      "Research and Development Expenditure Analysis and Trend Outliers",
    balancesheetImpact: 1,
    lable: "Intangible Assets Under Development",
    bsImpactDescription: "",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/strategy.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAOT01",
    insight: "Optimal Investment Opportunity",
    balancesheetImpact: 2,
    lable: "Non-Current Investments",
    bsImpactDescription: "",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAOT02",
    insight: "Repayment and WC management analytics",
    balancesheetImpact: 3,
    lable: "Long Term Loans And Advances",
    bsImpactDescription: "",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAOT03",
    insight: "Investment Threshold Analytics",
    balancesheetImpact: 4,
    lable: "Current Investments",
    bsImpactDescription: "",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Finance",
    insightID: "FAOT04",
    insight: "Repayment Schedule Segmentation and Planning",
    balancesheetImpact: 5,
    lable: "Short Term Loans And Advances",
    bsImpactDescription: "",
    insighturl:
      "https://altex.dev/complibear/dashboards/Category/finance.html",
  },
  {
    insightCategory: "Taxation",
    insightID: "FAOT05",
    insight: "Tax Comparative against industry peers",
    balancesheetImpact: 6,
    lable: "",
    bsImpactDescription: "",
    insighturl: "https://ajalabs.ai/complibear/taxation",
  },
];
  let pageNumber=1;
  let pageSize=8;
  let totalItems=allInsightsData.length;
  let totalPages=Math.ceil(totalItems/pageSize);

  const nextPageButton=document.getElementById("nextPage");
  const prevPageButton=document.getElementById("prevPage");

  nextPageButton.addEventListener("click",()=>{
    if(pageNumber<totalPages){
        pageNumber++;
        renderTable(allInsightsData);
    }
  });

  prevPageButton.addEventListener("click",()=>{
    if(pageNumber>1){
        pageNumber--;
        renderTable(allInsightsData);
    }
  });


  // const kpiTotals = {
  //     // totalEquity: "150Cr", // Example value
  //     // totalLiabilities: "237Cr",
  //     // netProfit: "+12.5%"
  // };

  // --- DOM Elements ---
  const insightsTableBody = document.querySelector("#insightsTable tbody");
  const insightCategoryList = document.getElementById("insightCategoryList");

  const totalEquity = document.getElementById("totalEquity");
  const totalLiabilities = document.getElementById("totalLiabilities");
  const netProfit = document.getElementById("netProfit");
  const totalAssets = document.getElementById("totalAssets");
  const totalInsights = document.getElementById("totalInsights");
  const totalImpact = document.getElementById("totalImpact");

  // --- Functions ---

  // Function to render the table
  const renderTable = (data, filterCategory = null) => {
    insightsTableBody.innerHTML = ""; // Clear existing rows
    const filteredData =
      filterCategory && filterCategory !== "All"
        ? data.filter((item) => item.lable === filterCategory) // Filter by insightCategory
        : data;
    totalItems=filteredData.length;
    totalPages=Math.ceil(totalItems/pageSize);
    const startIndex=(pageNumber-1)*pageSize;
    const endIndex=startIndex+pageSize;
    const paginatedData=filteredData.slice(startIndex,endIndex);
    paginatedData.forEach((item) => {
      const row = insightsTableBody.insertRow();
      row.insertCell().textContent = item.insightID;
      row.insertCell().textContent = item.insightCategory;
      row.insertCell().textContent = item.insight;
      row.insertCell().textContent = item.balancesheetImpact;
      row.insertCell().textContent = item.bsImpactDescription;

      // Add the "Action" cell with the button
      const actionCell = row.insertCell();
      const viewButton = document.createElement("a");
      viewButton.href = item.insighturl || "#"; // Use the URL from data, fallback to '#'
      viewButton.textContent = "Insight";
      viewButton.classList.add("view-insight-btn");
      actionCell.appendChild(viewButton);
    });
    if (pageNumber>1){
        prevPageButton.disabled=false;
    }else{
        prevPageButton.disabled=true;
    }

    if (pageNumber<totalPages){
        nextPageButton.disabled=false;
    }else{
        nextPageButton.disabled=true;
    }

  };


  // Update KPI cards
  // const updateKpiCards = () => {
  //     totalEquity.textContent = kpiTotals.totalEquity;
  //     totalLiabilities.textContent = kpiTotals.totalLiabilities;
  //     totalAssets.textContent = kpiTotals.totalAssets;
  //     totalInsights.textContent = kpiTotals.totalInsights;
  //     totalImpact.textContent = kpiTotals.totalImpact;
  //     netProfit.textContent = kpiTotals.netProfit;
  // };

  // Update date display

  // --- Event Listeners ---

  // Insight category filter
  insightCategoryList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      // Remove active class from all
      insightCategoryList
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("active"));
      // Add active class to clicked item
      event.target.classList.add("active");

      const selectedCategory = event.target.dataset.category;
      pageNumber=1;
      renderTable(allInsightsData, selectedCategory);
    }
  });

  // // Simple search filter for the table
  // employeeSearchInput.addEventListener('input', (event) => {
  //     const searchTerm = event.target.value.toLowerCase();
  //     const filteredData = allInsightsData.filter(item =>
  //         item.insightCategory.toLowerCase().includes(searchTerm) ||
  //         item.insightID.toLowerCase().includes(searchTerm) ||
  //         item.insight.toLowerCase().includes(searchTerm) ||
  //         item.balancesheetImpact.toLowerCase().includes(searchTerm) || // Changed from balanceSheetImpact
  //         item.bsImpactDescription.toLowerCase().includes(searchTerm)
  //     );
  //     renderTable(filteredData);
  // });

  const queryString = window.location.search;

  // Create a URLSearchParams object
  const params = new URLSearchParams(queryString);

  // Get the value of the 'selected' parameter
  const selectedValue = params.get("selected");
  const element = document.querySelector(`[data-category="${selectedValue}"]`);
  element.classList.add("active");
  renderTable(allInsightsData, selectedValue); // Render table with all data initially
});
