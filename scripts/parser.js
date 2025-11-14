import { isHeader, isParagraph, isCode, ensureTrailingLine } from './utils.js';

export function parseBlocks(editor) {

    const blocks = [];

    let currentBlock = null;
    let currentParagraph = null;

    editor.childNodes.forEach(node => {

        if (isHeader(node)) {

            currentParagraph = null;
            currentBlock = { type: "header", content: node.innerText.trim(), paragraphs: [] };
            blocks.push(currentBlock);

        } else if (isParagraph(node) || node.nodeName === "DIV" || node.nodeType === Node.TEXT_NODE) {
            
            const text = node.nodeType === Node.TEXT_NODE ? (node.textContent || "").trim() : node.innerText.trim();
            if (!text) {
                // Allow empty paragraphs as line breaks
                if (isParagraph(node) && currentBlock) {
                    currentBlock.paragraphs.push("");
                }
                return;
            }

            if (!currentBlock) {
                currentBlock = { type: "standalone", paragraphs: [] };
                blocks.push(currentBlock);
            }

            currentBlock.paragraphs.push(text);

        } else if (isCode(node)) {
            const codeEl = node.querySelector("code");
            const codeText = codeEl ? codeEl.innerText.trim() : "";
            if (codeText) {
                if (!currentBlock) {
                    currentBlock = { type: "standalone", paragraphs: [] };
                    blocks.push(currentBlock);
                }
                currentBlock.paragraphs.push({ type: "code", content: codeText });
            }
        }

    });

    return blocks;

}

export function updateJSON() {
    const editor = document.getElementById("editor");
    const blocks = parseBlocks(editor);
    document.getElementById("jsonOutput").textContent = JSON.stringify(blocks, null, 2);

    ensureTrailingLine();
}
