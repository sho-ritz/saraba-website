"use client";

import { Place } from "@/lib/types/place";

type YoutubeMeta = {
  title: string;
  thumbnailUrl: string;
};

type PlaceModalProps = {
  isOpen: boolean;
  place: Place | null;
  youtubeMeta: YoutubeMeta | null;
  onClose: () => void;
};

export const PlaceModal = ({
  isOpen,
  place,
  youtubeMeta,
  onClose,
}: PlaceModalProps) => {
  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className={`mx-6 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111318] px-10 py-8 text-white shadow-2xl transition-all duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={place?.name ?? "場所の詳細"}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/50">
              SELECTED PIN
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{place?.name ?? ""}</h3>
            <h4 className="mt-2 text-sm text-white font-semibold">
              {place?.description ? `＜ ${place?.description} ＞` : ""}
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/70 transition hover:border-white/60 hover:text-white"
          >
            CLOSE
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {place?.youtube_url ? (
            <a
              href={place.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-white/30 hover:bg-white/10"
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-xs tracking-[0.3em] text-white/50">
                  YOUTUBE
                </p>
                <div>
                  <p className="mt-1 text-base font-semibold text-white">
                    {youtubeMeta?.title ?? "動画を見る"}
                  </p>
                </div>
                {youtubeMeta?.thumbnailUrl ? (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <img
                      src={youtubeMeta.thumbnailUrl}
                      alt={youtubeMeta.title ?? "YouTube thumbnail"}
                      className="rounded-lg object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-20 w-36 rounded-lg bg-white/10" />
                )}
              </div>
            </a>
          ) : null}

          {place?.tabelog_url ? (
            <a
              href={place.tabelog_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition hover:border-white/30 hover:bg-white/10"
            >
              <span className="text-xs tracking-[0.3em] text-white/50">
                TABELOG
              </span>
              <div className="mt-1 break-all">{place.tabelog_url}</div>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};
