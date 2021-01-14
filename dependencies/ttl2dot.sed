1i\
digraph InternalDependencies {
$a\
}
s?<[^<]*/\([a-zA-Z_\.0-9-]*\)>?<\1>?g
s/\.$/;/g
s/<//g
s/>//g
s/:dependsOn/ -> /g
s/\.js//g
s/\.ts//g
s/\([a-zA-Z_\.0-9-]\)-\([a-zA-Z_\.0-9-]\)/\1_\2/g
/ ;$/d
# ends
