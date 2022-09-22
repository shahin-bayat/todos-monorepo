# how to setup the application

- change .env.temple to .env and add postgresql url, in case you want to use any other db, don't forget to change the provider in schema.prisma
- server is a dependency of client, served as a package, if you change the name and version of server, you should update it in package.json in client.

- TO RUN the project ,in the root folder:

```bash
yarn

yarn dev
```
