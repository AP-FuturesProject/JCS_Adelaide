import Image from "next/image";
import VideoSection from "@/components/VideoSection";
import InstagramFeed from "@/components/InstagramFeed";
import MeetTheTeam from "@/components/MeetTheTeam";
import SiteFooter from "@/components/SiteFooter";
import CurvedLoop from "@/components/CurvedLoop";
import LightRays from "@/components/LightRays";
import SplitFlapText from "@/components/SplitFlapText";
import SpecularButton from "@/components/SpecularButton";

// Midnight Sunday 25 Oct 2026 in Adelaide, which is ACDT (UTC+10:30) by then.
// Pinned as a UTC instant so the build server's own timezone can't shift it.
const AUDITIONS_CLOSE = Date.parse("2026-10-24T13:30:00Z");

const CTA_LOOK = {
  className: "auditions-cta",
  size: "lg" as const,
  radius: 18,
  tint: "#ffffff",
  tintOpacity: 0.04,
  textColor: "#f5f5f5",
  lineColor: "#ffffff",
  baseColor: "#525252",
  intensity: 1,
  idleIntensity: 0.35,
  shineSize: 10,
  shineFade: 34,
  thickness: 1.2,
  glow: 1,
};

export default function Home() {
  const auditionsOpen = Date.now() < AUDITIONS_CLOSE;

  return (
    <>
      <main className="stage">
        <div className="light-rays-bg" aria-hidden="true">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.35}
            lightSpread={0.5}
            rayLength={3}
            glow={0.6}
            haze={0.25}
            followMouse={false}
            mouseInfluence={0.1}
            atmosphere={0.85}
            cursorShadow={false}
            intro={false}
          />
        </div>
        <div className="spotlight" aria-hidden="true" />
        <div className="content">
          <p className="location">Adelaide, South Australia</p>
          <div className="logo-wrap">
            <Image
              src="/jcs-logo.png"
              alt="Jesus Christ Superstar"
              width={900}
              height={400}
              priority
              className="logo-img"
            />
          </div>
          <SplitFlapText
            className="date-board"
            words={['EASTER 2027']}
            flipDuration={0.09}
            stagger={0.035}
            cycleDelay={15000}
            charset="alphanumeric"
            flipsPerChar={10}
            order="random"
            align="center"
            tileStyle="board"
            tileColor="#0a0a0a"
            textColor="#ca1415"
            glare={0.75}
            depth={0.55}
            tileRadius={3}
            gap={3}
            fontSize="clamp(19px, 5.8vw, 32px)"
            loop
            padTo={11}
            intro
          />
          <p className="venue">Futures Event Centre &middot; Paradise</p>
          <VideoSection />
          {auditionsOpen ? (
            <SpecularButton
              {...CTA_LOOK}
              href="https://futuresaustralia.churchcenter.com/registrations/events/3694286"
              target="_blank"
              rel="noopener noreferrer"
              followMouse
              proximity={250}
            >
              Cast &amp; Crew Auditions
            </SpecularButton>
          ) : (
            <SpecularButton {...CTA_LOOK} disabled>
              More Info Coming Soon
            </SpecularButton>
          )}
        </div>
      </main>
      <MeetTheTeam />
      <div className="phenomenon-strip">
        <CurvedLoop
          marqueeText="THE WORLD-WIDE PHENOMENON"
          /* "line" rather than "arc": with curveAmount 0 both draw a straight
             path, but arc sits at y=40 of a 120 viewBox and overflows upward,
             while line is positioned to sit inside it. */
          shape="line"
          speed={1.4}
          curveAmount={0}
          direction="left"
          fontSize={42}
          fontWeight={700}
          letterSpacing={1}
          /* Crops rather than letterboxing, and keeps the line centred in the
             strip at any height. */
          preserveAspectRatio="xMidYMid slice"
          separator="•"
          outline={false}
          scrollBoost={0.5}
          edgeFade={0.7}
          interactive
          pauseOnHover={false}
        />
      </div>
      <InstagramFeed />
      <SiteFooter />
    </>
  );
}
