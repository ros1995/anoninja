const { sendPost, getPost } = require('./api.js')


window.addEventListener('hashchange', updateContent);
window.addEventListener('load', updateContent);


function updateContent() {
    const id = window.location.hash.substring(1)
    id.length > 0 ? renderPost(id) : renderForm()
}

function renderPost(postData){
    const root = document.getElementById('root')
    root.textContent = postData
}

const fields = [
    { tag: 'input', attributes: {autocomplete : "off", required: true, type: 'text', name: 'title', placeholder: 'Title' } },
    { tag: 'input', attributes: {autocomplete : "off", type: 'text', name: 'pseudonym', placeholder: 'Ninja name...' } },
    { tag: 'textarea', attributes: { name: 'content', placeholder: 'Ninja post...' } },
    { tag: 'input', attributes: { type: 'submit', value: 'submit' } }
]

function renderForm(){
    const root = document.getElementById('root')
    const form = document.createElement('form');
        fields.forEach(f => {
            const field = document.createElement(f.tag);
            field.textContent = f.text;
            Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
            form.appendChild(field);
        })
        form.onsubmit = sendPost;
        root.appendChild(form);
    }

module.exports = {
    renderPost, renderForm, updateContent
}
    