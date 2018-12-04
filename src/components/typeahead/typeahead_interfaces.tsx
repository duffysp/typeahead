export interface ITypeAheadProps{
    label: string,
    url: string,
    minchars?: number,
    getrecordamount?: number,
    icon?: string,
    options: [],
    onChange: (test:string) => void
}

export interface ITypeAheadState {
    value:'',
    projects:IProject[],
    projectSearchValue:string,
    selectedProject:IProject | null,
    showChoices:boolean
}
  
export interface IProject {    
    "@odata.etag":string,
    "ItemInternalId":string, 
    "ProjectIdSys":string, 
    "ProjectName":string
}
    