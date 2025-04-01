const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const studentIdInput = document.getElementById('student-id');
const contactInput = document.getElementById('contact-no');
const emailInput = document.getElementById('email');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// Initialize records from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];

// Function to check for duplicate emails
function isDuplicateEmail(email) {
    return records.some(record => record.email.toLowerCase() === email.toLowerCase());
}

// Function to validate inputs
function validateInputs() {
    const name = nameInput.value.trim();
    const studentId = studentIdInput.value.trim();
    const contactNo = contactInput.value.trim();
    const email = emailInput.value.trim();

    const nameRegex = /^[a-zA-Z\s]+$/; // Only characters
    const idRegex = /^\d+$/; // Only numbers
    const contactRegex = /^\d{10}$/; // Assuming contact number is 10 digits
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation

    if (!nameRegex.test(name)) {
        alert('Name can only contain letters and spaces.');
        return false;
    }
    if (!idRegex.test(studentId)) {
        alert('Student ID must be numeric.');
        return false;
    }
    if (!contactRegex.test(contactNo)) {
        alert('Contact number must be 10 digits.');
        return false;
    }
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    return true;
}

// Display records
function displayRecords() {
    recordList.innerHTML = '';
    if (records.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" style="text-align:center;color:red">No Record Found</td>`;
        recordList.appendChild(row);
    } else {
        records.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.studentId}</td>
                <td>${record.contactNo}</td>
                <td>${record.email}</td>
                <td><button onclick="editRecord(${index})">Edit</button></td>
                <td><button onclick="deleteRecord(${index})">Delete</button></td>
            `;
            recordList.appendChild(row);
        });
    }
}

// Add or Update a record
recordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const editIndex = parseInt(editIndexInput.value);

    if (validateInputs()) { // Validate inputs before processing
        const name = nameInput.value;
        const studentId = studentIdInput.value;
        const contactNo = contactInput.value;
        const email = emailInput.value;

        if (isDuplicateEmail(email) && editIndex === -1) {
            alert('Email already exists.');
            return;
        }

        const record = { name, studentId, contactNo, email };
        
        if (editIndex === -1) {
            records.push(record);
        } else {
            records[editIndex] = record;
            editIndexInput.value = -1;
        }

        localStorage.setItem('records', JSON.stringify(records));
        nameInput.value = '';
        studentIdInput.value = '';
        contactInput.value = '';
        emailInput.value = '';
        displayRecords();
    }
});

// Edit a record
function editRecord(index) {
    const recordToEdit = records[index];
    nameInput.value = recordToEdit.name;
    studentIdInput.value = recordToEdit.studentId;
    contactInput.value = recordToEdit.contactNo;
    emailInput.value = recordToEdit.email;
    editIndexInput.value = index;
}

// Delete a record
function deleteRecord(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        records.splice(index, 1);
        localStorage.setItem('records', JSON.stringify(records));
        displayRecords();
    }
}

// Initial display
displayRecords();