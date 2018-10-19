#!/bin/sh
# from https://unix.stackexchange.com/questions/247843/how-to-generate-a-data-uri-from-an-image-file
mimetype=$(file -bN --mime-type "$1")
content=$(base64 < "$1")
echo "module.exports =  'data:$mimetype;base64,$content'"
# ends
