# travel buddy
> Created by codingNoamds, this app was conceived for travelers that wish to find a buddy to travel with. They can either create trips and wait for people to join them, or search through other people's trips and join them in their adventures.
> Our app is hosted in heroku [_Click here to take a look._](https://travel-buddy-cn.herokuapp.com/)

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [New features](#new-features)
* [Authors](#authors)


## General Information
### Context
This project was created during our 2-week final project for </Salt> bootcamp. Here, we incorporated different technologies we learned during the bootcamp.

### Idea
As travelers ourselves, we understand sometimes it is hard to find a buddy to travel with you. With this project, we wanted to create a place where travelers can share their ideas and get people to join them.

## Technologies Used
### Front-end
- TypeScript
- React
- Redux

### Back-end
- Node.JS
- Express.JS
- Passport.JS
- OAuth with Google

### Database
- PostgreSQL

### Deployment and hosting
- Docker container
- Heroku hosting
- GitHub actions for CI/CD pipeline


## Features
So far, we have incorporated the following features:
- Users can search through and filter any existing trips.
- Users can login using Google.
- Logged-in users can create a trip and include relevant information, photos and videos.
- Logged-in users can send a request to join a trip, which the author of the trip has to approve of reject.
- Contant details, such as email, it is only shared when a user send a request to join a trip.
- Created trips are displayed in a map for easy finding.


## Screenshots
![Example screenshot](./img/screenshot.png)
<!-- If you have screenshots you'd like to share, include them here. -->


## Setup
The project is separated in two parts: client and server. If anybody wants to clone this project, they have to go into the client folder and install dependencies using `npm install`, and then run the development server using `npm start`. To start the server, they have to go into the server folder and install dependencies using `npm install`, and then run the development server using `npm run dev`. A list with all scrips is found in the package.json files included in client and server folders.

In order to run a local copy, users need to include an .env file in the server folder with the following information:
- SQL_URL_DEV - URL to postgreSQL database.
- GOOGLE_CLIENT_ID - Google credentials to enable authentication with passport and oauth
- GOOGLE_CLIENT_SECRET - Google credentials to enable authentication with passport and oauth
- SESSION_SECRET - Secret to store sessions

There is also a Dockerfile in the root folder to create a container. Below are the commands to build and run a docker container:
- Build: `docker build -t travel-buddy-image .`
- Run: `docker run -p 5500:5500 --env-file ./server/.env --name travel-buddy travel-buddy-image`


## Project Status
The project is currently on progress, and some additional features will be included in the future.


## New features and bugs
Known bugs:
- If a user clicks twice rapidly the 'create trip' button, a trip will be created twice.
- Users can send several requests to join a trip.
- When clicking the 'filter trips' button, the screen doesn't scroll down to show the filtered trips.

Future features:
- Spinner / loading message while fetching information from db.
- Reviews between users.
- Messages between users.
- Live notifications when there is a new message or request.


## Authors
This project was created by codingNomads:
- Patrycja Panasiuk - [GitHub](https://github.com/qatta93)
- Thomas Karageorgiadis - [GitHub](https://github.com/Thoma-K)
- Alejandro Aburto Salazar - [GitHub](https://github.com/aburto22)
