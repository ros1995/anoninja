(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
async function getPost(id) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function sendPost(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        
        const response = await fetch('http://localhost:3000/posts', options);
        const { id, err } = await response.json();
        if(err) { 
            throw Error(err) 
        } else {
            window.location.hash = `#${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}

module.exports = {
    sendPost, getPost
}
},{}],2:[function(require,module,exports){
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
    
},{"./api.js":1}]},{},[2]);
