const { sendPost, getPost } = require('./api.js')
const { encode } = require('html-entities');

window.addEventListener('hashchange', updateContent);
window.addEventListener('load', updateContent);


function updateContent() {
    const root = document.getElementById('root')
    root.innerHTML = ''
    const id = window.location.hash.substring(1)
    id.length > 0 ? renderPost(id) : renderForm()
}

async function renderPost(id){
    const root = document.getElementById('root')
    const postData = await getNewPost(id)
    root.innerHTML = `
    <div class="post-cont">
    <h2>${encode(postData.title)}</h2>
    <h3 class="post" id="name">${encode(postData.pseudonym)}</h3><span> ● ${prettyDate(postData.date)}</span>
    <p>${encode(postData.content)}<p>
    </div>`
}

function prettyDate(date) {
    const jsDate = new Date(Date.parse(date))
    const day = jsDate.getDate()	
    const month = jsDate.getMonth() + 1
    const year = jsDate.getFullYear()
    return `${day}-${month}-${year}`
}

async function getNewPost(id){
    const postData = await getPost(id)
    return postData
}

function renderForm(){
    const fields = [
        { tag: 'input', attributes: {autocomplete : "off", id: "title", required: "true", type: 'text', name: 'title', placeholder: 'Title' } },
        { tag: 'input', attributes: {autocomplete : "off", id: "name", type: 'text', name: 'pseudonym', placeholder: 'Ninja name...' } },
        { tag: 'textarea', attributes: { name: 'content', required: "true", placeholder: 'Ninja post...' } },
        { tag: 'input', attributes: { type: 'submit', value: 'submit' } }
    ]
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
    