import React from 'react'
import $ from 'jquery'
import Loading from './Loading';
import SimilarResult from './SimilarResult';
import SimilarPlant from './SimilarPlant';

class SimilarSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: null,
      similarPlants: [],
      zipcode: '',
      zone: null,
      zoneError: null,
      searchName: '',
      searchResults: [],
      searching: false
    };
  }

  componentDidMount() {
    this.fetchStartingPlant();
  }

  fetchStartingPlant() {
    $.ajax({
      method: 'GET',
      url: 'http://api-search.plantwithbloom.com/search/random',
      success: (plant) => {
        this.setState({plant: plant});
        this.fetchSimilarPlants(plant)
      }
    });
  }

  fetchRandomPlant() {
    this.fetchStartingPlant();
    this.scrollToPlant();
  }

  scrollToPlant() {
    $("html, body").animate({ scrollTop: $('#similar-search').offset().top }, 1000);
  }

  fetchSimilarPlants(plant) {
    let url = `http://api-search.plantwithbloom.com/search/similar?permalink=${plant.permalink}&result_count=12`;
    if(this.state.zone) { url += `&zone=${this.state.zone}` }

    $.ajax({
      method: 'GET',
      url: url,
      success: (similarPlants) => {
        this.setState({similarPlants: similarPlants});
      }
    });
  }

  selectPlant(plant) {
    this.setState({plant: plant, similarPlants: [], searchResults: [], searchName: ''})
    this.fetchSimilarPlants(plant);
    this.scrollToPlant();
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
          this.fetchSimilarPlants(this.state.plant);
        },
        error: (xhr) => {
          this.setState({zone: null, zoneError: true});
        }
      });
    } else {
      this.setState({zone: null, zoneError: null});
      this.fetchSimilarPlants(this.state.plant);
    }
  }

  handleUpdateSearchName(event) {
    const searchName = $(event.target).val();
    this.setState({searchName: searchName, searching: true, searchResults: []});

    if(this.searchTimeout) { clearTimeout(this.searchTimeout); }
    this.searchTimeout = setTimeout( () => {
      $.ajax({
        url: 'http://api-search.plantwithbloom.com/search/query',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          query: {
            common_name: searchName,
            flower_attributes: [],
            flower_colors:[],
            foliage_colors:[],
            garden_styles:[],
            growth_rates:[],
            height:{min: null, max: null},
            key_features:[],
            leave_types:[],
            light_needs:[],
            plant_types:[],
            special_features:[],
            usages:[],
            watering_needs:[],
            width:{min: null, max: null},
            zones:[]
          }
        }),
        success: (data) => {
          this.setState({searching: false, searchResults: data.plants.slice(0,5)});
        },
        error: () => {
          this.setState({searching: false});
        }
      })
    }, 1000);
  }

  render() {
    return(
      <div>
        <div>
          {this.state.plant ?
            <div className='row'>
              <div className='col-md-8'>
                <SimilarPlant plant={this.state.plant} />
              </div>
              <div className='col-md-4 well'>
                <div className='form-group'>
                  <label>Filter Plants by Region</label>
                  <input type='text' className='form-control' placeholder='Zipcode' value={this.state.zipcode} onChange={this.handleUpdateZipcode.bind(this)} />
                  {this.state.zone ? <div className='label label-success' style={{display: 'block'}}>Only showing plants for Zone {this.state.zone}</div> : null }
                  {this.state.zoneError ? <div className='label label-danger' style={{display: 'block'}}>Hmm, this doesn't look like a valid zipcode.</div> : null }
                </div>
                <hr/>
                <div className='form-group'>
                  <label>Search by Name</label>
                  <input type='text' className='form-control' placeholder='e.g. Lilyturf, Maple' value={this.state.searchName} onChange={this.handleUpdateSearchName.bind(this)} />
                </div>
                {this.state.searching ? <Loading /> : null}
                <div className='list-group'>
                  {this.state.searchResults.map( (plant) => {
                    return <a href='javascript:void(0)'
                              className='list-group-item'
                              key={`search_result_${plant.permalink}`}
                              onClick={() => { this.selectPlant(plant) }}>{plant.common_name}</a>
                  })}
                </div>
                <hr/>
                <a href='javascript:void(0)' 
                   className='btn btn-info'
                   onClick={this.fetchRandomPlant.bind(this)}><i className="fa fa-random" aria-hidden="true"></i> Random Plant</a>
              </div>
            </div>
            : null
          }
        </div>
        <hr/>
        { this.state.plant && this.state.similarPlants.length > 0 ?
          <div>
          <div className='row text-center hidden-sm hidden-xs similar-gradient'>
            <div className='col-md-2'><strong>Most Similar</strong></div>
            <div className='col-md-8'>&nbsp;</div>
            <div className='col-md-2'><strong>Less Similar</strong></div>
          </div>
          <div className='row'>
            {this.state.similarPlants.map( (plant) => {
              return <SimilarResult plant={plant} 
                                    comparisionPlant={this.state.plant} 
                                    selected={false} 
                                    key={`similar_plant_${plant.permalink}`}
                                    clickCallback={this.selectPlant.bind(this)} />
            })}
          </div>
          </div>
          : <Loading message='Finding similar plants'/>
        }
      </div>
    )
  }
}

export default SimilarSearch;