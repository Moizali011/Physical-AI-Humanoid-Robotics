import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ChatbotSidebar from '../components/Chatbot/ChatbotSidebar';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/modules/module-1">
            Start Learning Physical AI
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureBoxes() {
  return (
    <div className="container">
      <div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <div className="col col--4">
          <div className={clsx('card', styles.featureCard)}>
            <div className="card__header">
              <h3>🤖 AI & Robotics Fundamentals</h3>
            </div>
            <div className="card__body">
              <p>Learn the core principles of connecting digital AI systems with physical robots, including perception, planning, and control.</p>
            </div>
          </div>
        </div>
        <div className="col col--4">
          <div className={clsx('card', styles.featureCard)}>
            <div className="card__header">
              <h3>🔧 Industry Tools</h3>
            </div>
            <div className="card__body">
              <p>Master industry-standard tools like ROS 2, Gazebo, NVIDIA Isaac, and Unity for developing intelligent robotic systems.</p>
            </div>
          </div>
        </div>
        <div className="col col--4">
          <div className={clsx('card', styles.featureCard)}>
            <div className="card__header">
              <h3>🚀 Practical Applications</h3>
            </div>
            <div className="card__body">
              <p>Build real-world applications with humanoid robots, focusing on embodied intelligence and human-robot interaction.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Physical AI & Humanoid Robotics Textbook - Connecting Digital AI Systems with Physical Robots">
      <HomepageHeader />
      <main>
        <div className="container">
          <div className="row">
            <div className="col col--12">
              <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', background: 'linear-gradient(to right, #00f0ff, #a87bff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Welcome to Physical AI & Humanoid Robotics
              </h1>
              <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem', color: '#a0a0c0' }}>
                The ultimate textbook for connecting digital AI systems with physical robots
              </p>
            </div>
          </div>
        </div>

        <FeatureBoxes />

        <div className="container">
          <div className="row">
            <div className="col col--12">
              <p style={{ textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.8', marginTop: '2rem' }}>
                This comprehensive textbook teaches how to connect digital AI systems with physical robots,
                focusing on embodied intelligence and industry-standard tools like ROS 2, Gazebo, and NVIDIA Isaac.
                Whether you're an AI & Robotics student, engineer, hackathon participant, or startup builder,
                this textbook provides the knowledge and practical skills needed to build intelligent robotic systems.
              </p>
            </div>
          </div>
        </div>
      </main>
      <ChatbotSidebar />
    </Layout>
  );
}