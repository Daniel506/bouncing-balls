# bouncing-balls

This is a bouncing ball application using webpack and typescript.

# Prerequisites

In order to build and run the application one needs to have yarn installed on classpath.
How to install yarn can be found here https://yarnpkg.com/lang/en/docs/install/#windows-stable.

# Build and Run the application

There are several custom scripts available to build and run the application. If you want to build the app you need to run the following script in the root directory of the project.

```bash
yarn build
```
If you want to start the app:
```bash
yarn start
```
The application will be accessible on https://localhost:9000 by default.

# How to use the application

The application generates a new ball on every click on the canvas. There is support of multiple balls on the canvas using webworkers. The ball will bounce from the bottom of the canvas until they loose their complete energy or get out of the canvas dimensions.
Additionaly, on the screen there is a configuration form that define the environment parameters, hence the behaviour of the balls in the canvas like the trajectory they will follow.

 * acceleration: the ground acceleration of the environment.
 * ballApsorption: defines the loss of energy when the balls bounce from the ground (bottom edge). 
   Value of 0.1 means that after the bounce the ball will 10% of it's speed before the bounce.
 * frameRate: defines the rate of the frames in which the ball will move in the canvas. Low value of frame rate will
   mean more frequent refresh of the canvas context, but more smooth movement of the balls.
 * canvasWidth: the horizontal dimension of the canvas.
 * canvasHeight: the vertical dimension of the canvas.
 * ballSize: the diameter of the circle that defines the ball that will bounce in the canvas.

This configuration is runtime configurable.
When one wants to change these parameters he/she needs to press the save button and create new balls (click on the canvas) and they will behave with the new environment configuration.

# Technical decisions

The proposed solution presented here is done using webpack, typescript and jest, using the webworker API.

## Why webworkers

I come from the java world where multithreading is always one of the most hot topics. I wanted to make total isolation of the concerns about the ball movement in the canvas for each ball. Hence, if the bouncing logic works only for one ball, and it works for n balls, by induction it will eventually perfectly work in a environment with a lot of balls.
I am aware this might have performance issues in some of the browsers and of course the performance depends of the number of workers currently active, but for me it was challenging to use the Webworker API and explore one of the newest features in the javascript world.

## Design

The technical design is based on several design patterns.

### Implementation of IoC

I have implemented my own logic for IoC and dependency injection. It's a simple application context which contains map of the objects that are candidates for dependendency injection. It consists of 3 parts registry, context configuration and configuration loader. 
* The registry is responsible to initialize and start the application context.
* The context configuration contains the configuration of the pool of objects that will be used in the DI, this module is responsible to generate all the objects and resolve all the dependencies.
* The configuration loader is application specific implementation which is responsible to correctly load the environmnet configuration from the input form.

### Services

On the service layer there are SoC in several aspects. 

* Drawing service (BounceDrawingService) is responsible for the actual drawing on the canvas. It reads the environment configuraion and draws the ball on the corresponding position in the canvas.
* Configuration service (ConfigurationService) is responsible to provide the environment configuration at runtime whenever it is injected.
* State service (StateService) is responsible to update the state of the ball at the defined frame rate. THe state is determined by the position and the velocity axis components. 

### Testing and test coverage

The application has a pretty solid unit and integration test coverage which can be found under the "__tests__" directory. I use *jest* for test execution.
In order to run the tests you can use:
```bash
yarn test
```
Additionaly, more detailed information about the testing one can find in the test coverage report:
```bash
yarn test-with-coverage
```
### Discussion of the test coverage

The lowest coverage of all classes has the actual worker implementation. Unfortunately, there isn't still good libraries that will allow easy integration testing of webworkers, there are a lot of discussion around this topic in the community, but no consensus has been estableished so far. 
However, I think the unit coverage is very helpful here, since the integration of the webworkers is tested in the third party implementation of the Webworker API. It would be really good if such integration can be tested on application level as well.

## Logging

While the application is running, one can notice several log messages in the browser console.
I decided to log the application context startup, the ball creation with the random parameters and when the ball is stopped.
