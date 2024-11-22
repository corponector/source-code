'use client';

import styles from './CandidateProfile.module.css';

interface Candidate {
  name: string;
  location: string;
  skills: string[];
}

interface CandidateProfileProps {
  candidate: Candidate;
}

const CandidateProfile = ({ candidate }: CandidateProfileProps) => (
  <div className={styles.profileCard}>
    <h3>{candidate.name}</h3>
    <p>
      <strong>Location:</strong>
      {candidate.location}
    </p>
    <p>
      <strong>Skills:</strong>
      {candidate.skills.join(', ')}
    </p>
    <button className={styles.messageButton} type="button">
      Send Message
    </button>
  </div>
);

export default CandidateProfile;
