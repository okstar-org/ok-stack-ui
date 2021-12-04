import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})

export class ModelComponent implements OnInit {
  iframe: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    const src = 'http://192.168.8.40:8080/business-central/kie-wb.jsp?standalone&perspective=LibraryPerspective&header=UberfireBreadcrumbsContainer'
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }
}
