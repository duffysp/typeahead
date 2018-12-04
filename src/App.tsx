import * as React from 'react';
import './App.css';
import TypeAhead from './components/typeahead/typeahead';
// import IContext from './components/context/context';
// import Autocomplete from '../node_modules/react-autocomplete'




// import logo from './logo.svg';

class App extends React.Component {

  //#region Environment Config
  public projectFlowUrl:string = "http://google.com";
  //#endregion

  public render(): JSX.Element {
    return (
      <div className="App"> 
        <div className="Padding">
          <TypeAhead label="Project ID"  url={this.projectFlowUrl} minchars={3} getrecordamount={5} icon="Search" options={[]} onChange={this.parentOnChange} />
        </div>        
      </div>
    );
  }

  private parentOnChange = (test:string) => {
    return;    
  }

}

export default App;


