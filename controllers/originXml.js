const xml2js = require('xml2js');
const fs = require('fs');

class OriginXmlServer{
    constructor( fileXmlProcess ) {
        this.fileXmlProcess = fileXmlProcess;
        this.checkFileExists = fs.existsSync( this.fileXmlProcess );
    }
    readXmlFile() {
        let parser = new xml2js.Parser();
        fs.readFile( this.fileXmlProcess, function(err, data) {
            if ( err ) { console.log(`Error p ${err}`); }
            parser.parseString(data, function (err, result) {
                if ( err ) { console.log(`Error p ${err}`); }
                papconsole.log(result);
            })
        });
    }
}

module.exports = OriginXmlServer;