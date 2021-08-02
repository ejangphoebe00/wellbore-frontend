export class CatalogSecurity {
    constructor(
        public CatalogSecurityFlag_id: number,
        public ModifiedOn: Date,
        public ModifiedBy: string,
        public SortOrder: number,
        public Comments: string,
        public CatalogSecurityFlagName?: string,
    
      ) { }
    
}
