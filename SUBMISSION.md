## Stack

- Web Framework - ExpressJS
- Database - MongoDB
- Tests - Jest
- Linting - ESLint

## Running

To run the app in development mode, run
```
npm start
```

To run the tests, run

```
npm build && npm test
```

## Data Format
We use an array for each week. The array has 7 entries for each day of the week.
Each entry is in turn an array again, containing a list of times during which the user will be available.
The times are stored in 24 hr format, like so: '13:00'

