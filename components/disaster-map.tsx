"use client"

import { useEffect, useRef, useState } from "react"
import { AlertTriangle, Droplets, Home } from "lucide-react"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Mock disaster data
const DISASTERS = [
        { id: 1, type: "fire", lat: 34.05, lng: -118.25, severity: "critical", sos: 3 },
        { id: 2, type: "flood", lat: 34.07, lng: -118.3, severity: "moderate", sos: 1 },
        { id: 3, type: "earthquake", lat: 34.09, lng: -118.22, severity: "critical", sos: 5 },
        { id: 4, type: "fire", lat: 34.03, lng: -118.2, severity: "moderate", sos: 2 },
        { id: 5, type: "flood", lat: 34.06, lng: -118.27, severity: "low", sos: 0 },
]

// Define a mock evacuation route
const EVACUATION_ROUTE = [
        [34.06, -118.25], // starting point
        [34.065, -118.26],
        [34.068, -118.27],
        [34.072, -118.275],
        [34.075, -118.28], // evacuation shelter
];

export default function DisasterMap({ showEvacuationRoute = false }) {
        const mapRef = useRef(null)
        const leafletMapRef = useRef(null)
        const [selectedDisaster, setSelectedDisaster] = useState(null)
        const [mapLoaded, setMapLoaded] = useState(false)
        const markersRef = useRef({})
        const evacuationRouteRef = useRef(null)

        useEffect(() => {
                // Prevent issues with SSR
                if (typeof window === 'undefined') return;

                // Fix Leaflet icon paths for custom icons
                if (!L.Icon.Default.imagePath) {
                        L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

                        delete L.Icon.Default.prototype._getIconUrl;
                        L.Icon.Default.mergeOptions({
                                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                        });
                }

                // Initialize map
                if (!leafletMapRef.current && mapRef.current) {
                        // Center on LA area (average of disaster coordinates)
                        const center = [34.06, -118.25];

                        // Create map instance
                        leafletMapRef.current = L.map(mapRef.current, {
                                center: center,
                                zoom: 13,
                                zoomControl: false // We'll use custom zoom controls
                        });

                        // Add OSM tile layer
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }).addTo(leafletMapRef.current);

                        // Create disaster markers
                        DISASTERS.forEach(disaster => {
                                createDisasterMarker(disaster);
                        });

                        setMapLoaded(true);
                }

                return () => {
                        // Clean up map on component unmount
                        if (leafletMapRef.current) {
                                leafletMapRef.current.remove();
                                leafletMapRef.current = null;
                        }
                };
        }, []);

        // Watch for changes to showEvacuationRoute prop
        useEffect(() => {
                if (!leafletMapRef.current) return;

                // Remove existing evacuation route if it exists
                if (evacuationRouteRef.current) {
                        leafletMapRef.current.removeLayer(evacuationRouteRef.current);
                        evacuationRouteRef.current = null;
                }

                // Remove shelter marker if it exists
                if (markersRef.current['shelter']) {
                        leafletMapRef.current.removeLayer(markersRef.current['shelter']);
                        markersRef.current['shelter'] = null;
                }

                // If evacuation route should be shown, add it to the map
                if (showEvacuationRoute) {
                        // Create a polyline for the evacuation route
                        evacuationRouteRef.current = L.polyline(EVACUATION_ROUTE, {
                                color: '#10b981', // emerald-500
                                weight: 6,
                                opacity: 0.8,
                                lineCap: 'round',
                                lineJoin: 'round',
                                dashArray: '10, 10',
                                dashOffset: '0',
                        }).addTo(leafletMapRef.current);

                        // Add evacuation shelter marker at the end point
                        const shelterIcon = L.divIcon({
                                className: 'shelter-icon',
                                html: `
                                <div style="
                                        background-color: #10b981;
                                        color: white;
                                        width: 30px;
                                        height: 30px;
                                        border-radius: 50%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        font-weight: bold;
                                        border: 2px solid white;
                                        box-shadow: 0 0 4px rgba(0,0,0,0.5);
                                ">🏠</div>
                                `,
                                iconSize: [30, 30],
                                iconAnchor: [15, 15]
                        });

                        const shelterMarker = L.marker(EVACUATION_ROUTE[EVACUATION_ROUTE.length - 1], {
                                icon: shelterIcon,
                                title: 'Evacuation Shelter'
                        }).addTo(leafletMapRef.current);

                        // Add to the marker refs to clean up later
                        markersRef.current['shelter'] = shelterMarker;

                        // Add shelter popup
                        const shelterPopup = L.popup({
                                closeButton: true,
                                className: 'disaster-popup',
                                maxWidth: 300,
                                minWidth: 200
                        }).setContent(`
                                <div class="p-2">
                                        <div class="flex items-center justify-between">
                                                <h3 class="text-lg font-bold">Evacuation Shelter</h3>
                                                <span class="rounded-full px-2 py-0.5 text-xs font-medium" style="
                                                        background-color: rgba(16, 185, 129, 0.2);
                                                        color: #065f46;
                                                ">
                                                        Open
                                                </span>
                                        </div>
                                        <p class="mt-1 text-sm">Capacity: 250 people (120 currently)</p>
                                        <p class="mt-1 text-sm">Distance: 0.8 miles</p>
                                        <div class="mt-2 flex gap-2">
                                                <button class="flex-1 rounded px-2 py-1 text-xs font-medium text-white" 
                                                        style="background-color: #10b981; cursor: pointer;">
                                                        Details
                                                </button>
                                        </div>
                                </div>
                        `);

                        shelterMarker.bindPopup(shelterPopup);

                        // Fit the map to show the entire route
                        leafletMapRef.current.fitBounds(evacuationRouteRef.current.getBounds(), {
                                padding: [50, 50]
                        });

                        // Add animation effect
                        const animateRoute = () => {
                                const path = document.querySelector('.leaflet-overlay-pane path');
                                if (path) {
                                        path.classList.add('dash-animation');
                                }
                        };

                        setTimeout(animateRoute, 100);
                }
        }, [showEvacuationRoute]);

        // Create custom disaster markers
        const createDisasterMarker = (disaster) => {
                // Get color based on disaster type
                const markerColor =
                        disaster.type === "fire" ? "#ef4444" :     // red-500
                                disaster.type === "flood" ? "#3b82f6" :    // blue-500
                                        disaster.type === "earthquake" ? "#f59e0b" : // amber-500
                                                "#6b7280";                                 // gray-500

                // Create custom HTML for the icon
                const iconHtml = `
      <div class="disaster-marker" style="position: relative;">
        <div style="
          background-color: ${markerColor}; 
          width: 20px; 
          height: 20px; 
          border-radius: 50%; 
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0,0,0,0.5);
        "></div>
        ${disaster.sos > 0 ? `
          <div style="
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: #ef4444;
            color: white;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid white;
          ">${disaster.sos}</div>
        ` : ''}
      </div>
    `;

                // Create custom divIcon
                const customIcon = L.divIcon({
                        className: 'custom-disaster-icon',
                        html: iconHtml,
                        iconSize: [24, 24],
                        iconAnchor: [12, 12]
                });

                // Create marker with custom icon
                const marker = L.marker([disaster.lat, disaster.lng], {
                        icon: customIcon,
                        title: `${disaster.type} (${disaster.severity})`
                }).addTo(leafletMapRef.current);

                // Create popup content
                const popupContent = `
      <div class="p-2">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold capitalize">${disaster.type} Emergency</h3>
          <span class="rounded-full px-2 py-0.5 text-xs font-medium" style="
            background-color: ${disaster.severity === "critical" ? "rgba(239, 68, 68, 0.2)" :
                                disaster.severity === "moderate" ? "rgba(245, 158, 11, 0.2)" :
                                        "rgba(34, 197, 94, 0.2)"
                        };
            color: ${disaster.severity === "critical" ? "#b91c1c" :
                                disaster.severity === "moderate" ? "#92400e" :
                                        "#166534"
                        };
          ">
            ${disaster.severity}
          </span>
        </div>
        <p class="mt-1 text-sm">${disaster.sos} active SOS requests</p>
        <div class="mt-2 flex gap-2">
          <button id="view-details-${disaster.id}" class="flex-1 rounded px-2 py-1 text-xs font-medium text-white" 
                  style="background-color: #2563eb; cursor: pointer;">
            View Details
          </button>
          <button id="respond-${disaster.id}" class="flex-1 rounded px-2 py-1 text-xs font-medium text-white"
                  style="background-color: #dc2626; cursor: pointer;">
            Respond
          </button>
        </div>
      </div>
    `;

                // Create popup with custom options
                const popup = L.popup({
                        closeButton: true,
                        className: 'disaster-popup',
                        maxWidth: 300,
                        minWidth: 200
                }).setContent(popupContent);

                // Add click event
                marker.on('click', () => {
                        setSelectedDisaster(selectedDisaster === disaster.id ? null : disaster.id);
                        marker.bindPopup(popup).openPopup();

                        // Add event listeners to buttons after popup is opened
                        setTimeout(() => {
                                document.getElementById(`view-details-${disaster.id}`)?.addEventListener('click', () => {
                                        console.log('View details for disaster:', disaster.id);
                                        // Add your view details logic here
                                });

                                document.getElementById(`respond-${disaster.id}`)?.addEventListener('click', () => {
                                        console.log('Respond to disaster:', disaster.id);
                                        // Add your respond logic here
                                });
                        }, 100);
                });

                // Add SOS pulse effect for disasters with SOS signals
                if (disaster.sos > 0) {
                        // Create pulse circle
                        const pulseIcon = L.divIcon({
                                className: 'pulse-icon',
                                html: `<div class="pulse-circle" style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(239, 68, 68, 0.3);
          position: relative;
          animation: pulse 2s infinite;
        "></div>`,
                                iconSize: [40, 40],
                                iconAnchor: [20, 20]
                        });

                        // Add pulse marker at same position
                        const pulseMarker = L.marker([disaster.lat, disaster.lng], {
                                icon: pulseIcon,
                                interactive: false,
                                zIndexOffset: -1000
                        }).addTo(leafletMapRef.current);

                        // Store reference to pulse marker
                        markersRef.current[`pulse-${disaster.id}`] = pulseMarker;
                }

                // Store marker reference
                markersRef.current[disaster.id] = marker;
        };

        // Get disaster icon component based on type
        const getDisasterIcon = (type) => {
                switch (type) {
                        case "fire":
                                return <AlertTriangle className="h-6 w-6 text-red-500" />
                        case "flood":
                                return <Droplets className="h-6 w-6 text-blue-500" />
                        case "earthquake":
                                return <Home className="h-6 w-6 text-amber-500" />
                        default:
                                return <AlertTriangle className="h-6 w-6 text-gray-500" />
                }
        }

        return (
                <div className="relative h-full w-full">
                        {/* Add pulse and evacuation route animation styles */}
                        <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 1000;
          }
        }
        
        .dash-animation {
          animation: dash 30s linear infinite;
        }
        
        .disaster-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .disaster-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }
        
        .disaster-popup .leaflet-popup-tip {
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
      `}</style>

                        {/* Leaflet Map Container */}
                        <div
                                ref={mapRef}
                                className="h-full w-full z-0"
                        />

                        {/* Map Controls */}
                        <div className="absolute bottom-24 right-4 z-10 flex flex-col gap-2 md:bottom-8 md:right-8">
                                <button
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100"
                                        onClick={() => leafletMapRef.current?.zoomIn()}
                                >
                                        <span className="text-xl font-bold">+</span>
                                </button>
                                <button
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100"
                                        onClick={() => leafletMapRef.current?.zoomOut()}
                                >
                                        <span className="text-xl font-bold">−</span>
                                </button>
                                <button
                                        className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100"
                                        onClick={() => leafletMapRef.current?.setView([34.06, -118.25], 13)}
                                >
                                        <span className="text-xl">🔍</span>
                                </button>
                        </div>

                        {/* Map Type Selector */}
                        <div className="absolute right-4 top-4 z-10 rounded-lg bg-white p-1 shadow-lg md:right-8 md:top-8">
                                <div className="flex gap-1">
                                        <button
                                                className="rounded px-3 py-1 text-sm font-medium bg-blue-500 text-white"
                                                onClick={() => {
                                                        if (leafletMapRef.current) {
                                                                // Clear existing tile layers
                                                                leafletMapRef.current.eachLayer(layer => {
                                                                        if (layer instanceof L.TileLayer) {
                                                                                leafletMapRef.current.removeLayer(layer);
                                                                        }
                                                                });

                                                                // Add OSM tile layer
                                                                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                                                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                                }).addTo(leafletMapRef.current);
                                                        }
                                                }}
                                        >
                                                Map
                                        </button>
                                        <button
                                                className="rounded px-3 py-1 text-sm font-medium hover:bg-gray-200"
                                                onClick={() => {
                                                        if (leafletMapRef.current) {
                                                                // Clear existing tile layers
                                                                leafletMapRef.current.eachLayer(layer => {
                                                                        if (layer instanceof L.TileLayer) {
                                                                                leafletMapRef.current.removeLayer(layer);
                                                                        }
                                                                });

                                                                // Add satellite tile layer
                                                                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                                                                        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                                                }).addTo(leafletMapRef.current);
                                                        }
                                                }}
                                        >
                                                Satellite
                                        </button>
                                </div>
                        </div>

                        {/* Legend */}
                        <div className="absolute left-4 bottom-4 z-10 rounded-lg bg-white bg-opacity-90 p-3 shadow-lg md:left-8 md:bottom-8 text-black text-bold">
                                <h4 className="text-sm font-bold mb-2">Disaster Types</h4>
                                <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                                <span className="text-xs">Fire</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                                <span className="text-xs">Flood</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                                <span className="text-xs">Earthquake</span>
                                        </div>
                                        {showEvacuationRoute && (
                                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                                                        <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                                        <span className="text-xs">Evacuation Route</span>
                                                </div>
                                        )}
                                </div>
                        </div>
                </div>
        )
}
