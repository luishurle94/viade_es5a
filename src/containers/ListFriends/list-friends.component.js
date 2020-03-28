import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'primereact/listbox';
import { FriendService } from '@services';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header
} from './list-friends.style';

export class ListFriend extends Component {

  constructor() {
    super();
    this.state = {
      selected: null
    };
  }

  componentDidMount() {
    FriendService.getAll(false)
      .then(list => {
        if (list) {
          console.log(list)
          list = list.filter(i => i !== null && i !== undefined);
          this.setState({ friends: list });
        }
      }).catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        {this.state.friends &&
          <ListBox value={this.state.selected} options={this.state.friends} onChange={(e) => this.setState({ selected: e.value })} multiple={true} optionLabel="webId" />}
      </div>
    );
  }
}

const ListFriendsComponent = ({ props }: Props) => {
  const { t } = useTranslation();

  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <h3>{t('listRoutes.selectFriend')}</h3>
        </Header>
        <ListFriend />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default ListFriendsComponent;