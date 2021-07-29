export class Company {
  constructor(
    public CoreType_id: number,
    public CoreTypeName: string,
    public SortOrder: number,
    public Comments: string,
    public ModifiedOn: Date,
    public ModifiedBy: number,

  ) { }
}
