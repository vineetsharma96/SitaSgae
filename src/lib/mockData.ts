import type { Camera, Incident, SafetyZone, SafetyMetrics } from './types';

export const mockMetrics: SafetyMetrics = {
  camerasOnline: 18,
  totalCameras: 20,
  activeRisks: 7,
  criticalIncidents: 2,
  workersDetected: 146,
  safetyCompliancePercent: 94.2,
  avgResponseTimeSeconds: 42,
  cameraUptimePercent: 98.6
};

export const mockCameras: Camera[] = [
  {
    id: 'CAM-014',
    name: 'Tower Crane – North Zone',
    site: 'Skyline Tower Alpha',
    zone: 'Zone A - Crane Radius & Hoist',
    level: 'Level 08',
    status: 'online',
    streamType: 'RTSP',
    fps: 30,
    resolution: '3840x2160 (4K)',
    latencyMs: 142,
    heartbeat: '2s ago',
    coverageAngle: 75,
    direction: 45,
    position: { x: 0.35, y: 0.30, z: 0.65 },
    activeRules: ['Restricted Swing Arc', 'Mandatory Hard Hat', 'High-Vis Vest'],
    activeDetectionsCount: 4,
    rtspUrl: 'rtsp://edge-01.site-alpha.internal:554/live/cam014'
  },
  {
    id: 'CAM-008',
    name: 'Excavation Pit & Shoring Core',
    site: 'Skyline Tower Alpha',
    zone: 'Zone B - Deep Foundation',
    level: 'Sub-level B2',
    status: 'online',
    streamType: 'RTSP',
    fps: 30,
    resolution: '1920x1080 (HD)',
    latencyMs: 165,
    heartbeat: '1s ago',
    coverageAngle: 90,
    direction: 180,
    position: { x: 0.65, y: 0.70, z: 0.1 },
    activeRules: ['Trench Exclusion Edge', 'Gas Monitor Sync', 'Personal Tether'],
    activeDetectionsCount: 2,
    rtspUrl: 'rtsp://edge-01.site-alpha.internal:554/live/cam008'
  },
  {
    id: 'CAM-003',
    name: 'North Tower Hoist & Loading Bay',
    site: 'Skyline Tower Alpha',
    zone: 'Zone C - Material Lift',
    level: 'Ground Level 00',
    status: 'online',
    streamType: 'RTSP',
    fps: 25,
    resolution: '2560x1440 (2K)',
    latencyMs: 190,
    heartbeat: '3s ago',
    coverageAngle: 60,
    direction: 90,
    position: { x: 0.20, y: 0.55, z: 0.2 },
    activeRules: ['No Pedestrian During Hoist', 'Vehicle Speed Limit 10km/h'],
    activeDetectionsCount: 6,
    rtspUrl: 'rtsp://edge-01.site-alpha.internal:554/live/cam003'
  },
  {
    id: 'CAM-021',
    name: 'East Perimeter Scaffolding & Edge',
    site: 'Skyline Tower Alpha',
    zone: 'Zone D - High Fall Hazard',
    level: 'Level 12',
    status: 'online',
    streamType: 'RTSP',
    fps: 30,
    resolution: '3840x2160 (4K)',
    latencyMs: 135,
    heartbeat: '1s ago',
    coverageAngle: 85,
    direction: 315,
    position: { x: 0.80, y: 0.35, z: 0.85 },
    activeRules: ['Dual Lanyard Harness', 'Leading Edge Barrier'],
    activeDetectionsCount: 1,
    rtspUrl: 'rtsp://edge-02.site-alpha.internal:554/live/cam021'
  },
  {
    id: 'CAM-009',
    name: 'Concrete Batching & Pump Station',
    site: 'Skyline Tower Alpha',
    zone: 'Zone E - Heavy Equipment',
    level: 'Ground Level 00',
    status: 'offline',
    streamType: 'RTSP',
    fps: 0,
    resolution: '1920x1080 (HD)',
    latencyMs: 0,
    heartbeat: 'Offline (Signal lost 14m ago)',
    coverageAngle: 70,
    direction: 210,
    position: { x: 0.15, y: 0.85, z: 0.05 },
    activeRules: ['Keep Clear Radius', 'Audible Reverse Alarm'],
    activeDetectionsCount: 0,
    rtspUrl: 'rtsp://edge-02.site-alpha.internal:554/live/cam009'
  },
  {
    id: 'CAM-017',
    name: 'South Access Turnstiles & PPE Check',
    site: 'Skyline Tower Alpha',
    zone: 'Zone F - Site Entry Gate',
    level: 'Ground Level 00',
    status: 'online',
    streamType: 'WebRTC',
    fps: 30,
    resolution: '1920x1080 (HD)',
    latencyMs: 95,
    heartbeat: 'Realtime',
    coverageAngle: 110,
    direction: 0,
    position: { x: 0.50, y: 0.92, z: 0.05 },
    activeRules: ['PPE Gate Verification', 'Badge Scan Alignment'],
    activeDetectionsCount: 8,
    rtspUrl: 'rtsp://edge-03.site-alpha.internal:554/live/cam017'
  }
];

export const mockIncidents: Incident[] = [
  {
    id: 'INC-2026-0881',
    title: 'Critical PPE Violation: No Helmet in Active Crane Radius',
    severity: 'critical',
    status: 'awaiting_acknowledgment',
    site: 'Skyline Tower Alpha',
    location: 'North Tower / Level 08',
    cameraId: 'CAM-014',
    cameraName: 'Tower Crane – North Zone',
    timestamp: '2026-09-26 00:11:45',
    evidenceThumbnail: '/assets/evidence-helmet-crane.svg',
    recommendedAction: 'Halt crane hoist cycle immediately. Dispatch Sector 4 Safety Marshal via radio ch. 2.',
    aiConfidence: 0.96,
    aiExplanation: 'Person detected (Tracking #WK-4491) inside designated active crane swing envelope without safety helmet. Confidence 96.4%. 18s duration inside prohibited boundary.',
    assignee: {
      id: 'USR-102',
      name: 'Marcus Vance',
      role: 'Sector 4 Lead Safety Marshal',
      phone: '+1 (555) 019-4822'
    },
    detections: [
      {
        id: 'DET-9901',
        cameraId: 'CAM-014',
        type: 'no_helmet',
        label: 'No Helmet Detected',
        confidence: 0.96,
        box: { x: 0.42, y: 0.28, width: 0.16, height: 0.44 },
        status: 'ai_detected',
        severity: 'critical',
        timestamp: '00:11:45',
        trackingId: 'WK-4491'
      },
      {
        id: 'DET-9902',
        cameraId: 'CAM-014',
        type: 'vest',
        label: 'High-Vis Vest ✓',
        confidence: 0.91,
        box: { x: 0.43, y: 0.38, width: 0.14, height: 0.22 },
        status: 'ai_detected',
        severity: 'safe',
        timestamp: '00:11:45',
        trackingId: 'WK-4491'
      },
      {
        id: 'DET-9903',
        cameraId: 'CAM-014',
        type: 'restricted_zone',
        label: 'Restricted Zone Incursion',
        confidence: 0.99,
        box: { x: 0.25, y: 0.20, width: 0.50, height: 0.60 },
        status: 'ai_detected',
        severity: 'critical',
        timestamp: '00:11:42',
        trackingId: 'ZONE-CRANE-A'
      }
    ],
    timeline: [
      {
        id: 'TL-1',
        time: '00:11:30',
        title: 'Worker Entered Sector Perimeter',
        description: 'Tracking ID #WK-4491 crossed yellow warning threshold from Staging 2.',
        type: 'detection'
      },
      {
        id: 'TL-2',
        time: '00:11:42',
        title: 'Crane Swing Arc Breached',
        description: 'Active lift load in progress overhead at 22m altitude.',
        type: 'rule_breach'
      },
      {
        id: 'TL-3',
        time: '00:11:45',
        title: 'Critical Alert Dispatched',
        description: 'Automated inference model v4.2 verified missing PPE. System trigger escalated to Dashboard.',
        type: 'alert'
      }
    ],
    auditLog: [
      {
        id: 'AUD-1',
        time: '00:11:45',
        actor: 'SiteSage Edge AI Node #4',
        action: 'Event Ingested & Classified',
        details: 'Inference latency: 48ms, Model: YOLO-SafeConst-v4'
      },
      {
        id: 'AUD-2',
        time: '00:11:46',
        actor: 'Alert Engine',
        action: 'Pushed to Command Center & Mobile Field Webhooks'
      }
    ],
    isSimulated: true
  },
  {
    id: 'INC-2026-0880',
    title: 'Restricted Zone Breach: Excavation Trench Exclusion Zone',
    severity: 'critical',
    status: 'investigating',
    site: 'Skyline Tower Alpha',
    location: 'Sub-level B2 / Shoring Pit',
    cameraId: 'CAM-008',
    cameraName: 'Excavation Pit & Shoring Core',
    timestamp: '2026-09-25 23:45:10',
    evidenceThumbnail: '/assets/evidence-excavation.svg',
    recommendedAction: 'Verify shoring wall clearance and instruct worker to retreat behind the guardrail.',
    aiConfidence: 0.94,
    aiExplanation: 'Worker entered the 2.5m shoring exclusion zone during active soil excavation.',
    assignee: {
      id: 'USR-104',
      name: 'Elena Rostova',
      role: 'Geotechnical Safety Supervisor',
      phone: '+1 (555) 019-4825'
    },
    detections: [],
    timeline: [],
    auditLog: [],
    isSimulated: true
  },
  {
    id: 'INC-2026-0879',
    title: 'High Fall Risk: Unhooked Harness on Perimeter Scaffolding',
    severity: 'warning',
    status: 'acknowledged',
    site: 'Skyline Tower Alpha',
    location: 'East Perimeter / Level 12',
    cameraId: 'CAM-021',
    cameraName: 'East Perimeter Scaffolding & Edge',
    timestamp: '2026-09-25 22:14:02',
    evidenceThumbnail: '/assets/evidence-scaffold.svg',
    recommendedAction: 'Radio scaffold foreman to verify lanyard 100% tie-off compliance.',
    aiConfidence: 0.88,
    aiExplanation: 'Worker near perimeter slab edge with safety harness unattached to static lifeline.',
    assignee: {
      id: 'USR-102',
      name: 'Marcus Vance',
      role: 'Sector 4 Lead Safety Marshal',
      phone: '+1 (555) 019-4822'
    },
    detections: [],
    timeline: [],
    auditLog: [],
    isSimulated: true
  },
  {
    id: 'INC-2026-0878',
    title: 'Material Lift Hoist Door Ajar During Transit',
    severity: 'warning',
    status: 'resolved',
    site: 'Skyline Tower Alpha',
    location: 'North Tower Hoist / Ground',
    cameraId: 'CAM-003',
    cameraName: 'North Tower Hoist & Loading Bay',
    timestamp: '2026-09-25 21:05:30',
    evidenceThumbnail: '/assets/evidence-hoist.svg',
    recommendedAction: 'Interlock sensor reset completed by technician.',
    aiConfidence: 0.98,
    aiExplanation: 'Gate interlock microswitch triggered mismatch during vertical descent.',
    assignee: {
      id: 'USR-108',
      name: 'David Chen',
      role: 'Rigging Superintendent',
      phone: '+1 (555) 019-4890'
    },
    detections: [],
    timeline: [],
    auditLog: [],
    isSimulated: true
  }
];

export const mockZones: SafetyZone[] = [
  {
    id: 'ZONE-001',
    name: 'Tower Crane 1 Slewing Radius (Level 08)',
    type: 'danger',
    polygon: [
      { x: 0.20, y: 0.15 },
      { x: 0.65, y: 0.12 },
      { x: 0.75, y: 0.55 },
      { x: 0.35, y: 0.68 },
      { x: 0.15, y: 0.40 }
    ],
    cameraId: 'CAM-014',
    rule: 'No unauthorized personnel without spotter contact and helmet verify',
    severity: 'critical',
    schedule: 'Active During Crane Operation (07:00 - 19:00)',
    recipients: ['Crane Operator Cab', 'Lead Marshal Vance', 'Safety Ops Audio'],
    activeWorkers: 1
  },
  {
    id: 'ZONE-002',
    name: 'Sub-Level Deep Pit Shoring Edge',
    type: 'restricted',
    polygon: [
      { x: 0.30, y: 0.40 },
      { x: 0.70, y: 0.35 },
      { x: 0.85, y: 0.80 },
      { x: 0.25, y: 0.75 }
    ],
    cameraId: 'CAM-008',
    rule: '2.5m buffer from unsupported excavation slope',
    severity: 'critical',
    schedule: '24/7 Continuous Enforcement',
    recipients: ['Geotech Safety Desk', 'Pit Marshal'],
    activeWorkers: 0
  },
  {
    id: 'ZONE-003',
    name: 'Main South Turnstile PPE Gate',
    type: 'ppe_required',
    polygon: [
      { x: 0.10, y: 0.10 },
      { x: 0.90, y: 0.10 },
      { x: 0.90, y: 0.90 },
      { x: 0.10, y: 0.90 }
    ],
    cameraId: 'CAM-017',
    rule: 'Mandatory Class 2 High-Vis + Hard Hat + Steel-Toe Verification',
    severity: 'warning',
    schedule: 'All Shifts Active',
    recipients: ['Security Gate Console'],
    activeWorkers: 8
  }
];
