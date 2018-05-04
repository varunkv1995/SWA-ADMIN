import { Injectable } from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable()
export class UploadService {

  constructor(private fs: AngularFireStorage) { }

  uploadFile(file: File, path: string) {
    const metaData = {'contentType': file.type};
    const storageRef = this.fs.storage.ref();
    return storageRef.child(path + '/' + file.name).put(file, metaData);
  }
}
