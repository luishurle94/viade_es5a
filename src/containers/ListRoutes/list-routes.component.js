import React, { Component } from 'react';
import { RouteService, NotificationService } from '@services';
import { NotificationTypes } from '@inrupt/solid-react-components';
import { successToaster, errorToaster } from '@utils';
import { Loader } from '@util-components';
import { DataView } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import {
  Button,
  RouteDetails,
  DialogContent
} from './list-routes.style';
import { ListFriends } from '../index';


export class ListRoutes extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      layout: 'list',
      selectedRoute: null,
      visible: false,
      sharing: false,
      loading: false,
      sortKey: null,
      sortOrder: null,
      rows: 5,
      selectedFriends: []
    };
    this.itemTemplate = this.itemTemplate.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({loading: true})
    this.props.getAll(true)
      .then(list => {
        if (list && this._isMounted) {
          list = list.filter(i => i !== null && i !== undefined);
          let l = list.length > 5 ? 5 : list.length;
          this.setState({ loading: false, routes: list, rows: l });
          if (this.props.callback) {
            this.props.callback();
          }
        }
      }).catch(err => {
        this.setState({loading: false})
        console.error(err)
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  async delete(route) {
    try {
      this.setState({ loading: true });
      if (route.createdBy === this.props.webId)
        await RouteService.remove(route.webId);
      if (route.createdBy && route.createdBy !== this.props.webId)
        await RouteService.removeShared(route.webId);

      this.componentDidMount();
    } catch(e) {
      this.setState({ loading: false })
      errorToaster(this.state.t('file.error'))
    }
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
              {route.createdBy && route.createdBy !== this.props.webId && <div data-testid="createdBy" className="p-col-12">{this.props.t('listRoutes.createdBy')}: {route.createdBy}</div>}
            </div>
            <div className="buttons">
              <div className="flex-buttons">
                <div><Button id="details" data-testid="details" className="button" label="Details" onClick={() => this.seeDetails(route)}>{this.props.t('listRoutes.details')}</Button></div>
                {route.createdBy === this.props.webId &&
                  <div><Button data-testid="addMilestone" className="button" label="addMilestone" onClick={() => this.goToAddMilestone(route)}>{this.props.t('listRoutes.edit')}</Button></div>
                }
                {route.createdBy === this.props.webId &&
                  <div><Button data-testid="share" className="button" label="Share" onClick={() => this.share(route)}>{this.props.t('listRoutes.share')}</Button></div>
                }
                <div><Button data-testid="delete" className="button" label="Delete" onClick={() => this.delete(route)}>{this.props.t('listRoutes.delete')}</Button></div>
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
          <ListFriends selected={this.selectedFriends.bind(this)} />
          <Button data-testid="send" className="button" label="send" onClick={() => this.sendButton()}>{this.props.t('listRoutes.send')}</Button>
          {this.state.sharing && <Loader />}
        </DialogContent>
      );
    }
  }

  selectedFriends(friends) {
    this.setState({ selectedFriends: friends })
  }

  async sendButton() {
    this.setState({
      sharing: true
    });
    let everythingNoError = true;
    for (const friend of this.state.selectedFriends) {
      const res = await RouteService.share(this.state.selectedRoute, friend.webId);
      if (res) {
        const notificationContent = {
          title: this.props.t('listRoutes.notificationTitle'),
          summary: this.state.selectedRoute.name,
          url: this.state.selectedRoute.webId
        };
        const url = `${window.location.href.replace('list-routes', 'route-details')}?routeId=${this.state.selectedRoute.webId}`
        const publish = await NotificationService.publish(this.props.createNotification, notificationContent, friend.webId, NotificationTypes.INVITE, url);
        if (!publish) {
          everythingNoError = false;
        }
      } else {
        everythingNoError = false;
      }
    }

    this.setState({
      sharing: false
    });

    if (everythingNoError) {
      successToaster(this.props.t('listRoutes.shared'))
    } else {
      errorToaster(this.props.t('listRoutes.error'))
    }
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
        {this.state.loading && <Loader />}
      </div>

    );
  }
}
