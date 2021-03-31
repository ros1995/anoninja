const funcs = require('../static/js/layout.js');

describe('conditional render funcs', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = `<div id="root"></div>`
        global.root = document.getElementById('root')
    })
    it('should render a post', () => {
        funcs.renderPost('testing')
        expect(root.textContent).toBe('testing');
    });
    it('should render a form', () => {
        funcs.renderForm()
        expect(root.innerHTML).toBe(`<form><input autocomplete=\"off\" required=\"true\" type=\"text\" name=\"title\" placeholder=\"Title\"><input autocomplete=\"off\" type=\"text\" name=\"pseudonym\" placeholder=\"Ninja name...\"><textarea name=\"content\" placeholder=\"Ninja post...\"></textarea><input type=\"submit\" value=\"submit\"></form>`);
    });
    it('should render a form / post conditionally on the url hash', () => {
        global.location.hash = ''
        funcs.updateContent()
        expect(root.innerHTML).toBe(`<form><input autocomplete=\"off\" required=\"true\" type=\"text\" name=\"title\" placeholder=\"Title\"><input autocomplete=\"off\" type=\"text\" name=\"pseudonym\" placeholder=\"Ninja name...\"><textarea name=\"content\" placeholder=\"Ninja post...\"></textarea><input type=\"submit\" value=\"submit\"></form>`);
        global.location.hash = '1'
        funcs.updateContent()
        expect(root.innerHTML).toBe(`1`);
    });

});
