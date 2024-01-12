import config from "../config/config";

const accountConfirmationEmail=(email:string,username:string, token:string)=>{
    const mailOptions = {
        from: config.FROM_EMAIL,
        to: config.TO_EMAIL,
        subject: "LMS Account Confirmation",
        html: `
        <div style="margin:auto; max-width:650px; background-color:#C2E7FF">
        <h1 style="text-align:center;color:#2791BD;padding:10px 20px;">
        Welcome <span style="text-transform:capitalize"}>Hello there</span>
        </h1>
        <p style="text-align:start;padding:10px 20px;">
        Follow the link to confirm your email.
        </p>
        <div style="text-align:center;padding-bottom:30px">
        </div>
        </div>
      ` 
      };
      
      return mailOptions
}

export{
    accountConfirmationEmail
}