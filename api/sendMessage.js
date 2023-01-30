import twilio from 'twilio';

export default function sendMessage(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const { phone, name } = req.body;
  const message =
  `Hi, ${name}! Carol's Birthday is next Friday.
To schedule dinner via text, click here:
https://luvcyrano.com/text-schedule
To schedule dinner via the Cyrano app, click here:
https://luvcyrano.com/in-app-schedule`;

  client.messages
    .create({
      body: message,
      from: '+19705008871',
      to: phone,
    })
    .then((message) =>
      res.json({
        success: true,
      })
    )
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
      });
    });
}