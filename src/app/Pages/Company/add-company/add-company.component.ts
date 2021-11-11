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
  currentYear:any;
  allYears:any = [];
  maxd:any;
  mindate: any;
  Countries:any = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe']
 

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.maxd = new Date(); 
    this.mindate = this.maxd.getFullYear()+'-'+parseInt(this.maxd.getMonth()+1)+'-'+ 0+this.maxd.getDate()
    console.log("final working date"+this.mindate)

    this.initForm();
    // this.authservice.reload();
    this.currentYear = new Date().getFullYear();
    while (this.currentYear >= 1900) {
      this.allYears.push(this.currentYear);
      this.currentYear -= 1;
    }
    console.log(this.allYears)
  }


  initForm(){
    this.formGroup = new FormGroup({
      PAUID:new FormControl(),
      CompanyLongName:new FormControl(),
      CompanyShortName:new FormControl(),
      NSD_Number:new FormControl(),
      CompanyCategory_id:new FormControl(),
      CountryOfOrigin_id:new FormControl(),
      CountryOfRegistration_id:new FormControl(),
      RegistrationNumber:new FormControl(),
      TINNumber:new FormControl(),
      CompanyTelephone:new FormControl(),
      CompanyEmail:new FormControl(),
      CompanyWebsite:new FormControl(),
      CompanyEntityType_id:new FormControl(),
      CompanyEntitySubType_id:new FormControl(),
      CompanyMajorActivity_id:new FormControl(),
      CompanyActivityDivision_id:new FormControl(),
      CompanyActivityDivisionClass_id:new FormControl(),
      CompanyActivityDivisionClassCategory_id:new FormControl(),
      BusinessNatureDescription:new FormControl(),
      CompanyPostalAddress:new FormControl(),
      CompanyPhysicalAddress:new FormControl(),
      CompanyOtherEmails:new FormControl(),
      NSDQualificationDate:new FormControl(),
      NSDQualificationYear:new FormControl(),
      PrimaryContactEntity:new FormControl(),
      ContactEntityEmail:new FormControl(),
      ContactEntityTelephone:new FormControl(),
      ContactEntityMobile:new FormControl(),
      ContactDesignation:new FormControl(),
      OperatorSortOrder:new FormControl(),
      ContractorSortOrder:new FormControl(),
      PAURegistrationDate:new FormControl(),
      CraneNOGTRID:new FormControl(),
      TempNOGTRIPwd:new FormControl(),
      RegistrationStatus_id:new FormControl(),
      ClassifyAsUgandan_id:new FormControl(),
      Comments:new FormControl(),
      PrimaryCompanyKind_id:new FormControl(),
      SecondaryCompanyKind_id:new FormControl(),
      OtherCompanyKind_id:new FormControl(),
      CompanyGroup_id:new FormControl(),
      CompanyMobile:new FormControl(),
      CompanyFax:new FormControl(),
      ContactEntityFax:new FormControl(),
      NSD_FromDate:new FormControl(),
      NSD_ToDate:new FormControl(),
      ImportedFromNSD:new FormControl(),
      ImportedDate:new FormControl(),
      ExportedDate:new FormControl(),
      ExportedToNogtr:new FormControl(),
      RecordChangeStamp:new FormControl(),
      PreviousLegalName:new FormControl(),
    });
  }

  changeCountries(e:any) {
    console.log(e.value)
    this.Countries.setValue(e.target.value, {
      onlySelf: true
    })
  }

  logout(){
    this.authservice.logoutuser()

  }


  addCompanyDetails(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addCompany(this.formGroup.value).subscribe(result =>{
        console.log(result.message)

        if(result.message == "Company added successfuly."){
          this.toastr.success("Company added successfuly.","",{
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation:'increasing'
          })
          this.formGroup.reset();
        }
        else{
          // this.authservice.companyStatus()
        }
      }, error => {

        console.log('oops', error.message)
        if(error){
          this.toastr.error(error.error.message,"",{
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation:'decreasing'
          })
          // this.authservice.CompanyFaliure()
        }
      }

      )
    }
  }

  get f(){return this.formGroup.controls}
}
