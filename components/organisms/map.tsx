"use client";

import { Category } from "@/lib/types/category";
import { Place } from "@/lib/types/place";
import { PlaceModal } from "@/components/molecules/place-modal";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

/**
 * マップに表示するピン（マーカー）の一覧
 * 管理者はこの配列を編集してピンを追加・変更・削除できます。
 *
 * 緯度・経度の調べ方:
 * - Google Maps で場所を右クリック → 座標をコピー
 * - または「〇〇 緯度 経度」で検索
 *
 * 例: ピンを追加する場合
 * { lat: 35.6762, lng: 139.6503, title: "東京 よしもと∞ホール" },
 */

const MAP_OPTIONS = {
  disableDefaultUI: true,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  zoomControl: false,
  clickableIcons: false,
  backgroundColor: "#f5f5f7",
  styles: [
    { elementType: "geometry", stylers: [{ color: "#f5f5f7" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f7" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#2b2b2f" }] },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#d1d1d6" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#4a4a50" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#e6e7eb" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#e9e9ec" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#c9c9cf" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#5a5a62" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#dadbe0" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#1c2430" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#7a90b0" }],
    },
  ],
};

export const MapContent = ({
  placeData,
  isModalOpen,
  setIsModalOpen,
  youtubeMeta,
  setYoutubeMeta,
  selectedPlace,
  openModal,
}: {
  placeData: Place[] | null;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  youtubeMeta: {
    title: string;
    thumbnailUrl: string;
  } | null;
  setYoutubeMeta: (
    youtubeMeta: {
      title: string;
      thumbnailUrl: string;
    } | null,
  ) => void;
  selectedPlace: Place | null;
  openModal: (place: Place) => void;
}) => {
  useEffect(() => {
    let isActive = true;
    const fetchYoutubeMeta = async () => {
      if (!selectedPlace?.youtube_url) {
        setYoutubeMeta(null);
        return;
      }
      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(
            selectedPlace.youtube_url,
          )}&format=json`,
        );
        if (!response.ok) throw new Error("Failed to fetch YouTube meta");
        const data = (await response.json()) as {
          title: string;
          thumbnail_url: string;
        };
        if (!isActive) return;
        setYoutubeMeta({
          title: data.title,
          thumbnailUrl: data.thumbnail_url,
        });
      } catch {
        if (!isActive) return;
        setYoutubeMeta(null);
      }
    };
    fetchYoutubeMeta();
    return () => {
      isActive = false;
    };
  }, [selectedPlace?.youtube_url]);

  const icon = (category: Category): string => {
    switch (category) {
      case "URA_SARABA":
        return "/assets/ura_saraba.jpg";
      case "GOTANDA_GARAGE":
        return "/assets/gotanda_garage.jpg";
      case "MAIN_CHANNEL":
        return "/assets/main_channel.jpg";
    }
  };

  const markerIcon = (category: Category) => {
    const url = icon(category);
    const maps =
      typeof window !== "undefined" ? (window as any).google?.maps : null;
    if (
      !maps ||
      typeof maps.Size !== "function" ||
      typeof maps.Point !== "function"
    ) {
      return { url };
    }
    return {
      url,
      scaledSize: new maps.Size(32, 32),
      anchor: new maps.Point(16, 16),
    };
  };

  return (
    <div className="relative h-full w-full">
      <Map
        defaultCenter={{ lat: 36.2, lng: 138.25 }}
        defaultZoom={5}
        className="h-full w-full"
        reuseMaps
        options={MAP_OPTIONS}
      >
        {placeData?.map((place, index) => (
          <Marker
            key={`${place.coordinate.lat}-${place.coordinate.lng}-${index}`}
            position={place.coordinate}
            title={place.name}
            icon={markerIcon(place.category)}
            onClick={() => openModal(place)}
          />
        ))}
      </Map>
    </div>
  );
};
