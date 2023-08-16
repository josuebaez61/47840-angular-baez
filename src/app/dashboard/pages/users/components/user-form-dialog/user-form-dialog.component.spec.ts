import { TestBed } from "@angular/core/testing"
import { ReactiveFormsModule } from "@angular/forms"
import { UserFormDialogComponent } from "./user-form-dialog.component"
import { MockProviders } from "ng-mocks"
import { AuthService } from "src/app/auth/auth.services"
import { MatDialogRef } from "@angular/material/dialog"

describe('UserFormDialogComponent', () => {
  let component: UserFormDialogComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormDialogComponent],
      imports: [ReactiveFormsModule],
      providers: [MockProviders(AuthService), { provide: MatDialogRef, useValue: {} }]
    })

    component = TestBed.createComponent(UserFormDialogComponent).componentInstance
  })

  it ('El componente debe instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  })
})
