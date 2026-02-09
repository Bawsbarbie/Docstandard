# Employment Agreement Field Extraction: HR-Legal Integration

**"Employment agreements define your workforce obligations. You can't manage what you haven't extracted into systems."**

## The Legal Data Problem
Companies maintain hundreds or thousands of employment agreements. Each contains unique terms. Severance amounts, notice periods, non-compete clauses, equity vesting schedules. When HR needs to answer a question ("What's John's notice period?"), they read the agreement manually. When legal needs to assess risk, they review documents one by one.

### Specific Pain Points:
* **Term Location Variation:** Severance provisions appear in Section 4 in one agreement, Section 8 in another. Equity terms scattered across exhibits
* **Numeric Format Chaos:** Salary figures written as "$100,000", "$100k", and "one hundred thousand dollars" resist systematic comparison
* **Date Calculation Complexity:** Vesting schedules reference hire dates, start dates, and cliff dates requiring calculation to determine current status

## The DocStandard Protocol
We process employment agreements into structured data with extracted terms, normalized numeric values, and calculated date fields.

### Processing Standards:
* **Field Extraction:** Key terms extracted including `Employee_Name`, `Hire_Date`, `Base_Salary`, `Notice_Period_Days`, `Severance_Weeks`, `Non_Compete_Months`, and `Equity_Vesting_Schedule`
* **Numeric Normalization:** All currency values converted to decimal format with `Currency_Code` for consistent calculations
* **Date Calculations:** `Vesting_Start_Date`, `Cliff_Date`, and `Fully_Vested_Date` calculated from agreement terms and hire date

## ROI for HR and Legal Operations
A 500-employee company with 5 year average tenure maintains 2,500 employment agreements. Systematic extraction enables workforce analytics impossible with document storage alone.

### Measurable Benefits:
1. **Instant Term Lookup:** Search employee obligations by any extracted field
2. **Risk Assessment Scale:** Identify all agreements with above-market severance or missing non-compete clauses
3. **Equity Tracking:** Calculated vesting dates for cap table management and departure planning

[Internal Link to: /hr-documentation-processing-2026]
[Internal Link to: /contract-clause-extraction-2026]
[Internal Link to: /workforce-compliance-monitoring-2026]
