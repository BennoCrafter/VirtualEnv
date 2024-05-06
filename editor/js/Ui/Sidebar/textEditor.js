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

function runUserScript(action = null) {
  for (wire of board.wires) {
    wire.userWantsPower = false;
  }
  board.updatePower();
  
  eval(`${cm.getValue()}
  
  if (action) {
	  ${action}();
  }
  `);

}

/* example code:

const pins = [new Pin(1), new Pin(2), new Pin(3), new Pin(4)]

async function main() {
	for (const pin of pins) {
		pin.write(HIGH);
		await delay(500);
	}
	await delay(400);
	for (const pin of pins.reverse()) {
		pin.write(LOW);
		await delay(500);
	}
}

main();

*/

/* second exmaple code:

const pins = [new Pin(1), new Pin(2), new Pin(3), new Pin(4)];
const binary = [
	0, 0, 0, 0,
	0, 0, 0, 1,
	0, 0, 1, 0,
	0, 0, 1, 1,
	0, 1, 0, 0,
	0, 1, 0, 1,
	0, 1, 1, 0,
	0, 1, 1, 1,
	1, 0, 0, 0,
	1, 0, 0, 1,
	1, 0, 1, 0,
	1, 0, 1, 1,
	1, 1, 0, 0,
	1, 1, 0, 1,
	1, 1, 1, 0,
	1, 1, 1, 1,
]

async function calc(num1, num2) {
	const sum = num1 + num2;
	
	for (let i = 0; i < pins.length; i++) {
		console.log(sum * pins.length + i);
		
		if (binary[sum * pins.length + i] === 1) {
			pins[i].write(HIGH);
		}
	}

}

calc(10, 1);

*/