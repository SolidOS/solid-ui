# Testing Documentation and Guidelines

## Data fixtures
See https://github.com/solidos/solid-ui/blob/5fd8fb0/test/unit/widgets/buttons.test.ts#L222 for an example of how to use `store.add` in a
unit test to set up some data in the store. Don't forget to [clearStore afterEach](https://github.com/solidos/solid-ui/blob/5fd8fb0/test/unit/widgets/buttons.test.ts#L214).

## Custom matchers

We have added some custom matchers to ease the testing. You can see the full list at `test/setup.ts`, in 
the `expect.extend` part.

* `expect(A).toEqualGraph(B)`: Use this matcher to check whether graphs A and B are equal (meaning containing the
  same set of triples)
* `expect(A).toContainGraph(B)`: Use this matcher to check whether graph B is contained in graph A

## Notes

The original code was not written with testing in mind. In order to make testing more efficient you may find it 
easier to export a function. To do this include the following comment above the function so that it does not 
get picked up by Typedoc.
`@ignore exporting this only for the unit test`

There will also be times that even exporting the function isn't enough to enable proper tests to be developed. 
In this case follow the commenting procedures in the Code Readme.md, which is to add the comment
` \* @@ TODO and desribe the problem.

You can reference https://github.com/solidos/solid-ui/issues/215 in your TODO comment if the code is hard to 
test due to DOM manipulation.
