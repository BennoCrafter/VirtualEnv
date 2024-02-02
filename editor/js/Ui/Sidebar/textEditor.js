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
    if (change.origin !== "setValue" && change.text != " " && change.text != ";") {
      CodeMirror.commands.autocomplete(editor, null, { completeSingle: false });
    }
});

function runUserScript() {
  for (wire of board.wires) {
    wire.userWantsPower = false;
  }
  board.updatePower();
  board.screenRefresh();

  eval(cm.getValue());
}