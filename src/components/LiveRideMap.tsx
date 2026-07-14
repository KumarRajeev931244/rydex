"use client"
import {
  MapContainer,
  Marker,
  TileLayer
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react"
import axios from "axios"


type Props={
    driverLocation:[Number,Number] | null
    pickUpLocation:[Number,Number] | null
    dropLocation:[Number,Number] | null
    mapStatus:string
}

  const pickUpIcon = new L.DivIcon({
    html: `<div style="display:flex; flex-direction:column; align-items:center; filter:drop-shadow(0 6px 18px rgba(0,0,0,0.22));">
  <div style="
    background:#0a0a0a; color:#fff;
    padding:5px 14px; border-radius:100px;
    font-size:10px; font-weight:800; letter-spacing:0.14em;
    text-transform:uppercase; white-space:nowrap;
    font-family:-apple-system,system-ui,sans-serif;
    box-shadow:0 2px 12px rgba(0,0,0,0.25);
  ">
    PICKUP
  </div>
  <div style="width:2px; height:10px; background:#0a0a0a; opacity:0.4;"></div>
  <div style="
    width:13px; height:13px; background:#0a0a0a; border-radius:50%;
    border:3px solid #fff;
    box-shadow:0 0 0 2px rgba(0,0,0,0.15), 0 3px 10px rgba(0,0,0,0.3);
  "></div>
</div>
`,
    className: "",
    iconSize: [70, 50],
      iconAnchor: [35,50],
  });

  const dropIcon = new L.DivIcon({
      html: `<div style="display:flex; flex-direction:column; align-items:center; filter:drop-shadow(0 6px 18px rgba(0,0,0,0.22));">
    <div style="
      background:#0a0a0a; color:#fff;
      padding:5px 14px; border-radius:100px;
      font-size:10px; font-weight:800; letter-spacing:0.14em;
      text-transform:uppercase; white-space:nowrap;
      font-family:-apple-system,system-ui,sans-serif;
      box-shadow:0 2px 12px rgba(0,0,0,0.25);
    ">
      Drop
    </div>
    <div style="width:2px; height:10px; background:#0a0a0a; opacity:0.4;"></div>
    <div style="
      width:13px; height:13px; background:#0a0a0a; border-radius:50%;
      border:3px solid #fff;
      box-shadow:0 0 0 2px rgba(0,0,0,0.15), 0 3px 10px rgba(0,0,0,0.3);
    "></div>
  </div>
  `,
      className: "",
      iconSize: [70, 50],
      iconAnchor: [35,50]
    });

  //   const driverIcon = new L.DivIcon({
  //     html: `<div  id="car-marker" style="width:52px; height:52px; display:flex; align-items:center; justify-content:center; transform-origin:center;
  //     transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  //     filter:drop-shadow(0 6px 18px rgba(0,0,0,0.5))
  //     ">
  //   <div style="
  //     background:#0a0a0a;  width:46px; height:46px;
  //     border-radius:50%
  //     display:flex; align-items:center; justify-content:center;
  //       box-shadow:0 0 0 3px #fff, 0 0 0 5px #0a0a0a, 0 8px 28px rgba(0,0,0,0.5);
  //   ">
  //   <svg width="22" height:"22" viewBox="0 0 24 24" fill="none" 
  //     Drop
  //   </div>
  //   <div style="width:2px; height:10px; background:#0a0a0a; opacity:0.4;"></div>
  //   <div style="
  //     width:13px; height:13px; background:#0a0a0a; border-radius:50%;
  //     border:3px solid #fff;
  //     box-shadow:0 0 0 2px rgba(0,0,0,0.15), 0 3px 10px rgba(0,0,0,0.3);
  //   "></div>
  // </div>
  // `,
  //     className: "",
  //     iconSize: [70, 50],
  //     iconAnchor: [35,50]
  //   });

  const driverIcon = new L.DivIcon({
  html: `
    <div style="display:flex; flex-direction:column; align-items:center; filter:drop-shadow(0 6px 18px rgba(0,0,0,0.22));">
      <div style="
        background:#0a0a0a; color:#fff;
        padding:5px 14px; border-radius:100px;
        font-size:10px; font-weight:800; letter-spacing:0.14em;
        text-transform:uppercase; white-space:nowrap;
        font-family:-apple-system,system-ui,sans-serif;
        box-shadow:0 2px 12px rgba(0,0,0,0.25);
      ">
        Driver
      </div>
      <div style="width:2px; height:10px; background:#0a0a0a; opacity:0.4;"></div>
      <div style="
        width:13px; height:13px; background:#0a0a0a; border-radius:50%;
        border:3px solid #fff;
        box-shadow:0 0 0 2px rgba(0,0,0,0.15), 0 3px 10px rgba(0,0,0,0.3);
      "></div>
    </div>
  `,
  className: "",
  iconSize: [56, 56],
  iconAnchor: [26, 26]
})


function LiveRideMap({ driverLocation, pickUpLocation, dropLocation,mapStatus}:Props) {

  const [routeToPickUp, setRouteToPickUp] = useState<[number,number][]>([]);
  const [routeToDrop, setRouteToDrop] = useState<[number,number][]>([]);

  useEffect(() => {
    if(!driverLocation) return;
    const [pLat,pLon] = pickUpLocation as [number,number]
    const [dLat,dLon] = dropLocation as [number,number]
    const [drLat,drLon] = driverLocation as [number,number]


    const getRoute = async (startLat:number, startLon:number, endLat:number, endLon:number) => {
      const res = await axios.get(`http://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`)
      return res.data.routes?.[0]
    }
    const fetchRoutes = async() => {
      try {
        if(mapStatus=="arriving"){
          const pickUpRoute = await getRoute(
            drLat,
            drLon,
            pLat,
            pLon

          )
          const dropRoute = await getRoute(
            dLat,
            dLon,
            drLat,
            drLon

          )
          if(pickUpRoute){
            setRouteToPickUp(pickUpRoute.coordinates.map(([lon,lat]:number[]) => [lat, lon]))
          }
          if(dropRoute){
            setRouteToDrop(dropRoute.coordinates.map(([lon,lat]:number[]) => [lat, lon]))
          }
           
        }else{
          setRouteToPickUp([])
          const dropRoute = await getRoute(
            dLat,
            dLon,
            drLat,
            drLon

          )
          if(dropRoute){
            setRouteToDrop(dropRoute.coordinates.map(([lon,lat]:number[]) => [lat, lon]))
          }


        }
      } catch (error) {
        console.log(error);
      }
    }

  }, []);

    return ( 
       <div className="relative h-full w-full bg-zinc-100">
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={pickUpLocation as any}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; 
          <a href="https://carto.com">CARTO</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {pickUpLocation && (
          <Marker
            position={pickUpLocation as any}
            icon={pickUpIcon}
            draggable
          />
        )}
        {dropLocation && (
          <Marker
            position={dropLocation as any}
            icon={dropIcon}
            draggable
        
          />
        )}
         {driverLocation && (
          <Marker
            position={driverLocation as any}
            icon={driverIcon}
            draggable
        
          />
        )}
        </MapContainer>
       
    </div>
     );
}

export default LiveRideMap;