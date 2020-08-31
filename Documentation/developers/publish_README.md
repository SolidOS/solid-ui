To publish the icons, examples, etc to https://solid.github.io/solid-ui/ do the following:
```sh
git fetch origin
git checkout gh-pages
git pull
git merge origin/master
npm run build
git commit -am"npm run build"
git push
```

FIXME: We should make Travis do this automatically.
