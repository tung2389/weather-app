IMPORTANT NOTE: IF YOU WANT TO USE .ENV FILE IN YOUR APP WHICH CREATED BY CREATE-REACT-APP, YOU MUST USE VARIABLES WHOSE PREFIXES ARE "REACT_APP_" IN ORDER TO MAKE THEM WORK. IT TAKES ME A LOT OF TIME TO FIGURE OUT THIS.

- If you want to hide your source map, delete all .map file in the build folder or add one of these scripts:
  - "build": "cross-env GENERATE_SOURCEMAP=false npm run build" or "build": "GENERATE_SOURCEMAP=false npm run build"
  - "postbuild": "rimraf build/**/*.map"
