import React from "react";
import "./ClientMain.css";
import ConnectServer from "./ConnectServer";
import ServerResponses from './ServerResponses';

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? "Summer" : "Winter";
  }
  return lat > 0 ? "Winter" : "Summer";
};

class ClientMain extends React.Component {
  constructor(props) {
    super(props);
    this.renderConnectServer = this.renderConnectServer.bind(this);
    this.state = {
      connectionEstablished: false , 
      serverSentResponse: false , 
      serverResponsesList: []
    };
  }

  componentDidMount() {}

  /**
   *  Render Server Connection conditionally
   *  Only if the the connection has not been established
   */
  renderConnectServer() {
    const { connectionEstablished } = this.state;
    if (!connectionEstablished) {
      return <ConnectServer clientMainCallback={this.connectServerCallback} />;
    }
  }


  renderServerResponses() {
    const { connectionEstablished } = this.state;
    if (connectionEstablished) {
      const {serverResponsesList} = this.state;
      return <ServerResponses 
                listOfResponses={serverResponsesList}
                clientMainCallback={this.handleServerResponsesCallback}  />;
    }
  }


  connectServerResponses(serverResponsesIsDone) {
      if (serverResponsesIsDone === true) {

      }
  }



  handleServerResponsesCallback(todo) {

  }


  /**
   * Address = "http://localhost:8000"
   * Port = 8000
   */
  connectServerCallback = dataFromChild => {
    const info = JSON.parse(dataFromChild);
    alert("Daddy got it : " + info.ip + " , " + info.port);
    if (info.ip && info.port) {

      // Connect with the address & Port given from the user
      this.setState({ connectionEstablished: true });
      const io = require("socket.io-client"),
        address = `${info.ip}:${info.port}`,
        ioClient = io.connect(address);

      console.log(`Connected to address ${address}`);

      // var response = new Object();
      // ioClient.on("actiontype", msg => {
      //   response.id = 
      //   response.actionType = msg;
      // });

      ioClient.on("actiondetails", msg => {
        const {serverResponsesList} = this.state;
        var parsed = JSON.parse(msg);
        var response = new Object();
        response.id = serverResponsesList.length;
        response.actionType = parsed.actionType;
        response.vendorId = parsed.vendorId;
        response.productId = parsed.productId;
        response.deviceName = parsed.deviceName;
        response.manufacturer = parsed.manufacturer;        
        serverResponsesList.push(response)
        this.setState({serverResponsesList});
      });
    }
  };

  render() {
    const season = getSeason(this.props.lat, new Date().getMonth());
    return (
      <div className={`season-display ${season}`}>
        {this.renderConnectServer()}
        {this.renderServerResponses()}
      </div>
    );
  }
}

export default ClientMain;
