import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories: any[] = [];
  @Input() selectedCategory: any;

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  public getAllCategories() {
    this.service.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }

  sendSelectedCategory(value: number) {
    this.selectedCategory.emit(value);
  }
}
