#!/bin/bash

echo "export default {"
date -u '+  buildTime: "%Y-%m-%dT%H:%M:%SZ",'
if [ -d .git ]; then
  commit=$(git log --pretty=format:'%H' -n 1)
else
  commit="unknown"
fi
echo "  commit: \"$commit\","
echo "  npmInfo: {"
npm version | grep -v '^{' | while IFS=: read key value; do
  key=$(echo "$key" | xargs)
  value=$(echo $value | xargs)
  # Remove any trailing comma from value
  value=$(echo "$value" | sed 's/,$//')
  if [ "$key" != "}" ]; then
    echo "    '$key': '$value',"
  fi
done
echo "  }"
echo "}"