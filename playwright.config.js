
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './',
    timeout: 30_000,
    expect: {
        timeout: 10_000,
    },
    reporter: [
        ['list'],
        ['monocart-reporter', {
            name: 'Capitec Challenge Report',
            outputFile: 'monocart-report/index.html'
        }],
        ['html', { open: 'never' }]
    ],
    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    projects: [
        {
            name: 'UI - Chromium',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com'
            },
            testMatch: '**/tests-UI/*Tests.js'
        },
        {
            name: 'UI - Firefox',
            use: {
                ...devices['Desktop Firefox'],
                baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com'
            },
            testMatch: '**/tests-UI/*Tests.js'
        },
        {
            name: 'API Tests',
            testMatch: '**/tests-API/booking.js',
            use: {
                baseURL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com'
            }
        }
    ]
});