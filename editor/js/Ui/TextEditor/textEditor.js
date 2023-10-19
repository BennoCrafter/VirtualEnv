var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "javascript",
    lineNumbers: true,
    theme: "default",
    autoCloseBrackets: true,
    autoCloseQuotes: true,
});