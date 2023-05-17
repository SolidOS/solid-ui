# Solid-UI Unit Testing
The purpose of this README is to provide guidance on how to write tests for solid-ui for beginners.

Although we would love to have 100% test coverage, we realize that this is not a commericial product. solid-ui is an open source, volunteer built library that houses UI components that can be used to build Solid applications. We are working to increase test coverage on existing code, any help is much appreciated. If you add a new component to solid-ui, you should write tests to test the main functionality of your component in order for your PR to be merged.

## Running Tests

### All
The following command will run all the tests.
`npm run test`

### One file at a time
There are a lot of tests in `solid-ui` so you will most likely want to run only the test you are working on at the moment. In order to do that you can use the following command.
`npm test <filetobetested>`
`npm test test/unit/utils/keyHelpers/accessData.test.ts`

### Coverage
Run the following command:
`npm run coverage`

Then you can see the results in `coverage/lcov-report/index.html`. If you are using VSCode you can right click and select to `Open in Browser Preview`. Otherwise, you can type the path in your browswer, for instance `file:///Users/<yourhomedirectory>/2023Development/solid-ui/coverage/lcov-report/index.html` is an example.

## Tips and Tricks
The following are some tips and tricks to make your testing easier.

### VSCode Debugging
There is an extension that can be used to aide in debugging `jest` tests. To find out more about it, you can look at [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner).

### Mocking
In `solid-ui`, we do not currently follow a MVC pattern, so testing is not always easy. The following are patterns to help with this.
#### Store methods
##### Load
In SolidOS, we use [`rdflib.js`](https://github.com/linkeddata/rdflib.js/) to work with LinkedData. First, you load the document you need to work with into the store. Once the document is loaded, you can access the data by using additional methods on the store such as `any`, `each`, etc. Since the data that gets returned will need to be mocked, `load` doesn't need to do anything. You need to put the following into your file to mock the `load` method:
```
import { store } from 'solid-logic'      /* at the top of your file */
...
store.fetcher.load = jest.fn().mockImplementation(() => {})
```

##### Any

##### Each
