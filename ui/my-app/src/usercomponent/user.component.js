import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './user.component.css';
import postApi from "../service/user.service";

class User extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            postContent : []
        }
    }

    componentDidMount() {
    postApi.requestPost().then(data => {
        debugger
      this.setState({postContent: data});
      console.log(this.state.postContent);
    },e=>{
        debugger
    });
  }

    render(){
        const users = [
            {id:1,name:"vipin"},
            {id:2,name:"ashu"},
            {id:3,name:"vip1"},
            {id:4,name:"vip2"}
            ];
        const userList = this.state.postContent.map(data =>{
            return <li>ID:{data._id} | Name:{data.name}</li>;
        });
        return(
            <ul>{userList}</ul>
        );
    }

}

//ReactDOM.render(<User />, document.getElementById('root1'));

export default User;

