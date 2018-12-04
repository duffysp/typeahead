import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import './typeahead.css';
import {ITypeAheadProps, ITypeAheadState, IProject} from './typeahead_interfaces';
import axios from 'axios';



initializeIcons();

export interface Iitem {
  label:string  
} 

// const defaultProps = {
//   minchars: 0,
//   getrecordamount: 5,
//   icon: 'Search'
// }

export default class TypeAhead extends React.Component<ITypeAheadProps, ITypeAheadState> {

  constructor(props: ITypeAheadProps) {
    super(props);
    this.state = {
      value:'',
      projects:[],
      projectSearchValue:'',
      showChoices:false, 
      selectedProject: null
    }
  } 

  public render() { 
    const {label, icon} = this.props;
    const {projects, showChoices} = this.state;
    return (
      <React.Fragment>
        <TextField iconProps={{iconName: icon!}} value={this.state.projectSearchValue} label={label} onChange={this.handleInputChange} />
        {showChoices === false ? null : 
          <div className="ms-TextField-field field-37" style={{borderWidth:'1px', fontFamily:'Arial', fontSize:'14px', borderColor:'Black', borderStyle:'Solid'}}>
            {projects.map(project => (
              <div 
              key={project.ItemInternalId} 
              className="test" 
              onClick={this.onItemClick.bind(this, project)}
              style={{height:'25px', paddingTop:'3px', cursor: 'pointer'}} >
                {project.ProjectIdSys}          
              </div>
            ))}
          </div>
        }        
      </React.Fragment>
    );
  }

  //#region Event Handlers  
  private handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const {url, onChange, getrecordamount, minchars} = this.props;

    this.setState({      
      projectSearchValue: e.target.value        
    });

    console.log("State Updated: Project Search Value: " + e.target.value);

    // If our char count meets our Minimum Char requirement then query the web serivce
    if(e.target.value.length >= minchars!){

      // Call the url with the typed textbox's current value in the body of the post request
      try{          
        axios.post(url, {value: e.target.value, fetchrecords: getrecordamount})
        .then((res) => {
            console.log(res.data);
            this.setState({
              projects: res.data,
              showChoices: true
            })            
        })
      }
      catch (ex){
        console.log(ex);
      }
    }

    if(e.target.value.length === 0){
      this.setState({
        showChoices: false
      })
    }
    // Run the function that was passed in from the parent component.
    onChange(e.target.value);                     
  } 

  private onItemClick = (project:IProject) => {
    console.log("Selected Project:");
    console.log(project);
    
    this.setState(
      {
        selectedProject:project,
        projectSearchValue:project.ProjectIdSys,
        showChoices:false
      }
    );
  }
  //#endregion 

}
