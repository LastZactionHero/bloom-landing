import React from 'react';
import $ from 'jquery';

class ZonePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zone: '',
      zipcode: ''
    }
  }

  handleUpdateZipcode(event) {
    const zipcode = $(event.target).val()
    if(zipcode.indexOf(/^0-9/) != -1 || zipcode.length > 5) {
      return;
    }
    this.setState({zipcode: zipcode});
    if(zipcode.length == 5) {
      $.ajax({
        method: 'GET',
        url: `http://api-search.plantwithbloom.com/zones/search?zipcode=${zipcode}`,
        success: (zone) => {
          this.setState({zone: zone.zone, zoneError: null})
          this.props.zoneChangeCallback(zone.zone);
        },
        error: (xhr) => {
          this.setState({zone: null, zoneError: true});
          this.props.zoneChangeCallback(null);
        }
      });
    } else {
      this.setState({zone: null, zoneError: null});
      this.props.zoneChangeCallback(null);
    }
  }

  render() {
    return(
      <div className='form-group'>
        <label>Filter Plants by Region</label>
        <input type='text' className='form-control' placeholder='Zipcode' value={this.state.zipcode} onChange={this.handleUpdateZipcode.bind(this)} />
        {this.state.zone ? <div className='label label-success' style={{display: 'block'}}>Only showing plants for Zone {this.state.zone}</div> : null }
        {this.state.zoneError ? <div className='label label-danger' style={{display: 'block'}}>Hmm, this doesn't look like a valid zipcode.</div> : null }
      </div>
    )
  }
}

export default ZonePicker;