import Image from "next/image";
import VideoSection from "@/components/VideoSection";
import InstagramFeed from "@/components/InstagramFeed";
import MeetTheTeam from "@/components/MeetTheTeam";
import LightRays from "@/components/LightRays";
import SplitFlapText from "@/components/SplitFlapText";
import SpecularButton from "@/components/SpecularButton";

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
          <SpecularButton
            href="https://futuresaustralia.churchcenter.com/registrations/events/3694286"
            target="_blank"
            rel="noopener noreferrer"
            className="auditions-cta"
            size="lg"
            radius={18}
            tint="#ffffff"
            tintOpacity={0.04}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1}
            idleIntensity={0.35}
            shineSize={10}
            shineFade={34}
            thickness={1.2}
            glow={1}
            followMouse
            proximity={250}
          >
            Cast &amp; Crew Auditions
          </SpecularButton>
        </div>
      </main>
      <MeetTheTeam />
      <InstagramFeed />
    </>
  );
}
