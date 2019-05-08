# async-resource-updates

This is a simple example project.

The backend is a Flask webapp that exposes an API to create, update, and query mock resources called _Items_, each of which has an ID, creation timestamp, unique name, and optional description and weight.

The frontend is written in React: it's a single page that displays a real-time listing of all the _Item_ resources available from the API. SocketIO is used to keep the frontend view in sync with the API as changes are made.

This setup is meant to serve as a barebones testbed for improving the finer points of this sort of design.

### Building the frontend

- Install NodeJS with npm
- `npm install` to install package dependencies in `node_modules/`
- `npm run build` to generate bundled Javascript in `webapp/static/dist`

### Running the server

- Install Python3 and Pipenv
- `pipenv install` to create a virtualenv and install dependencies
- `pipenv run webapp` to run the Flask server

### Populating the database

- `pipenv run populate.bat` to run through some basic API requests
- `pipenv run cli -h` to see what else can be done with the API

## Notes

- **SocketIO vs. WebSockets:** Is Flask-SocketIO using long-polling? Is there a way to ensure that it doesn't? Is Flask-SocketIO necessary at all, or is there a simpler approach that would enable us to just use WebSockets directly?

- **Scale to production:** Test with postgres locally, then deploy to Heroku. Does everything hold up? Are there reliability issues with SocketIO updates? Alternatively, simulate latency locally.
