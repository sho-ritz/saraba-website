"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapContent } from "./map";
import { supabase } from "@/lib/supabaseClient";
import { Place } from "@/lib/types/place";
import { parseLatLngString } from "@/lib/utils";
import { PlaceModal } from "../molecules/place-modal";

export function JapanMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [category, setCategory] = useState<string | null>(null);
  const [placeData, setPlaceData] = useState<Place[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [youtubeMeta, setYoutubeMeta] = useState<{
    title: string;
    thumbnailUrl: string;
  } | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const openModal = (place: Place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchPlaces() {
      if (!category) {
        const { data, error } = await supabase.from("place").select("*");
        const places = data?.map((place) => ({
          ...place,
          coordinate: parseLatLngString(place.coordinate),
        })) as Place[];
        console.log("data", places);
        setPlaceData(places);
        return;
      }

      const { data, error } = await supabase
        .from("place")
        .select("*")
        .eq("category", category);
      if (error) {
        console.error("place fetch error:", error);
        return;
      }
      const places = data?.map((place) => ({
        ...place,
        coordinate: parseLatLngString(place.coordinate),
      })) as Place[];
      console.log("data", places);
      setPlaceData(places);
    }
    fetchPlaces();
  }, []);

  const locations = [
    {
      name: "さらば青春の光Official Youtube Channel",
      en: "Main Channel",
      icon: "/assets/main_channel.jpg",
    },
    { name: "裏さらば", en: "Ura Saraba", icon: "/assets/ura_saraba.jpg" },
    {
      name: "五反田ガレージ",
      en: "Gotanda Garage",
      icon: "/assets/gotanda_garage.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background py-24"
    >
      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.span
            className="text-xs tracking-[0.3em] text-muted-foreground block mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            TRACK OF JAPAN
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            聖地巡礼
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            さらば青春の光の軌跡を辿る
          </p>
        </motion.div>
      </div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Locations List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center gap-6 p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-accent/50 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Image
                      src={location.icon}
                      alt={location.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {location.name}
                      </h3>
                      <span className="text-xs tracking-widest text-muted-foreground">
                        {location.en}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Google Map */}
          <MapContent
            placeData={placeData}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            youtubeMeta={youtubeMeta}
            setYoutubeMeta={setYoutubeMeta}
            selectedPlace={selectedPlace}
            openModal={openModal}
          />
          <PlaceModal
            isOpen={isModalOpen}
            place={selectedPlace}
            youtubeMeta={youtubeMeta}
            onClose={closeModal}
          />
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-secondary/20 pointer-events-none select-none">
        JAPAN
      </div>
    </section>
  );
}
