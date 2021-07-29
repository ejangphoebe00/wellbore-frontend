export class Company {
  constructor(
    public CompanyTelephone: string,
    public CompanyEmail: string,
    public CompanyWebsite: string,
    public CompanyCategory_id: number,
    public CountryOfOrigin_id: number,
    public CountryOfRegistration_id: number,
    public CompanyShortName: string,
    public Company_id?: string,
    public PAUID?: string,
    public CompanyLongName?: string,
    public NSD_Number?: string,
    public RegistrationNumber?: string,
    public TINNumber?: string,

  ) { }
}
