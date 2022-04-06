import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  today!: Date;
  year!: Date;
  currentYear: any;
  allYears: any = [];
  maxd: any;
  mindate: any;
  companyType: any = ['Operator', 'Licensing']
  Countries: any = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe']


  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.maxd = new Date();
    if (this.maxd.getDate() < 9) {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + 0 + this.maxd.getDate()
    } else {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + this.maxd.getDate()

    }
    console.log("final working date" + this.mindate)

    this.initForm();

    this.currentYear = new Date().getFullYear();
    while (this.currentYear >= 1900) {
      this.allYears.push(this.currentYear);
      this.currentYear -= 1;
    }
    console.log(this.allYears)
  }


  initForm() {
    this.formGroup = new FormGroup({
      PAUID: new FormControl(),
      CompanyLongName: new FormControl(),
      CompanyShortName: new FormControl(),
      NSDNumber: new FormControl(),
      CompanyCategoryId: new FormControl(),
      Country: new FormControl(),
      RegistrationNumber: new FormControl(),
      TINNumber: new FormControl(),
      CompanyTelephone: new FormControl(),
      CompanyEmail: new FormControl(),
      CompanyWebsite: new FormControl(),
      CompanyEntityTypeId: new FormControl(),
      CompanyEntitySubTypeId: new FormControl(),
      CompanyMajorActivityId: new FormControl(),
      CompanyActivityDivisionId: new FormControl(),
      CompanyActivityDivisionClassId: new FormControl(),
      CompanyActivityDivisionClassCategoryId: new FormControl(),
      BusinessNatureDescription: new FormControl(),
      CompanyPostalAddress: new FormControl(),
      CompanyPhysicalAddress: new FormControl(),
      CompanyOtherEmails: new FormControl(),
      NSDQualificationDate: new FormControl(),
      NSDQualificationYear: new FormControl(),
      PrimaryContactEntity: new FormControl(),
      ContactEntityEmail: new FormControl(),
      ContactEntityTelephone: new FormControl(),
      ContactEntityMobile: new FormControl(),
      ContactDesignation: new FormControl(),
      OperatorSortOrder: new FormControl(),
      ContractorSortOrder: new FormControl(),
      PAURegistrationDate: new FormControl(),
      CraneNOGTRID: new FormControl(),
      TempNOGTRIPwd: new FormControl(),
      RegistrationStatusId: new FormControl(),
      ClassifyAsUgandanId: new FormControl(),
      Comments: new FormControl(),
      PrimaryCompanyKindId: new FormControl(),
      SecondaryCompanyKindId: new FormControl(),
      OtherCompanyKindId: new FormControl(),
      CompanyGroupId: new FormControl(),
      CompanyMobile: new FormControl(),
      CompanyFax: new FormControl(),
      ContactEntityFax: new FormControl(),
      NSDFromDate: new FormControl(),
      NSDToDate: new FormControl(),
      ImportedFromNSD: new FormControl(),
      ImportedDate: new FormControl(),
      ExportedDate: new FormControl(),
      ExportedToNogtr: new FormControl(),
      RecordChangeStamp: new FormControl(),
      PreviousLegalName: new FormControl(),
      CompanyType: new FormControl()

    });
  }

  changeCountries(e: any) {
    console.log(e.value)
    this.Countries.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeCompanyType(e: any) {
    console.log(e.value)
    this.companyType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  logout() {
    this.authservice.logoutuser()

  }


  addCompanyDetails() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.addCompany(this.formGroup.value).subscribe(result => {
        console.log(result.message)

        if (result.message == "Company added successfuly.") {
          this.toastr.success("Company added successfuly.", "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'increasing'
          })
          this.formGroup.reset();
        }
        else {

        }
      }, error => {

        console.log('oops', error.message)
        if (error) {
          this.toastr.error(error.error.message, "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'decreasing'
          })

        }
      }

      )
    }
  }

  get f() { return this.formGroup.controls }
}
