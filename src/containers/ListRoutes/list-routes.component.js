import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteService } from '@services';
import { errorToaster } from '@utils';
import { DataView } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  Button,
  RouteDetails,
  DialogContent
} from './list-routes.style';
import { ListFriends } from '../index';


export class ListRoutes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: 'list',
      selectedRoute: null,
      visible: false,
      sortKey: null,
      sortOrder: null,
      rows: 5,
    };
    this.itemTemplate = this.itemTemplate.bind(this);
  }

  componentDidMount() {
    RouteService.getAll(true)
      .then(list => {
        if (list) {
          list = list.filter(i => i !== null && i !== undefined);
          let l = list.length > 5 ? 5 : list.length;
          this.setState({ routes: list, rows: l });

        }
      }).catch(err => console.error(err));
  }

  itemTemplate(route) {
    if (!route) {
      return (
        <div className="p-col-12"></div>
      );
    }
    return (
      <div className="p-col-12">
        <RouteDetails>
          <div data-testid="routeName" className="p-col-12"><b>{route.name}</b></div>
          <div className="content">
            <div className="p-grid">
              <div className="p-col-12">{route.description}</div>
              <div className="p-col-12">{this.props.t('listRoutes.rank')}: {route.rank}</div>
            </div>
            <div className="buttons">
              <div className="flex-buttons">
                <div><Button data-testid="details" className="button" label="Details" onClick={() => { window.location.assign('/route-details?routeId=' + route.webId); }}>{this.props.t('listRoutes.details')}</Button></div>
                <div><Button data-testid="share" className="button" label="Share" onClick={(e) => this.setState({ selectedRoute: route, visible: true })}>{this.props.t('listRoutes.share')}</Button></div>
              </div>
            </div>
          </div>
        </RouteDetails>
      </div>
    );
  }

  renderFriendsDialog() {
    if (this.state.selectedRoute) {
      return (
        <DialogContent>
          <ListFriends />
          <Button data-testid="send" className="button" label="send" onClick={() => {
            errorToaster('This funcionality is not implemented yet');
            this.setState({selectedRoute: null, visible: false})
          }}>{this.props.t('listRoutes.send')}</Button>
        </DialogContent>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="content-section implementation">
          {this.state.routes &&
            <DataView value={this.state.routes} layout={this.state.layout}
              itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={this.state.rows} />
          }
          <Dialog header={this.props.t('listRoutes.selectFriend')} visible={this.state.visible} width="225px" modal={true} onHide={() => this.setState({ visible: false })}>
            {this.renderFriendsDialog()}
          </Dialog>
        </div>
      </div>

    );
  }
}

const ListRoutesComponent = () => {
  const { t } = useTranslation();

  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listRoutes.title')}</p>
        </Header>
        <ListRoutes t={t} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default ListRoutesComponent;
