this repo was set up following this tutorial: https://blog.logrocket.com/integrating-firebase-authentication-expo-mobile-app/ but has been converted out of typescript.

To get setup, run npm i .

This is the firebase repo https://console.firebase.google.com/project/fe-local-treasures/authentication/users

# IMPORTANT

Create a .env file , and paste the following in;

FIREBASE_API_KEY=AIzaSyCR-sljLvZD0Ee0-qT68vk2Y2mQ0fjVCRk
FIREBASE_AUTH_DOMAIN=fe-local-treasures.firebaseapp.com
FIREBASE_PROJECT_ID=fe-local-treasures
FIREBASE_STORAGE_BUCKETt=fe-local-treasures.appspot.com
FIREBASE_MESSAGING_SENDER_ID=643544699798
FIREBASE_APP_ID=1:643544699798:web:d23f56ec7a4e54cc6883b7

add .env to the bottom of your .gitignore

then npm start or npx expo start or expo start

# if this does not work try..

npm i
npm run start
npx expo install @expo/webpack-config@^0.17.2
npm i npm
run start

## tunneling

if you want to run the QR code in a mode where anyone can access it regardless of if they are on the same network, run `npx expo start --tunnel`
