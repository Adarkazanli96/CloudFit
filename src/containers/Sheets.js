import React from "react";
import { Auth, API } from 'aws-amplify'

export default class Sheets extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
            notes: null,
            isLoading: true
          };
    }

    async componentDidMount(){
        if (!this.props.isAuthenticated) {
            return;
          }
        
          try {
            const notes = await this.notes();
            this.setState({ notes });
          } catch (e) {
            alert(e);
          }
        
          this.setState({ isLoading: false });
    }

    notes = async () =>{
      let userInfo = await Auth.currentUserInfo();
      userInfo = JSON.stringify(userInfo)

      let myInit = { // OPTIONAL
          body: {  // OPTIONAL
            //sup: "bro"
        },
        headers : {
          //Authorization : "suh"
        } // OPTIONAL
    }
        return API.get('sheets', '/').then(response => {
          console.log(response)
      })
    }

    render(){
        console.log(JSON.stringify(this.state.notes))
        return(<div>this is all the sheets</div>);
    }
}