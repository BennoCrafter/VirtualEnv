const cm = CodeMirror.fromTextArea(document.getElementById("editor"), {
    theme: "default",
    hintOptions: { completeSingle: false },
    tabSize: 2,
    indentWithTabs: true,
    lineNumbers: true,
    autoCloseBrackets: true,
    mode:  "javascript",
})

cm.on("inputRead", function (editor, change) {
    if (change.origin !== "setValue") {
      CodeMirror.commands.autocomplete(editor, null, { completeSingle: false });
    }
});