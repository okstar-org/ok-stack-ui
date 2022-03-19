import { NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
// import axios from 'axios'

// import BpmnJS from 'bpmn-js' // 引入 bpmn-js
// import BpmnModeler from 'bpmn-js/lib/Modeler';
// import BpmnViewer from 'bpmn-js/lib/Viewer';
// import BpmnNavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
// const newDiagram = require('../../../../assets/bpm/newDiagram.bpmn');

import { HttpClient } from '@angular/common/http';
import { ModelService } from './model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})

export class ModelComponent implements OnInit {
  iframe: SafeResourceUrl;
  initiated = -1;
  loaded = false;
  // private bpmnModeler : BpmnModeler;


  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient,
    private sanitizer: DomSanitizer,
    private service : ModelService
  ) {

  }

  ngOnInit() {

    this.service.getConfig().subscribe(r => {
      this.loaded = true;

      const { data } = r;
      if(data){
        const {webUrl} = data;

        const src = `${webUrl}${webUrl.endsWith('/')?'':'/'}business-central/kie-wb.jsp?standalone&perspective=LibraryPerspective&header=UberfireBreadcrumbsContainer`;
        this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        this.initiated = 1;
      }else{
        this.initiated = 0;
      }
    })

    // this.viewer = new BpmnJS({
    //   container: '#bpm-modeler-canvas'
    // });

    // this.logger.info('bpmn-viewer', viewer);
    // this.bpmnModeler = new BpmnModeler({
    //   container: '#bpm-modeler-canvas',
    //   // additionalModules: [
    //   //   // this.$data.customTranslateModule
    //   // ]
    // })
    // this.createNewDiagram()
    // let ms = this.bpmnModeler._modules
    // console.log('modules::::', ms);
    // let model = '<?xml version="1.0" encoding="UTF-8"?> <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="empty-definitions" targetNamespace="http://bpmn.io/schema/bpmn"></bpmn2:definitions>';

    // this.openDiagram(newDiagram);
  }

  // 注意：必须先加载一个bpmn文件，新建就是加载一个空的bpmn文件，否则不能拖拽节点
  // createNewDiagram() {
    // var diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';
    // var diagramUrl = '/assets/bpm/newDiagram.bpmn';
    // this.http.get(diagramUrl).subscribe((res) => {
    //     console.log('read bpmn xml', res)
    //     this.openDiagram(res)
    //   });

      // axios.get(diagramUrl).then((res)=>{
        // console.log('read', res);
        // this.openDiagram(res.data);
      // });
  // }

  // openDiagram(xml){
    // console.log('openDiagram', xml);
  //   this.bpmnModeler.importXML(xml, function(err) {
  //       if (err) {
  //           // container
  //           //     .removeClass('with-diagram')
  //           //     .addClass('with-error');
  //           console.error(err);
  //       } else {
  //         // container
  //         //   .removeClass('with-error')
  //         //   .addClass('with-diagram');
  //       }
  //   });
  // }

}
