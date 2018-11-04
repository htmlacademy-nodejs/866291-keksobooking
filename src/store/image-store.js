'use strict';

const db = require(`../database/db`);
const {DB_NAME} = require(`../data/constants`);
const mongodb = require(`mongodb`);
class ImageStore {
  constructor(bdName) {
    this.bdName = bdName;
  }

  async getBucket() {
    if (this._bucket) {
      return this._bucket;
    }
    const dBase = await db;
    if (!this._bucket) {
      this._bucket = new mongodb.GridFSBucket(dBase, {
        chunkSizeBytes: 512 * 1024,
        bucketName: this.bdName
      });
    }
    return this._bucket;
  }

  async get(filename) {
    const bucket = await this.getBucket();
    const results = await (bucket).find({"filename": filename}).toArray();
    const entity = results[0];
    if (!entity) {
      return void 0;
    }
    return {info: entity, stream: bucket.openDownloadStreamByName(filename)};
  }

  async save(filename, stream) {
    const bucket = await this.getBucket();
    return new Promise((success, fail) => {
      stream
        .pipe(bucket.openUploadStream(filename))
        .on(`error`, fail)
        .on(`finish`, success);
    });
  }

}


module.exports = {
  avatarsStore: new ImageStore(DB_NAME.AVATAR),
  photesStore: new ImageStore(DB_NAME.PHOTE)
};
