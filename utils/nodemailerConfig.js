let mailConfig;

mailConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
};

module.exports = mailConfig;

/* when using Sendgrid or another email host add this: 

if (process.env.NODE_ENV === 'production') {
  mailConfig = {
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  };
} else { 
  <ETHEREAL TEST CONFIG GOES HERE>
  
  */
