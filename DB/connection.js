import { Sequelize } from "sequelize";
export const sequelize = new Sequelize('freedb_UMSProject', 'freedb_mohammad@', '?JCuPY2eGwDtwc7', {
    host: 'sql.freedb.tech',
    port : 3306,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  export const connectionDB = () =>{
    sequelize.sync({force : false}).then(() => console.log("connection established")).catch((err) => console.log("unable to connect with database" + err));
  }