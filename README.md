[![Build Status](https://travis-ci.org/Arquisoft/viade_es5a.svg?branch=master)](https://travis-ci.org/Arquisoft/viade_es5a)
[![codecov](https://codecov.io/gh/Arquisoft/viade_es5a/branch/master/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_es5a)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d8f6122f4e3e41adb48be3785ae07a48)](https://www.codacy.com/gh/Arquisoft/viade_es5a?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/viade_es5a&amp;utm_campaign=Badge_Grade)

# Viade - Decentralized Routes
### Currenty this project is ***WIP***.

This project is an assignment for the [Software Architecture course](https://arquisoft.github.io/) following [these requirements](https://labra.solid.community/public/SoftwareArchitecture/AssignmentDescription/).

## Getting Started

### Requirements

```
NodeJS >= v.12.4
```

### Installing

```
npm install
```

In this moment, you can check if installation has been completed succesfully running tests.

### Running
```
npm start
```

### Running with Docker
#### Using Docker image
This will enable you to try ViaDe App on http://localhost/viade_es5a.
```
docker run -it --rm jaluma/viade_es5a
```

#### Using Docker-Compose
Additional, we can launch it with SolidServer on https://localhost:8443.
```
docker-compose -f docker-compose.yml up
```


### Running the tests

Currently, we are testing with a framework called Jest. 

Our tests are executed automatically in Travis CI. Additionally, we use codecov as a tool to see what part of the code the tests are covering.

If you would like to run tests locally, run the following after installing dependencies:
```
npm run test
```

## Documentation

Technical documentation is available on [Docs](https://arquisoft.github.io/viade_es5a/docs)

### Building documentation

If you would like to build docuemntation locally, run the following:
> Note: it is necessary to have installed and configured Ruby in the environment variables. More info in [Ruby Official Page](https://rubygems.org/pages/download).

```
npm install
gem install asciidoctor
gem install asciidoctor-diagram 
npm run docs
```

## Wiki
Weekly meetings are uploaded to [Wiki](https://github.com/Arquisoft/viade_es5a/wiki).

## Deployment

Application is automatically deployment using [Github delivering deployment](https://arquisoft.github.io/viade_es5a/).

## Built With

* [React](https://reactjs.org/docs/getting-started.html) - The web framework used
* [Social Linked Data](https://github.com/solid) - The persistance layer used
* [ldflex](https://github.com/LDflex) - Library used to query the persistance
* [Google Maps API](https://developers.google.com/maps/documentation) - Library used for all relative maps
* [Jest](https://jestjs.io/) - Testing framework used

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Arquisoft/viade_es5a/tags). 

## Authors

* **Javier Martínez Álvarez** - [jaluma](https://github.com/jaluma)
* **Christian Días González** - [uo258427](https://github.com/uo258427)
* **María Isabel Fernández Pérez** - [isafdezpe](https://github.com/isafdezpe)
* **Luis Carlos Hurlé Fleitas** - [luishurle94](https://github.com/luishurle94)
* **Adrián Vaz Sánchez** - [Adri-San](https://github.com/Adri-San)

See also the list of [contributors](https://github.com/Arquisoft/viade_es5a/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Skelenton built using [Solid React Application Generator](https://github.com/inrupt/generator-solid-react).

## To Do
- [x] Documentation based on Arc42.
  - [x] Initial version.
  - [ ] Final version.
- [x] Skeleton.
- [x] Service Layer.
- [x] Solid Adapter.
- [ ] Map.
  - [x] Generate GeoJson from Route.
  - [x] Load GeoJson in Map.
  - [ ] Secure Google Maps API Key.
- [ ] Management
  - [x] Create Route.
  - [x] Create Milestones.
  - [x] List my routes.
  - [x] Details.
  - [ ] Share route.
    - [ ] Share routes.
    - [ ] List shared routes.
  - [ ] Friends
    - [x] List friends.
    - [ ] Add friends.
