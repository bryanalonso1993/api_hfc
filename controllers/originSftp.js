const Client = require('ssh2-sftp-client');
const logger = require('../config/logger');
const fs = require('fs');

class OriginSftpServer{
    /**
     *
     * @param {*} origin: origen del controlador
     * @param {*} host : hostname servidor al cual se quiere autenticar
     * @param {*} username : usuario de autenticacion
     * @param {*} password : contrasena de autenticacion
     * @param {*} port : puerto , port default 22 ps
     */
    constructor( origin, host, username, password, port='22' ) {
        this.origin = origin;
        this.sftpClient = new Client();
        this.options = { host, port, username, password };
    }
    getDataServer( remotefilePath, localFilePath ) {
        const transformLocalFile = fs.createWriteStream(localFilePath);
        this.sftpClient.connect( this.options )
            .then( () => this.sftpClient.exists( remotefilePath ) )
            .then( () => this.sftpClient.get(remotefilePath, transformLocalFile) )
            .then( () => this.sftpClient.end() )
            .catch( err => {
                logger(this.origin,'error', `Error descarga del archivo origen: ${this.origin} , error: ${err.message}`);
                this.sftpClient.end();
                });
    }
}

module.exports = OriginSftpServer;