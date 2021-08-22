export class CatalogSecurity {
    constructor(
        public CatalogSecurityFlag_id: number = 0,
        public ModifiedOn: Date,
        public ModifiedBy: string = "",
        public SortOrder: number = 0,
        public Comments: string = "",
        public CatalogSecurityFlagName: string = "",

      ) { }

}
