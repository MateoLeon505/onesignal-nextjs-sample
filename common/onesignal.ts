import * as OneSignal from "@onesignal/node-onesignal";

// Configuración para interactuar con la API de OneSignal
export const appId = process.env["NEXT_PUBLIC_APP_ID"]!;
const userAuthKey = process.env["ONESIGNAL_USER_AUTH_KEY"]!;

const configuration = OneSignal.createConfiguration({
  appKey: appId,
  userKey: userAuthKey,
});
export const client = new OneSignal.DefaultApi(configuration);
