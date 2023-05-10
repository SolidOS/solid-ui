# Solid-UI Unit Testing
The purpose of this README is to provide guidance on how to write tests for solid-ui for beginners.

## Running Tests

### All
The following command will run all the tests.
`npm run test`
### One file at a time
There are a lot of tests in `solid-ui` so you will most likely want to run only the test you are working on at the moment. In order to do that you can use the following command.
`npm test <filetobetested>`
`npm test test/unit/utils/keyHelpers/accessData.test.ts`

## Tips and Tricks
The following are some tips and tricks in hopes to make testing easier.

### VSCode debugging

### Mocking
In solid-ui we do not currently follow a MVC pattern therefore there can be some difficulty in testing. The following are patterns to help with this.
#### Store methods
##### Load
In SolidOS we use [rdflib.js](https://github.com/linkeddata/rdflib.js/) to work with LinkedData. The way this works is that you first load the document you need to work with into the store. Once the document is loaded you can then access the data by using additional methods on the store such as `any, each,...`. Since the data that gets returned will need to be mocked, `load` doesn't need to do anything. See below for what you need to put in the top of your file in order to mock the `load` method.  
`import { store } from 'solid-logic'` at the top of your file.

`store.fetcher.load = jest.fn().mockImplementation(() => {})`

##### Any

##### Each
