import React, { useState, useEffect } from 'react';
import './App.css';

// --- Icon SVGs (simple, culturally-inspired flavor) ---
const icons = {
  dashboard: (
    <svg height="32" width="32" viewBox="0 0 24 24" fill="#164d00"><circle cx="12" cy="12" r="10" stroke="#c89c56" strokeWidth="1" fill="#b6e2d3"/><path d="M12 2v8m0 0a4 4 0 1 1-4 4" stroke="#164d00" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
  ),
  wellness: (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect rx="7" width="24" height="24" fill="#e8f7eb"/><path d="M6 18c3-6 9-6 12 0" stroke="#164d00" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#164d00" strokeWidth="2"/></svg>
  ),
  dosha: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#ffe5b4" stroke="#c89c56" strokeWidth="1"/><path d="M8 16c0-3 8-3 8 0" stroke="#c89c56" strokeWidth="2"/><circle cx="9" cy="11" r="1.5" fill="#164d00"/><circle cx="15" cy="11" r="1.5" fill="#164d00"/></svg>
  ),
  scan: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" fill="#ededfd" stroke="#729ce4" strokeWidth="2"/><path d="M8 8h8v8H8z" stroke="#164d00" strokeWidth="1.5"/><path d="M11 12h2" stroke="#164d00" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  diseases: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="7" fill="#ffeded"/><path d="M8 8h8v8H8z" stroke="#e87a41" strokeWidth="2"/><circle cx="12" cy="12" r="2" fill="#e87a41"/></svg>
  ),
  consult: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="9" rx="8" ry="4" fill="#faf7e1" stroke="#c89c56"/><path d="M4 9v6c0 2.21 3.58 4 8 4s8-1.79 8-4V9" stroke="#164d00" strokeWidth="2"/></svg>
  ),
  community: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect rx="7" width="24" height="24" fill="#e8fffa"/><circle cx="8" cy="12" r="2" fill="#1bbc9b"/><circle cx="16" cy="12" r="2" fill="#a4dd40"/><path d="M8 14h8" stroke="#164d00" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  events: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect rx="7" width="24" height="24" fill="#e0f5ff"/><rect x="5" y="7" width="14" height="10" rx="2" fill="#fff" stroke="#729ce4" strokeWidth="1.5"/><rect x="8" y="11" width="4" height="2" rx="1" fill="#729ce4"/></svg>
  ),
  emergency: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect rx="7" width="24" height="24" fill="#ffeded"/><path d="M12 7v10m-5-5h10" stroke="#e87a41" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  gamify: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect rx="7" width="24" height="24" fill="#fffbe7"/><path d="M12 4l2.09 6.26H20l-5.18 3.78 2.09 6.26L12 14.52 7.09 20.04l2.09-6.26L4 10.26h5.91z" fill="#ffe276" stroke="#c89c56" strokeWidth="1.2"/></svg>
  ),
  learn: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect rx="7" width="24" height="24" fill="#eaf4fd"/><path d="M6 19V8l6-3 6 3v11" stroke="#729ce4" strokeWidth="2"/><path d="M6 14l6 3 6-3" stroke="#164d00" strokeWidth="1.5"/></svg>
  ),
};

// ---- Tab Configuration ----
const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: icons.dashboard },
  { key: 'wellness', label: 'Wellness', icon: icons.wellness },
  { key: 'dosha', label: 'Dosha', icon: icons.dosha },
  { key: 'scan', label: 'Scanner', icon: icons.scan },
  { key: 'diseases', label: 'Diseases', icon: icons.diseases },
  { key: 'consult', label: 'Consult', icon: icons.consult },
  { key: 'community', label: 'Community', icon: icons.community },
  { key: 'events', label: 'Events', icon: icons.events },
  { key: 'gamify', label: 'Gamify', icon: icons.gamify },
  { key: 'learn', label: 'Learn', icon: icons.learn },
  { key: 'emergency', label: 'SOS', icon: icons.emergency, navClass: "tab-emergency" },
];

// ----------- Feature Cards, Expandables, etc. --------------------------

// Reusable Card
function FeatureCard({ icon, title, description, onClick, highlight, children }) {
  return (
    <div className={`feature-card${highlight ? ' highlight' : ''}`} onClick={onClick} tabIndex={0} role="button">
      <div className="feature-card-icon">{icon}</div>
      <div>
        <div className="feature-title">{title}</div>
        <div className="feature-desc">{description}</div>
        {children}
      </div>
    </div>
  );
}

// Expandable List (recipes, resources, forums)
function ExpandableList({ title, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="expandable-list">
      <div className="expandable-list-header" onClick={() => setOpen(o => !o)} tabIndex={0} role="button">
        <span>{title}</span>
        <span style={{ fontWeight: "bold" }}>{open ? "−" : "+"}</span>
      </div>
      {open && (
        <ul className="expandable-list-body">
          {items.map((item, i) => (
            <li key={i}>{typeof item === 'string' ? item : item.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Main App
// PUBLIC_INTERFACE
function App() {
  // Track current tab
  const [tab, setTab] = useState('dashboard');
  // Demo: theme for styling preview
  const [theme, setTheme] = useState('light');
  // Example user information
  const [user, setUser] = useState({ name: "Akshaya", dosha: "Pitta-Kapha", city: "Chennai" });

  // Demo: sample health dashboard data
  const demoMetrics = {
    hydration: "2.1L",
    movement: "5,820 steps",
    mood: "Energized",
    sleep: "7h 12m",
    vitals: { bp: "118/78", hr: 81, spo2: "98%" }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Dummy content for expansion lists
  const recipeList = [
    "Ragi Idli (low GI, sattvic)", "Ayurvedic Kitchari", "Spiced Turmeric Milk"
  ];
  const forumList = [
    "💬 Sleep tips for Chennai heat", "🌱 Best local walking trails", "🌿 Anxiety relief with herbs"
  ];
  const eventList = [
    "Free Yoga Class @ Marina Beach", "Blood Donation Drive - T Nagar", "Nutritionist Camp (Anna Nagar)"
  ];

  // PUBLIC_INTERFACE
  function renderTabContent(tabKey) {
    switch (tabKey) {
      case 'dashboard':
        return (
          <div>
            <h2>Welcome, {user.name} 👋</h2>
            <div className="metrics-row">
              <FeatureCard
                icon={icons.wellness}
                title="Wellness"
                description={`${demoMetrics.hydration} water · ${demoMetrics.movement} · ${demoMetrics.mood}`}
                onClick={() => setTab('wellness')}
              />
              <FeatureCard
                icon={icons.dosha}
                title="Dosha"
                description={`Your dosha: ${user.dosha}`}
                onClick={() => setTab('dosha')}
              />
              <FeatureCard
                icon={icons.diseases}
                title="Health"
                description={`BP ${demoMetrics.vitals.bp}, HR {demoMetrics.vitals.hr}`}
                onClick={() => setTab('diseases')}
              />
            </div>
            <div className="card-row">
              <FeatureCard
                icon={icons.scan}
                title="Scan Product"
                description="AI scoring for food/meds"
                onClick={() => setTab('scan')}
                highlight
              />
              <FeatureCard
                icon={icons.consult}
                title="Consult Doctor"
                description="Tele/Chat with Ayurveda & Allopathy experts"
                onClick={() => setTab('consult')}
              />
            </div>
            <div className="card-row">
              <FeatureCard
                icon={icons.community}
                title="Community"
                description="Forums & peer support"
                onClick={() => setTab('community')}
              />
              <FeatureCard
                icon={icons.events}
                title="Near You"
                description="Health events & resources"
                onClick={() => setTab('events')}
              />
            </div>
            <hr className="dashboard-hr"/>
            <div className="expandables">
              <ExpandableList title="Popular Healthy Recipes" items={recipeList} />
              <ExpandableList title="Discussion Forums" items={forumList} />
              <ExpandableList title="Local Health Events" items={eventList} />
            </div>
          </div>
        );
      case 'wellness':
        return (
          <div>
            <h2>Wellness Tracker</h2>
            <div className="metric-card-row">
              <FeatureCard icon={icons.wellness} title="Diet" description="Track your meals, calories & macros" />
              <FeatureCard icon={icons.wellness} title="Hydration" description={`Today: ${demoMetrics.hydration}`} />
              <FeatureCard icon={icons.wellness} title="Movement" description={`${demoMetrics.movement}`} />
              <FeatureCard icon={icons.wellness} title="Mood" description={demoMetrics.mood} />
              <FeatureCard icon={icons.wellness} title="Sleep" description={demoMetrics.sleep} />
              <FeatureCard icon={icons.wellness} title="Vitals" description={`BP ${demoMetrics.vitals.bp}, HR ${demoMetrics.vitals.hr}, SpO2 ${demoMetrics.vitals.spo2}`} />
            </div>
            <div style={{marginTop: 12}}>
              <button className="primary-btn" style={{marginRight: 8}}>Add Health Log</button>
              <button className="secondary-btn">View History</button>
            </div>
          </div>
        );
      case 'dosha':
        return (
          <div>
            <h2>Dosha Assessment</h2>
            <div className="dosha-info">
              <b>Your Ayurvedic profile:</b> <span className="highlighted">{user.dosha}</span>
              <br />
              <span style={{fontSize: "1.05em"}}>
                <b>Pitta-Kapha</b>: Your constitution blends intensity with endurance. <br />
                <span style={{color:'#e87a41'}}>Tip:</span> Try cooling foods (coconut, cucumber), spice moderately, practice daily walks and mindfulness.
              </span>
            </div>
            <div style={{marginTop: 16}}>
              <button className="primary-btn" onClick={() => alert("Dosha quiz coming soon!")}>Retake Dosha Quiz</button>
              <button className="secondary-btn" style={{marginLeft: 6}}>Learn Dosha Science</button>
            </div>
          </div>
        );
      case 'scan':
        return (
          <div>
            <h2>Barcode / Photo Scanner</h2>
            <p>
              Scan a product to receive an AI-driven ethical & health score (ingredient, FSSAI, Ayurveda suitability).
            </p>
            <button className="primary-btn">Open Camera</button>
            <div className="scan-demo">
              <div>Try with a food or supplement label!</div>
              <div style={{opacity: 0.65, fontSize: 13}}>(Camera access and AI integration pending implementation)</div>
            </div>
          </div>
        );
      case 'diseases':
        return (
          <div>
            <h2>Disease Management</h2>
            <div className="disease-row">
              <FeatureCard icon={icons.diseases} title="Diabetes" description="Logs, trend detection, reminders" />
              <FeatureCard icon={icons.diseases} title="Hypertension" description="BP tracking, alerts" />
              <FeatureCard icon={icons.diseases} title="Asthma" description="Peakflow trends" />
            </div>
            <div style={{marginTop:12}}>
              <button className="primary-btn">Add Medication</button>
              <button className="secondary-btn" style={{marginLeft:6}}>Upload Files</button>
            </div>
          </div>
        );
      case 'consult':
        return (
          <div>
            <h2>Tele-Consultations</h2>
            <FeatureCard icon={icons.consult} title="Book Video Consult" description="With top Ayurveda & Allopathy doctors" />
            <FeatureCard icon={icons.consult} title="Share Reports" description="Secure file transfer" />
            <button className="primary-btn" style={{marginTop:10}}>Start a chat</button>
          </div>
        );
      case 'community':
        return (
          <div>
            <h2>Community & Peer Support</h2>
            <ExpandableList title="Active Forums" items={forumList} />
            <FeatureCard icon={icons.community} title="Wellness Groups" description="Find like-minded Chennaiites" />
            <FeatureCard icon={icons.community} title="Leaderboard" description="See top performers" />
            <button className="primary-btn" style={{marginTop:12}}>Create a Post</button>
          </div>
        );
      case 'events':
        return (
          <div>
            <h2>Local Health Events & Directories</h2>
            <ExpandableList title="Upcoming Events" items={eventList} />
            <FeatureCard icon={icons.events} title="Resource Finder" description="Hospitals, yoga, organic stores, nutritionists" />
            <button className="primary-btn" style={{marginTop:10}}>Suggest a Resource</button>
          </div>
        );
      case 'gamify':
        return (
          <div>
            <h2>Gamification</h2>
            <div className="gamification">
              <div>🏆 <b>Level:</b> 5</div>
              <div>🌟 <b>Badges:</b> Night Owl, Step Champion, Mindful Eater</div>
              <div>🔥 <b>Current Challenge:</b> Hydration Streak (4 days)</div>
              <div><b>Leaderboard:</b> #3 in Chennai</div>
            </div>
            <button className="primary-btn" style={{marginTop:10}}>Join Challenge</button>
          </div>
        );
      case 'learn':
        return (
          <div>
            <h2>Educational Content</h2>
            <ExpandableList title="Articles" items={["Ayurveda 101", "Eating with the Seasons", "Junk Food Scoring", "Yoga for Desk Workers"]} />
            <ExpandableList title="Videos" items={["Guided Pranayama", "Quick Healthy Recipes", "Understanding your Dosha"]} />
            <button className="primary-btn" style={{marginTop:10}}>Browse All Content</button>
            <button className="secondary-btn" style={{marginLeft:6}}>Switch Language</button>
          </div>
        );
      case 'emergency':
        return (
          <div>
            <h2>Emergency</h2>
            <div className="sos-block">
              <div>🚨 <b>One-tap contacts</b></div>
              <div>
                <button className="sos-btn primary-btn" style={{margin: "6px 8px 2px 0"}}>Ambulance</button>
                <button className="sos-btn secondary-btn" style={{margin: "6px 8px 2px 0"}}>Share Location</button>
                <button className="sos-btn primary-btn">Alert Family</button>
              </div>
              <div style={{color:"#e87a41", fontSize:13}}>Your location will be shared in emergencies (with permission).</div>
            </div>
          </div>
        );
      default:
        return <div>Coming soon...</div>;
    }
  }

  // PUBLIC_INTERFACE
  function renderTabBar() {
    return (
      <nav className="bottom-nav" aria-label="Bottom Navigation">
        {TABS.filter(t => t.key !== 'dashboard').slice(0,5).map(t =>
          <button
            key={t.key}
            className={`tab-btn ${tab === t.key ? 'active' : ''} ${t.navClass || ''}`}
            aria-label={t.label}
            onClick={() => setTab(t.key)}
            tabIndex={0}
          >
            {t.icon}
            <span className="tab-label">{t.label}</span>
          </button>
        )}
        <button
          className={`tab-btn tab-emergency ${tab==='emergency' ? 'active' : ''}`}
          aria-label="Emergency"
          onClick={() => setTab('emergency')}
        >
          {icons.emergency}
          <span className="tab-label">SOS</span>
        </button>
      </nav>
    );
  }

  // PUBLIC_INTERFACE
  function renderTopTabs() {
    return (
      <nav className="top-tabs" aria-label="Dashboard Main Tabs">
        {TABS.slice(0,7).map(t =>
          <button
            key={t.key}
            className={`top-tab-btn ${tab === t.key ? 'active' : ''}`}
            aria-label={t.label}
            onClick={() => setTab(t.key)}
            tabIndex={0}
          >
            <span className="top-tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        )}
        <span className="dashboard-header-spacer"/>
        <button className="theme-toggle" onClick={() => setTheme(th => th === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <span>🌙</span> : <span>☀️</span>}
        </button>
      </nav>
    );
  }

  // Root
  return (
    <div className="am-root">
      {renderTopTabs()}
      <main className="main-content">
        {renderTabContent(tab)}
      </main>
      {tab === 'dashboard' ? null : renderTabBar()}
      <footer className="copyright-footer">
        <span>&copy; 2024 ArogyaMitr | Wellness in Chennai</span>
      </footer>
    </div>
  );
}

export default App;
