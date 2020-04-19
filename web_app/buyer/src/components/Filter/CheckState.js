import React from './node_modules/react';
import Checkbox from './Checkbox';

class CheckState extends React.Component {
  state = { checked: false }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })
  }

  render() {
    return (
      <div style={{ fontFamily: 'system-ui' }}>
        <label style={{ paddingLeft: '10px' }}>
          <Checkbox
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}
          />
          <span style={{ marginLeft: 8 }}>Label Text</span>
        </label>
      </div>
    )
  }
}


export default CheckState;