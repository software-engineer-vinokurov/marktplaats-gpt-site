# Known Problems

## Building/deploying with local library

Because we are using an unpublished library **negotiate-ninja-lib** to share code with browser extension apps, the build/deployment is fucked up
(see https://github.com/angular/angular/issues/35586).

Currently there is a workaround, but it requires changes if you want to run `ng serve` or `ng build` (and also if you want to deploy the build).

### `ng serve`

You need to ensure that _tsconfig.json_ has this `compilerOptions.paths` value (MUST NOT HAVE `@angular/*` mapping there!):

```json
  "compilerOptions": {
    "paths": {
      "negotiate-ninja-lib": [
        "../software-engineer-vinokurov/negotiate-ninja-browser-extension/projects/negotiate-ninja-lib/src/public-api"
      ]
    }
  }
```

Currently there is a _tsconfig.serve.json_ file which is used for `ng serve`.


### `ng build` and deploy

Two options are possible:

#### Option 1

Including built lib from linked module.

1. Ensure you removed custom `compilerOptions.paths` from _tsconfig.json_
   (not needed untill there is a separate _tsconfig.serve.json_ for `ng serve`).
2. And that you've built the library itself: `ng build negotiate-ninja-lib -c production`.
3. Then install the lib from `file:`:

   ```
   npm install ../software-engineer-vinokurov/negotiate-ninja-browser-extension/dist/negotiate-ninja-lib/
   ```

#### Option 2

Building lib from source.

You need to ensure that _tsconfig.json_ has this `compilerOptions.paths` value (MUST HAVE `@angular/*` mapping there!):

```json
  "compilerOptions": {
    "paths": {
      "@angular/*": [
        "./node_modules/@angular/*"
      ],
      "negotiate-ninja-lib": [
        "../software-engineer-vinokurov/negotiate-ninja-browser-extension/projects/negotiate-ninja-lib/src/public-api"
      ]
    }
  }
```

You can use _tsconfig.serve.json_ file for this.


## Deployment with standalone `angular-cli-ghpages` command

See https://github.com/angular-schule/angular-cli-ghpages/issues/173 for the explanation of why using standalone `npx angular-cli-ghpages --dir`.
