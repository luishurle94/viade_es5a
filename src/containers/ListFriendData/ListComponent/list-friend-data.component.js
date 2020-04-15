import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '@util-components';
import { DataView } from 'primereact/dataview';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  FriendDetailsWrapper
} from '../list-friend-data.style';


export class FriendDetails extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      layout: 'list',
      rows: 5,
      list: props.getAll
    };
    this.itemTemplate = this.itemTemplate.bind(this);
  }

  componentWillReceiveProps(nextProps){

    this.setState({list: nextProps.getAll, isLoading: true}, () => {
      this.state.list
      .then(list => {
        if (list) {
          list = list.filter(i => i !== null && i !== undefined).map(obj => { return {...obj, profile: obj.webId.concat('profile/card#me')} });
          let l = list.length > 5 ? 5 : list.length;
          this.setState({ friends: list, list: list, rows: l, isLoading: false });
          
        }
      }).catch(err => console.error(err));
    });


  }


  itemTemplate(friend) {
    if (!friend) {
      return (<div className="p-col-12"></div>
      );
    }
    return (
      <div className="p-col-12">
        <FriendDetailsWrapper>
          {friend.name && <div data-testid="friendName" className="p-col-12"><b>{friend.name}</b></div>}
          {!friend.name && <div data-testid="friendName" className="p-col-12"><b>{this.props.t('listFriendData.unnamedFriend')}</b></div>}
          <div className="content">
            <div className="p-grid">
              {friend.profile && <a className="p-col-12" href ={friend.profile}>{friend.profile}</a>}
            </div>
          </div>
        </FriendDetailsWrapper>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.friends &&
          <div className="content-section implementation">
            <DataView value={this.state.friends} layout={this.state.layout}
              itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={this.state.rows} />
          </div>
        }
        { (!this.state.friends || this.state.isLoading) &&  <Loader />}
      </div>

    );
  }
}

const ListFriendsComponent = ({ history, webId }: Props) => {
  const { t } = useTranslation();

  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listFriendData.title')}</p>
        </Header>
        <FriendDetails t={t} history={history} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default ListFriendsComponent;
