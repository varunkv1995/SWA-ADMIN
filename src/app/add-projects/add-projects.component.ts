import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";
import {UploadService} from "../upload.service";
import * as firebase from "firebase";
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

interface Project {
  desc: string;
  url: string;
  key?: string;
}

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css']
})
export class AddProjectsComponent implements OnInit {
  projectStream: Array<any> = [];
  file: File;
  photoForm: FormGroup;
  progress = 0;

  constructor(private db: AngularFireDatabase, private upload: UploadService, private fb: FormBuilder) {
    this.db.list<Project>('/projects').snapshotChanges().subscribe(response => {
      this.projectStream = [];
      response.forEach(value => {
        const project = value.payload.val();
        project.key = value.payload.key;
        this.projectStream.push(project);
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
      const uploadTask = this.upload.uploadFile(this.file, 'projects');
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
    const photo: Project = {
      url: this.photoForm.get('url').value,
      desc: this.photoForm.get('desc').value
    };
    this.db.database.ref('projects').push().set(photo);
    this.photoForm.reset();
    this.file = null;
    this.progress = 0;
  }

  Remove(item: Project) {
    this.db.database.ref('projects').child(item.key).remove();
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
