const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.fetch = require('jest-fetch-mock');
let app;

describe('app', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../static/js/api.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('request post', () => {
        describe('getPost', () => {
            test('it makes a get request to /posts/:id', () => {
                app.getPost(1);
                expect(fetch.mock.calls[0][0]).toMatch(/posts$/)
            })
        });
        
        describe('submitPost', () => {
            test('it makes a post request to /posts with the post data', () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        // name: { value: 'Bob' },
                        // age: { value: 4 }
                    }
                }

                app.sendPost(fakeSubmitEvent);
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({}));
            })
        })
    })



})