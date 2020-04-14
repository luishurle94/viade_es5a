import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteService, NotificationService } from '@services';
import { useNotification, NotificationTypes } from '@inrupt/solid-react-components';
import { successToaster, errorToaster } from '@utils';
import { Loader } from '@util-components';
import { DataView } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  Button,
  RouteDetails
} from '../list-friend-data.style';


export class FriendDetails extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      layout: 'list',
      selectedRoute: null,
      visible: false,
      sortKey: null,
      sortOrder: null,
      rows: 5,
      selectedFriends: []
    };
    this.itemTemplate = this.itemTemplate.bind(this);
  }

  componentDidMount() {
    this.props.getAll(true)
      .then(list => {
        console.log(list)
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
          {route.name && <div data-testid="routeName" className="p-col-12"><b>{route.name}</b></div>}
          {!route.name && <div data-testid="routeName" className="p-col-12"><b>Route</b></div>}
          <div className="content">
            <div className="p-grid">
              {route.webId && <div className="p-col-12">{route.webId}</div>}
              {route.image && <div className="p-col-12">{this.props.t('listRoutes.rank')}: {route.image}</div>}
            </div>
          </div>
        </RouteDetails>
      </div>
    );
  }

  renderFriendsDialog() {

  }

  selectedFriends(friends) {
    this.setState({ selectedFriends: friends })
  }

  async sendButton() {
    let everythingNoError = true;
    for (const friend of this.state.selectedFriends) {
      const res = await RouteService.share(this.state.selectedRoute, friend.webId + 'me');
      if (res) {
        const notificationContent = {
          title: this.props.t('listRoutes.notificationTitle'),
          summary: this.state.selectedRoute.name,
          url: this.state.selectedRoute.webId
        };
        const url = `${window.location.href.replace('list-routes', 'route-details')}?routeId=${this.state.selectedRoute.webId}`
        const publish = await NotificationService.publish(this.props.createNotification, notificationContent, friend.webId + 'me', NotificationTypes.INVITE, url);
        if (!publish) {
          everythingNoError = false;
        }
      } else {
        everythingNoError = false;
      }
    }

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
        {!this.state.routes && <Loader />}
      </div>

    );
  }
}

const ListFriendsComponent = ({ history, webId }: Props) => {
  const { t } = useTranslation();
  const { createNotification } = useNotification(webId);

  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listRoutes.title')}</p>
        </Header>
        <FriendDetails t={t} history={history} createNotification={createNotification} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default ListFriendsComponent;
