/**
 * parametros de conexion a la base de datos
 */
const { Sequelize } = require('sequelize');

/**
 * Logs
 */

class OriginDatabaseMariaDB{
    /**
     *
     * @param {*} hostname : hostname de la base de datos
     * @param {*} username : user de la base de datos
     * @param {*} password : password de la base de datos
     * @param {*} database : base de datos
     * @param {*} port : puerto por default 3306
     */
    constructor( hostname, username, password, database, port ){
        this.hostname = hostname;
        this.username = username;
        this.password = password;
        this.database = database;
        this.port = port;
    }
    getConnection(){
        const sequelize = new Sequelize(this.database, this.username, this.password, {
            host: this.hostname,
            dialect: 'mariadb',
            port: this.port,
            timezone: 'America/Lima',
            define:{
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        });
        sequelize.authenticate()
            .then( () => {
                captureErrors();
                logger.log({ level: 'info', message: 'Success Authentication ORM sequelize'});
            })
            .catch( e => {
                captureErrors("System",`Error Connect Database ${e}`);
            });
        return sequelize;
    }
}

module.exports = OriginDatabaseMariaDB;
