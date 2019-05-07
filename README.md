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

- `pipenv run request -n "Item name" -d "Description of item" -w 8.67` to create a new item (description and weight are optional)
- `pipenv run request -t -1 -n "New item name"`  to edit the last created item (any combination of name, description, and weight)
- `pipenv run request -t 4 -w 0.33` to modify an item by ID
