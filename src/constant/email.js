const config = require("../config/config");

const accountConfirmationEmail=(email,name,token)=>{
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "LMS Account Confirmation",
        html: `
        <div style="margin:auto; max-width:650px; background-color:#C2E7FF">
        <h1 style="text-align:center;color:#2791BD;padding:10px 20px;">
        Welcome <span style="text-transform:capitalize"}>${name}</span>
        </h1>
        <p style="text-align:start;padding:10px 20px;">
        Follow the link to confirm your email.
        <a href="${config.BASE_URL}/auth/confirm?verifyToken=${token}">click here<a/>
        </p>
        <div style="text-align:center;padding-bottom:30px">
        </div>
        </div>
      ` 
      };
      
      return mailOptions
}

module.exports={
    accountConfirmationEmail
}