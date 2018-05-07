import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinerComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() { }
}
