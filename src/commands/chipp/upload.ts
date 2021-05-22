import { flags, SfdxCommand } from '@salesforce/command';
import { file2CV } from '../../common/file2CV';
import { CreateResult, Record } from '../../common/typeDefs';

export default class Upload extends SfdxCommand {
    public static description = 'upload multiple files based on a csv as standalone records or linked to records';

    public static examples = [
    `sfdx chipp:data:files:upload -f ~/FilesToUpload.csv
    //uploads files specified in csv
    `
    ];

    protected static flagsConfig = {
        csv: flags.filepath({ char: 'f', description: 'path to csv', required: true })
    };

    protected static requiresUsername = true;

    public async run(): Promise<any> {
        // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
        const conn = this.org.getConnection();


        const csv = require('csv-parser')
        const fs = require('fs')
        const rows = [];

        fs.createReadStream(this.flags.csv)
          .pipe(csv())
          .on('data', (data) => rows.push(<any> data))
          .on('end', () => {
            console.log(rows);
          });

        for (let row of rows) {
          console.log(row);

          const CV = (await file2CV(conn, row.PathOnClient, row.Title, row.FirstPublishLocationId)) as Record;

          row.ContentDocumentId = CV.ContentDocumentId;
        }

        const createCsvWriter = require('csv-writer').createObjectCsvWriter;

        const csvWriter = createCsvWriter({
          path: 'results.csv',
          header: [
              {id: 'PathOnClient', title: 'PathOnClient'},
              {id: 'Title', title: 'Title'},
              {id: 'FirstPublishLocationId', title: 'FirstPublishLocationId'}
          ]
        });

        return 'Success';
    }
}
