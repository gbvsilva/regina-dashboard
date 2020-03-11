import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

const headers={"fiware-service": "openiot", "fiware-servicepath": "/"};

class App extends Component {
  constructor () {
    super()
    this.state = {
      sensorIDs: []
    }

    this.handleClick = this.handleClick.bind(this)
  }
  
  async handleClick () {
    try {
      const response = await axios({
        "method": "get",
        "url": "http://10.7.229.35:1026/v2/entities",
        "headers": headers
      });
      console.log(response);
      
      var ids = [];
      response.data.forEach(item => {
        ids.push(item.id);
      });

      this.setState({sensorIDs: ids});

      console.log('sensorIDs2 -> '+this.state.sensorIDs.toString());
      return response;
    }
    catch(error) {
      console.log(error);
    }
    
  }

  render () {
    console.log('sensorIDs1 -> '+this.state.sensorIDs.toString());
    return (
      <div className='button__container'>
        <button className='button' onClick={this.handleClick}>Click Me</button>
        {this.state.sensorIDs.map(item => <p>{item}</p>)}
      </div>
    )
  }
}

export default App;