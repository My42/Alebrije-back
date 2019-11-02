# Alebrije

This project has been made for the Javascript Fullstack module at Epitech during the 5th year.

It's a web app to order tables and drinks at the famous night club _El Alebrije_.

## Getting Started
These instruction will get you a copy of the project and you'll be able to run it on your local machine for development and testing purpose. See [deployment](#deployement) for notes on how to deploy on a live system

#### Prerequisites

* Node `>8.11.4`
* Yarn `>1.17.3`
* PostgreSQL `^11.5`

#### Installing
Install all the dependencies
```
$ yarn install
```

Create the PostgreSQL database named `alebrije`
```postgres-sql
CREATE DATABASE alebrije;
```

Run the migrations
```
$ yarn run migration.up
```

Run the seeds
```
$ yarn run seed.run
```

#### Running the tests

Before running all the tests you have to create a database named `test_alebrije`
```postgres-sql
CREATE DATABASE test_alebrije;
```

Init the database
```
$ yarn run test.migration.up
```

Run the tests
```
$ yarn test
```

#### Running the app
Before running it you have to set an environment variable called `SENDGRID_API_KEY` with a [sendgrind](https://sendgrid.com/) api key

* on MACOS/Linux
    ```
    export SENDGRID_API_KEY=<API_KEY>
    ```
* on Windows
    ```
    # Windows CMD
    C:\> set SENDGRID_API_KEY="<API_KEY>"
    
    #Windows Powershell
    PS C:\> $env:SENDGRID_API_KEY="<API_KEY>"
    ```
You can now run the app
```
$ yarn run dev
```

## Deployement
#### On a live system
```
$ yarn start
```

#### On heroku
Push you changes on master and do the next command
```
$ git push heroku master
```

## Built with
* [TypeScript](https://www.typescriptlang.org/) - Typed javascript :fire:
* [ApolloServer](https://www.apollographql.com/docs/apollo-server/) - GraphQL server
* [TypeOrm](https://typeorm.io/#/) - To Simplify database interactions and add migrations and seeds

#### Contributing
Forbidden by Epitech

#### Authors
* **Vincent Mesquita** - [Github](https://github.com/My42)
* **Benjamin Peixoto** - [Github](https://github.com/benjyup)
* **Fabrice Sepret** - [Github](https://github.com/fsepret)
