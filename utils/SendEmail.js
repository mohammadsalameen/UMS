import nodemailer from "nodemailer";

export async function SendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohammadsalameen.02@gmail.com",
      pass: "vvwi pquq dgfz ihzd",
    },
  });
  const info = await transporter.sendMail({
    from: '"Node 10 👻" <mohammadsalameen.02@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });

}
