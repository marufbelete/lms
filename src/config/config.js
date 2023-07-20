[
'DEV_DB_HOST',
'DEV_DB_USER',
'DEV_DB_PASSWORD',
'DEV_DB_NAME',
'DB_DIALECT',
'DB_PORT',
'PORT',
'ACCESS_TOKEN_SECRET',
'LONG_ACCESS_TOKEN_EXPIRY',
'ACCESS_TOKEN_EXPIRES'
].forEach((name) => {
    if (!process.env[name]) {
      throw new Error(`Environment variable ${name} is missing`)
    }
  })

  const config={
    DB_HOST:process.env.DEV_DB_HOST,
    DB_USER:process.env.DEV_DB_USER,
    DB_PASSWORD:process.env.DEV_DB_PASSWORD,
    DB_NAME:process.env.DEV_DB_NAME,
    PORT:process.env.PORT,
    DB_PORT:process.env.DB_PORT,
    DB_DIALECT:process.env.DB_DIALECT,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    LONG_ACCESS_TOKEN_EXPIRY:process.env.LONG_ACCESS_TOKEN_EXPIRY,
    ACCESS_TOKEN_EXPIRES:process.env.ACCESS_TOKEN_EXPIRES
  }
  if (process.env.NODE_ENV === 'production') {
    config.DB_HOST=process.env.PROD_DB_HOST,
    config.DB_USER=process.env.PROD_DB_USER,
    config.DB_PASSWORD=process.env.PROD_DB_PASSWORD,
    config.DB_NAME=process.env.PROD_DB_NAME
  } 

  module.exports=config