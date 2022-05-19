# SeatApp Frontend

##About

###Purpose
This application was developed during an internship at Xplore. The intent of this application is that a cronos employee could log in
through Azure Ad and then get a list of available seats in the office.
Here he would then be able to reserve a seat so that he would definitely have a seat.
Once arrived at the seat, the user would scan a QR code and thus check in at his seat so that
the system knows that he is actually present.

###Why React Native?
We have chosen to build the frontend of the seat app in react native. We made this choice because we had no experience with IOS applications. 
Besides that we have worked with react in some projects in the past, so we thought that this wouldn't be a big change. Another big benefit of react native was that it could build 
a website, android app and an IOS app all with the same code.

###How to login
Another important implementation is about security, in order to access the application you have to login on Azure Ad
but at this moment only people with an account from Cronos can login onto the application.

##Development
### Setup 
start up the application using the code: `npm start`<p/>
**note:** When using development it is important that the backendurl is configured correctly.
You can find the url in the `src/config/EnvironmentVariableConfig.ts` file.

####Expo
We have chosen to use Expo to build our ios and android applications from the react native code.
We made this choice because we weren't experienced with react native and how to deploy the mobile apps.
Expo Does most of these things for you by using some simple commands. You can find how to build the mobile apps in this file under Deploy.
## Deploy
### Web deploy
To deploy the website on AWS S3. You can do this by first executing: `npm run build`.

Afterwards deploy the created files to AWS S3 by executing this command: `npm run deploy`. 

### Android export 
You can export it to an apk using the code: `expo run:android -d`