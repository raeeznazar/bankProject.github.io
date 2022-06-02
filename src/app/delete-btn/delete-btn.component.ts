import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.css'],
})
export class DeleteBtnComponent implements OnInit {
  @Input() item: string | undefined;
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  delete() {
    this.onDelete.emit(this.item);
  }
  cancel() {
    this.onCancel.emit();
  }
}
