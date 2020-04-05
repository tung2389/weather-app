# Weather app

This is a web app that use OpenWeatherMap api and React framework. Demo [here](https://tung2389.github.io/weather-app/) 
No update is planned in the future

IMPORTANT NOTE: IF YOU WANT TO USE .ENV FILE IN YOUR APP WHICH CREATED BY CREATE-REACT-APP, YOU MUST USE VARIABLES WHOSE PREFIXES ARE "REACT_APP_" IN ORDER TO MAKE THEM WORK. IT TAKES ME A LOT OF TIME TO FIGURE OUT THIS.

- If you want to hide your source map, delete all .map file in the build folder or add one of these scripts:
  - "build": "cross-env GENERATE_SOURCEMAP=false npm run build" or "build": "GENERATE_SOURCEMAP=false npm run build"
  - "postbuild": "rimraf build/**/*.map"
