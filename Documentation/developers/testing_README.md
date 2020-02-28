# Testing Documentation and Guidelines

## Notes

The original code was not written with testing in mind. In order to make testing more efficient you may find it easier to export a function. To do this include the following comment above the function so that it does not get picked up by Typedoc.
`@ignore exporting this only for the unit test`

There will also be times that even exporting the function isn't enough to enable proper tests to be developed. In this case follow the commenting procedures in the Code Readme.md, which is to add the comment
` \* @@ TODO and desribe the problem.
