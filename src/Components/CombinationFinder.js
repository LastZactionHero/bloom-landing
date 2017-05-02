import React from 'react';
import CombinationPlant from './CombinationPlant';
import ZonePicker from './ZonePicker';

class CombinationFinder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zone: null
    }
  }

  zoneChangeCallback(zone) {
    this.setState({zone: zone});
  }

  render() {
    return(
      <div>
        <div className='container'>
          <h2>Plant Combination Explorer</h2>
          <div className='row intro'>
            <div className='col-md-5'>
              <p>
                We've selected several plants below that work well together as a starting point.
                Select from the list of similar plants to explore new combinations for your garden.
              </p>
              <p>
                Bookmark or share this link to remember your choices.
              </p>
            </div>
            <div className='col-md-3 col-md-offset-1'>
              <ZonePicker zoneChangeCallback={this.zoneChangeCallback.bind(this)}/>
            </div>
          </div>
        </div>
        <CombinationPlant zone={this.state.zone} />
        <CombinationPlant zone={this.state.zone} />
        <CombinationPlant zone={this.state.zone} />
      </div>
    )
  }
}

export default CombinationFinder;