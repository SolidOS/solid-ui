# Make dependency diagram of js functions
# https://graphviz.readthedocs.io/en/stable/manual.html
# https://www.graphviz.org/pdf/dotguide.pdf

# Where to find source files
S=../src
# Where to put files?
D=.

InternalDependencies.svg: $D/dependencies.dot
	dot  -Tsvg -oInternalDependencies.svg $D/dependencies.dot
$D/dependencies.dot : $D/all.ttl ttl2dot.sed
	sed -f ttl2dot.sed < $< > $@
$D/all.ttl : $D/imports.ttl $D/requires.ttl
	cat $D/imports.ttl $D/requires.ttl > $@
$D/imports.ttl : $D/imports.txt
	sed -e 's/^\([^:]*\):.*from .\(.*\)./<\1> :dependsOn <\2>./' < $D/imports.txt > $@
$D/requires.ttl : convert-dependency.sed $D/requires.txt
	 sed -f convert-dependency.sed < $D/requires.txt > $@
$D/imports.txt : $D/source-file-list.txt
	cat $D/source-file-list.txt | xargs grep "import.*from " > $D/imports.txt
$D/requires.txt : $D/source-file-list.txt
	cat $D/source-file-list.txt | xargs grep "require(" > $D/requires.txt
# $D/imports-list.txt : $D/
#	 grep -e "^import.*from "   > $@
$D/source-file-list.txt :
	find $S -name "*.js" > $@

clean:
	rm imports.* requires.* source-file-list.txt dependencies.dot
# ends
