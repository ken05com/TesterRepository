// SIDEBAR TOGGLE
const openBtn = document.querySelector('.open-btn');
const sidebar = document.querySelector('.sidebar');

openBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  openBtn.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
    if (!sidebar.contains(e.target) && !openBtn.contains(e.target)) {
      sidebar.classList.remove('active');
      openBtn.classList.remove('hidden');
    }
  }
});


// Store the list of classes in localStorage
let classesList = JSON.parse(localStorage.getItem('classesList')) || [];

// Function to add a NEW CLASS
function addClass() {
  const nameInput = document.getElementById('addedClass');
  const semesterSelect = document.getElementById('semester-select'); // Use the new ID
  
  const className = nameInput.value.trim();
  const semester = semesterSelect.value;
  
  if (!className) return alert('Please enter a class name.');
  if (!semester) return alert('Please select a semester.');

  classesList.push({ 
    name: className, 
    semester: semester,
  });
  
  localStorage.setItem('classesList', JSON.stringify(classesList));
  
  // Clear inputs
  nameInput.value = '';
  semesterSelect.value = ''; 
  
  renderClasses();
}

// Function to remove a CLASS
function removeClass(index) {
  if (!confirm('Remove this class and all its student data?')) return;
  
  classesList.splice(index, 1);
  localStorage.setItem('classesList', JSON.stringify(classesList));
  
  renderClasses();
}

// Function to render the list of available classes
function renderClasses() {
  const listContainer = document.getElementById('availableclass');
  if (!listContainer) return;
  
  listContainer.innerHTML = '';
  
  classesList.forEach((c, i) => {
    const button = document.createElement('button');
    button.classList.add('classes');
    
    button.onclick = () => {
        window.location.href = `class-details.html?classIndex=${i}`;
    };
    
    button.innerHTML = `
        <div class="text">
            <h1>${c.name}</h1>
            <p>${c.semester}</p>
        </div>
        
        <button class="delete-btn" onclick="event.stopPropagation(); removeClass(${i})">
            <img src="image/trash.png" alt="Remove Class" class="delete-icon">
        </button>
    `;
    
    listContainer.appendChild(button);
  });
}

window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        classesList = JSON.parse(localStorage.getItem('classesList')) || [];
    }
    renderClasses();
});