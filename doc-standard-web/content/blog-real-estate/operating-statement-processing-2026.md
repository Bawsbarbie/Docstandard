# Operating Statement Processing: NOI Calculation

**"Net Operating Income drives property value. Operating statements contain NOI components. Extraction errors create valuation mistakes."**

## The Real Estate Data Problem
Operating statements report property income and expenses. They're the basis for Net Operating Income (NOI) calculations that drive property valuation. Statements come from owners, property managers, and accountants in different formats. Line item classifications vary. Capital vs. operating expense distinctions are inconsistently applied. Normalization for valuation requires careful analysis.

### Specific Pain Points:
* **Classification Inconsistency:** Same expense called "Maintenance" on one statement and "Repairs" on another. Capital improvements sometimes expensed, sometimes capitalized
* **Period Variation:** Calendar year, fiscal year, and trailing twelve-month reports mixed together without clear period identification
* **Adjustment Requirements:** Owner-specific expenses (management fees, capital reserves) require identification and adjustment for market-based valuation

## The DocStandard Protocol
We process operating statements into standardized NOI analyses with classified line items, normalized periods, and valuation adjustments.

### Processing Standards:
* **Line Item Classification:** All expenses mapped to standard categories: `Rental_Income`, `Vacancy_Loss`, `CAM_Reimbursements`, `Property_Tax`, `Insurance`, `Utilities`, `Maintenance`, `Management_Fee`, `Capital_Reserves`
* **Period Normalization:** All statements converted to `Trailing_Twelve_Month` or `Calendar_Year` format with `Period_Start_Date` and `Period_End_Date` clearly identified
* **NOI Calculation:** `Effective_Gross_Income`, `Operating_Expenses`, and `Net_Operating_Income` calculated with `Adjustment_Details` for non-recurring items

## ROI for Valuation Accuracy
Valuation errors from misstated NOI compound through cap rate division. A $50,000 NOI error at 6% cap rate creates $830,000 value error. Clean data prevents costly mistakes.

### Measurable Benefits:
1. **Valuation Precision:** Accurate NOI feeds reliable property valuation
2. **Comparison Consistency:** Standardized classifications enable benchmarking
3. **Trend Clarity:** Normalized periods reveal true income/expense trends

[Internal Link to: /rent-roll-standardization-2026]
[Internal Link to: /property-management-accounting-2026]
[Internal Link to: /investment-analysis-automation-2026]
