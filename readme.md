# Real time todo app

> A real time todo app built with a monorepo setup using yarn workspaces and docker compose for local development.

> - The frontend is a react app setup with vite, typescript, and tailwindcss.
> - The backend is an express app setup with typescript.
> - Husky will run prettier and eslint on commit.

## Requirements

_To run on local machine the requirements are_

- Node >=20
- pnpm >=6
- Docker desktop | Docker engine
- A postrges database on local ( running on docker will create one for you)

## Configuration

## Getting Started

#### Local Development

- run `pnpm monorepo:init` to initialize the monorepo.

  - update env files accordingly.

- run `pnpm install` to install all dependencies.

- run `pnpm dev` to start the development server.

- run `pnpm build` to build the project.

- run `pnpm start` to start the production server.

#### Docker Local Development

- run `docker compose -f ./docker/compose/docker-compose.dev.yaml build` to build the development server.
- run `docker compose -f ./docker/compose/docker-compose.dev.yaml up` to start the development server.

Note: _the project is currently setup to run linter in development watch mode to enforce best practices while coding you can remove that easily tweaking the dev commands_

In the migration file you need to move the import of

```javascript
const { DataTypes, QueryInterface } = require('sequelize');
```

into the file that will be ran first

**WINDOWS**: Use the command dev:windows in Dockerfile

##### Envs

- The server app uses a `.env` file to configure the server.
- The client app uses a `.env` file to configure the client.

VITE_BACKEND_URL & VITE_WS_URL are the same endpoint the only difference is the protocol so for example

```
VITE_BACKEND_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000
```

##### Known Issues

The client app gets packages errors:
_workaround: remove mounted node_modules from the docker-compose.dev.yaml file, rebuild project, include them again and rebuild a second time_

The server app gets this error: _Adress already in use_
_workaround: restart containers_

#### Production build

This project is deployed on [railway.app](https://railway.app/). Railway reads from the railway.toml file to deploy the project with the Dockerfiles present in each service.

---

### About the project

##### Implemented features

- [x] I as a user can create to-do items, such as a grocery list.
- [x] I as another user can collaborate in real-time with user - so that we can (for example) edit our family shopping-list together.
- [x] I as a user can mark to-do items as “done” - so that I can avoid clutter and focus on things that are still pending.
- [x] I as a user can filter the to-do list and view items that were marked as done - so that I can retrospect on my prior progress.
- [x] I as a user can add sub-tasks to my to-do items - so that I could make logical groups of tasks and see their overall progress.
- [x] I as a user can create multiple to-do lists where each list has its unique URL that I
      can share with my friends - so that I could have separate to-do lists for my groceries
      and work related tasks.
- [x] I as a user can change the order of tasks via drag & drop
- [x] I as a user can be sure that my todos will be persisted so that important information
      is not lost when server restarts
- [x] I as a user can move/convert subtasks to tasks via drag & drop

##### Additional features

- [x] I as a user can see the status of my pending / done tasks in the list
- [x] I as a user can filter my tasks by text

---

##### My diatribe about the project

I decided to use a monorepo template I had built not long ago as a hobby project as the base structure for this project. The monorepo template is setup with yarn workspaces and docker compose for local development. The frontend is a react app setup with vite, typescript, and tailwindcss. The backend is an express app setup with typescript and graphl. Husky will run prettier and eslint on commit.

##### Frontend

On the frontend I use [Tanstack Query](https://tanstack.com/query/latest) for fetching data and as a state management library. I find it a great tool because it allows to fetch data wherever it is needed combining all the queries and executing only once, thus reducing the need of prop drilling, just calling the data we need wherever we need it and simplifying the code.

For the sockets connection I still needed to use ApolloClient since Tanstack Query does not support connecting to subscriptions yet. The way updates are managed is that when we receive an message from the socket we update the react-query cache with the new data for fast updates. Then react-query will refetch the data from the server to make sure the data is up to date.

When I work on a new project I also like to try out new libraries and tools. This is why I wanted to explore the other tools that Tanstack offers. I really appreciate the creator and trust that his packages are solid.
So I use [Tastack Form](https://tanstack.com/form/latest) to manage the forms. It is a great tool that allows to manage the form state and validation in a very simple way, in this case I paired it with zod. It is also headless so it can be used in combination with any UI components.

For the routing I use [Tanstack Router](https://tanstack.com/router/latest). It is a fully typed router that allows to create nested routes and as in this case createsa App folder routing system similar to Next.js. I also manage autheticated routes through the router in a very simple way.

Again with the same idea of exploring new tools very praised right now I tryed [shadcnui](https://ui.shadcn.com/docs) for the UI components in combination with tailwind css. It is not a component library so we own the code and have a great flexibility to customize the components. It is also very well documented and has a great community. adoption of this kind of tool is growing rapidly so here is a small showcase of what they can do

#### Backend

On the backend I use an express server paired with [Apollo Server](https://www.apollographql.com/docs/apollo-server) and (Apollo Server Subscriptions)[https://www.apollographql.com/docs/apollo-server/data/subscriptions] since I know you use GraphQL in your projects and again for the love of exploring new ways of doing things.

I installed [Graphql-codegen](https://the-guild.dev/graphql/codegen/docs/getting-started) so that all the queries can be typed both on the Bcakend and the frontend.

The database is a PostgresQl DB and the ORM in use is the classic [Sequelize](https://sequelize.org/master/).
Migration files have been created to set it up and have a clean database structure.

##### Final observations

I tried to use as lightweight libraries as possible to develop features in the project by myself. In production I would probably take another approach to have a more stable and easy to maintain project, for example with the drag and drop functionality or the sockets. But yet again it was very fun for me to implement features I never worked on in a more "vanilla" way and this way allow to understand and learn better the underlying functionalities of how these things work.

**Thank you for the opportunity to work on this project. I hope you like it and I am looking forward to your feedback.**
