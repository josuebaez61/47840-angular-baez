import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Buyer } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuyerService } from '../../services/buyer.service';

@Component({
  selector: 'app-buyer-dialog',
  templateUrl: './buyer-dialog.component.html',
  styles: [],
})
export class BuyerDialogComponent {
  editingBuyer?: Buyer;
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
  ]);

  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required]);

  buyerForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
  });

  // userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<BuyerDialogComponent>,
    private buyerService: BuyerService,
    @Inject(MAT_DIALOG_DATA) private data?: Buyer
  ) {
    if (this.data) {
      this.editingBuyer = this.data;
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.emailControl.setValue(this.data.email);
    }
  }

  onSubmit(): void {
    if (this.buyerForm.invalid) {
      this.buyerForm.markAllAsTouched();
    } else {
      this.buyerService.createBuyer(this.buyerForm.getRawValue(), () => {
        this.dialogRef.close(this.buyerForm.value);
      });
    }
  }
}
