import { OnesignalAppId } from "@/common/config"
import React, { useRef } from "react"
import OneSignal from "react-onesignal"

const useOneSignal = () => {
  const onesignalInitializingRef = useRef(false)

  React.useEffect(() => {
    const init = async () => {
      try {
        if (!onesignalInitializingRef.current) {
          console.log("Initializing OneSignal")
          onesignalInitializingRef.current = true
          await OneSignal.init({
            appId: OnesignalAppId,
            allowLocalhostAsSecureOrigin: true,
            notifyButton: {
              enable: true,
              size: "large",
            },
          })

          OneSignal.addListenerForNotificationOpened((notification) =>
            console.info("Notification Opened", { notification })
          )

          OneSignal.on("notificationDisplay", (event) =>
            console.info("Notification Display", { event })
          )
        }
      } catch (e) {
        console.error("OneSignal Initilization", e)
      } finally {
        onesignalInitializingRef.current = false
      }
    }

    init()
  }, [])
}

export default useOneSignal
