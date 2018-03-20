# Blocksource

## Overview
We basically were trying to make a Kickstarter clone with a crowdfunding smart contract written in Solidity to handle the collection and disbursement of funds. React/redux front-end, Nodejs backend and Truffle to manage smart contract deployment. We divided the work with Jesse taking the front-end and David taking the many-to-many back-end/Solidity side of things. Jesse also made a really solid attempt at rolling his own OAuth.

<code>POST</code>**/api/v1/login**

 - Custom OAuth login

<code>POST</code> **/api/v1/logout**

 - Custom OAuth logout

<code>GET</code>**/api/v1/contributors/:id**

 - Get single contributor

<code>GET</code>**/api/v1/projects**

 - Returns all projects

<code>GET</code>**/api/v1/projects/:id**

 - Returns a single project

<code>GET</code>**/api/v1/contributors/:id/projects**

 - Returns all projects of a single contributor

<code>GET</code> **/api/v1/projects/:id/contributors**

 - Returns all contributors of a single project

<code>POST</code>**/api/v1/projects**

 - Create project with user authentication

<code>POST</code>**/api/v1/contributors**

 - Create new user

<code>POST</code>**/api/v1/projects_contributors/project/**

 - Add newly created project to junction table

<code>PATCH</code>**/api/v1/projects/:id**

- Change description of a project

<code>PATCH</code>**/api/v1/contributors/:id**

 - Change bio of a user

## Wishlist

 - Finish Web3 implementation
 - Flesh out front end further with tools like react-router
 - Make architectural changes in both front and back to fix bugs
