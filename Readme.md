# Frontend Boilerplate - React Web

![](https://img.shields.io/badge/version-3-orange)
[![react](https://img.shields.io/badge/react-18-blue?logo=react)](https://reactjs.org)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## Navigation

### Languages

[<img src='https://img.shields.io/badge/view%20in-pt--BR-green' alt='project-version' />](Readme.pt-BR.md)

### Index

1. [Description](#description)
1. [Technology Stack](#technology-stack)
1. [Package Manager](#package-manager)
1. [Initial Setup](#initial-setup)
1. [Folder Structure](#folder-structure)
   - [Root](#root)
   - [src](#src)
   - [Features and Shared](#features-and-shared)
1. [Important Concepts](#important-concepts)
1. [Routes Config](#routes-config)
1. [Modules](#modules)
1. [Services](#services)
1. [Service Implementation](#service-implementation)
   - [Handling http requests](#handling-http-requests)
   - [Service instantiation](#service-instantiation)
1. [Tests](#tests)
1. [Roadmap](#roadmap)
1. [Doubts and suggestions](#doubts-and-suggestions)

---

## Description

Simple note taking app using a sticky notes style.

---

## Technology Stack

- [Pnpm](https://pnpm.io)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Axios](https://github.com/axios/axios)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
- [Faker.js](https://github.com/marak/Faker.js/)
- [Husky](https://github.com/typicode/husky)
- [Lint-Staged](https://github.com/okonet/lint-staged)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

## Package Manager

We use [pnpm](https://pnpm.io/motivation) as our package manager.

```bash
npm install -g pnpm

pnpm setup
```

---

## Initial Setup

```bash
## Clone repository
git clone https://github.com/tfsousa/sticky-notes.git

## Install dependencies
pnpm install

## Start dev-server
pnpm dev
```

---

## Folder Structure

This project has a folder structure separated by features further isolate each piece of the application.

This approach is somewhat similar to a micro front-end implementation, proving greater modularity to the application as a whole.

### Root

On the repository root we have our general configuration files, as well as our source folder which contains the application files.

<details><summary>Click to Expand</summary>

```
 ┣ 📂.husky
 ┣ 📂.vscode
 ┣ 📂node_modules
 ┣ 📂public
 ┣ 📂src
 ┣ 📜.editorconfig
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.huskyrc.json
 ┣ 📜.lintstagedrc.json
 ┣ 📜README.md
 ┣ 📜cypress.json
 ┣ 📜jest.config.js
 ┣ 📜package.json
 ┣ 📜template.dev.html
 ┣ 📜template.prod.html
 ┣ 📜tsconfig-eslint.json
 ┣ 📜tsconfig.json
 ┣ 📜webpack.common.js
 ┣ 📜webpack.dev.js
 ┣ 📜webpack.prod.js
 ┗ 📜yarn.lock
```

</details>

### src

The **src** folder contains all files from the application being developed. These files are generally what is included in the final bundle that gets deployed to production.

This folder internal structure now will mostly be comprised of the folders **app**, **core** and **main**.

The **app** folder is responsible for the project application files, where each separated feature must be located inside a features folder and a shared folder for elements that can be used by multiple features.

The **core** folder is responsible for...

The **main** folder is responsible for...

<details><summary>Click to Expand</summary>

```
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂features
 ┃ ┃ ┣ 📂shared
 ┃ ┣ 📂core
 ┃ ┃ ┣ 📂application
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┣ 📂infra
 ┃ ┃ ┣ 📂store
 ┃ ┃ ┣ 📂store
 ┃ ┃ ┣ 📂tests
 ┃ ┃ ┗ 📂types
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┣ 📂definitions
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┣ 📂providers
 ┃ ┃ ┣ 📂router
 ┃ ┃ ┣ 📜app.tsx
 ┃ ┃ ┣ 📜env.ts
 ┃ ┃ ┗ 📜index.tsx
```

</details>

### Features and Shared

The **features** folder structure follows the clean archtecture and domain-driven design (DDD) concepts.

Each feature must work unrelated to each other, with focus on decoupling as much as possible. That way features can be added or removed whenever necessary, and maintenance or updates can be done incrementally.

<details><summary>Click to Expand</summary>

```
 ┣ 📂features
 ┃ ┣ 📂feature-1
 ┃ ┃ ┣ 📂application
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┣ 📂presentation
 ┃ ┃ ┣ 📂router
 ┃ ┃ ┣ 📂store
 ┃ ┃ ┣ 📂validation
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂feature-2
 ┃ ┣ 📂feature-3
 ┣ 📂shared
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📂layouts
 ┃ ┃ ┗ 📂themes
```

## </details>

## Important Concepts

Following the concepts of Clean Architecture and DDD, the architecture was designed in such a way that there is decoupling between the layers of the application, being necessary to respect some limits between the layers to keep the structure cohesive and scalable.
&nbsp;

**_High-level components cannot depend on low-level components._**
&nbsp;

To be more objective, taking this boilerplate as an example, the following rules **_MUST BE RESPECTED_**.
&nbsp;

- The `domain` is the highest level layer, not allowing it to depend on any module, class or function of the other layers.
  <br/>
- The `data` layer is the layer where there are implementations of the `services` and `modules` of the `domain`, and may only depend on modules, classes and functions of the `domain`.
  <br/>
- The `infra` layer is the layer for integrating external libraries with the interfaces and protocols defined in the `domain` and `data` layer. Here the implementations will be made, for example, of the HttpClient that will be responsible for the requests in the application.
  <br/>
- The `presentation` layer is responsible for rendering the `view` to the user, and its direct dependency is on the `services` available within the `domain`.
  <br/>
- Within `presentation`, in several cases, it is necessary to use third-party libraries for, for example, date formatting, field validation, state storage, etc. It is extremely important to **_ABSTRACT ALL LOGIC IN PROTOCOLS_** and implement this protocol in its specific layer, later injecting the dependency into `presentation`, within available modules, pages or providers.
  <br/>
- In order to have this structure decoupled, we need to compose everything and, for that, the `main` layer is sacrificed to perform this function. Within this layer will be all the configuration files for routes, decorators, factories, adapters, among other methods necessary to make the correct assembly of all layers without breaking the principles of **_SOLID and Clean Architecture_**.

---

## Routes Config

The creation of routes is concentrated in a configuration file within the [`src/main/router/config/router-config.tsx`](src/main/router/config/router-config.tsx) file.

The file works as the aggregator for all the routes declared within each feature and is the one used within the [BrowserRouter](src/main/router/router.tsx)

Each route must be created in a new key, obligatorily informing all attributes, following the typing below:

<details> <summary>Click to Expand</summary>

```typescript
  [key: string]: {
    path: string
    title: string
    private: boolean
    component: React.LazyExoticComponent<React.FC<{}>>
    layout: string
  }
```

</details>

---

## Modules

Modules are used as a way of organizing correlated areas within the system. They must be created within the [`domain`](src/app/features/general/domain) and are types, constants and enums for use within that same feature.

There is no clear definition of what can or cannot be placed here, however, the idea is to use the `modules` consciously, maintaining a high abstraction and no relationship with external layers to the `domain`.

---

## Services

Services can also be viewed as actions (library executions, http requests, etc...).

External http requests must be made by implementing the [Service Command Interface](src/core/domain/command/service-command.ts). All types and interfaces required by the service execution must be declared within the service itself, preferably within its namespace, [example](src/app/features/general/application/services/get-system-config/get-system-config.ts).

Library abstractions, and general action creations must have their contracts (also known as protocols or interfaces) declared within the [`application`](src/core/application/protocols) layer of the core.

An interface (or contract) is defined with the method(s) and attribute(s) declaration required for its implementation. Here, it is not the moment to define how this service will be consumed, whether by `HTTP request`, `Firebase`, `Cognito` or in any other way. Right now, we're defining a business rule, an action we need to take to be able to meet the system's requirements.

It is important to maintain some standards at this point, trying to keep the interface cohesive and not violating the [SRP (`Single Responsibility Principle`)](https://en.wikipedia.org/wiki/Single-responsibility_principle).

**_Remember, an interface with many methods and responsibilities makes it difficult to write tests and increases the risk of bugs in the system._**

---

## Service Implementation

As mentioned before, external api calls must implement the [Service Command Interface](src/core/domain/command/service-command.ts), while new implementations must each have their own interface declared within the [`application`](src/core/application/protocols) layer of the core.

After that comes the actual creation of the service. That responsibility is in charge of the `data` layer, where a class will be created to carry out this implementation.

**_It is important that this method only depends on the `domain` and `data` layer interfaces._**

External methods or services consumed must be received through the constructor which in turn will be injected later during the service instantiation.

Methods required for the default execution of the service must be declared within the service and made private to prevent external changes.

#### Handling http requests

For external APIs, the response must be handled using the method [RequestResponse](src/core/application/http-response/http-response).

This class is responsible for validating the possible returns of the `http request`, using a pattern called `Either`. This pattern is generic, responsible for checking whether there are errors in the return, according to the `predicates` passed, returning an object with 2 methods and 1 attribute, namely `isError`, `isSuccess` and `value`, which contains the treated value. The return is made through the `error` or `success` methods, according to the `status code` of the request.

**_RECOMMENDATION FOR READING_**

- [The Either data type as an alternative to throwing exceptions](https://www.thoughtworks.com/insights/blog/either-data-type-alternative-throwing-exceptions)
- [Data Validation in Typescript Using the Either Pattern](https://dev.to/polyov_dev/data-validation-in-typescript-using-the-either-pattern-4omk)
- [Pattern matching and type safety in TypeScript](https://blog.logrocket.com/pattern-matching-and-type-safety-in-typescript-1da1231a2e34/)

#### Service Instantiation

Respecting the inversion of control principle from SOLID, all services must have their general methods externally injected, allowing the same implementation to fit multiple use cases.

For that, after creating the service, it must be properly instatiated in the service folder index.ts file, passing all consumables required through its constructor and exposing the newly created service implementation as well as all type declarations related to it.

Only then the service will be ready to be used directly or through a state management service like [RTK Query](https://redux-toolkit.js.org/rtk-query/overview).

---

## Tests

Automated testing is a way to ensure the project quality and funtionaly in the long term. As the project grows, unwanted secondary effects from new implementations become more frequent and sometimes a bug may stay hidden for the entire development process, only to be found during production.

To prevent that, writing tests alongside the development of new elements is always a good practice and so will be required for any new pull requests to be approved.

There are different types of tests, for now our emphasis will be on unit tests using `jest` and the `React Testing Library` tools.

For that, we have a few different scripts available to help with the writing and maintenance of the tests, all which can be found inside the [package.json](package.json) file.

Briefly, `test` is the base of the other unit tests (`test:watch`, `test:staged`, `test:ci`). During development, the `test:watch` script is recommended to monitor changes in tests as they are written in real time. `test:staged` is run automatically each time a commit is performed. Finalizing the unit test scripts, `test:ci` is executed before each push to the repository, generating a project coverage report.

Another, more complete type of test, known as end-to-end, is done using `Cypress` and the `msw` to mock api calls.

By default, during development the `test:cypress` command is used, which will open a new screen that will update automatically with each change in the tests. The `test:cypress:ci` script runs before each push to the repository, opening a headless browser to run all the tests.

<blockquote>
To be implemented...
</blockquote>

---

## Roadmap

The project will be constantly updated, with new features being added periodically.

Below are some that will be available soon:

- End to end testing
- Social network authentication
- Authentication by third-party apps (Google, Cognito, Firebase)
- Upload files with Amazon S3
- Internationalization
- General documentation improvements.

---
