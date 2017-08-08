import $ from 'jquery'
import React from 'react'
import CombinationSelect from './CombinationSelect';
import CombinationPlantDetails from './CombinationPlantDetails';
import Loading from './Loading';
import Swipeable from 'react-swipeable'

class CombinationPlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: this.props.plant,
      similarPlants: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.plant != this.props.plant) {
      this.setState({plant: nextProps.plant});
    }
  }

  plantSelected(plant) {
    this.setState({plant: plant});
    $("html, body").animate({ scrollTop: $(this.refs.combinationPlantTop).offset().top - 90}, 500);
  }

  onSwipeLeft() {
    this.state.plant
    let index = this.state.similarPlants.map( (p) => { return p.permalink } ).indexOf(this.state.plant.permalink)
    if(index != -1) {
      let nextIndex = index += 1;
      if(nextIndex < (this.state.similarPlants.length)) {
        this.plantSelected(this.state.similarPlants[nextIndex]);
      }
    }
  }

  onSwipeRight() {
    this.state.plant
    let index = this.state.similarPlants.map( (p) => { return p.permalink } ).indexOf(this.state.plant.permalink)
    if(index != -1) {
      let nextIndex = index -= 1;
      if(nextIndex >= 0) {
        this.plantSelected(this.state.similarPlants[nextIndex]);
      }
    }
  }

  onFetchedSimilarPlants(plants) {
    this.setState({similarPlants: plants})
  }

  render() {
    return(
      <div ref='combinationPlantTop' className='combination-plant'>
        <div className='combination-tooltip'>
          {this.props.tooltip}
        </div>

        {this.state.plant ?
          <div>
            <CombinationSelect plant={this.state.plant} onSelect={this.plantSelected.bind(this)} zone={this.props.zone} onFetchedSimilarPlants={this.onFetchedSimilarPlants.bind(this)}/>
            <Swipeable onSwipedRight={this.onSwipeRight.bind(this)} onSwipedLeft={this.onSwipeLeft.bind(this)} delta={20}>
              <CombinationPlantDetails plant={this.state.plant} tooltip={this.props.tooltip} />
            </Swipeable>
          </div>
          : <Loading /> }
      </div>
    )
  }
}

export default CombinationPlant;