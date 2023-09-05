function renderComponents() {
    const componentList = document.getElementById('component-list');

    // Fetch JSON data
    fetch('Ui/Components/components.json')
        .then(response => response.json())
        .then(components => {
            components.forEach(component => {
                const listItem = document.createElement('div');
                listItem.classList.add('list-item');

                const image = document.createElement('img');
                image.src = component.image;
                image.alt = component.name;

                const name = document.createElement('h3');
                name.textContent = component.name;

                const description = document.createElement('p');
                description.textContent = component.description;

                listItem.appendChild(image);
                listItem.appendChild(name);
                listItem.appendChild(description);

                componentList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call the function to render components
renderComponents();