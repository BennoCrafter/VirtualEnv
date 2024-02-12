const sidebarButtons = document.getElementById("sidebar-buttons").children;
const sidebarElements = document.getElementById("sidebar-elements").children;

// Programming the Sidebar buttons
for (let buttonIndex = 0; buttonIndex < sidebarButtons.length; buttonIndex++) {
    sidebarButtons[buttonIndex].addEventListener("click", function () {
        // hide every sidebarElement
        for (element of sidebarElements) { element.style.display = "none" }

        // showing the correct sidebar element
        sidebarElements[buttonIndex].style.display = "block";
    });
}
