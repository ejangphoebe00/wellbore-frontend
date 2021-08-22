export class StratLithoUnit {
    constructor(
        public StratLitho_id: number = 0,
        public PAUID: number = 0,
        public StratLithoName: string = "",
        public ReserviorUnit: number = 0,
        public LithoStratAlias: string = "",
        public IsReservoirUnit_id: number = 0,
        public LithoStratAge_id: number = 0,
        public LithoStratDescriptionSoftcopyPath: string = "",
        public LithoStratDescriptionHyperlink: string = "",
        public LithoStratMapSoftCopyPath: string = "",
        public LithoStratMapHyperlink: string = "",
        public MapPortalLithoStratMapLink: string = "",
        public LithoStratFactsiteUrl: string = "",
        public Comments: string = "",
        public CreatedBy_id: number = 0,
        public DateCreated: Date,
        public ModifiedOn: Date,
        public ModifiedBy: number = 0,
      ) { }

}
