# Playwright Salesforce Commerce Cloud Tests

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)

This repository contains automated tests for Salesforce Commerce Cloud (SFCC) using Playwright.

## Project Structure

```
playwright_salesforce/
├── .env                  # Environment variables (not versioned)
├── .env.example          # Environment variables example
├── .gitignore            # Files to ignore in Git
├── config/               # Centralized configuration
│   └── environment.ts    # Environment variables and configuration
├── package.json          # Dependencies and scripts
├── playwright.config.ts  # Playwright configuration
├── tests/                # Tests
│   ├── data/             # Test data in JSON format
│   │   └── bracelet-disccount.json
│   ├── utils/            # Test utilities
│   │   └── store-navigation.ts
│   ├── parametrized-coupon.spec.ts
│   └── sfcc-store.spec.ts
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. **IMPORTANT**: Create a `.env` file based on `.env.example` and configure the environment variables:
   ```
   # SFCC Store URLs (REQUIRED)
   STORE_BASE_URL=https://your-store-url.com

   > **Note**: The `STORE_BASE_URL` variable is mandatory and must be a valid URL with the protocol (http:// or https://).

## Running Tests

To run all tests:

```
npx playwright test
```

To run specific tests:

```
npx playwright test tests/parametrized-coupon.spec.ts
```

To run tests in a specific browser:

```
npx playwright test --project=chromium
```

To run tests with visible browser (headed mode):

```
npx playwright test --project=chromium --headed
```

## Testing Strategy

The tests use a parameterized approach with data stored in JSON files. This allows:

- Separating test data from test logic
- Easily adding new test cases
- Maintaining a clear record of test scenarios

## Centralized Configuration

The project uses a centralized configuration file (`config/environment.ts`) that:

- Provides default values for all environment variables (except URLs)
- Groups variables by category (URLs, browsers, timeouts, users)
- Facilitates the addition of new configuration variables
- Improves code maintainability