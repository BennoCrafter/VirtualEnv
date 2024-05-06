function save(circuit, code){
    data = {"circuit": circuit, "code": code}
    var jsonData = JSON.stringify(data);

    // Create a blob with the JSON data
    var blob = new Blob([jsonData], {type: "application/json"});

    // Create a link element to download the JSON file
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "data.json";
    a.textContent = "Download JSON";

    // Append the link to the body and trigger the click event
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
}

