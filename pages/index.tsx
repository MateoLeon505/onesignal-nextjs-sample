import Head from "next/head";
import useOneSignal from "./hooks/onesignal";
import OneSignal from "react-onesignal";
import { useEffect, useState } from "react";

// Envío de notificación
// async function sendUserNotification(userId: string) {
//   try {
//     const json = JSON.stringify({ userId });
//     fetch("/api/notify", {
//       method: "POST",
//       body: json,
//     });
//   } catch (e) {
//     console.error("Failed to send notification", e);
//   }
// }

//Asignar etiquetas a los usuarios en la aplicación
const onHandleTag = (tag: string) => {
  console.log("Tagging");
  OneSignal.sendTag("Tokens amount", tag).then(() => {
    console.log(`tagged, ${tag} Tokens selected`);
  });
};

const Home = () => {
  const [osUser, setOsUser] = useState("");
  useOneSignal();

  useEffect(() => {
    const loadOneSignalUser = async () => {
      // Capturar ID único asignado por OneSignal - Asociado con el navegador
      try {
        const userId = await OneSignal.getUserId();
        if (userId) {
          setOsUser(userId);
        }
      } catch (error) {
        console.log("error al obtener el userID", error);
      }
    };
    console.log(osUser);

    loadOneSignalUser();
  }, []);

  return (
    <>
      <Head>
        <title>OneSignal + Next.js 13</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto sm:px-6 lg:px-8 mt-4 mb-4 h-screen flex flex-col gap-4">
        <h1 className="text-3xl text-center">INVERTÍ EN TU JUGADOR FAVORITO</h1>

        <h4 className="text-sm text-center">Cantidad de Tokens</h4>

        <div className="flex flex-row justify-center gap-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              // osUser && void sendUserNotification(osUser);
              osUser && onHandleTag("10");
            }}
            className="p-2 border border-green-300 w-48 rounded-lg  hover:scale-105 transition-all"
          >
            10 Tokens
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              // osUser && void sendUserNotification(osUser);
              osUser && onHandleTag("25");
            }}
            className="p-2 border border-yellow-500 w-48 rounded-lg  hover:scale-105 transition-all"
          >
            25 Tokens
          </button>
        </div>

        <span className="justify-center mx-auto">
          UserId: {osUser || "Anonymous"}
        </span>
      </main>
    </>
  );
};

export default Home;
