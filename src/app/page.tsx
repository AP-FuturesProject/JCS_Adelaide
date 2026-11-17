import Image from "next/image";
import VideoSection from "@/components/VideoSection";
import InstagramFeed from "@/components/InstagramFeed";
import MeetTheTeam from "@/components/MeetTheTeam";
import SiteFooter from "@/components/SiteFooter";
import CurvedLoop from "@/components/CurvedLoop";
import LogoReveal from "@/components/LogoReveal";
import LightRays from "@/components/LightRays";
import SplitFlapText from "@/components/SplitFlapText";
import ContactCta from "@/components/ContactCta";

export default function Home() {
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
          <LogoReveal>
            <Image
              src="/jcs-logo.png"
              alt="Jesus Christ Superstar"
              width={900}
              height={400}
              priority
              className="logo-img"
            />
          </LogoReveal>
          <SplitFlapText
            className="date-board"
            words={['EASTER 2027']}
            flipDuration={0.09}
            stagger={0.035}
            cycleDelay={20000}
            flickerEvery={1500}
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
          <p className="venue">
            <span>Futures Event Centre &middot; Paradise</span>
            <span>Adelaide, South Australia</span>
          </p>
          <VideoSection />
          <ContactCta />
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
             strip at any height. The wide viewWidth keeps the height term
             dominant in slice's max(w/viewWidth, h/120), so the text tracks
             the strip's height instead of growing with the viewport. */
          preserveAspectRatio="xMidYMid slice"
          viewWidth={4800}
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
