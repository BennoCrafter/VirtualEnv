let toggleComponents = button => {
   let element = document.getElementById("component-list");
   let isHidden = element.classList.contains("hide");

   if (isHidden) {
       element.classList.remove("hide");
       button.innerText = "Hide Components";
   } else {
       element.classList.add("hide");

       // After the transition is complete, add the hidden attribute
       element.addEventListener("transitionend", function () {
           element.style.opacity = 1;
       }, { once: true });

       button.innerText = "Show Components";
   }
}

const toggleCompButton = document.getElementById("toggle-comp-button");
toggleCompButton.addEventListener("click", () => {
   toggleComponents(toggleCompButton);
});
