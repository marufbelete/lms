import config from "../config/config";


const accountConfirmationEmail = (email:string, name:string, token:string) => {
    const mailOptions = {
      from: config.FROM_EMAIL,
      to: email,
      subject: "Welcome to SorobanLearn",
      html: `<!DOCTYPE html><html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><style>
          *{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}.desktop_hide,.desktop_hide table{mso-hide:all;display:none;max-height:0;overflow:hidden}.image_block img+div{display:none} @media (max-width:520px){.image_block img.fullWidth{max-width:100%!important}.mobile_hide{display:none}.row-content{width:100%!important}.stack .column{width:100%;display:block}.mobile_hide{min-height:0;max-height:0;max-width:0;overflow:hidden;font-size:0}.desktop_hide,.desktop_hide table{display:table!important;max-height:none!important}}
          </style></head><body style="background-color:#000;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"><tbody><tr><td><table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#000"><tbody>
          <tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#000;color:#000;width:500px;margin:0 auto" width="500"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table 
          class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad" style="width:100%"><div class="alignment" align="center" style="line-height:10px"><img src="https://hhlabspub.s3.amazonaws.com/sl-github.png" style="display:block;height:auto;border:0;max-width:500px;width:100%" width="500"></div></td></tr></table><table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" 
          cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad"><div style="color:#fff;direction:ltr;font-family:'Lucida Sans Unicode','Lucida Grande','Lucida Sans',Geneva,Verdana,sans-serif;font-size:29px;font-weight:700;letter-spacing:0;line-height:120%;text-align:center;mso-line-height-alt:34.8px"><p style="margin:0">Welcome, ${name}</p></div></td></tr></table><table class="image_block block-3" width="100%" border="0" 
          cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad" style="width:100%;padding-right:0;padding-left:0"><div class="alignment" align="center" style="line-height:10px"><img class="fullWidth" src="https://www.reactiongifs.com/r/fgwv.gif" style="display:block;height:auto;border:0;max-width:500px;width:100%" width="500"></div>
          </td></tr></table><table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad"><div style="color:#fff;direction:ltr;font-family:'Lucida Sans Unicode','Lucida Grande','Lucida Sans',Geneva,Verdana,sans-serif;font-size:14px;font-weight:400;letter-spacing:0;line-height:120%;text-align:left;mso-line-height-alt:16.8px"><p style="margin:0;margin-bottom:16px">
          Thank you for taking the time to create an account at SorobanLearn!</p><p style="margin:0;margin-bottom:16px">I am excited that you have started your journey in becoming a smart contract developer on Soroban. In the coming days and weeks I will be reaching out to check in on your progress.</p><p style="margin:0;margin-bottom:16px">
          In the meantime, please feel free to join our <a href="https://discord.gg/QBS4CPxMHS" target="_blank" style="text-decoration: underline; color: #0068a5;" rel="noopener">discord</a> server!</p><p style="margin:0;margin-bottom:16px">Thanks!</p><p style="margin:0">- Jonathon</p></div></td></tr></table><div class="spacer_block block-5" style="height:110px;line-height:110px;font-size:1px">&#8202;</div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody>
          </table></body></html>`,
    };
  
    return mailOptions;
  };
  

export{
    accountConfirmationEmail
}