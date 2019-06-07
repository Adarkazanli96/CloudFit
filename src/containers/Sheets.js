import React from "react";
import { Auth, API } from 'aws-amplify'
import Sheet from '../components/Sheet'

export default class Sheets extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
            notes: null,
            isLoading: true
          };
    }

    /*async componentDidMount(){
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
    }*/

    render(){
        //console.log(JSON.stringify(this.state.notes))
        console.log(this.props.sheets)
        let sheets = "There are no sheets uploaded"
        if(this.props.sheets != null){
          sheets = this.props.sheets.map((sheet, index) =>{
            return <Sheet
                    data = {sheet}
                    key = {index}
                    id = {index}
                    />
            })
        }
        return(<div>{sheets}</div>);
    }
}