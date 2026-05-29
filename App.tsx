import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { requestUserPermission, sendFCMTokenToServer, setupNotificationListeners, clearAllNotifications, showLocalNotification, } from "./src/services/notificationService";
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

function App(): React.JSX.Element {

  useEffect(() => {

    const initFCM = async () => {

      // Firebase Analytics 
      analytics().logAppOpen();
      analytics().logEvent("app_launched");

      // Firebase Crashlytics 
      crashlytics().log("PWC App Mounted");

      // Request notification permission
      await requestUserPermission();

      // Send token to backend
      await sendFCMTokenToServer();

      // Subscribe ALL users to a topic (optional)
      try {
        await messaging().subscribeToTopic("global");
        console.log("✅ Subscribed to global topic");
      } catch (err) {
        console.log("❌ Topic subscribe error:", err);
      }

      // Setup listeners (foreground notifications)
      const unsubscribe = setupNotificationListeners();

      // Background notification handling
      const unsubscribeOpened = messaging().onNotificationOpenedApp(
        async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          console.log("📩 Opened from background:", remoteMessage);

          const notificationRaw = remoteMessage.notification ?? {
            title: remoteMessage.data?.title,
            body: remoteMessage.data?.body,
          };
          const notification = {
            title: typeof notificationRaw.title === "string" ? notificationRaw.title : JSON.stringify(notificationRaw.title),
            body: typeof notificationRaw.body === "string" ? notificationRaw.body : JSON.stringify(notificationRaw.body),
          };

          await showLocalNotification(notification);
        }
      );

      // Quit state notification handling
      const initialMessage = await messaging().getInitialNotification();
      if (initialMessage) {
        const notificationRaw = initialMessage.notification ?? {
          title: initialMessage.data?.title,
          body: initialMessage.data?.body,
        };
        const notification = {
          title: typeof notificationRaw.title === "string" ? notificationRaw.title : JSON.stringify(notificationRaw.title),
          body: typeof notificationRaw.body === "string" ? notificationRaw.body : JSON.stringify(notificationRaw.body),
        };

        await showLocalNotification(notification);
      }

      // Cleanup when component unmounts
      return () => {
        unsubscribe();
        unsubscribeOpened();
        clearAllNotifications();
      };
    };

    initFCM();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;