var map = L.map('map').setView([60.1699, 24.9384], 13); // Coordinates for Helsinki

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var events = []; // Define the events array

$.get('/api/events', function(data) {
    events = data; // Assign the fetched events to the array
    events.forEach(function(event) {
        var popupContent = `
            <a href="#" class="event-link" data-id="${event.id}" data-toggle="modal" data-target="#eventDetailModal">${event.title}</a><br>
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

$(document).on('click', '.event-link', function() {
    var eventId = $(this).data('id');
    $.get(`/event/${eventId}`, function(event) {
        $('#eventTitleModal').text(event.title);
        $('#eventDescriptionModal').text(event.description);
        $('#eventReactionsModal').html(`
            <button class="btn btn-light react-btn" data-reaction="smile" data-id="${event.id}">😊: ${event.reactions.smile || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="thumbsUp" data-id="${event.id}">👍: ${event.reactions.thumbsUp || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="party" data-id="${event.id}">🎉: ${event.reactions.party || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="heartEyes" data-id="${event.id}">😍: ${event.reactions.heartEyes || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="clap" data-id="${event.id}">👏: ${event.reactions.clap || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="moneyBag" data-id="${event.id}">💰: ${event.reactions.moneyBag || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="shoppingBags" data-id="${event.id}">🛍️: ${event.reactions.shoppingBags || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="beach" data-id="${event.id}">🏖️: ${event.reactions.beach || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="cocktail" data-id="${event.id}">🍹: ${event.reactions.cocktail || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="coffee" data-id="${event.id}">☕: ${event.reactions.coffee || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="clapperBoard" data-id="${event.id}">🎬: ${event.reactions.clapperBoard || 0}</button>
            <button class="btn btn-light react-btn" data-reaction="popcorn" data-id="${event.id}">🍿: ${event.reactions.popcorn || 0}</button>
        `);
        $('#eventCommentsModal').html('');
        event.comments.forEach(comment => {
            $('#eventCommentsModal').append(`
                <li class="list-group-item">
                    <strong>${comment.author}:</strong> ${comment.text}
                </li>
            `);
        });
    });
});

$(document).on('click', '.react-btn', function() {
    var eventId = $(this).data('id');
    var reaction = $(this).data('reaction');
    $.post(`/event/${eventId}/react`, { reaction }, function(updatedEvent) {
        var eventIndex = events.findIndex(e => e.id == eventId);
        if (eventIndex !== -1) {
            events[eventIndex] = updatedEvent;
            var emojiMap = {
                smile: '😊',
                thumbsUp: '👍',
                party: '🎉',
                heartEyes: '😍',
                clap: '👏',
                moneyBag: '💰',
                shoppingBags: '🛍️',
                beach: '🏖️',
                cocktail: '🍹',
                coffee: '☕',
                clapperBoard: '🎬',
                popcorn: '🍿'
            };
            $(`.react-btn[data-id="${eventId}"][data-reaction="${reaction}"]`).text(`${emojiMap[reaction]}: ${updatedEvent.reactions[reaction]}`);
        }
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
    var coords = $('#eventCoords').val().split(',').map(Number);
    var date = $('#eventDate').val();
    var time = $('#eventTime').val();
    if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        $.post('/api/events', { title, description, coords, date, time }, function() {
            alert('Event created successfully');
            $('#createEventModal').modal('hide');
            var newEventId = events.length + 1;
            var popupContent = `
                <a href="#" class="event-link" data-id="${newEventId}" data-toggle="modal" data-target="#eventDetailModal">${title}</a><br>
                ${description}
            `;
            L.marker(coords).addTo(map)
                .bindPopup(popupContent)
                .openPopup();
            events.push({ id: newEventId, title, description, coords, date, time, reactions: {}, comments: [] }); // Add the new event to the events array
        });
    } else {
        alert('Invalid coordinates');
    }
});
