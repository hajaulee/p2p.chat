import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCPTMJfD74iDB0-IIOmS3zrg0D3bGyYAmI",
    authDomain: "hajau-chat-2323.firebaseapp.com",
    databaseURL: "https://hajau-chat-2323.firebaseio.com",
    projectId: "hajau-chat-2323",
    storageBucket: "hajau-chat-2323.appspot.com",
    messagingSenderId: "495790032633",
    appId: "1:495790032633:web:46e994b44e0737bcab0428"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);
export { database };