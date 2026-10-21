"use client";

import ProfileCard from "@/components/ProfileCard";

const TEAM = [
  { name: "Georgie Harris", title: "Director", photo: "georgie-harris" },
  { name: "Aaron Deanshaw", title: "Music Director", photo: "aaron-deanshaw" },
  { name: "Angela Portolesi", title: "Vocal Director", photo: "angela-portolesi" },
  { name: "Shona Tostevin", title: "Assistant Vocal Director", photo: "shona-tostevin" },
  { name: "Maddie Apacible", title: "Choreographer", photo: "maddie-apacible" },
  { name: "Danny Bilan", title: "Creative Producer", photo: "danny-bilan" },
];

export default function MeetTheTeam() {
  return (
    <section className="team-section">
      <h2 className="team-heading">Meet The Team</h2>
      <div className="team-grid">
        {TEAM.map(member => (
          <ProfileCard
            key={member.name}
            className="team-card"
            name={member.name}
            title={member.title}
            avatarUrl={`/team/${member.photo}.webp`}
            iconUrl="/jcs-icon.webp"
            backdropColor="#e8e8ea"
            holo={0.7}
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
