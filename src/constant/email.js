const accountConfirmationEmail=(email,token)=>{
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Account Confirmation Link",
        html: `
        <div style="margin:auto; max-width:650px; background-color:#C2E7FF">
        <h1 style="text-align:center;color:#2791BD;padding:10px 20px;">
        TestRxMD Email Confirmation
        </h1>
        <p style="text-align:start;padding:10px 20px;">
        Follow the link to confirm your email.
        <a href="${process.env.BASE_URL}/confirm?verifyToken=${token}">click here<a/>
        </p>
        <div style="text-align:center;padding-bottom:30px">
        <img src="cid:unique@kreata.be"/>
        </div>
        </div>
      ` 
      };
      return mailOptions
}

module.exports={
    accountConfirmationEmail
}