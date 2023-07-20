[
'PROD_DB_HOST',
'PROD_DB_USER',
'PROD_DB_PASSWORD',
'PROD_DB_NAME',
'DB_DIALECT',
'DB_PORT',
'PORT'
].forEach((name) => {
    if (!process.env[name]) {
      throw new Error(`Environment variable ${name} is missing`)
    }
  })

  const config={
    DB_HOST:process.env.PROD_DB_HOST,
    DB_USER:process.env.PROD_DB_USER,
    DB_PASSWORD:process.env.PROD_DB_PASSWORD,
    DB_NAME:process.env.PROD_DB_NAME,
    PORT:process.env.PORT,
    DB_PORT:process.env.DB_PORT,
    DB_DIALECT:process.env.DB_DIALECT,

  }
  module.exports=config