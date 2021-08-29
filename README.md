## Online Foreign Currency Converter

Thanks for taking your time to reading this.

To run this project,

- Clone the repo.
- Run `npm install` inside the main directory and the client directory.
- Setup the `env` from the `env_sample` given. I've added my own API key for `fixer`. Please feel free to add your own.
- Run `npm run dev` inside the main project directory. This will start up the client and the server.

I've used

- `node.js` and `express` for the server
- `Redis` for in memory caching
- `axios` as the http client

Note : Since this is a free API, we are only allowed to convert few currecies such as EUR. But we can convert to more than 170 currencies.
