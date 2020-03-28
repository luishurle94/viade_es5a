import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteService } from '@services';
import { DataView } from 'primereact/dataview';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  Button,
  RouteDetails
} from './list-routes.style';

export class ListRoutes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: 'list',
      selectedRoute: null,
      visible: false,
      sortKey: null,
      sortOrder: null,
      rows: 5
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
          <div className="p-col-12"><b>{route.name}</b></div>
          <div className="content">
            <div className="p-grid">
              <div className="p-col-12">{route.description}</div>
              <div className="p-col-12">Rank: {route.rank}</div>
            </div>
            <div className="buttons">
              <div className="flex-buttons">
                <div><Button className="button" label="Details" onClick={() => { window.location.href = '/routemap?routeId=' + route.webId; }}>Detalles</Button></div>
                <div><Button className="button" label="Share" onClick={() => { }}>Compartir</Button></div>
              </div>
            </div>
          </div>
        </RouteDetails>
      </div>
    );
  }



  render() {
    return (
      <div>
        <div className="content-section implementation">
          {this.state.routes &&
            <DataView value={this.state.routes} layout={this.state.layout}
              itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={this.state.rows} />
          }

        </div>
      </div>

    );
  }
}

const ListRoutesComponent = ({ props }: Props) => {
  const { t } = useTranslation();

  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('listRoutes.title')}</p>
        </Header>
        <ListRoutes props={t} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default ListRoutesComponent;
