import React, {Component} from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import Modal from 'react-responsive-modal';
import Footer from '../Components/Footer';
import 'tachyons';
import './App.css';

class App extends Component {

    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: '',
            open : false,
            tempDesc: '',
            tempName: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json() )
            .then( users => { this.setState({robots: users}) } );
    }

    onSearchChange = (event) =>{
        this.setState({searchField : event.target.value})
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    onNameChange = (event) => {
        this.setState({ tempName : event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({ tempDesc : event.target.value})
    }

    addNewRobot = () => {
        const {tempName , tempDesc} = this.state;
        if( tempName === ''){
            alert("Please fill in Name to continue!");
        }
        let tempRobot = {name : tempName, email: tempDesc}
        this.setState({ robots : [...this.state.robots,tempRobot]})
        console.log(this.state.robots);
        this.setState({tempName : ''});
        this.setState({tempDesc : ''})
        this.onCloseModal();
    }

    ClearRobots = () => {
        this.setState({ robots : [{name: 'Utkarsh', email: 'Im the developer of the website! Nice to meet you :)'}]});
    }

    render(){
        const filterRobs = this.state.robots.filter(robot => {
            console.log(this.state.robots)
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
        })

        if(this.state.robots.length === 0){
            return <h1 className= 'f1 tc '>Loading...</h1>
        } else {
            return(
                <div className = 'tc'>
                    <h1 className = 'f1'> Robo Friends</h1>
                    <p className = 'f3-ns tc intro'>Get a Robot Avatar for yourself and your friends! Below is a sample of other Robot Avatars! </p>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <div className="pa3">
                        <input className="b ph3 pv2 mr3 input-reset ba b--black bg-transparent grow pointer f5" type="submit" value="Add a new Robot"  onClick={this.onOpenModal}/>
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5" type="submit" value="Clear the Robot Area"  onClick={this.ClearRobots}/>
                    </div>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className="pa4 black-80">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <h2>New Robot</h2>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
                                    <input onChange = {this.onNameChange} className="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="name"  id="name"/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6" htmlFor="email-address">About Yourself (Optional)</label>
                                    <input onChange={this.onEmailChange} className="b pa2 input-reset ba bg-transparent" type="email" name="email-address"  id="email-address"/>
                                </div>
                                <div className="mt3"><input onClick={this.addNewRobot} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Add" /></div>
                            </fieldset>
                        </div>
                    </Modal>
                    <Scroll>
                    <CardList robots={filterRobs}/> 
                    </Scroll>
                    <Footer />
                </div>
            );
        }
    }
    
}

export default App;