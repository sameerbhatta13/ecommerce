const nodemailer=require('nodemailer')

const sendEmail=async(options)=>{

let transporter =nodemailer.createTransport( {
   host :process.env.SMTP_HOST,
   port:process.env.SMTP_PORT,
   secure:false,
    auth: {
        user:process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
})

let mailOptions= {
  from:options.from,
  to:options.to,
  subject:options.subject,
  html:options.html
}
await transporter.sendMail(mailOptions)
}
 module.exports=sendEmail 
