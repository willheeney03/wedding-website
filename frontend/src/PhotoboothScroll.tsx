import { motion, useReducedMotion } from "motion/react";
import trayImg from "./assets/photobooth-tray.png";
import stripImg from "./assets/photostrip_black_white.jpg";

/**
 * Photobooth dispenser that drops a photostrip into the tray when the page loads.
 *
 * The strip slides out from the seam under the "PHOTOS DELIVERED HERE" plate,
 * overshoots slightly, and settles inside the grey window.
 *
 * The strip is sized by height (88% of the clip area) and its width follows
 * the image's own aspect ratio, so you can swap in any strip image.
 *
 * Props
 *  - tray / strip: image URLs (default to the imports above)
 *  - delay:        seconds to wait after load before the strip drops
 *  - duration:     seconds the drop takes
 *  - children:     optional content that fades in after the strip lands
 */

const TRAY_RATIO = "615 / 2066";

// Region the strip is clipped to: the grey window's columns, from the seam
// under the sign plate down to the bottom of the window.
const CLIP = { left: "15.6%", width: "67.6%", top: "29.8%", bottom: "3.9%" };

export default function PhotoboothScroll({
  tray = trayImg,
  strip = stripImg,
  delay = 0.6,
  duration = 2.4,
  children,
}) {
  const reduce = useReducedMotion();

  // Hidden above the clip edge -> drops, overshoots a touch -> settles
  const stripAnimation = reduce
    ? { initial: false }
    : {
        initial: { y: "-114%", rotate: 0 },
        animate: {
          y: ["-114%", "2.5%", "-0.8%", "0%"],
          rotate: [0, 0, 0.8, 0],
        },
        transition: {
          delay,
          duration,
          times: [0, 0.7, 0.88, 1],
          ease: ["easeInOut", "easeOut", "easeInOut"],
        },
      };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-10 py-8 md:flex-row md:gap-16">
      {/* Tray */}
      <div
        className="relative"
        style={{ height: "min(82vh, 880px)", aspectRatio: TRAY_RATIO }}
      >
        <img
          src={tray}
          alt="Photobooth photo tray"
          className="absolute inset-0 h-full w-full select-none"
          draggable={false}
        />

        {/* Clip layer: the strip is only visible below the seam */}
        <div className="absolute overflow-hidden" style={CLIP}>
          <motion.img
            src={strip}
            alt="Photostrip of the happy couple"
            draggable={false}
            className="absolute inset-x-0 bottom-[4%] mx-auto block h-[88%] w-auto origin-bottom select-none shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
            {...stripAnimation}
          />

          {/* Shadow under the plate, so the strip looks like it comes out from beneath it */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[4%] bg-gradient-to-b from-black/60 to-transparent" />
        </div>
      </div>

      {/* Message that fades in once the strip has landed */}
      {children && (
        <motion.div
          className="max-w-sm text-center"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + duration - 0.2, duration: 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}