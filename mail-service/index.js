const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

let transporter; // We'll set this up once

async function setupEthereal() {
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log("Ethereal test account created:");
  console.log("  User:", testAccount.user);
  console.log("  Pass:", testAccount.pass);
}

app.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing "to", "subject", or "text" fields' });
  }

  try {
    const info = await transporter.sendMail({
      from: '"Hamperly Test" <test@hamperly.com>',
      to,
      subject,
      text,
    });

    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    res.status(200).json({
      message: 'Email sent (preview)',
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    console.error("Failed to send:", err.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  await setupEthereal();
  console.log(`Mail service running on port ${PORT}`);
});
