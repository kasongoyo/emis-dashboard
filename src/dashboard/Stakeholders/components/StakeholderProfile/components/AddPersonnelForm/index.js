/* eslint no-underscore-dangle: "off" */
import { AutoComplete, Button, Col, Divider, Icon, Input, Row } from 'antd';
import React, { Component, Fragment } from 'react';
import { from } from 'rxjs';
import { searchStakeholder } from '../../../../../../common/API';
import StakeholderForm from '../../../StakeholderFormWrapper';
import './styles.css';

const { Option } = AutoComplete;

function renderOption(item) {
  return (
    <Option key={item._id} name={`${item.name} <${item.email}>`}>
      <div>
        <strong>{item.name}</strong>
      </div>
      <div>{item.email}</div>
    </Option>
  );
}
class AddPersonnelForm extends Component {
  state = {
    showCreatePersonnelForm: false,
    hits: [],
    selected: null,
    input: '',
  };

  onSelect = value => {
    this.setState({ selected: value });
  };

  handleSearch = () => {
    this.setState({ selected: null });
  };

  handleChange = value => {
    this.setState({ input: value });
    if (value.length > 1) {
      from(searchStakeholder(value)).subscribe(result => {
        this.setState({ hits: result.data });
      });
    }
  };

  handleAttachPersonnel = () => {
    this.setState({ input: '' });
  };

  toggleCreatePersonnelForm = () => {
    this.setState(prevState => ({
      showCreatePersonnelForm: !prevState.showCreatePersonnelForm,
    }));
  };

  render() {
    const { showCreatePersonnelForm, hits, selected, input } = this.state;

    return (
      <Fragment>
        {showCreatePersonnelForm ? (
          <StakeholderForm handleCancelClick={this.toggleCreatePersonnelForm} />
        ) : (
          <Row type="flex" align="middle" justify="center">
            <Col span={10}>
              <div>
                <div style={{ width: '100%' }}>
                  <AutoComplete
                    className="search-stakeholder"
                    style={{ width: '100%' }}
                    dataSource={hits.map(renderOption)}
                    onSelect={this.onSelect}
                    placeholder="Search stakeholder...."
                    onChange={this.handleChange}
                    onSearch={this.handleSearch}
                    value={input}
                    optionLabelProp="name"
                  >
                    <Input
                      suffix={
                        selected ? (
                          <Button
                            className="search-btn"
                            type="primary"
                            onClick={this.handleAttachPersonnel}
                          >
                            <Icon type="plus" /> Add
                          </Button>
                        ) : (
                          <Button
                            className="search-btn"
                            type="primary"
                            disabled
                          >
                            <Icon type="plus" /> Add
                          </Button>
                        )
                      }
                    />
                  </AutoComplete>
                </div>
                <Divider>
                  <div>OR</div>
                </Divider>
                <Button
                  type="primary"
                  className="block"
                  onClick={this.toggleCreatePersonnelForm}
                >
                  Create New Personnel
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }
}

export default AddPersonnelForm;
