# Redirects Check

Quick regression checklist for route/redirect changes.

## How to Run

Use `curl -I` to verify HTTP status and `Location` header.

Example:

```bash
curl -I https://docstandard.co/us/ca/los-angeles/shipping
```

Expected:
- Status: `308`
- Location: `https://docstandard.co/shipping/los-angeles`

## Legacy Vertical/City Pattern (Must Redirect)

1. `https://docstandard.co/us/ca/los-angeles/shipping`
- Expected: `308` -> `/shipping/los-angeles`

2. `https://docstandard.co/us/tx/houston/customs`
- Expected: `308` -> `/customs/houston`

3. `https://docstandard.co/europe/nl/rotterdam/logistics`
- Expected: `308` -> `/logistics/rotterdam`

## Legacy Integration Pattern (Must Redirect)

1. `https://docstandard.co/atlanta-cargowise-netsuite-integration`
- Expected: `308` -> `/integration/atlanta/cargowise/netsuite`

2. `https://docstandard.co/atlanta-cargowise-netsuite-data-bridge`
- Expected: `308` -> `/integration/atlanta/cargowise/netsuite`

## Working Canonical Patterns (Must Return 200/304)

1. `https://docstandard.co/shipping/los-angeles`
- Expected: `200` (or `304`)

2. `https://docstandard.co/customs/houston`
- Expected: `200` (or `304`)

3. `https://docstandard.co/logistics/rotterdam`
- Expected: `200` (or `304`)

4. `https://docstandard.co/integration/cargowise-to-netsuite-data-bridge`
- Expected: `200` (or `304`)

## Fail Conditions

- Redirect returns `404` or `500`
- Redirect points to wrong route shape
- Canonical pages return `404`
- Redirect chain longer than one hop

## Suggested CI/Release Gate

Before production deploy approval:

1. Run all checks above.
2. Confirm no unexpected redirect loops.
3. Save results in release notes.
