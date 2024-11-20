'use client';

import styles from './JobListing.module.css';

interface Job {
  title: string;
  description: string;
  location: string;
  salary: string;
}

interface JobListingProps {
  job: Job;
}

const JobListing = ({ job }: JobListingProps) => (
  <div className={styles.jobCard}>
    <h2 className={styles.jobTitle}>{job.title}</h2>
    <p className={styles.jobDescription}>{job.description}</p>
    <div className={styles.jobDetails}>
      <span>{job.location}</span>
      <span>{job.salary}</span>
    </div>
    {/* Add type="button" to avoid the ESLint warning */}
    <button className={styles.applyButton} type="button">
      Apply Now
    </button>
  </div>
);

export default JobListing;
