import { Component } from '@angular/core';
import { LogParserService } from './log-parser.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'audit';
  logForm;
  log;
  result;
  metadata;
  events;
  profileUpdates;
  data;
  meta;

  constructor(
    private logParser: LogParserService,
    private formBuilder: FormBuilder
  ) {

    this.logForm = this.formBuilder.group({
      log: ''
    });
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.metadata = {};
    this.events = [];
    this.profileUpdates = [];
    this.data = [];
    this.logParser.parseLog(customerData.log).then(
      result => {
        this.metadata = result['metadata'];
        this.events = result['events'];
        this.profileUpdates = result['profile'];
        this.data = result['data'];
        this.meta = result['meta'];
      }
    )
  }

}
