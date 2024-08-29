const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "mehrajalikhan75@gmail.com",
    pass: "awqbfqthqhrpxgjj",
  },
});
async function sendMail(to,subject,text,html) {
  const info = await transporter.sendMail({
    from: 'mehrajalikhan75@gmail.com', 
    to,
    subject,
    text,
    html
  });
}

module.exports={sendMail}
