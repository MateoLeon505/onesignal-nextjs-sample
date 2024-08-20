import { appId, client as osClient } from "@/common/onesignal";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

//Para envío de notificaciones a usuarios específicos a través de OneSignal
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const body = JSON.parse(req.body);
    const apiRes = await osClient.createNotification({
      app_id: appId,
      include_player_ids: [body.userId],
      contents: {
        en: "You've been notified!",
      },
    });

    res
      .status(200)
      .send({ message: `Notification ${apiRes.id} sent to user ${""}` });
  } catch (err) {
    console.error(`Fatal error - ${err}`);
    res.status(500).send({ message: JSON.stringify(err) });
  }
};

export default handler;
