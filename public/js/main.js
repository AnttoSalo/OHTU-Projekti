var map = L.map('map').setView([60.1699, 24.9384], 13); // Coordinates for Helsinki

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.get('/api/events', function(events) {
    events.forEach(function(event) {
        var popupContent = `
            <a href="#" data-toggle="modal" data-target="#eventDetailModal">${event.title}</a><br>
            <div>Reaktiot:</div>
            <div>😊: ${event.reactions.smile || 0}</div>
            <div>👍: ${event.reactions.thumbsUp || 0}</div>
            <div>🎉: ${event.reactions.party || 0}</div>
            <div>😍: ${event.reactions.heartEyes || 0}</div>
            <div>👏: ${event.reactions.clap || 0}</div>
            <div>💰: ${event.reactions.moneyBag || 0}</div>
            <div>🛍️: ${event.reactions.shoppingBags || 0}</div>
            <div>🏖️: ${event.reactions.beach || 0}</div>
            <div>🍹: ${event.reactions.cocktail || 0}</div>
            <div>☕: ${event.reactions.coffee || 0}</div>
            <div>🎬: ${event.reactions.clapperBoard || 0}</div>
            <div>🍿: ${event.reactions.popcorn || 0}</div>
        `;
        L.marker(event.coords).addTo(map)
            .bindPopup(popupContent)
            .openPopup();
    });
});

$('#loginForm').on('submit', function(e) {
    e.preventDefault();
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();
    if (email === 'opettaja@lut.fi' && password === 'opettaja') {
        $('#loginModal').modal('hide');
        $('#loginButton').addClass('d-none');
        $('#registerButton').addClass('d-none');
        $('#profileButton').removeClass('d-none');
        $('#logoutButton').removeClass('d-none');
    } else {
        alert('Invalid credentials');
    }
});

$('#logoutButton').on('click', function() {
    $('#loginButton').removeClass('d-none');
    $('#registerButton').removeClass('d-none');
    $('#profileButton').addClass('d-none');
    $('#logoutButton').addClass('d-none');
});

$('#createEventForm').on('submit', function(e) {
    e.preventDefault();
    var title = $('#eventTitle').val();
    var description = $('#eventDescription').val();
    var location = $('#eventLocation').val();
    $.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`, function(data) {
        if (data.length > 0) {
            var coords = [data[0].lat, data[0].lon];
            $.post('/api/events', { title, description, coords }, function() {
                alert('Event created successfully');
                $('#createEventModal').modal('hide');
            });
        } else {
            alert('Invalid address');
        }
    });
});
