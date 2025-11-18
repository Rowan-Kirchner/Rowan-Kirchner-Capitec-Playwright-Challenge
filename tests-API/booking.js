
const { test, expect, describe } = require('@playwright/test');
const { getBookerToken } = require('./helpers/apiAuth');
const bookingData = require('../data/bookingData.json');

const BASE_PATH = '/booking';
const JSON_HEADERS = { 'Content-Type': 'application/json' };
const API_BASE_URL = process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';

describe('Restful-Booker API Tests', () => {

    test('(POST) Authentication', async ({ request }) => {
        const token = await getBookerToken(request, API_BASE_URL);
        expect(token).toBeTruthy();
    });

    test('(POST) Create booking', async ({ request }) => {
        const response = await request.post(`${API_BASE_URL}${BASE_PATH}`, {
            headers: JSON_HEADERS,
            data: bookingData.baseBooking
        });

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');

        const body = await response.json();

        expect(body).toHaveProperty('bookingid');
        expect(body).toHaveProperty('booking');
        expect(body.booking).toMatchObject(bookingData.baseBooking);
    });

    test('(GET) Get booking IDs - All IDs, filter by name, filter by date', async ({ request }) => {
        const createRes = await request.post(`${API_BASE_URL}${BASE_PATH}`, {
            headers: JSON_HEADERS,
            data: bookingData.baseBooking
        });
        expect(createRes.status()).toBe(200);
        await createRes.json();
        
        const allResponse = await request.get(`${API_BASE_URL}${BASE_PATH}`);
        expect(allResponse.status()).toBe(200);
        expect(allResponse.headers()['content-type']).toContain('application/json');

        const allBookings = await allResponse.json();
        expect(Array.isArray(allBookings)).toBeTruthy();
        expect(allBookings.length).toBeGreaterThan(0);

        allBookings.forEach(booking => {
            expect(booking).toHaveProperty('bookingid');
            expect(typeof booking.bookingid).toBe('number');
        });

        const nameResponse = await request.get(`${API_BASE_URL}${BASE_PATH}`, {
            params: {
                firstname: bookingData.baseBooking.firstname,
                lastname: bookingData.baseBooking.lastname
            }
        });

        expect(nameResponse.status()).toBe(200);
        expect(nameResponse.headers()['content-type']).toContain('application/json');

        const nameBookings = await nameResponse.json();
        expect(Array.isArray(nameBookings)).toBeTruthy();

        if (nameBookings.length > 0) {
            nameBookings.forEach(booking => {
                expect(booking).toHaveProperty('bookingid');
                expect(typeof booking.bookingid).toBe('number');
            });
        }

        const dateResponse = await request.get(`${API_BASE_URL}${BASE_PATH}`, {
            params: {
                checkin: bookingData.baseBooking.bookingdates.checkin,
                checkout: bookingData.baseBooking.bookingdates.checkout
            }
        });

        expect(dateResponse.status()).toBe(200);
        expect(dateResponse.headers()['content-type']).toContain('application/json');

        const dateBookings = await dateResponse.json();
        expect(Array.isArray(dateBookings)).toBeTruthy();

        if (dateBookings.length > 0) {
            dateBookings.forEach(booking => {
                expect(booking).toHaveProperty('bookingid');
                expect(typeof booking.bookingid).toBe('number');
            });
        }
    });

    test('(GET) Get booking by ID', async ({ request }) => {
        const createRes = await request.post(`${API_BASE_URL}${BASE_PATH}`, {
            headers: JSON_HEADERS,
            data: bookingData.baseBooking
        });
        expect(createRes.status()).toBe(200);
        const createBody = await createRes.json();
        const bookingId = createBody.bookingid;

        const response = await request.get(`${API_BASE_URL}${BASE_PATH}/${bookingId}`);

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');

        const booking = await response.json();
        expect(booking).toMatchObject(bookingData.baseBooking);
    });

    test('(PUT) Update booking', async ({ request }) => {
        const createRes = await request.post(`${API_BASE_URL}${BASE_PATH}`, {
            headers: JSON_HEADERS,
            data: bookingData.baseBooking
        });
        expect(createRes.status()).toBe(200);
        const createBody = await createRes.json();
        const bookingId = createBody.bookingid;

        const token = await getBookerToken(request, API_BASE_URL);

        const response = await request.put(`${API_BASE_URL}${BASE_PATH}/${bookingId}`, {
            headers: {
                ...JSON_HEADERS,
                Cookie: `token=${token}`
            },
            data: bookingData.updateBooking
        });

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');

        const updated = await response.json();
        expect(updated).toMatchObject(bookingData.updateBooking);
    });

    test('(PATCH) Partial update booking', async ({ request }) => {
        const createRes = await request.post(`${API_BASE_URL}${BASE_PATH}`, {
            headers: JSON_HEADERS,
            data: bookingData.baseBooking
        });
        expect(createRes.status()).toBe(200);
        const createBody = await createRes.json();
        const bookingId = createBody.bookingid;

        const token = await getBookerToken(request, API_BASE_URL);

        const response = await request.patch(`${API_BASE_URL}${BASE_PATH}/${bookingId}`, {
            headers: {
                ...JSON_HEADERS,
                Cookie: `token=${token}`
            },
            data: bookingData.partialUpdate
        });

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');

        const patched = await response.json();
        expect(patched).toMatchObject(bookingData.partialUpdate);
        expect(patched.lastname).toBe(bookingData.baseBooking.lastname);
    });

    test('(DELETE) Delete booking', async ({ request }) => {
        const createRes = await request.post(`${API_BASE_URL}${BASE_PATH}`, {
            headers: JSON_HEADERS,
            data: bookingData.baseBooking
        });
        expect(createRes.status()).toBe(200);
        const createBody = await createRes.json();
        const bookingId = createBody.bookingid;

        const token = await getBookerToken(request, API_BASE_URL);

        const response = await request.delete(`${API_BASE_URL}${BASE_PATH}/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`
            }
        });

        expect(response.status()).toBe(201);

        const getAfterDelete = await request.get(`${API_BASE_URL}${BASE_PATH}/${bookingId}`);
        expect(getAfterDelete.status()).toBe(404);
    });

});