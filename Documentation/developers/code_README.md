# Developer Guidelines and Processes

## Code Documentation

### ToDo

When you are refractoring code there will be times you run across code that cannot be easily changed or may be better suited for an alternate branch. In this case you can

1. Reference the following issue .. need ISSUE
2. Document the code by a comment as shown below
   `/* @@ TODO comment about what needs to be done and/or why it is a problem`

### General Comments

Make a comment about // versus /\*

## Current Process for Refactoring Code

### Rules

In any given branch/PR there should be no more than a couple files modified. Try to stick to one, however for tests you may need two, one for the test and one for the code you are testing.

#### Branch Naming Process

Name branch..  
Add WIP in the title of the PR if you want review..

### Process

#### Not sure..

TypeScript
Comments
Test
Examples

#### Steps

1. Rename file to .ts
2. Add types to public methods (if this is dificult you can add the 'any' type and add comments as described above to indicate it needs further work)
3. Add comments
4. No Logic changes, only minor refactoring
5. Commit to Master
6. Create another branch and write unit tests
7. Create another branch and write examples
8. Refactor

## Windows Developers

Notes: can't use single quotes in scripts. Need to use `\" instead
Need to run builds using bash because of sh command..
