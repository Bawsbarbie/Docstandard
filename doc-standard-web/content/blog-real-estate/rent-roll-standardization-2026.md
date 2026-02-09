# Rent Roll Standardization: Portfolio Income Analysis

**"Rent rolls are the financial foundation of property valuation. Inconsistent formats and missing data undermine underwriting and analysis."**

## The Real Estate Data Problem
Rent rolls report tenant information, lease terms, and rental income. They're essential for property valuation, financing, and acquisition due diligence. But formats vary wildly. Some show `Tenant_Name`, others show `Suite_Number` as identifier. Some include lease expiration, others don't. Combining rent rolls from multiple properties for portfolio analysis requires extensive reformatting.

### Specific Pain Points:
* **Field Variation:** `Tenant_Name`, `Lease_Start`, `Lease_End`, `Base_Rent`, `Square_Footage` appear in different columns or not at all across different property reports
* **Rent Type Confusion:** Base rent, CAM reimbursements, percentage rent, and other charges mixed together or separately reported inconsistently
* **Unit Identification:** Suite numbers, unit numbers, and tenant names used interchangeably as primary identifiers

## The DocStandard Protocol
We process rent rolls into standardized formats with uniform fields, separated rent components, and consistent unit identification.

### Processing Standards:
* **Field Normalization:** All rent rolls mapped to standard schema: `Property_Name`, `Unit_ID`, `Tenant_Name`, `Lease_Start_Date`, `Lease_End_Date`, `Rentable_SF`, `Base_Rent_Annual`, `Rent_Per_SF`
* **Rent Disaggregation:** All income separated: `Base_Rent`, `CAM_Reimbursement`, `Tax_Reimbursement`, `Insurance_Reimbursement`, `Percentage_Rent`, `Other_Income`
* **Occupancy Calculation:** `Occupied_SF`, `Vacant_SF`, `Occupancy_Rate`, and `Weighted_Average_Remaining_Term` calculated and reported

## ROI for Portfolio Analysis
A lender underwriting a 20-property portfolio with manual rent roll consolidation spends 40-60 hours on data normalization. Systematic processing reduces that to 4-6 hours.

### Measurable Benefits:
1. **Underwriting Speed:** Standardized data feeds directly into valuation models
2. **Portfolio Aggregation:** Cross-property comparison and analysis enabled
3. **Trend Analysis:** Consistent historical data supports income forecasting

[Internal Link to: /lease-abstract-processing-2026]
[Internal Link to: /property-management-accounting-2026]
[Internal Link to: /portfolio-analytics-2026]
