import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteService } from '@services';
import { errorToaster } from '@utils';
import { Loader } from '@util-components';
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

  share(route) {
    this.setState({ selectedRoute: route, visible: true });
  }

  seeDetails(route) {
    this.props.history.push(`route-details?routeId=${route.webId}`);
  }

  goToAddMilestone(route) {
    this.props.history.push(`route-edit?routeId=${route.webId}`);
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
          {route.name && <div data-testid="routeName" className="p-col-12"><b>{route.name}</b></div>}
          {!route.name && <div data-testid="routeName" className="p-col-12"><b>Route</b></div>}
          <div className="content">
            <div className="p-grid">
              {route.description && <div className="p-col-12">{route.description}</div>}
              {route.rank && <div className="p-col-12">{this.props.t('listRoutes.rank')}: {route.rank}</div>}
            </div>
            <div className="buttons">
              <div className="flex-buttons">
                <div><Button id="details" data-testid="details" className="button" label="Details" onClick={() => this.seeDetails(route)}>{this.props.t('listRoutes.details')}</Button></div>
                <div><Button data-testid="addMilestone" className="button" label="addMilestone" onClick={() => this.goToAddMilestone(route)}>{this.props.t('listRoutes.edit')}</Button></div>
                <div><Button data-testid="share" className="button" label="Share" onClick={() => this.share(route)}>{this.props.t('listRoutes.share')}</Button></div>
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
          <Button data-testid="send" className="button" label="send" onClick={() => this.sendButton()}>{this.props.t('listRoutes.send')}</Button>
        </DialogContent>
      );
    }
  }

  sendButton() {
    errorToaster('This funcionality is not implemented yet');
    this.setState({ selectedRoute: null, visible: false })
  }

  render() {
    return (
      <div>
        {this.state.routes &&
          <div className="content-section implementation">
            <DataView value={this.state.routes} layout={this.state.layout}
              itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={this.state.rows} />
          </div>
        }
        <Dialog header={this.props.t('listRoutes.selectFriend')} visible={this.state.visible} width="225px" modal={true} onHide={() => this.setState({ visible: false })}>
          {this.renderFriendsDialog()}
        </Dialog>
        {!this.state.routes && <Loader />}
      </div>

    );
  }
}

const ListRoutesComponent = ({ history }: Props) => {
  const { t } = useTranslation();

  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listRoutes.title')}</p>
        </Header>
        <ListRoutes t={t} history={history} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default ListRoutesComponent;
