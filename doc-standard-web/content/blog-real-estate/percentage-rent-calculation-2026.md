# Percentage Rent Calculation: Retail Lease Processing

**"Percentage rent ties landlord revenue to tenant sales. Accurate calculation requires organized sales reports and lease term application."**

## The Real Estate Data Problem
Retail leases often include percentage rent provisions. Tenants pay base rent plus percentage of gross sales above a breakpoint. Calculating percentage rent requires tenant sales reports, breakpoint verification, and exclusion analysis. Sales reports arrive monthly in varying formats. Lease terms define exclusions differently.

### Specific Pain Points:
* **Sales Report Variation:** Tenant sales reports show different levels of detail. Some break out exclusions, some don't. Some include online sales, some don't
* **Breakpoint Complexity:** Natural breakpoints vs artificial breakpoints. Cumulative vs non-cumulative calculations. Lease terms vary
* **Exclusion Interpretation:** Leases exclude specific sale types (returns, employee sales, gift cards). Consistent application requires lease review

## The DocStandard Protocol
We process percentage rent calculations with standardized sales data, verified breakpoints, and consistent exclusion application.

### Processing Standards:
* **Sales Normalization:** All sales reports mapped to standard fields: `Reporting_Period`, `Gross_Sales`, `Excluded_Sales`, `Net_Sales`, `Online_Sales`, `In_Store_Sales`
* **Breakpoint Verification:** Breakpoint calculated per lease terms: `Natural_Breakpoint` = `Base_Rent` / `Percentage_Rate` or `Artificial_Breakpoint` as specified
* **Percentage Calculation:** Rent calculated: `(Net_Sales` - `Breakpoint`) x `Percentage_Rate` = `Percentage_Rent_Due` with detailed `Calculation_Worksheet`

## ROI for Retail Property Management
Percentage rent under-calculation leaves money on the table. Over-calculation creates tenant disputes. Accurate calculation captures full revenue while maintaining tenant relations.

### Measurable Benefits:
1. **Revenue Accuracy:** Proper calculation captures full percentage rent due
2. **Tenant Clarity:** Detailed worksheets explain calculations and reduce disputes
3. **Audit Support:** Complete documentation supports external audit requirements

[Internal Link to: /lease-abstract-processing-2026]
[Internal Link to: /retail-property-management-2026]
[Internal Link to: /sales-report-processing-2026]
