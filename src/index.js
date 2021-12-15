import React from "react";
import FirebaseContext from "./components/FirebaseContext";

function Index({ features, credentials = {}, children }) {
  const [firebase, setFirebase] = React.useState(null);

  React.useEffect(() => {
    if (!firebase && typeof window !== "undefined") {
      const app = import("firebase/compat/app");
      const auth = features.auth ? import("firebase/compat/auth") : null;
      const database = features.database
        ? import("firebase/compat/database")
        : null;
      const firestore = features.firestore
        ? import("firebase/compat/firestore")
        : null;
      const storage = features.storage
        ? import("firebase/compat/storage")
        : null;
      const messaging = features.messaging
        ? import("firebase/compat/messaging")
        : null;
      const functions = features.functions
        ? import("firebase/compat/functions")
        : null;
      const performance = features.performance
        ? import("firebase/compat/performance")
        : null;
      const analytics = features.analytics
        ? import("firebase/compat/analytics")
        : null;

      Promise.all([
        app,
        auth,
        database,
        firestore,
        storage,
        messaging,
        functions,
        performance,
        analytics,
      ]).then((values) => {
        const firebaseInstance = values[0];
        firebaseInstance.initializeApp({
          apiKey: credentials.apiKey || process.env.GATSBY_FIREBASE_API_KEY,
          authDomain:
            credentials.authDomain || process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL:
            credentials.databaseURL || process.env.GATSBY_FIREBASE_DATABASE_URL,
          projectId:
            credentials.projectId || process.env.GATSBY_FIREBASE_PROJECT_ID,
          storageBucket:
            credentials.storageBucket ||
            process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId:
            credentials.messagingSenderId ||
            process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: credentials.appId || process.env.GATSBY_FIREBASE_APP_ID,
          measurementId:
            credentials.measurementId ||
            process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
        });
        setFirebase(firebaseInstance);
      });
    }
  }, []);

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
}

export default Index;
