// import React from "react"
// import {
//   Map,
//   Marker,
//   Polygon,
//   GoogleApiWrapper
// } from "google-maps-react"

// const mapStyles = {
//   padding: "15px",
//   borderRadius:"20px",
//   maxWidth:"900px",
//   height: "60vh",
//   zIndex: "1 !important",
//   border:"2px solid rgb(212,158,135)",
// }

// class GameMap extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       polygons: [],
//     }
//   }

//   componentDidMount() {}

//   render() {
//     var self = this
//     var bounds = new this.props.google.maps.LatLngBounds()
//     for (var i = 0; i < this.props.positions.length; i++) {
//       bounds.extend({
//         lat: this.props.positions[i][0],
//         lng: this.props.positions[i][1],
//       })
//     }
//     return (
//         <Map
//           google={this.props.google}
//           zoom={2}
//           style={mapStyles}
//           center={{
//             lat: self.props.centerLoc[0],
//             lng: self.props.centerLoc[1],
//           }}
//           // bounds={bounds}
//         >
//           {this.props.positions.map(v => (
//             <Marker
//               title={`${v[0] + v[1]}`}
//               name={`${v[0] + v[1]}`}
//               key={v[0] + v[1]}
//               position={{ lat: v[0], lng: v[1] }}
//             />
//           ))}
//           <Polygon
//             paths={this.props.positions.map(v => ({ lat: v[0], lng: v[1] }))}
//             key={1}
//             strokeColor="#0000FF"
//             strokeOpacity={0.8}
//             strokeWeight={2}
//             fillColor="#0000FF"
//             fillOpacity={0.35}
//           />
//         </Map>
//     )
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: process.env.GATSBY_GOOGLE_MAP_API_KEY,
// })(GameMap)

import React from "react"
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoic3VtYW4wMDA5IiwiYSI6ImNsMzY5YjB2bjFsdHozYnA5dHN3b3FrdjEifQ.rfW8EEKX9_adNETGuzkgrg'
});

const GameMap = ({ latitude, longitude, zoom }) => {

  const viewport = {
    latitude,
    longitude,
    zoom,
  }

  return (
    <Map
      {...viewport}
      width="100%"
      height="400px"
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {/* {this.props.positions.map(v => (
        <Marker
          title={`${v[0] + v[1]}`}
          name={`${v[0] + v[1]}`}
          key={v[0] + v[1]}
          position={{ lat: v[0], lng: v[1] }}
        />
      ))} */}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg height="30" width="30" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" fill="blue" />
        </svg>
      </div>
    </Map>
  )
}

export default GameMap
