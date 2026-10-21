"use client";

import ProfileCard from "@/components/ProfileCard";

const TEAM = [
  { name: "To Be Announced", title: "Director" },
  { name: "To Be Announced", title: "Musical Director" },
  { name: "To Be Announced", title: "Producer" },
  { name: "To Be Announced", title: "Choreographer" },
  { name: "To Be Announced", title: "Vocal Coach" },
  { name: "To Be Announced", title: "Stage Manager" },
];

export default function MeetTheTeam() {
  return (
    <section className="team-section">
      <h2 className="team-heading">Meet The Team</h2>
      <div className="team-grid">
        {TEAM.map(member => (
          <ProfileCard
            key={member.title}
            className="team-card"
            name={member.name}
            title={member.title}
            iconUrl="/jcs-icon.webp"
            holo={0.5}
            glare={0.35}
            tiltStrength={7}
            parallax={10}
            radius={0}
            enableTilt
            intro
            showUserInfo={false}
            enableMobileTilt
            theme="dark"
          />
        ))}
      </div>
    </section>
  );
}
