import { AfterViewInit, Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit, AfterViewInit {

  @ViewChild("image", { static: false })
  public imageElement: ElementRef;

  @Input("src")
  public imageSource: any;

  public imageDestination: string;
  private cropper: Cropper;

  public constructor() {
    this.imageDestination = "";
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imageDestination = canvas.toDataURL("image/png");
      }
    })
  }

}
