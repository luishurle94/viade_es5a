import React, { Component } from "react";
import { Dropzone } from "../dropzone/dropzone.component";
import "./upload.style.css";
import { MediaService } from '@services';
import { Media } from '@models';
import { Loader } from '@util-components';
import { successToaster } from '@utils';

export class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState({ successfullUploaded: false });
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ successfullUploaded: false, uploadProgress: {}, uploading: true });
    this.setState({
      isLoading: true
    })
    try {
      for(const file of this.state.files) {
        const res = await this.sendRequest(file);
        if (res === false) {
          console.error(file)
        }
      }

      this.setState({ successfullUploaded: true, uploading: false, files: [] });
      if (this.state.successfullUploaded) {
        successToaster(this.props.t('file.success'));
      }
    } catch (e) {
      throw e;
    }
  }

  async sendRequest(file) {
    if (this.props.webId && this.props.routeId) {
      const webId = this.props.webId;
      return await MediaService.addMedia(this.props.routeId, new Media(MediaService.getHref(webId, file.name), file, new Date(), webId, file.type));
    }
    return Promise.resolve(false);
  }

  renderActions() {
      return (
        <div>
          <button data-testid="clear" className="Button" disabled={this.state.files.length === 0} onClick={() => this.setState({ files: [], successfullUploaded: false })}>
            <i className="pi pi-trash"></i>
          </button>
          <button data-testid="upload" className="Button" disabled={this.state.files.length <= 0 || this.state.uploading} onClick={this.uploadFiles}>
            <i className="pi pi-upload"></i>
          </button>
        </div>
      );
  }

  render() {
    return (
      <div className="Upload">
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading}
            />
          </div>
          <div className="Files">
            { this.state.successfullUploaded && <p><b>{ this.props.t('file.success') }</b></p> }
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row" data-testif="file">
                  <span className="Filename">{file.name.substring(0, 20)}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
        {this.state.uploading && <Loader absolute />}
        <ul>
          <li><i>- { this.props.t('file.description1') }</i></li>
          <li><i>- { this.props.t('file.description2') }</i></li>
          <li><i>- { this.props.t('file.description3') }</i></li>
        </ul>
      </div>
    );
  }
}
