import { GoogleSpreadsheet } from "google-spreadsheet";
import { NextApiRequest, NextApiResponse } from "next";

type SheetForm = {
  inquiry: string;
  name: string;
  email: string;
  route: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    if (
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    ) {
      try {
        const body = req.body as SheetForm;
        const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
        await doc.useServiceAccountAuth({
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY,
        });
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow([body.route, body.name, body.inquiry, body.email]);
        return res
          .status(200)
          .json({ data: { message: "Thank you for sending your message!" } });
      } catch (e: any) {
        return res.status(500).send({ message: e.message });
      }
    } else {
      return res.status(500).send({ message: "Missing credentials" });
    }
  } else {
    return res.status(405).send({ message: "Incorrect method" });
  }
}
