// StudyConnect - Firebase Configuration & Initialization
// Project: study-connect-2daf8

const firebaseConfig = {
  apiKey: "AIzaSyDshtsT8serz6x2UpzZwhDFEdWtxrLnQeU",
  authDomain: "study-connect-2daf8.firebaseapp.com",
  projectId: "study-connect-2daf8",
  storageBucket: "study-connect-2daf8.firebasestorage.app",
  messagingSenderId: "972591459823",
  appId: "1:972591459823:web:394255af6655544f645a1a",
  measurementId: "G-SZ6XYDGPB0"
};

// Initialize Firebase
let firebaseApp = null;
let firebaseAuth = null;
let firebaseAnalytics = null;
let firebaseDb = null;

try {
  if (typeof firebase !== 'undefined') {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    firebaseAuth = firebase.auth();
    
    // Initialize Analytics if supported
    if (firebase.analytics) {
      try {
        firebaseAnalytics = firebase.analytics();
      } catch (err) {
        console.warn('Firebase Analytics not supported in this environment:', err);
      }
    }

    if (firebase.firestore) {
      firebaseDb = firebase.firestore();
    }
    
    console.log('✅ Firebase initialized successfully for StudyConnect (study-connect-2daf8)');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Make accessible globally
window.firebaseConfig = firebaseConfig;
window.firebaseApp = firebaseApp;
window.firebaseAuth = firebaseAuth;
window.firebaseAnalytics = firebaseAnalytics;
window.firebaseDb = firebaseDb;
