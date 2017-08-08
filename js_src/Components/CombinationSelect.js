import React from 'react'
import $ from 'jquery'
import sly from '../../node_modules/sly-scrolling/dist/sly.js';
import CombinationSelectListItem from './CombinationSelectListItem';
import Loading from './Loading';

// require("sly-scrolling")

class CombinationSelect extends React.Component {
  constructor(props) {
    super();
    this.state = {
      similarPlants: [],
    }
  }

  componentDidMount() {
    this.fetchSimilarPlants(this.props.plant, this.props.zone);
  }

  componentWillReceiveProps(nextProps) {
    console.log('CombinationSelect#componentWillReceiveProps');
    console.log(nextProps);
    if(nextProps.zone != this.props.zone) {
      console.log(`Zone change! ${this.props.zone} to ${nextProps.zone}`)
      this.fetchSimilarPlants(this.props.plant, nextProps.zone)
    }
  }

  fetchSimilarPlants(plant, zone) {
    let url = `http://api-search.plantwithbloom.com/search/similar?permalink=${plant.permalink}&result_count=30`;
    if(zone) { url += `&zone=${zone}` }

    $.ajax({
      method: 'GET',
      url: url,
      success: (similarPlants) => {
        // Insert the Selected Plant into the list, sort by similiarity index
        const sortedSimilarPlants = similarPlants.sort((a,b) => {return a.similarity_index - b.similarity_index })
        this.setState({similarPlants: sortedSimilarPlants});
        this.props.onFetchedSimilarPlants(similarPlants);
      }
    });
  }

  plantSelected(plant) {
    this.props.onSelect(plant)
  }

  render() {
    setTimeout(function(){
      if(this.sly) {
        this.sly.reload();

        // Scroll to the selected plant
        let selectedPlantIndex = this.state.similarPlants.map( (p) => { return p.permalink } ).indexOf(this.props.plant.permalink)
        if(selectedPlantIndex == -1) {
          selectedPlantIndex = this.state.similarPlants.length / 2;
          this.plantSelected(this.state.similarPlants[selectedPlantIndex]);
        }
        this.sly.toCenter(selectedPlantIndex);
      } else {
        const options = {
        	horizontal: 1,
        	itemNav: 'basic',
        	speed: 300,
        	mouseDragging: 1,
        	touchDragging: 1,
          smart: true,
          scrollBar: this.refs.scrollbar
        };
        this.sly = new Sly(this.refs.frame, options).init();
      }
    }.bind(this));

    return(
      <div className='combination-similar-select'>
        <div className="scrollbar" ref='scrollbar'>
        	<div className="handle"></div>
        </div>
        <div className="frame" ref='frame'>
        	<ul className="slidee">
            { this.state.similarPlants.length > 0 ? 
              this.state.similarPlants.map( (plant) => {
                return <CombinationSelectListItem key={`select_list_item_${plant.permalink}`}
                                                  plant={plant} 
                                                  selectedPlant={this.props.plant}
                                                  onSelect={this.plantSelected.bind(this)} />
              })
              : <Loading message='Finding similar plants'/>
            }
        	</ul>
        </div>
      </div>
    )
  }
}

export default CombinationSelect;