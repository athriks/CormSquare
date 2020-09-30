import { LowerCasePipe } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { HomeService } from "./home.service";
import { Institute } from "./User";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  institute: Institute;
  constructor(private builder: FormBuilder, private service: HomeService) {
    this.institute = new Institute();
    console.log(this.institute);
  }
  Data: Array<any> = [
    { name: "Mumbai", value: "Mumbai" },
    { name: "Bangalore", value: "Bangalore" },
    { name: "Hyderabad", value: "Hyderabad" },
  ];

  InstituteForm = this.builder.group({
    Name: [
      "",
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("^[a-zA-Z ]*$"),
      ],
    ],
    Email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ],
    ],
    Country: [""],
    State: [""],
    City: [""],
    Address: [""],
    SkillName: [""],
    Description: [""],
    Skilllevel: ["", [Validators.required]],
    checkArray: this.builder.array([], [Validators.required]),
    optradio: ["", [Validators.required]],
    Years: [""],
  });

  Add = () => {
    alert("Can Edit Only One Skills");
  };
  location = [];
  Country: any;
  State: any;
  onCheckboxChange(e) {
    const checkArray: FormArray = this.InstituteForm.get(
      "checkArray"
    ) as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      console.log(checkArray.value);
      this.location = checkArray.value;
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  getState = (id) => {
    console.log(id.name);
    this.service.state(id).subscribe((data) => {
      console.log(data);
      this.State = data;
      console.log(this.State.stateId);
    });
  };
  show1: boolean = false;

  check = () => {
    this.show1 = true;
  };
  unCheck = () => {
    this.show1 = false;
  };
  city: any;
  getCity = (id) => {
    this.service.city(id).subscribe((data) => {
      this.city = data;
      console.log("hhe");
      console.log(data);
    });
  };
  show: boolean = false;
  close = () => {
    this.show = false;
  };
  submit = () => {
    if (confirm("Are you sure ? Want to Submit")) {
      this.show = true;
    } else {
      this.show = false;
    }
    console.log(this.institute);
  };
  ngOnInit() {
    this.service.country().subscribe((data) => {
      this.Country = data;
      console.log(data);
    });
    console.log(this.State);
  }
}
