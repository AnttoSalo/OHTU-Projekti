# OHTU-Projekti

This project is a mock-up event map application developed as part of the OHTU course project. The application allows users to add events to a map, view event details, react to events, and leave comments.

## Features

- Add new events to the map
- View event details and reactions
- Read comments on events
- User authentication (login and registration)
- View user profile

## Technologies Used

- HTML, CSS, JavaScript
- Pug (template engine)
- Bootstrap (CSS framework)
- Leaflet (JavaScript library for interactive maps)
- jQuery (JavaScript library)

## Setup Instructions

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/OHTU-Projekti.git
   cd OHTU-Projekti
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:

   ```sh
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Adding a New Event

1. Click the "Luo uusi tapahtuma" button.
2. Fill in the event details (title, description, location, coordinates, date, and time).
3. Click "Lisää tapahtuma" to add the event to the map.

### Viewing Event Details

1. Click on an event marker on the map or an event link in the event list.
2. The event details modal will open, displaying the event information, reactions, and comments.

### Reacting to an Event

1. In the event details modal, click on a reaction button to react to the event.
2. The reaction count will be updated.

### Leaving a Comment

1. In the event details modal, scroll down to the comments section.
2. Enter your comment in the textarea and click "Lähetä" to submit your comment.

### User Authentication

1. Click the "Kirjaudu" button to open the login modal.
2. Enter the hardcoded credentials (email: `opettaja@lut.fi`, password: `opettaja`) and click "Kirjaudu".
3. The profile and logout buttons will appear, and the login and register buttons will be hidden.

### Viewing Profile

1. Click the "Profiili" button to navigate to the profile page.
2. The profile page displays the user's email and name.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
