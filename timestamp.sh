# Timestamp a git/npm project in node JS
echo "export default {"
date -u '+buildTime: "%Y-%m-%dT%H:%M:%SZ",'
git log | grep commit | head -1 | sed -e 's/ /: "/' | sed -e 's/$/",/'
echo npmInfo:
npm version
echo "};"
