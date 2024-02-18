import {Component, Input, OnInit} from '@angular/core';
import {CategoriesType} from "../../../../types/categories.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'article-filter',
  templateUrl: './article-filter.component.html',
  styleUrls: ['./article-filter.component.scss']
})
export class ArticleFilterComponent implements OnInit{

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }



  @Input() categories:CategoriesType[] = [];
  open = false;
  activeParams: ActiveParamsType = {pages: 1, categories: []};



  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
    })
  }

  toggle() {
    this.open = !this.open;
  }

  updateFilter(category: string) {


    if(this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryParams = this.activeParams.categories.find(item => item === category)
      if (existingCategoryParams) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== category)
      } else if (!existingCategoryParams) {
        this.activeParams.categories.push(category);
      }
    } else {
      this.activeParams.categories = [category]
    }

    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    })
  }

}
