import React from 'react';
import ReactDOM from 'react-dom';
import SimilarSearch from './Components/SimilarSearch';
import CombinationFinder from './Components/CombinationFinder';

var similarSearchEl = document.getElementById('similar-search');
if(similarSearchEl) {
  ReactDOM.render(
    <div>
      <SimilarSearch />
    </div>,
    similarSearchEl
  );
}

var combinationFinderEl = document.getElementById('combination-finder');
if(combinationFinderEl) {
  ReactDOM.render(
    <div>
      <CombinationFinder />
    </div>,
    combinationFinderEl
  );
}

if(document.getElementsByClassName('demo-search')) {
  $.ajax({
    url: 'http://api-search.plantwithbloom.com/search/query',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      query: {
        common_name: "",
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
    success: function(data) {
      for(var i = 0; i < data.plants.length; i++){
        var plant = data.plants[i];
        var nameDiv = $('<div>').addClass('plant-search-result-name').text(plant.common_name);
        var resultDiv = $('<a>').attr('href', 'plants/' + plant.permalink + '.html').addClass('col-xs-4 col-sm-2 plant-search-result').css('background-image', 'url("' + plant.image_url + '")')
        resultDiv.append(nameDiv);
        $('.demo-search').append(resultDiv);
      }
    }
  })
}