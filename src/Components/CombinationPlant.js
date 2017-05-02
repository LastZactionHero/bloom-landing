import $ from 'jquery'
import React from 'react'
import CombinationSelect from './CombinationSelect';
import CombinationPlantDetails from './CombinationPlantDetails';
import Loading from './Loading';

class CombinationPlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: null
    }
  }

  componentDidMount() {
    this.fetchRandomPlant();
  }

  fetchRandomPlant() {
    $.ajax({
      method: 'GET',
      url: 'http://api-search.plantwithbloom.com/search/random',
      success: (plant) => {
        this.setState({plant: plant});
      }
    });
  }

  plantSelected(plant) {
    this.setState({plant: plant});
    $("html, body").animate({ scrollTop: $(this.refs.combinationPlantTop).offset().top - 70}, 500);
  }

  render() {
    return(
      <div ref='combinationPlantTop' className='combination-plant'>
        {this.state.plant ?
          <div>
            <CombinationSelect plant={this.state.plant} onSelect={this.plantSelected.bind(this)} />
            <div className='row'>
              <div className='col-md-6 col-md-offset-3'>
                <CombinationPlantDetails plant={this.state.plant} zone={this.props.zone} />
              </div>
            </div>
          </div>
          : <Loading /> }
      </div>
    )
  }
}

export default CombinationPlant;