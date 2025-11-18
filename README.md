# 🎭 Capitec Playwright Test Automation Challenge


> Create a simple Playwright JS test framework demonstrating UI and API test automation skills.

---

## 📋 What's Included

- ✅ **UI Tests** – SauceDemo e-commerce flows (Login, Inventory, Cart, Checkout)  
- ✅ **API Tests** – Restful-Booker API (Authentication + Booking CRUD)  
- ✅ **Page Object Model** – Fully modular and maintainable structure  
- ✅ **Test Data Management** – All test data stored in JSON  
- ✅ **CI/CD Pipeline** – Automated GitHub Actions execution  
- ✅ **Reporting** – Playwright HTML report + Monocart advanced reporting  

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** → https://nodejs.org  
- **Git** → https://git-scm.com  

### Installation

```bash
git clone https://github.com/Rowan-Kirchner/Rowan-Kirchner-Capitec-Playwright-Challenge.git
cd Rowan-Kirchner-Capitec-Playwright-Challenge
npm install
npx playwright install
```

---

## 🧪 Running Tests

Run ALL tests:
```bash
npm test
```

UI only:
```bash
npm run test:ui
```

API only:
```bash
npm run test:api
```

Headed mode:
```bash
npx playwright test --headed
```
---

## 📊 Viewing Test Results

### Playwright HTML Report:
```bash
npm run report
```

### Monocart Report:
```bash
start monocart-report/index.html 
```

### CI/CD Reports:
Download artifacts from GitHub Actions:
- `playwright-report`
- `monocart-report`

---

## 📁 Project Structure

```
capitec-playwright-challenge/
├── tests-UI/                    
│   ├── pages/                  
│   ├── scripts/                
│   └── swagLabsTests.js        
├── tests-API/
│   ├── helpers/
│   └── booking.js              
├── data/
├── .github/workflows/
│   └── playwright-tests.yml
├── playwright.config.js
└── package.json
```


