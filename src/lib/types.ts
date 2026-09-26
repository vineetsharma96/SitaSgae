export type Severity = 'safe' | 'warning' | 'critical' | 'info';

export type DetectionStatus = 'ai_detected' | 'review_required' | 'human_confirmed';

export type IncidentStatus = 
  | 'awaiting_acknowledgment' 
  | 'acknowledged' 
  | 'investigating' 
  | 'assigned' 
  | 'escalated' 
  | 'resolved';

export type CameraStatus = 'online' | 'offline' | 'reconnecting' | 'error';

export interface Camera {
  id: string;
  name: string;
  site: string;
  zone: string;
  level: string;
  status: CameraStatus;
  streamType: 'RTSP' | 'WebRTC' | 'HLS';
  fps: number;
  resolution: string;
  latencyMs: number;
  heartbeat: string;
  coverageAngle: number;
  direction: number; // degrees 0-360
  position: { x: number; y: number; z?: number }; // normalized 0..1
  activeRules: string[];
  activeDetectionsCount: number;
  rtspUrl?: string;
  thumbnailSvg?: string;
}

export interface Detection {
  id: string;
  cameraId: string;
  type: 'person' | 'helmet' | 'no_helmet' | 'vest' | 'no_vest' | 'restricted_zone' | 'fall_detected' | 'heavy_machinery';
  label: string;
  confidence: number; // 0..1
  box: { x: number; y: number; width: number; height: number }; // normalized 0..1
  status: DetectionStatus;
  severity: Severity;
  timestamp: string;
  trackingId: string;
}

export interface IncidentTimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'detection' | 'rule_breach' | 'alert' | 'user_action';
  icon?: string;
}

export interface IncidentAuditItem {
  id: string;
  time: string;
  actor: string;
  action: string;
  details?: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  site: string;
  location: string;
  cameraId: string;
  cameraName: string;
  timestamp: string;
  evidenceThumbnail: string;
  evidenceVideoUrl?: string;
  recommendedAction: string;
  aiConfidence: number;
  aiExplanation: string;
  assignee: {
    id: string;
    name: string;
    role: string;
    phone: string;
  } | null;
  detections: Detection[];
  timeline: IncidentTimelineItem[];
  auditLog: IncidentAuditItem[];
  isSimulated: boolean;
}

export interface SafetyZone {
  id: string;
  name: string;
  type: 'restricted' | 'danger' | 'ppe_required' | 'entry_exit' | 'equipment';
  polygon: Array<{ x: number; y: number }>; // normalized 0..1
  cameraId: string;
  rule: string;
  severity: Severity;
  schedule: string;
  recipients: string[];
  activeWorkers: number;
}

export interface SafetyMetrics {
  camerasOnline: number;
  totalCameras: number;
  activeRisks: number;
  criticalIncidents: number;
  workersDetected: number;
  safetyCompliancePercent: number;
  avgResponseTimeSeconds: number;
  cameraUptimePercent: number;
}
