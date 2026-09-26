/**
 * Mathematical 2D Coordinate & Projection System for SiteSage
 * Priority 10 Specification
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface BoundingBox2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Maps normalized coordinates [0, 1] to centered canvas coordinates
 * X = (x - 0.5) * W
 * Y = (0.5 - y) * H
 */
export function normalizedToCentered(p: Point2D, width: number, height: number): Point2D {
  return {
    x: (p.x - 0.5) * width,
    y: (0.5 - p.y) * height
  };
}

/**
 * Maps normalized [0, 1] to canvas pixel space [0, W], [0, H]
 */
export function normalizedToPixel(p: Point2D, width: number, height: number): Point2D {
  return {
    x: p.x * width,
    y: p.y * height
  };
}

/**
 * Controlled perspective-style 2D projection
 * x' = f * x / max(z, eps)
 * y' = f * y / max(z, eps)
 */
export function perspectiveProject2D(
  p: Point3D,
  focalLength: number = 1.0,
  epsilon: number = 0.05
): Point2D {
  const safeZ = Math.max(p.z, epsilon);
  return {
    x: (focalLength * p.x) / safeZ,
    y: (focalLength * p.y) / safeZ
  };
}

/**
 * 2D Isometric-style projection for site map overview
 * screenX = (x - z) * cos(30°)
 * screenY = y + (x + z) * sin(30°)
 */
export function isometricProject2D(p: Point3D, scale: number = 1.0): Point2D {
  const cos30 = Math.cos(Math.PI / 6); // ~0.866
  const sin30 = Math.sin(Math.PI / 6); // 0.5
  return {
    x: (p.x - p.z) * cos30 * scale,
    y: (p.y + (p.x + p.z) * sin30) * scale
  };
}

/**
 * Camera coverage width calculation at distance z
 * width(z) = 2 * z * tan(theta / 2)
 */
export function cameraCoverageWidth(distanceZ: number, fovAngleDegrees: number): number {
  const fovRad = (fovAngleDegrees * Math.PI) / 180;
  return 2 * distanceZ * Math.tan(fovRad / 2);
}

/**
 * Ray-casting Point-in-Polygon containment algorithm
 */
export function isPointInPolygon(point: Point2D, polygon: Point2D[]): boolean {
  if (polygon.length < 3) return false;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect = ((yi > point.y) !== (yj > point.y)) &&
      (point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Checks if two line segments intersect (p1-p2 and p3-p4)
 */
function doSegmentsIntersect(p1: Point2D, p2: Point2D, p3: Point2D, p4: Point2D): boolean {
  function ccw(a: Point2D, b: Point2D, c: Point2D): boolean {
    return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
  }
  return (ccw(p1, p3, p4) !== ccw(p2, p3, p4)) && (ccw(p1, p2, p3) !== ccw(p1, p2, p4));
}

/**
 * Validates whether a zone polygon has self-intersecting edges
 */
export function validatePolygonSelfIntersection(polygon: Point2D[]): { valid: boolean; error?: string } {
  const n = polygon.length;
  if (n < 3) {
    return { valid: false, error: 'A zone polygon must contain at least 3 vertices.' };
  }

  for (let i = 0; i < n; i++) {
    const a1 = polygon[i];
    const a2 = polygon[(i + 1) % n];

    for (let j = i + 1; j < n; j++) {
      // Do not compare adjacent edges or the closing edge with first
      if (Math.abs(i - j) <= 1 || (i === 0 && j === n - 1)) continue;

      const b1 = polygon[j];
      const b2 = polygon[(j + 1) % n];

      if (doSegmentsIntersect(a1, a2, b1, b2)) {
        return {
          valid: false,
          error: `Edge between vertices ${i + 1} and ${i + 2} intersects edge between ${j + 1} and ${((j + 1) % n) + 1}.`
        };
      }
    }
  }

  return { valid: true };
}
