import React from "react";
// import Typography from "@material-ui/core/Typography";

export default class ServerResponses extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.props.clientMainCallback(true);
  }

  getNoDataMessage() {
    if (this.props.listOfResponses && this.props.listOfResponses.length <= 0){
      return (
        <label>N Data ! Wating for Server ...</label>
      );
    }
  }

  render() {
    const divItems = this.props.listOfResponses.reverse().map((item, index) => (
      <li key={index + item.productId}>
        <ul>
          <li>Action Type : {item.actionType}</li>
          <li>Device Name : {item.deviceName}</li>
          <li>manufacturer : {item.Manufacturer}</li>
          <li>Product Id : {item.productId}</li>
          <li>Vendor Id : {item.vendorId}</li>
          <br/>
        </ul>
      </li>
    ));

    return (
      <div>
        {this.getNoDataMessage()}
        <div className='scrollingLimit'>
          {/* <Typography component={'span'} variant={'body2'}> */}
          <ul>{divItems}</ul>
          {/* </Typography> */}
        </div>
      </div>
    );
  }
}
