import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';
import './gallery.style.css';

export class GalleriaComponent extends Component {

  constructor() {
    super();

    this.state = {
      images: null,
      activeIndex: 0,
      isAutoPlayActive: true,
      isPreviewFullScreen: false
    };
    this.previewTemplate = this.previewTemplate.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onFullScreenChange = this.onFullScreenChange.bind(this);
  }

  componentDidMount() {
    this.setState({ images: this.props.images });
    if (this.props.activeIndex) {
      this.setState({ activeIndex: this.props.activeIndex });
    }
    if (this.props.isAutoPlayActive) {
      this.setState({ isAutoPlayActive: this.props.isAutoPlayActive });
    }
    if (this.props.isPreviewFullScreen) {
      this.setState({ isPreviewFullScreen: this.props.isPreviewFullScreen });
    }
    this.bindDocumentListeners();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isAutoPlayActive !== this.galleria.isAutoPlayActive()) {
      this.setState({
        isAutoPlayActive: this.galleria.isAutoPlayActive()
      });
    }
  }

  componentWillUnmount() {
    this.unbindDocumentListeners();
  }

  onItemChange(event) {
    this.setState({ activeIndex: event.index });
  }

  toggleFullScreen() {
    if (this.state.isPreviewFullScreen) {
      this.closePreviewFullScreen();
    }
    else {
      this.openPreviewFullScreen();
    }
  }

  onFullScreenChange() {
    this.setState({ isPreviewFullScreen: !this.state.isPreviewFullScreen });
  }

  openPreviewFullScreen() {
    let elem = ReactDOM.findDOMNode(this.galleria);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  bindDocumentListeners() {
    document.addEventListener("fullscreenchange", this.onFullScreenChange);
    document.addEventListener("mozfullscreenchange", this.onFullScreenChange);
    document.addEventListener("webkitfullscreenchange", this.onFullScreenChange);
    document.addEventListener("msfullscreenchange", this.onFullScreenChange);
  }

  unbindDocumentListeners() {
    document.removeEventListener("fullscreenchange", this.onFullScreenChange);
    document.removeEventListener("mozfullscreenchange", this.onFullScreenChange);
    document.removeEventListener("webkitfullscreenchange", this.onFullScreenChange);
    document.removeEventListener("msfullscreenchange", this.onFullScreenChange);
  }

  previewTemplate(item) {
    if (this.state.isPreviewFullScreen) {
      return <img src={`${item.previewImageSrc}`} alt={item.alt} />
    }

    return <img src={`${item.previewImageSrc}`} alt={item.alt} style={{ width: '100%', display: 'block' }} />
  }

  renderFooter() {
    let autoPlayClassName = classNames('pi', {
      'pi-play': !this.state.isAutoPlayActive,
      'pi-pause': this.state.isAutoPlayActive
    });

    let fullScreenClassName = classNames('pi', {
      'pi-window-maximize': !this.state.isPreviewFullScreen,
      'pi-window-minimize': this.state.isPreviewFullScreen
    });

    return (
      <div className="custom-galleria-footer">
        <Button data-testid="play" icon={autoPlayClassName} onClick={() => {
          if (!this.state.isAutoPlayActive) {
            this.galleria.startSlideShow();
            this.setState({ isAutoPlayActive: true });
          }
          else {
            this.galleria.stopSlideShow();
            this.setState({ isAutoPlayActive: false });
          }
        }} />
        {
          this.state.images && (
            <span>
              <span>{this.state.activeIndex + 1}/{this.state.images.length}</span>
              <span className="title">{this.state.images[this.state.activeIndex].title}</span>
              <span>{this.state.images[this.state.activeIndex].alt}</span>
            </span>
          )
        }
        <Button data-testid="fullscreen" icon={fullScreenClassName} onClick={() => this.toggleFullScreen()} />
      </div>
    );
  }

  render() {
    const footer = this.renderFooter();
    const galleriaClassName = classNames('custom-galleria', {
      'preview-fullscreen': this.state.isPreviewFullScreen
    });

    return (
      <div className="galleria">
        <div className="content-section implementation">
          <Galleria ref={(el) => this.galleria = el} value={this.state.images} activeIndex={this.state.activeIndex} onItemChange={this.onItemChange}
            showThumbnails={false} showPreviewNavButtons={true} showNavButtonsOnPreviewHover={true}
            numVisible={5} circular={true} autoPlay={true} transitionInterval={10000}
            previewItemTemplate={this.previewTemplate} footer={footer}
            style={{ maxWidth: '520px', margin: '0 auto' }} className={galleriaClassName} />
        </div>
      </div>
    );
  }
}