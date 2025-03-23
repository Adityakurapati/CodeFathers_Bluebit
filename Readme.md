# Crowdsourced Disaster Relief Platform🌍🚨  
*Real-Time Crowdsourced Disaster Management Platform*  
**Deployemnt URL -**  
[open website](https://code-fathers-bluebit-adityakurapatis-projects.vercel.app/)


**Next.js · Leaflet · Firebase**  

---

## 📌 Problem Statement  
Disaster management suffers from three systemic failures:  
1. **Reactive Coordination**: Relief efforts are delayed due to fragmented communication.  
2. **Resource Mismanagement**: Supplies often don’t reach the neediest due to opaque distribution.  
3. **Exclusion of Communities**: Affected individuals lack agency in reporting or recovery.  

**Example**:  
During floods, stranded victims struggle to report their location, while NGOs and volunteers work in silos without real-time data.  

---

## 🚀 Solution & Intuition  
**DisasterReliefNet** flips traditional top-down disaster response by **empowering communities** to lead relief efforts.  

### Core Philosophy:  
- **Crowdsourced Intelligence**: Victims and volunteers become *first responders* by reporting and verifying emergencies.  
- **Real-Time Transparency**: Every resource request and donation is publicly tracked to prevent mismanagement.  
- **Adaptive Design**: A single platform works for earthquakes, floods, pandemics, and more.  

### Why This Works:  
1. **Speed**: Real-time mapping and Firebase’s low-latency database reduce response time.  
2. **Trust**: Public logs of aid distribution build accountability.  
3. **Resilience**: Offline-first design ensures functionality in connectivity blackouts.  

---

### Installation:  
1. Clone the repo:  
   ```bash
   git clone https://github.com/yourusername/disaster-relief-net.git  
   cd disaster-relief-net  
   ```
     
2. Install dependencies:  
   ```bash
   npm install  
     ```
3. Configure Firebase:  
   ```bash
   - Create `.env.local` with your Firebase config:  
       
     NEXT_PUBLIC_FIREBASE_API_KEY=your_key  
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain  ```
       
4. Run locally:  
   ```bash
   npm run dev  
   ```
     
---

## 🔑 Key Features  
### 1. Real-Time Disaster Reporting & Map  
**Intuition**: Traditional hotlines fail during network outages.  
**Implementation**:  
- **Leaflet Maps**: Lightweight, customizable maps with GeoJSON layers for disaster zones.  
- **Offline-First**: Reports are cached locally (IndexedDB) and synced to Firebase when online.  
- **Severity Tagging**: Users classify emergencies as 🟢 Mild / 🟡 Moderate / 🔴 Critical.  

### 2. Dynamic Resource Matching  
**Intuition**: Aid often goes to “loudest” requests, not the neediest.  
**Implementation**:  
- **Priority Algorithm**: Firebase Functions prioritize requests by:  
  javascript  
  // Simplified priority scoring  
  const score = (severity * 3) + (distance * 2) + (urgency * 1.5);  
    
- **NGO Dashboards**: Role-based views (Next.js API routes) let NGOs claim/fulfill requests.  

### 3. Community-Driven Recovery  
**Intuition**: Survivors are excluded from rebuilding decisions.  
**Implementation**:  
- **Rebuild Tracker**: Firebase Firestore logs progress with photo evidence and survivor feedback.  
- **Peer Support Forums**: Real-time chat (Firebase Realtime DB) moderated by mental health experts.  

### 4. Preparedness Hub  
**Intuition**: Preparedness plans are too generic to be useful.  
**Implementation**:  
- **Personalized Checklists**: Next.js static generation creates PDF checklists based on user location/disaster history.  
- **Risk Heatmaps**: Leaflet overlays showing flood/fire risk zones using historic data (GeoJSON).  

---

## 🛠 Tech Stack  
| **Component**      | **Tech**              | **Why Chosen**                                      |  
|---------------------|-----------------------|----------------------------------------------------|  
| **Frontend**        | Next.js               | SSR for SEO, API routes for backend logic.         |  
| **Maps**            | Leaflet + React-Leaflet | Lightweight, customizable, and open-source.        |  
| **Database**        | Firebase Firestore    | Real-time sync, offline support, and scalability.  |  
| **Auth**            | Firebase Auth         | Built-in social login (Google, Facebook).          |  
| **Hosting**         | Vercel                | Native Next.js support, edge network.              |  

---

---

## 🎨 UI/UX Design  
### Core Principles:  
1. **Clarity Over Complexity**:  
   - Leaflet maps show only critical layers (SOS, shelters).  
   - Priority tags (🔴/🟡/🟢) replace lengthy text.  
2. **Accessibility**:  
   - High-contrast mode for low-light emergencies.  
   - Voice commands for SOS reporting.  
3. **Real-Time Feedback**:  
   - Firebase listeners update UI on new requests.  
   - Animated progress bars for resource delivery.  

### Sample Screens:  
1. **Emergency Map**:  
   - Full-screen Leaflet map with clustered SOS markers.  
   - Floating button for offline reports.  
2. **Volunteer Dashboard**:  
   - Task cards with distance, priority, and ETA.  
3. **Recovery Tracker**:  
   - Grid of rebuilding projects with survivor testimonials.  

---

  
