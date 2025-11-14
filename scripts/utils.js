export function ensureTrailingLine() {
    const editor = document.getElementById("editor");
    const last = editor.lastChild;

    // If there's no last child or it's not an empty paragraph, add one
    if (!last || !(last.nodeName === "P" && last.innerText.trim() === "")) {
        const p = document.createElement("p");
        p.innerHTML = "<br>"; // ensures caret can go inside
        editor.appendChild(p);
    }
}

export function nearestBlockElement(node) {
    let el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentNode;
    while (el && el.id !== "editor") {
        if (el.nodeName === "P" || el.nodeName === "H2") return el;
        el = el.parentNode;
    }
    return null;
}

export function getCurrentBlockSelection(){
    const sel = window.getSelection();
    if (!sel.rangeCount) return null;

    const node = sel.anchorNode;
    let el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentNode;

    while (el && el.id !== "editor") {
        if (el.nodeName === "P" || el.nodeName === "H2" || el.nodeName === "PRE" || el.nodeName === "DIV") return { sel, el };
        el = el.parentNode;
    }
}

export function replaceBlock(el, newEl, sel) {
    el.replaceWith(newEl);

    const range = document.createRange();
    range.setStartAfter(newEl);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

// Helper functions moved from parser.js to avoid circular dependency
export function isHeader(node) { 
    return node.nodeName === "H2"; 
}

export function isParagraph(node) { 
    return node.nodeName === "P"; 
}

export function isCode(node) { 
    return node.nodeName === "PRE" && node.querySelector("code");
}