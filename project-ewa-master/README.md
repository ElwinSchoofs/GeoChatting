# Project Enterprise Web Application

This project is a web app based on the game GeoCaching. Users are able to place messages on different locations. Only registered users are able to play this game.
This project is made as an assignment for the 'Project Enterprise Web Application' of Hogeschool van Amsterdam.

## Run tests for the front-end with Jasmine
In order to run the tests made for the front-end, open up the project in IntelliJ IDEA.
Open the file `package.json`. Click on the green play icon next to line 8: `"test": "ng test"`.

An alternative way to run the front-end test is the following:
Go with the commandline/terminal to the project's root directory. Run `ng test`.

## Running tests for the back-end with JUnit
In order to run the tests made for the back-end, open up the project in IntelliJ IDEA.
Go to the following folder: Ewaserver > src > test > java. Right click on this folder and choose "Run 'All Tests' with coverage".

## Getting started
The instructions below will allow you to get the project up and running on your local environment for development and testing purposes.
There's also a section about deployment to see how you can deploy the project on a live environment.

## Prerequisites
* NodeJS v10.X
* NPM v6.X
* Angular CLI v8.X.X
* IntelliJ Ultimate v2019.X
  * Install Spring plugins
    * Spring Boot
    * Spring Data
    * Spring MVC
    * Spring Support
    * Spring WebSocket
* Chrome (Browser) Latest version
* Java v11
* Git (bash) v2.X.X.X
* MySQL Server (5.7 and above)
* MySQL Workbench (8.0 and above)

X = indicates the value can be any number before the comma.

#### geoChatting Resource Application
```
git@gitlab.fdmci.hva.nl:karaerk/project-ewa.git
```

#### initialize the project API 
after clongin our repository, navigate to the API folden and enter the following command to install the dependencies of the API:
`npm install`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.12.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment 
Once all the dependencies have been installed, the project will be ready for deployment. 
There are currently two ways of deploying: development and live which are explained further below.

### Development 
Notice: keep the api and the app dependency packages up-to-date by using the following command: 
`npm update`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Built With 
- Angular - Front-end framework 
- Spring boot - back-end framework 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Database 
in our application.properties files you can add your database to the project by filling in: 
- spring.datasource.url=
- spring.datasource.username=
- spring.datasource.password= 

once you have done this your database will automatically connect with your project. 

## Maven project 
sometimes the project doesn't sees it selves as a maven project. If you come across this error 
go to your pom.xml file click on your right mouse and add it as a maven project. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Authors 
- Kerim Karear - Lead Developer 
- Sarah Rehman - Developer 
- com.example.ewaserver.Niels Bierman - Developer  
- Elwin Schoofs - Developer 
- Luuk Wagenaar - Developer 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
