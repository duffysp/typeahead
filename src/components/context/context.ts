import * as React from 'react';
import axios from 'axios';
import {IProject} from '../typeahead/typeahead_interfaces';

export interface IContextState {
    projects:IProject[];
    projectSearchValue:string;
}

export default class IContext extends React.Component<{}, IContextState> {
    constructor(props:{}) {
        super(props);
        
    }

    public getData = (url:string, searchValue:string, recordsToGet:number) => {
            
        this.setState({
            projectSearchValue: searchValue
        });
        // Call the url with the typed textboxe's current value in the body of the post request
        try{
            // axios.post(url, {value: e.target.value, fetchrecords: {fetchrecords}})
            axios.post(url, {value: searchValue, fetchrecords: recordsToGet})
            .then((res) => {
                console.log(res.data);
                this.setState({
                    projects: res.data
                })
            })
        }
        catch (ex){
            console.log(ex);
        }
    } 
}



