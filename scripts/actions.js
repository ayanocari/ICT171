import { getCurrentBlockSelection, replaceBlock } from './utils.js';
import { updateJSON } from './parser.js';

export function makeHeader() {
    const result = getCurrentBlockSelection();
    if (!result) return;
    const { sel, el } = result;

    if (!document.getElementById('editor').contains(el)) return;

    if (el.nodeName === "H2") { 
        updateJSON(); 
        return; 
    }

    const h = document.createElement("h2");
    h.textContent = el.innerText.trim();
    
    replaceBlock(el, h, sel);
    updateJSON();
}

export function makeCodeBlock() {
    const result = getCurrentBlockSelection();
    if (!result) return;
    const { sel, el } = result;

    if (!document.getElementById('editor').contains(el)) return;

    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = el.innerText.trim();
    pre.appendChild(code);

    replaceBlock(el, pre, sel);
    updateJSON();
}

// Export as Actions object for easier import in HTML
window.Actions = {
    makeHeader,
    makeCodeBlock
};