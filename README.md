# Quizzy - a quiz hosting website

## Features

1. User can create custom quizzes.
2. Quiz can be public or private.
3. Every quizzes have shareable short link. ex: https://shrtco.de/nPSqzg . Public quizzes ar accessible by everyone but private quizzes only for logged and authorized by the author user.
4. Host can delete quizzes.
5. Participants can see their overall performance chart.

## Technical Overview

1. React, Redux, RTK is used for building UI. RTK query is used for data fetching. Most of the cases i used optimistic and pessimistic caching rather than using invalidation and refetching.
2. Firebase is used for authentication.
3. Express.js for API and mongoDB used for stroing data.
4. For styling i used Tailwind CSS and Dais UI component Library.

## Dependencies

"aos": "^2.3.4",
"chart.js": "^4.1.1",
"daisyui": "^2.45.0",
"firebase": "^9.15.0",
"react": "^18.2.0",
"react-chartjs-2": "^5.1.0",
"react-copy-to-clipboard": "^5.1.0",
"react-dom": "^18.2.0",
"react-hook-form": "^7.40.0",
"react-loader-spinner": "^5.3.4",
"react-redux": "^8.0.5",
"react-router-dom": "^6.5.0",
"react-scripts": "5.0.1",
"react-toastify": "^9.1.1",

## Links

### Live: https://quizzy-ee12c.web.app/ (hosted on firebase)

### Demo quiz: https://shrtco.de/nPSqzg

### Server side repository: https://github.com/TanvirAnzum/quizzy-server-side.git
