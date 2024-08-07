# ievv_jsbase

General purpose ES6 utility library for common web client needs.

ievv_jsbase is created to cover basic javascript needs for the
https://github.com/appressoas/ievv_opensource and
https://github.com/appressoas/django_cradmin
python libraries.


## Install

```bash
nvm use 20
npm install ievv_jsbase
```


## Docs

Read the docs online
### [Online docs](https://appressoas.github.io/ievv_jsbase/)

or build the docs locally

1. Clone a local copy of the https://github.com/appressoas/ievv_jsbase git repo.
2. Run ``npm install``
3. Run ``npm run build-docs``
4. Open ``docs/index.html`` in a browser.


## Release a new version
(for people with publish permissions for the npm package)

1. Build:

   ```bash
   nvm use 20
   npm run build
   ```
2. Update the ``version`` in ``package.json``.
3. ``npm publish``.
4. Git commit the changes. The commit should be
   ``Release <version>``
   where ``<version>`` is the same version as you used in (2).
5. ``git tag <version>`` where ``<version>`` is the same version as
   you used in (2).
6. ``git push && git push --tags``.


## Release a new version on github

1. Build:

   ```bash
   npm run build
   ```
2. Update the ``version`` in ``package.json``.
3. Git commit the changes. The commit should be ``Release <version>``
   where ``<version>`` is the same version as you used in (2).
4. ``git tag <version>`` where ``<version>`` is the same version as
   you used in (2).
5. ``git push && git push --tags``.
