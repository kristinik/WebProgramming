const main = document.getElementById('main');
const chainsawTitleInput = document.getElementById('chainsaw-title');
const chainsawPowerInput = document.getElementById('chainsaw-power');
const chainsawRevolutionsInput = document.getElementById('chainsaw-revolutions');
const addChainsawBtn = document.getElementById('add-chainsaw');
const countRevolutionsBtn = document.getElementById('count-reviews');
const sortPowerBtn = document.getElementById('sort-power');
const searchInput = document.getElementById('search');

let information = [];
let filteredChainsaws = [];


async function fetchChainsaws() {
    try {
        const response = await fetch('http://localhost:5002/chainsaws');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        information = await response.json();
        updateDOM();
    } catch (error) {
        console.error('Error fetching chainsaws:', error);
    }
}


fetchChainsaws();


function updateDOM(providedData = information) {
    main.innerHTML = '<h2>Chainsaw List</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('chainsaw');
        element.innerHTML = `
            <strong>${item.title}</strong>: Power = ${item.power} W; Revolutions = ${item.revolutions}
            <div class="button-container">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>`;
        main.appendChild(element);

        const editButton = element.querySelector('.edit-button');
        editButton.addEventListener('click', () => {
            editChainsaw(element, item);
        });

        const deleteButton = element.querySelector('.delete-button');
        deleteButton.addEventListener('click', async () => {
            await deleteChainsaw(item.id);
        });
    });
}


async function deleteChainsaw(id) {
    try {
        await fetch(`http://localhost:5002/chainsaws/${id}`, {
            method: 'DELETE',
        });

        information = information.filter(chainsaw => chainsaw.id !== id);
        updateDOM();
    } catch (error) {
        console.error('Error deleting chainsaw:', error);
    }
}


async function addChainsaw() {
    const title = chainsawTitleInput.value;
    const power = parseFloat(chainsawPowerInput.value);
    const revolutions = parseInt(chainsawRevolutionsInput.value, 10);

    if (power < 0 || revolutions < 0 || !title || isNaN(power) || isNaN(revolutions)) {
        alert('Please provide valid details for the chainsaw.');
        return;
    }

    const newChainsaw = { title, power, revolutions };

    try {
        const response = await fetch('http://localhost:5002/chainsaws', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newChainsaw),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const addedChainsaw = await response.json();
        information.push(addedChainsaw);
        updateDOM();
        chainsawTitleInput.value = '';
        chainsawPowerInput.value = '';
        chainsawRevolutionsInput.value = '';
    } catch (error) {
        console.error('Error adding chainsaw:', error);
    }
}


async function sortByPower() {
    try {
        const response = await fetch('http://localhost:5002/chainsaws/sort');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const sortedChainsaws = await response.json();
        updateDOM(sortedChainsaws);
    } catch (error) {
        console.error('Error sorting chainsaws:', error);
    }
}


async function countRevolutions() {
    try {
        const response = await fetch('http://localhost:5002/chainsaws/count-revolutions');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        alert(`Total Revolutions: ${data.totalRevolutions}`);
    } catch (error) {
        console.error('Error counting revolutions:', error);
    }
}


async function searchChainsaw() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    try {
        const response = await fetch(`http://localhost:5002/chainsaws/search?q=${searchTerm}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const filteredChainsaws = await response.json();
        updateDOM(filteredChainsaws);
    } catch (error) {
        console.error('Error searching chainsaws:', error);
    }
}



async function editChainsaw(chainsawElement, chainsawData) {
    const editTitleInput = document.createElement('input');
    editTitleInput.type = 'text';
    editTitleInput.value = chainsawData.title;

    const editPowerInput = document.createElement('input');
    editPowerInput.type = 'number';
    editPowerInput.value = chainsawData.power;
    editPowerInput.min = 0;

    const editRevolutionsInput = document.createElement('input');
    editRevolutionsInput.type = 'number';
    editRevolutionsInput.value = chainsawData.revolutions;
    editRevolutionsInput.min = 0;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';

    chainsawElement.innerHTML = '';
    chainsawElement.appendChild(editTitleInput);
    chainsawElement.appendChild(editPowerInput);
    chainsawElement.appendChild(editRevolutionsInput);
    chainsawElement.appendChild(saveButton);

    saveButton.addEventListener('click', async () => {
        const updatedTitle = editTitleInput.value;
        const updatedPower = parseFloat(editPowerInput.value);
        const updatedRevolutions = parseInt(editRevolutionsInput.value, 10);

        if (updatedPower < 0 || updatedRevolutions < 0 || !updatedTitle || isNaN(updatedPower) || isNaN(updatedRevolutions)) {
            alert('Please provide valid details for the chainsaw.');
            return;
        }

        const updatedChainsaw = { title: updatedTitle, power: updatedPower, revolutions: updatedRevolutions };

        try {
            await fetch(`http://localhost:5002/chainsaws/${chainsawData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedChainsaw),
            });

            chainsawData.title = updatedTitle;
            chainsawData.power = updatedPower;
            chainsawData.revolutions = updatedRevolutions;
            updateDOM();
        } catch (error) {
            console.error('Error updating chainsaw:', error);
        }
    });
}

// Додавання обробників подій
addChainsawBtn.addEventListener('click', addChainsaw);
countRevolutionsBtn.addEventListener('click', countRevolutions);
sortPowerBtn.addEventListener('click', sortByPower);
searchInput.addEventListener('input', searchChainsaw);
