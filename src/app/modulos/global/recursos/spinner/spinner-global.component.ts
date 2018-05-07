import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spinner-global',
  templateUrl: './spinner-global.component.html',
  styleUrls: ['./spinner-global.component.scss']
})
export class SpinerGlobalComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() { }
}
