let toggleComponents = button => {
    let element = document.getElementById("component-list");
    let hidden = element.getAttribute("hidden");

    if (hidden) {
       element.removeAttribute("hidden");
       button.innerText = "Hide Components";
    } else {
       element.setAttribute("hidden", "hidden");
       button.innerText = "Show Components";
    }
  }