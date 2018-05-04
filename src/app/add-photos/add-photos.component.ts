import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import 'firebase/storage';
import {AngularFireStorage} from 'angularfire2/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import TaskEvent = firebase.storage.TaskEvent;
import {UploadService} from '../upload.service';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

interface Photo {
  desc: string;
  url: string;
  key?: string;
}

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.css']
})
export class AddPhotosComponent implements OnInit {

  photosStream: Array<any> = [];
  file: File;
  photoForm: FormGroup;
  progress = 0;

  constructor(private db: AngularFireDatabase, private upload: UploadService, private fb: FormBuilder) {
    this.db.list<Photo>('/photos').snapshotChanges().subscribe(response => {
      this.photosStream = [];
      response.forEach(value => {
        const photo = value.payload.val();
        photo.key = value.payload.key;
        this.photosStream.push(photo);
      });
    });
  }

  ngOnInit(): void {
    this.createFrom();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    if (this.file) {
      const uploadTask = this.upload.uploadFile(this.file, 'photos');
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,  (snapShot: UploadTaskSnapshot) => {
        this.progress = (snapShot.bytesTransferred / snapShot.totalBytes ) * 100;
      }, (err) => {
        console.log(err);
      }, () => {
        this.photoForm.get('url').setValue(uploadTask.snapshot.downloadURL);
      });
      console.log('Uploading: ', this.file.name);
    }
  }

  onAdd() {
    const photo: Photo = {
      url: this.photoForm.get('url').value,
      desc: this.photoForm.get('desc').value
    };
    this.db.database.ref('photos').push().set(photo);
    this.photoForm.reset();
    this.file = null;
    this.progress = 0;
  }

  Remove(item: Photo) {
    this.db.database.ref('photos').child(item.key).remove();
  }

  private createFrom() {
    this.photoForm = this.fb.group({
        'url': ['', [
          Validators.required
        ]],
        'desc': ['', [
          Validators.required
        ]]
      }
    );

  }
}
