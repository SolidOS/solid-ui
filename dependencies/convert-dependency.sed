# A comment // deleted the whole line
s?^.*//.*$??g
# Strip path to filename
s?../src/??g
# Convert syntax to turtle
s/^\([^:]*\):.*require(.\(.*\).).*/<\1> :dependsOn <\2>./
