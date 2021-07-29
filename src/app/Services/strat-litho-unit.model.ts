export class StratLithoUnit {
  constructor(
    public StratLitho_id: number,
    public PAUID: number,
    public StratLithoName: string,
    public ReserviorUnit: number,
    public LithoStratAlias: string,
    public IsReservoirUnit_id: number,
    public LithoStratAge_id: number,
    public LithoStratDescriptionSoftcopyPath: string,
    public LithoStratDescriptionHyperlink: string,
    public LithoStratMapSoftCopyPath: string,
    public LithoStratMapHyperlink: string,
    public MapPortalLithoStratMapLink: string,
    public LithoStratFactsiteUrl: string,
    public Comments: string,
    public CreatedBy_id: number,
    public DateCreated: Date,
    public ModifiedOn: Date,
    public ModifiedBy: number,
  ) { }
}
