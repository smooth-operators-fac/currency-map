#Currency map

Visualise currency value fluctuations to figure out where to go on holiday!

##Installation

- Install dependencies with `npm install`
- `npm start` will launch the server with nodemon.
- To run frontend tests you must also install Jasmine's `lib` folder in the `test` directory.

##Use

- First select a country.

- We calculate how much a currency has been going up or down with respect to your selection in the previous months. Green means the currency is cheaper than usual, red more expensive.

- NOTE that we are not calculating the absolute cost of the currency relative to your selected country! The colours denote movements up and down of each currency's price with respect to its own historical values...It is the prices that are relative to the selected country, not the movement of the price.
