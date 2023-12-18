class ComponentHandler {
    constructor() {
        this.currentComp = undefined;
        this.renderComponents();
    }

    setComponent(comp) {
        this.currentComp = comp;
    }

    getCurrentComponent() {
        return this.currentComp;
    }

    renderComponents() {
        const componentList = document.getElementById('component-list');

        // Fetch JSON data
        fetch('js/Ui/Components/components.json')
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
                    listItem.addEventListener('mousedown', () => {
                        this.setComponent(component);
                        
                        listItem.style.transform = "scale(0.9)";
                        setTimeout(function() {
                            listItem.style.transform = 'scale(1)';
                        }, 200);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

const componentHandler = new ComponentHandler()
