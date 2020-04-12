import React, { Component } from "react";
import "./file-upload.style.css";
import { Upload } from "./child/upload/upload.component";

export class FileUploader extends Component {
  render() {
    return (
      <div className="FileUploader">
        <div className="Card">
          <Upload webId={ this.props.webId } routeId={ this.props.routeId } t={ this.props.t }/>
        </div>
      </div>
    );
  }
}
