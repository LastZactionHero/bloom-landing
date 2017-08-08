import React from 'react';

class CombinationSelectListItem extends React.Component {
  isSelectedPlant() {
    return this.props.selectedPlant.permalink == this.props.plant.permalink;
  }

  render() {
    return(
      <li>
        <div className={'plant-thumbnail ' + (this.isSelectedPlant() ? 'plant-thumbnail-selected' : '')}
             style={{backgroundImage: `url("${this.props.plant.image_url}")`}}
             onClick={() => { this.props.onSelect(this.props.plant) } }></div>
      </li>
    )
  }
}

export default CombinationSelectListItem;