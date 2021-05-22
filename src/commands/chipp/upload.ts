import { flags, SfdxCommand } from "@salesforce/command";
import { file2CV } from "../../common/file2CV";
import { Record } from "../../common/typeDefs";

export default class Upload extends SfdxCommand {
  public static description =
    "upload multiple files based on a csv as standalone records or linked to records";

  public static examples = [
    `sfdx chipp:data:files:upload -p ~/FilesToUpload.csv
    //uploads files specified in csv
    `,
  ];

  protected static flagsConfig = {
    pathtocsv: flags.filepath({
      char: "p",
      description: "path to csv",
      required: true,
    }),
  };

  protected static requiresUsername = true;

  private async readFile(filePath: string): Promise<any> {
    const csv = require("csv-parser");
    const fs = require("fs");
    let rows = [];

    return new Promise<any>((resolve) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          rows.push(data);
        })
        .on("end", () => {
          resolve(rows);
        });
    });
  }

  public async run(): Promise<any> {
    // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();

    const csvFilePath = this.flags.pathtocsv;

    this.ux.startSpinner("Reading CSV");

    let filesToUpload = await this.readFile(csvFilePath);

    this.ux.stopSpinner();

    this.ux.startSpinner("Loading files");

    for (let file of filesToUpload) {
      const CV = (await file2CV(
        conn,
        file.PathOnClient,
        file.Title,
        file.FirstPublishLocationId
      )) as Record;

      file.ContentDocumentId = CV.ContentDocumentId;
    }

    this.ux.stopSpinner();

    this.ux.startSpinner("Writing results");

    const createCsvWriter = require("csv-writer").createObjectCsvWriter;

    const csvWriter = createCsvWriter({
      path: "results.csv",
      header: [
        { id: "PathOnClient", title: "PathOnClient" },
        { id: "Title", title: "Title" },
        { id: "FirstPublishLocationId", title: "FirstPublishLocationId" },
        { id: "ContentDocumentId", title: "ContentDocumentId" }
      ],
    });

    csvWriter.writeRecords(filesToUpload);

    this.ux.stopSpinner();

    return "Success";
  }
}
