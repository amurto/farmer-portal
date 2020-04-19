import React from "./node_modules/react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "./node_modules/react-places-autocomplete";

import './AutoCompleteLocation.css';

const AutoCompleteLocation = () => {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>

            <input {...getInputProps({ placeholder: "Type address" })} className="autocomplete"  spellCheck="false" />

            <div>
              {loading ? <div>Loading...</div> : null}

              {suggestions.map(suggestion => {
                const style = suggestion.active
                ? { backgroundColor: 'forestgreen', cursor: 'pointer' }
                : { backgroundColor: 'black', cursor: 'pointer' };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    &nbsp;<i className="fas fa-map-marker-alt"></i> &nbsp; {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default AutoCompleteLocation;