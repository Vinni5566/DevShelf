import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DoorOpen, KeyRound, X } from "lucide-react";
import { Book } from "@/components/Book";
import { BrassBookend } from "@/components/ShelfProps";
import { secretRooms, type SecretRoom } from "@/lib/devshelf-adventures";
import { useLibrary } from "@/lib/library-storage";

export function SecretRoomsSection() {
  const { allAvailableBooks, isFavorite, toggleFavorite, openBookPreview, notify } = useLibrary();
  const prefersReducedMotion = useReducedMotion();
  const [activeRoom, setActiveRoom] = useState<SecretRoom | null>(null);
  const [visitedRooms, setVisitedRooms] = useState<string[]>([]);

  function enterRoom(room: SecretRoom) {
    setActiveRoom(room);
    if (!visitedRooms.includes(room.id)) {
      setVisitedRooms((prev) => [...prev, room.id]);
      notify("Entered a hidden room", `Welcome inside ${room.title}.`);
    }
  }

  const roomBooks = activeRoom
    ? activeRoom.featuredBookIds.flatMap((id) => allAvailableBooks.filter((b) => b.id === id))
    : [];

  return (
    <section
      id="secret-rooms"
      aria-labelledby="secret-rooms-heading"
      className="mx-auto max-w-[1240px] border-t border-border px-5 pt-14 pb-6 sm:px-8 lg:px-12"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 font-catalog text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            <KeyRound size={12} className="text-primary" /> BEYOND THE MAIN STACKS
          </p>
          <h2
            id="secret-rooms-heading"
            className="mt-1.5 font-editorial text-3xl text-foreground sm:text-4xl"
          >
            Secret library rooms
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Tucked behind quiet oak doors are six themed reading rooms — each with its own
            atmosphere and hand-picked shelf.
          </p>
        </div>

        <span className="font-catalog text-xs tabular-nums text-muted-foreground">
          {visitedRooms.length}/{secretRooms.length} ROOMS DISCOVERED
        </span>
      </div>

      {/* Arched Doorway Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {secretRooms.map((room, index) => {
          const visited = visitedRooms.includes(room.id);
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => enterRoom(room)}
              className="group relative flex flex-col items-start rounded-lg border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className="flex w-full items-center justify-between">
                {/* Tiny Arched Doorway Emblem */}
                <span
                  aria-hidden="true"
                  className="flex h-11 w-9 items-end justify-center rounded-t-full border border-[#51443C]/25 pb-2"
                  style={{ backgroundColor: room.accentHex }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3A2E27]/70" />
                </span>

                <span className="font-catalog text-[10px] tracking-wider uppercase text-muted-foreground">
                  {visited ? "VISITED" : `DOOR 0${index + 1}`}
                </span>
              </div>

              <h3 className="mt-4 font-editorial text-2xl text-foreground group-hover:text-primary">
                {room.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {room.subtitle}
              </p>

              <div className="mt-4 flex w-full items-center justify-between border-t border-border pt-3 text-xs">
                <span className="font-catalog text-[11px] text-muted-foreground">
                  {room.featuredBookIds.length} CURATED VOLUMES
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-primary">
                  Step inside <DoorOpen size={13} />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Room Interior Modal */}
      <AnimatePresence>
        {activeRoom && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRoom(null)}
              className="fixed inset-0 bg-[#2C231D]/60 backdrop-blur-[3px] dark:bg-black/75"
            />

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-lg border border-border bg-card shadow-2xl"
            >
              {/* Atmospheric Room Banner */}
              <div
                className="border-b border-border px-6 py-6 sm:px-8"
                style={{
                  background: `linear-gradient(135deg, ${activeRoom.accentHex}38 0%, transparent 75%)`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-catalog text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                      HIDDEN ROOM · {activeRoom.categories.join(" & ")}
                    </p>
                    <h3
                      id="room-modal-title"
                      className="mt-1.5 font-editorial text-3xl text-foreground sm:text-4xl"
                    >
                      {activeRoom.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                      {activeRoom.atmosphere}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveRoom(null)}
                    aria-label="Leave room"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Room Wooden Shelf */}
              <div className="px-6 py-8 sm:px-8">
                <div className="shelf-scroll shelf-perspective overflow-x-auto pt-12 pb-1">
                  <div className="flex min-w-max items-end gap-4 px-2">
                    <BrassBookend side="left" />
                    {roomBooks.map((book) => (
                      <Book
                        key={book.id}
                        book={book}
                        isFavorite={isFavorite(book.id)}
                        onSelect={(b) => {
                          setActiveRoom(null);
                          openBookPreview(b);
                        }}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                    <BrassBookend side="right" />
                  </div>
                </div>
                <div aria-hidden="true">
                  <div className="wooden-plank-top h-3 rounded-t-[2px] border-x border-t border-[#51443C]/25" />
                  <div className="wooden-plank-face h-3.5 rounded-b-[3px] border border-[#51443C]/30" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
