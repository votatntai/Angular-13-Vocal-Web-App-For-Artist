import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  audioUrl: string;
  isRecording: boolean = false;

  constructor(private recorderService: NgAudioRecorderService, private storage: AngularFireStorage) {
    this.recorderService.recorderError.subscribe(recorderErrorCase => {
      console.warn(recorderErrorCase);
    })
  }

  ngOnInit(): void {
  }

  recordOnClick() {
    this.isRecording ? this.stopRecording() : this.startRecording();
  }

  startRecording() {
    this.recorderService.startRecording();
    this.isRecording = true;
  }

  stopRecording() {
    this.recorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
      var name = Date.now();
      const filePath = `audios/Vocal-Audio-${name}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, output).snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (url) {
            this.audioUrl = url;
            this.isRecording = false;
            console.warn(this.audioUrl);
          }
        }, error => {
          console.error(error);
        })
      })).subscribe();
    }).catch(errrorCase => {
      console.error(errrorCase);
    });
  }

}
