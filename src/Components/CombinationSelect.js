import React from 'react'
import $ from 'jquery'
import CombinationSelectListItem from './CombinationSelectListItem';

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
    Where you left off: Fetching the zone, needs to update the plants. Might want to wait off until the starting combinations are in place
    console.log(nextProps)
    this.fetchSimilarPlants(this.nextProps.plant, this.nextProps.zone);
  }

  fetchSimilarPlants(plant) {
    let url = `http://api-search.plantwithbloom.com/search/similar?permalink=${plant.permalink}&result_count=30`;
    if(this.props.zone) { url += `&zone=${this.props.zone}` }

    $.ajax({
      method: 'GET',
      url: url,
      success: (similarPlants) => {
        // Insert the Selected Plant into the list, sort by similiarity index
        similarPlants.push(this.props.plant);
        similarPlants = similarPlants.sort((a,b) => {return a.similarity_index - b.similarity_index });
        this.setState({similarPlants: similarPlants});
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
        const selectedPlantIndex = this.state.similarPlants.indexOf(this.props.plant);
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
            {this.state.similarPlants.map( (plant) => {
              return <CombinationSelectListItem key={`select_list_item_${plant.permalink}`}
                                                plant={plant} 
                                                selectedPlant={this.props.plant}
                                                onSelect={this.plantSelected.bind(this)} />
            })}
        	</ul>
        </div>
      </div>
    )
  }
}

export default CombinationSelect;