import React, { Component } from "react";
import "./file-upload.style.css";
import { Upload } from "./child/upload/upload.component";

export class FileUploader extends Component {
  constructor() {
    super();

    this.state = {
        webId: '',
        routeId: '',
        t: null
    };
}

componentDidMount() {
  this.setState({ webId: this.props.webId });
  this.setState({ routeId: this.props.routeId });
  this.setState({ t: this.props.t });
}

  render() {
    return (
      <div className="FileUploader">
        <div className="Card">
          <Upload webId={ this.state.webId } routeId={ this.state.routeId } t={ this.state.t }/>
        </div>
      </div>
    );
  }
}
