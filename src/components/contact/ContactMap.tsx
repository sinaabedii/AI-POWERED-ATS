'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Tehran, Mellat Park coordinates
const LOCATION = {
  lat: 35.7796,
  lng: 51.4108,
  name: 'ArianTalent Headquarters',
  address: 'Vali-Asr Street, Mellat Park, Tehran, Iran',
};

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [LOCATION.lat, LOCATION.lng],
      zoom: 15,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    // Add tile layer with a modern style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          position: relative;
          width: 50px;
          height: 50px;
        ">
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            border-radius: 50% 50% 50% 0;
            transform: translate(-50%, -50%) rotate(-45deg);
            box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
          "></div>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -70%);
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 10px;
              height: 10px;
              background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
              border-radius: 50%;
            "></div>
          </div>
        </div>
      `,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
    });

    // Add marker
    const marker = L.marker([LOCATION.lat, LOCATION.lng], { icon: customIcon }).addTo(map);

    // Custom popup content
    const popupContent = `
      <div style="
        font-family: 'Inter', system-ui, sans-serif;
        padding: 8px;
        min-width: 200px;
      ">
        <div style="
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        ">
          <div style="
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
          ">🏢</div>
          <div>
            <div style="
              font-weight: 700;
              font-size: 14px;
              color: #1e293b;
            ">${LOCATION.name}</div>
            <div style="
              font-size: 11px;
              color: #8b5cf6;
              font-weight: 500;
            ">AI Recruitment Platform</div>
          </div>
        </div>
        <div style="
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
          padding-left: 50px;
        ">${LOCATION.address}</div>
        <div style="
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 8px;
        ">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${LOCATION.lat},${LOCATION.lng}" 
             target="_blank"
             style="
               flex: 1;
               padding: 8px 12px;
               background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
               color: white;
               text-decoration: none;
               border-radius: 8px;
               font-size: 12px;
               font-weight: 600;
               text-align: center;
               transition: opacity 0.2s;
             "
             onmouseover="this.style.opacity='0.9'"
             onmouseout="this.style.opacity='1'"
          >Get Directions</a>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'custom-popup',
    });

    // Open popup by default
    marker.openPopup();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          border: 1px solid #e2e8f0;
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .custom-popup .leaflet-popup-close-button {
          color: #64748b !important;
          font-size: 20px !important;
          padding: 8px !important;
        }
        .custom-popup .leaflet-popup-close-button:hover {
          color: #8b5cf6 !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
          border-radius: 12px !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          background: white !important;
          color: #64748b !important;
          border: none !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          font-size: 18px !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f8fafc !important;
          color: #8b5cf6 !important;
        }
        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(4px);
          border-radius: 8px 0 0 0;
          padding: 4px 8px !important;
          font-size: 10px !important;
        }
      `}</style>
      <div ref={mapRef} className="w-full h-full" />
    </>
  );
}
