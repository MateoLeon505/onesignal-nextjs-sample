import { appId } from "@/common/onesignal";
import React, { useRef, useEffect, useState } from "react";
import OneSignal from "react-onesignal";

// Hook personalizado de OneSignal
// Inicialización OneSignal - Conexión aplicación con servicio de OneSignal
const useOneSignal = () => {
  const [initializedOneSignal, setInitializedOneSignal] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        if (!initializedOneSignal) {
          console.log("Initializing OneSignal");

          await OneSignal.init({
            appId: appId,
            allowLocalhostAsSecureOrigin: true,
            notifyButton: {
              enable: true,
              size: "large",
            },
            // Para que solo controle las solicitudes de OS
            serviceWorkerParam: { scope: "/onesignal" },
          });
        }
      } catch (error) {
        console.error("OneSignal Initilization Error:", error);
      } finally {
        setInitializedOneSignal(true);
        console.log("Ended --> OneSignal Inicialization");
      }
    };

    init();
  }, []);
};

export default useOneSignal;

// if (!initialized) {
//   console.log("Initializing OneSignal");
//   // onesignalInitializingRef.current = true;
//   // Inicialización OneSignal - Conexión aplicación con servicio de OneSignal
//   await OneSignal.init({
//     appId: appId,
//     allowLocalhostAsSecureOrigin: true,
//     notifyButton: {
//       enable: true,
//       size: "large",
//     },
//     serviceWorkerParam: { scope: "/onesignal" },
//   });

//   OneSignal.addListenerForNotificationOpened((notification) => {
//     console.info("Notification Opened", { notification });
//     console.log("Notification Opened", { notification });
//   });

//   OneSignal.on("notificationDisplay", (event) => {
//     console.info("Notification Display", { event });
//     console.log("Notification Display", { event });
//   });
// }
