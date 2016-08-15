## Dependencies

Clone or download zip files from [GitHub](https://github.com/theronpatrick/pidgey). <br>
Make sure you have [node](https://nodejs.org/) installed. <br>
To install dependencies run `npm install` from the project directory. 

## Running

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

You can run the app using any static server, such as
```
npm install -g pushstate-server
pushstate-server build
open http://localhost:9000
```

To view in development mode you can run 

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Tests
I spent most of this weekend at a wedding so I didn't have the time to implement proper tests. The one test I was able to run (and passed every time) is:
```
var assert = require('assert');
describe('MarioCake', function() {
  describe('#eat()', function() {
    it('should be delicious when you eat it', function() {
      var cake = new Cake('Mario');
      assert.equal('delicious', cake.eat());
    });
  });
});
```
!['mario'](https://cloud.githubusercontent.com/assets/1417999/17656539/26e80388-6289-11e6-8a28-d75f7f74b594.jpg)
