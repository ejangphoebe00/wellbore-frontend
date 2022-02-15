import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgPopupsService } from 'ng-popups';

import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})

export class ViewCompaniesComponent implements OnInit, OnDestroy{

  formGroup!: FormGroup;
  title!: string;
  role:any;

  dtOptions: any = {};
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  allusers: any;
  id: any;
  posts: any = [];
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  details: boolean = false;
  updatevalue: any;
  userEmail: any;
  loggedin: any;
  data:any;
  formdata:any;
  result:any;
  currentYear:any;
  allYears:any = [];
  newval1:any;
  newval2:any;
  checkstaff:any;
  maxd: any;
  mindate: any;

  Countries:any = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe']



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService,
  ) { }

  ngOnInit(): void {
    this.maxd = new Date(); 
     this.maxd = new Date();
    if (this.maxd.getDate() < 9) {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + 0 + this.maxd.getDate()
    } else {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + this.maxd.getDate()

    }
    // this.authservice.reload();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }

    
    if(this.authservice.getRole()=="Data Admin"){
      this.checkstaff=true;
    }else{
    this.checkstaff=false;
    }

    this.posts = [];
    this.users();
    this.initForm();
    this.dtOptions = {
      dom:'Bfrtip',
      // dom:'Btp',
      // select: true,
      buttons: [
        // 'columnsToggle',
        // 'colvis',

        // {
        //   extend:'copyHtml5',
        //   tag: 'button',
        //   className: "btn blue btn-outline",
        //
        // },
        {
          extend:'print',
          tag: 'button',
          className: "btn yellow btn-outline"
        },
        {
          extend:'excel',
          tag: 'button',
          className: "btn green btn-outline"
        },
        {
          extend:'pdf',
          tag: 'button',
          className: "btn red btn-outline"
        },
      ],

    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  users(): void {
    this.authservice
      .getAllCompanies()
      .subscribe((response: any) => {
        console.log(response)
        this.posts = response;

        this.dtTrigger.next();
      });
  }

  logout() {
    this.authservice.logoutuser()
  }

  getAllCompanies() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_companies')
      .subscribe(posts => {
        this.posts = posts
        console.log(this.posts)
      });

  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.CompanyId

    this.ngPopups.confirm("Are you sure you want to delete ?",{
      // theme: 'material',
      color:'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText:'No',
      title: "Confirm",
    })
    .subscribe(res => {
      if (res) {
        console.log("Selected item Id: ", selectedItem.CompanyId);
        this.http.delete('http://127.0.0.1:8899/apiv1/delete_company/' + this.id)
          .subscribe(response => {
            this.deleteresp = response
            console.log(this.deleteresp.message)
            if (this.deleteresp.message == "Company successfully deleted.") {
              this.toastr.success("Company successfully deleted.", "", {
                timeOut: 2000,
                positionClass: 'toast-top-center',
                progressBar: true,
                progressAnimation: 'increasing'
              })
              setTimeout(() => {
                this.authservice.reload();
              }, 1000);

            } else {
              this.authservice.companyStatusUpdate()
            }
            console.log(this.deleteresp)
          });
      } else {
        console.log("You clicked cancel.")
      }
    });
  }

  onView(selectedItem: any) {
    this.status = true;
    this.details= true;
    this.editform = false;
    this.data = {
      CompanyId: selectedItem.CompanyId,
      PAUID: selectedItem.PAUID,
      CompanyLongName: selectedItem.CompanyLongName,
      CompanyShortName: selectedItem.CompanyShortName,
      NSDNumber: selectedItem.NSDNumber,
      CompanyCategoryId: selectedItem.CompanyCategoryId,
      Country: selectedItem.Country,
      // CountryOfRegistrationId: selectedItem.CountryOfRegistrationId,
      RegistrationNumber: selectedItem.RegistrationNumber,
      TINNumber: selectedItem.TINNumber,
      CompanyTelephone: selectedItem.CompanyTelephone,
      CompanyEmail: selectedItem.CompanyEmail,
      CompanyWebsite: selectedItem.CompanyWebsite,
      CompanyEntityTypeId: selectedItem.CompanyEntityTypeId,
      CompanyEntitySubTypeId: selectedItem.CompanyEntitySubTypeId,
      CompanyMajorActivityId: selectedItem.CompanyMajorActivityId,
      CompanyActivityDivisionId: selectedItem.CompanyActivityDivisionId,
      CompanyActivityDivisionClassId: selectedItem.CompanyActivityDivisionClassId,
      CompanyActivityDivisionClassCategoryId: selectedItem.CompanyActivityDivisionClassCategoryId,
      BusinessNatureDescription: selectedItem.BusinessNatureDescription,
      CompanyPostalAddress: selectedItem.CompanyPostalAddress,
      CompanyPhysicalAddress: selectedItem.CompanyPhysicalAddress,
      CompanyOtherEmails: selectedItem.CompanyOtherEmails,
      NSDQualificationDate: selectedItem.NSDQualificationDate,
      NSDQualificationYear: selectedItem.NSDQualificationYear,
      PrimaryContactEntity: selectedItem.PrimaryContactEntity,
      ContactEntityEmail: selectedItem.ContactEntityEmail,
      ContactEntityTelephone: selectedItem.ContactEntityTelephone,
      ContactEntityMobile: selectedItem.ContactEntityMobile,
      ContactDesignation: selectedItem.ContactDesignation,
      OperatorSortOrder: selectedItem.OperatorSortOrder,
      ContractorSortOrder: selectedItem.ContractorSortOrder,
      PAURegistrationDate: selectedItem.PAURegistrationDate,
      CraneNOGTRID: selectedItem.CraneNOGTRID,
      TempNOGTRIPwd: selectedItem.TempNOGTRIPwd,
      RegistrationStatusId: selectedItem.RegistrationStatusId,
      ClassifyAsUgandanId: selectedItem.ClassifyAsUgandanId,
      Comments: selectedItem.Comments,
      PrimaryCompanyKindId: selectedItem.PrimaryCompanyKindId,
      SecondaryCompanyKindId: selectedItem.SecondaryCompanyKindId,
      OtherCompanyKindId: selectedItem.OtherCompanyKindId,
      CompanyGroupId: selectedItem.CompanyGroupId,
      CompanyMobile: selectedItem.CompanyMobile,
      CompanyFax: selectedItem.CompanyFax,
      ContactEntityFax: selectedItem.ContactEntityFax,
      NSDFromDate: selectedItem.NSDFromDate,
      NSDToDate: selectedItem.NSDToDate,
      ImportedFromNSD: selectedItem.ImportedFromNSD,
      ImportedDate: selectedItem.ImportedDate,
      ExportedDate: selectedItem.ExportedDate,
      ExportedToNogtr: selectedItem.ExportedToNogtr,
      CreatedBy: selectedItem.CreatedBy,
      DateCreated: selectedItem.DateCreated,
      PreviousLegalName: selectedItem.PreviousLegalName,
    }
  }

  // formFilter(formValue:any){
  //   if(formValue == "None"){
  //     var oldValue = formValue
  //     var other = ""
  //     var newString = formValue.replace(formValue, other)
  //     return newString
  //
  //     // formValue += "";
  //   }
  // }

  onSelectEdit(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.editform = true;
    this.details = false;
    this.id = selectedItem.CompanyId
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", selectedItem.CompanyId);

    this.currentYear = new Date().getFullYear();
    while (this.currentYear >= 1900) {

      this.allYears.push(this.currentYear);
      this.currentYear -= 1;
    }

    console.log(this.allYears)


    this.http.get('http://127.0.0.1:8899/apiv1/get_company/' + this.id)
      .subscribe(response => {
        this.updatevalue = response

        // NSDQualificationDate value converted to datetime-local
        this.newval1 = this.updatevalue.NSDQualificationDate.split(" ")
        this.newval2 = this.updatevalue.PAURegistrationDate.split(" ")
        // console.log(this.newval[0] + "T" + this.newval[1])

        this.formGroup.patchValue(
          {
           CompanyId: this.authservice.stripFormValue(this.updatevalue.CompanyId),
           PAUID: this.authservice.stripFormValue(this.updatevalue.PAUID),
           CompanyLongName: this.authservice.stripFormValue(this.updatevalue.CompanyLongName),
           CompanyShortName: this.authservice.stripFormValue(this.updatevalue.CompanyShortName),
           NSDNumber: this.authservice.stripFormValue(this.updatevalue.NSDNumber),
           CompanyCategoryId: this.authservice.stripFormValue(this.updatevalue.CompanyCategoryId),
           Country: this.authservice.stripFormValue(this.updatevalue.Country),
          // CountryOfRegistrationId: this.authservice.stripFormValue(this.updatevalue.CountryOfRegistrationId),
           RegistrationNumber: this.authservice.stripFormValue(this.updatevalue.RegistrationNumber),
           TINNumber: this.authservice.stripFormValue(this.updatevalue.TINNumber),
           CompanyTelephone: this.authservice.stripFormValue(this.updatevalue.CompanyTelephone),
           CompanyEmail: this.authservice.stripFormValue(this.updatevalue.CompanyEmail),
           CompanyWebsite: this.authservice.stripFormValue(this.updatevalue.CompanyWebsite),
           CompanyEntityTypeId: this.authservice.stripFormValue(this.updatevalue.CompanyEntityTypeId),
           CompanyEntitySubTypeId: this.authservice.stripFormValue(this.updatevalue.CompanyEntitySubTypeId),
           CompanyMajorActivityId: this.authservice.stripFormValue(this.updatevalue.CompanyMajorActivityId),
           CompanyActivityDivisionId: this.authservice.stripFormValue(this.updatevalue.CompanyActivityDivisionId),
           CompanyActivityDivisionClassId: this.authservice.stripFormValue(this.updatevalue.CompanyActivityDivisionClassId),
           CompanyActivityDivisionClassCategoryId: this.authservice.stripFormValue(this.updatevalue.CompanyActivityDivisionClassCategoryId),
           BusinessNatureDescription: this.authservice.stripFormValue(this.updatevalue.BusinessNatureDescription),
           CompanyPostalAddress: this.authservice.stripFormValue(this.updatevalue.CompanyPostalAddress),
           CompanyPhysicalAddress: this.authservice.stripFormValue(this.updatevalue.CompanyPhysicalAddress),
           CompanyOtherEmails: this.authservice.stripFormValue(this.updatevalue.CompanyOtherEmails),
          // NSDQualificationDate: this.authservice.stripFormValue(this.newval1[0] + "T" + this.newval1[1]),
           NSDQualificationDate: this.authservice.stripFormValue(this.updatevalue.NSDQualificationDate),

           NSDQualificationYear: this.authservice.stripFormValue(this.updatevalue.NSDQualificationYear),
           PrimaryContactEntity: this.authservice.stripFormValue(this.updatevalue.PrimaryContactEntity),
           ContactEntityEmail: this.authservice.stripFormValue(this.updatevalue.ContactEntityEmail),
           ContactEntityTelephone: this.authservice.stripFormValue(this.updatevalue.ContactEntityTelephone),
           ContactEntityMobile: this.authservice.stripFormValue(this.updatevalue.ContactEntityMobile),
           ContactDesignation: this.authservice.stripFormValue(this.updatevalue.ContactDesignation),
           OperatorSortOrder: this.authservice.stripFormValue(this.updatevalue.OperatorSortOrder),
           ContractorSortOrder: this.authservice.stripFormValue(this.updatevalue.ContractorSortOrder),
           //PAURegistrationDate: this.authservice.stripFormValue(this.newval1[0] + "T" + this.newval1[1]),
           PAURegistrationDate: this.authservice.stripFormValue(this.updatevalue.PAURegistrationDate),

           CraneNOGTRID: this.authservice.stripFormValue(this.updatevalue.CraneNOGTRID),
           TempNOGTRIPwd: this.authservice.stripFormValue(this.updatevalue.TempNOGTRIPwd),
           RegistrationStatusId: this.authservice.stripFormValue(this.updatevalue.RegistrationStatusId),
           ClassifyAsUgandanId: this.authservice.stripFormValue(this.updatevalue.ClassifyAsUgandanId),
           Comments: this.authservice.stripFormValue(this.updatevalue.Comments),
           PrimaryCompanyKindId: this.authservice.stripFormValue(this.updatevalue.PrimaryCompanyKindId),
           SecondaryCompanyKindId: this.authservice.stripFormValue(this.updatevalue.SecondaryCompanyKindId),
           OtherCompanyKindId: this.authservice.stripFormValue(this.updatevalue.OtherCompanyKindId),
           CompanyGroupId: this.authservice.stripFormValue(this.updatevalue.CompanyGroupId),
           CompanyMobile: this.authservice.stripFormValue(this.updatevalue.CompanyMobile),
           CompanyFax: this.authservice.stripFormValue(this.updatevalue.CompanyFax),
           ContactEntityFax: this.authservice.stripFormValue(this.updatevalue.ContactEntityFax),
           NSDFromDate: this.authservice.stripFormValue(this.updatevalue.NSDFromDate),
           NSDToDate: this.authservice.stripFormValue(this.updatevalue.NSDToDate),
           ImportedFromNSD: this.authservice.stripFormValue(this.updatevalue.ImportedFromNSD),
           ImportedDate: this.authservice.stripFormValue(this.updatevalue.ImportedDate),
           ExportedDate: this.authservice.stripFormValue(this.updatevalue.ExportedDate),
           ExportedToNogtr: this.authservice.stripFormValue(this.updatevalue.ExportedToNogtr),
           CreatedBy: this.authservice.stripFormValue(this.updatevalue.CreatedBy),
           DateCreated: this.authservice.stripFormValue(this.updatevalue.DateCreated),
           PreviousLegalName: this.authservice.stripFormValue(this.updatevalue.PreviousLegalName),
        });
        console.log(this.updatevalue)

        // console.log("filtering 'None' values")
        // Object.entries(this.formdata).forEach(([key, value]) => { if (value == "None") {
        //   value = null}})
        // console.log(this.formdata)
      });


  }



  navigateBack() {
    this.authservice.reload();
  }

  updateCompanyProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.editCompany(this.formGroup.value).subscribe(result => {
        console.log(result)

        if (result.message == "Company updated successfuly.") {
          this.toastr.success("Company updated successfuly.", "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'increasing'
          })
          this.formGroup.reset();
          setTimeout(() => {
            this.authservice.reload();
          }, 1000);


        } else {
          this.authservice.companyStatusUpdate()
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

  initForm() {
    this.formGroup = new FormGroup({
      PAUID:new FormControl(),
      CompanyLongName:new FormControl(),
      CompanyShortName:new FormControl(),
      NSDNumber:new FormControl(),
      CompanyCategoryId:new FormControl(),
      Country:new FormControl(),
     // CountryOfRegistrationId:new FormControl(),
      RegistrationNumber:new FormControl(),
      TINNumber:new FormControl(),
      CompanyTelephone:new FormControl(),
      CompanyEmail:new FormControl(),
      CompanyWebsite:new FormControl(),
      CompanyEntityTypeId:new FormControl(),
      CompanyEntitySubTypeId:new FormControl(),
      CompanyMajorActivityId:new FormControl(),
      CompanyActivityDivisionId:new FormControl(),
      CompanyActivityDivisionClassId:new FormControl(),
      CompanyActivityDivisionClassCategoryId:new FormControl(),
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
      RegistrationStatusId:new FormControl(),
      ClassifyAsUgandanId:new FormControl(),
      Comments:new FormControl(),
      PrimaryCompanyKindId:new FormControl(),
      SecondaryCompanyKindId:new FormControl(),
      OtherCompanyKindId:new FormControl(),
      CompanyGroupId:new FormControl(),
      CompanyMobile:new FormControl(),
      CompanyFax:new FormControl(),
      ContactEntityFax:new FormControl(),
      NSDFromDate:new FormControl(),
      NSDToDate:new FormControl(),
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


}
