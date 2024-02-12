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

/* example code:

const pins = [new Pin(1), new Pin(2), new Pin(3), new Pin(4)]

async function main() {
	for (const pin of pins) {
		pin.write(HIGH);
		await delay(50);
	}
	await delay(400);
	for (const pin of pins.reverse()) {
		pin.write(LOW);
		await delay(50);
	}
}

main();

*/