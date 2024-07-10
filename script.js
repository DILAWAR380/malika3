let users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user1', password: 'user123', role: 'user' },
    { username: 'user2', password: 'user123', role: 'user' }
];

let leaveRequests = [];

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('user').textContent = user.username;

        if (user.role === 'admin') {
            document.getElementById('leave-requests').style.display = 'block';
            renderRequests();
        } else {
            document.getElementById('leave-requests').style.display = 'none';
        }

        renderRecords(user.username);
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function applyLeave() {
    let leaveDate = document.getElementById('leave-date').value;
    let leaveReason = document.getElementById('leave-reason').value;
    let username = document.getElementById('user').textContent;

    if (leaveDate && leaveReason) {
        leaveRequests.push({ username: username, date: leaveDate, reason: leaveReason, status: 'Pending' });
        alert('Leave applied successfully');
        document.getElementById('leave-date').value = '';
        document.getElementById('leave-reason').value = '';
        renderRecords(username);
        if (document.getElementById('leave-requests').style.display === 'block') {
            renderRequests();
        }
    } else {
        alert('Please fill all fields');
    }
}

function renderRequests() {
    let requestsList = document.getElementById('requests');
    requestsList.innerHTML = '';

    leaveRequests.forEach((request, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            ${request.username} requested leave on ${request.date} - ${request.reason} - ${request.status} 
            <button onclick="approveLeave(${index})">Approve</button>
            <button onclick="disapproveLeave(${index})">Disapprove</button>
        `;
        requestsList.appendChild(listItem);
    });
}

function approveLeave(index) {
    leaveRequests[index].status = 'Approved';
    renderRequests();
}

function disapproveLeave(index) {
    leaveRequests[index].status = 'Disapproved';
    renderRequests();
}

function renderRecords(username) {
    let recordsList = document.getElementById('records');
    recordsList.innerHTML = '';

    let userRecords = leaveRequests.filter(request => request.username === username);

    userRecords.forEach(request => {
        let listItem = document.createElement('li');
        listItem.textContent = `${request.date} - ${request.reason} - ${request.status}`;
        recordsList.appendChild(listItem);
    });
}