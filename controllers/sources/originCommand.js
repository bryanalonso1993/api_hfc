const { Client } = require('ssh2');
/**
 * Logger
 */
const logger = require('../../config/logger');

class RemoteCommandsServer{
    /**
     * @param {*} origin: Origen de la fuente
     * @param {*} hostname : Ip del servidor
     * @param {*} username : usuario de autenticacion al servidor
     * @param {*} password : contrasena del servidor
     */
    constructor( origin, hostname, username, password, port ){
        this.origin = origin;
        this.hostname = hostname;
        this.username = username;
        this.password = password;
        this.port = port;
        this.client = new Client();
    }
    executeCommand( command ){
        this.client.on( 'ready' , () => {
            this.client.exec( command, ( err, stream ) => {
                if ( err ) {
                    logger( this.origin ,'error', `Error execute command ${ err }` );
                    throw err;
                }
                stream.on( 'close', ( code, signal ) => {
                    logger( this.origin, 'info', `Stream :: close :: code: ${ code } , signal: ${ signal }`);
                    this.client.end();
                }).on( 'data', data => {
                    logger( this.origin, 'info', `Success execute command , response data ${ data }, command: ${ command }`);
                }).stderr.on( 'data', data => {
                    logger( this.origin, 'error', `Stderr execute command : ${ data }`);
                })
            });
        }).connect({
            host: this.hostname,
            port: this.port,
            username: this.username,
            password: this.password
        });
    }
}

module.exports = RemoteCommandsServer;
