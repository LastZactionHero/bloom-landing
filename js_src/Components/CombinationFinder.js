import React from 'react';
import CombinationPlant from './CombinationPlant';
import ZonePicker from './ZonePicker';
import Loading from './Loading';
import $ from 'jquery';

class CombinationFinder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zone: null,
      combinationTemplates: [],
      selectedTemplate: null
    }
  }

  zoneChangeCallback(zone) {
    this.setState({zone: zone});
  }

  componentDidMount() {
    this.pickRandomCombinationTemplate()
  }

  pickRandomCombinationTemplate() {
    $.ajax({
      method: 'GET',
      url: 'http://api-search.plantwithbloom.com/combination_templates'
    }).done( function(response) {
      this.setState({
        combinationTemplates: response,
        selectedTemplate: $.extend(true, {}, response[Math.floor(Math.random() * response.length)])
      })
    }.bind(this));
  }

  anotherCombination() {
    this.setState({
      selectedTemplate: $.extend(true, {}, this.state.combinationTemplates[Math.floor(Math.random() * this.state.combinationTemplates.length)])
    });
  }

  render() {
    return(
      <div>
        <div className='row intro'>
          <div className='col-md-5'>
            <p>
              We've selected several plants below that work well together as a starting point.
              For each of these plants, we've included a list of different plants of similar size and characteristics to explore.
            </p>
            <p><a href='https://medium.com/@LastZactionHero/plant-similarity-index-finding-similar-plants-with-pca-7914696cfaca' target='_blank'>See how we use machine learning to find similar plants.</a></p>
          </div>
          <div className='col-md-3 col-md-offset-1'>
            <ZonePicker zoneChangeCallback={this.zoneChangeCallback.bind(this)}/>
            <a className='btn btn-info' onClick={this.anotherCombination.bind(this)}><i className="fa fa-random" aria-hidden="true"></i> Try Another Combination</a>
          </div>
        </div>
        <div className='row'>
        { this.state.selectedTemplate ?
          this.state.selectedTemplate.starting_plants.map( (plant) => {
            return <div className='col-md-6'>
              <CombinationPlant plant={plant.plant} tooltip={plant.tooltip} key={`combination_plant_${plant.plant.permalink}`} zone={this.state.zone} />
            </div>
          })
          : <Loading />
        }
        </div>
      </div>
    )
  }
}

export default CombinationFinder;