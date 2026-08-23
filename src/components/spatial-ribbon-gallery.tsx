"use client";

import { FRAMES, px } from "@/lib/data";
import {
  Compass,
  Maximize2,
  Minimize2,
  Move3d,
  Orbit,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Sliders,
  X,
  Boxes,
  Layers,
  Globe,
  Dna,
  Workflow,
  Waves,
  Tornado,
  Box,
  Building2,
  Sun,
  Moon,
  Flame,
  Zap,
  Camera,
  MoveHorizontal,
  MoveVertical,
  Move,
  ZoomIn,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ViewMode =
  | "ring"
  | "arc"
  | "coverflow"
  | "tilted"
  | "helix"
  | "sphere"
  | "tunnel"
  | "scatter"
  | "vortex"
  | "wave"
  | "cube"
  | "salon";

type LightingAtmosphere = "studio" | "midnight" | "golden" | "tungsten";
type DragAxis = "horizontal" | "vertical" | "free";
type FocalChoice = "24mm" | "50mm" | "85mm" | "free";

const MODES = [
  { id: "ring", label: "Cylinder Ring", desc: "360° Seamless Orbiting Ring (Ref 1 & 2)", icon: Orbit },
  { id: "arc", label: "Panoramic Arc", desc: "Concave Parabolic Gallery Wall (Ref 3)", icon: Move3d },
  { id: "coverflow", label: "3D Coverflow", desc: "Mirror Floor Perspective Cascade (Ref 4)", icon: Layers },
  { id: "tilted", label: "Tilted Ring", desc: "45° Diagonal Spatial Ring (Ref 5)", icon: RotateCcw },
  { id: "helix", label: "DNA Spiral Helix", desc: "Vertical Ascending Double Corkscrew Tower", icon: Dna },
  { id: "sphere", label: "Geodesic Sphere", desc: "3D Orbital Dome of Floating Plates", icon: Globe },
  { id: "tunnel", label: "Infinite Tunnel", desc: "Deep Perspective Warp Portal", icon: Workflow },
  { id: "scatter", label: "Anti-Gravity Cloud", desc: "Zero-G Floating Spatial Matrix", icon: Boxes },
  { id: "vortex", label: "Parabolic Vortex", desc: "Gravitational Funnel Swirl", icon: Tornado },
  { id: "wave", label: "Sine Wave Ribbon", desc: "Undulating Oceanic Sine Curve", icon: Waves },
  { id: "cube", label: "Hologram Cube", desc: "Rotating Architectural 3D Cube", icon: Box },
  { id: "salon", label: "Museum Salon", desc: "Double-Tier Curved Grand Gallery Room", icon: Building2 },
] as const;

const ATMOSPHERES: Record<
  LightingAtmosphere,
  { name: string; ambient: number; keyColor: number; keyIntensity: number; fillColor: number; fillIntensity: number; icon: any }
> = {
  studio: {
    name: "Studio Daylight",
    ambient: 2.0,
    keyColor: 0xffffff,
    keyIntensity: 2.8,
    fillColor: 0xdce7f5,
    fillIntensity: 1.4,
    icon: Sun,
  },
  midnight: {
    name: "Midnight Darkroom",
    ambient: 0.8,
    keyColor: 0xd4a96a,
    keyIntensity: 3.5,
    fillColor: 0xff4422,
    fillIntensity: 1.8,
    icon: Moon,
  },
  golden: {
    name: "Golden Hour",
    ambient: 1.6,
    keyColor: 0xffb74d,
    keyIntensity: 3.6,
    fillColor: 0xff7043,
    fillIntensity: 1.8,
    icon: Flame,
  },
  tungsten: {
    name: "Cyber Tungsten",
    ambient: 1.4,
    keyColor: 0x38bdf8,
    keyIntensity: 3.2,
    fillColor: 0xa855f7,
    fillIntensity: 2.0,
    icon: Zap,
  },
};

// Custom Vertex & Fragment Shaders for Cylindrical Bending & Anti-Aliased Rounded Corners
const vertexShader = `
  uniform float uRadius;
  uniform float uBendAmount;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normal;

    vec3 pos = position;
    
    // Cylindrical vertex bending
    float theta = (pos.x / uRadius) * uBendAmount;
    pos.z += (1.0 - cos(theta)) * uRadius * 0.45;
    pos.x = sin(theta) * uRadius;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uRadius;
  uniform float uOpacity;
  uniform vec3 uBorderColor;
  varying vec2 vUv;

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
  }

  void main() {
    vec2 p = vUv - 0.5;
    float cornerRadius = 0.06;
    float dist = roundedBox(p, vec2(0.5, 0.5), cornerRadius);

    float alpha = 1.0 - smoothstep(0.0, 0.008, dist);
    if (alpha <= 0.0) discard;

    vec4 texColor = texture2D(uTexture, vUv);

    float borderDist = abs(dist + 0.012);
    float borderFactor = 1.0 - smoothstep(0.0, 0.008, borderDist);
    vec3 finalColor = mix(texColor.rgb, uBorderColor, borderFactor * 0.45);

    gl_FragColor = vec4(finalColor, alpha * uOpacity);
  }
`;

export default function SpatialRibbonGallery() {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerWrapperRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("ring");
  const [dragAxis, setDragAxis] = useState<DragAxis>("free");
  const [atmosphere, setAtmosphere] = useState<LightingAtmosphere>("studio");
  const [focalChoice, setFocalChoice] = useState<FocalChoice>("50mm");
  const [customFocalMm, setCustomFocalMm] = useState(50); // 14mm to 200mm
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<(typeof FRAMES)[0] | null>(null);

  // Compute camera FOV from focal length
  const computeFov = (choice: FocalChoice, customMm: number) => {
    if (choice === "24mm") return 60;
    if (choice === "50mm") return 40;
    if (choice === "85mm") return 26;
    // Free custom mapping: 14mm -> ~80° FOV, 200mm -> ~12° FOV
    return Math.max(12, Math.min(85, Math.round(2 * Math.atan(24 / (2 * customMm)) * (180 / Math.PI))));
  };

  // Refs for render loop
  const viewModeRef = useRef<ViewMode>(viewMode);
  viewModeRef.current = viewMode;
  const dragAxisRef = useRef<DragAxis>(dragAxis);
  dragAxisRef.current = dragAxis;
  const atmosphereRef = useRef<LightingAtmosphere>(atmosphere);
  atmosphereRef.current = atmosphere;
  const autoRotateRef = useRef<boolean>(autoRotate);
  autoRotateRef.current = autoRotate;

  const toggleFullscreen = () => {
    if (!containerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      containerWrapperRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight || 650;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const initialFov = computeFov(focalChoice, customFocalMm);
    const camera = new THREE.PerspectiveCamera(initialFov, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainLight.position.set(5, 12, 8);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const softFill = new THREE.DirectionalLight(0xdce7f5, 1.4);
    softFill.position.set(-6, 2, -4);
    scene.add(softFill);

    // 3. Ground Soft Shadow Plane
    const groundGeo = new THREE.PlaneGeometry(35, 35);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const groundPlane = new THREE.Mesh(groundGeo, groundMat);
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = -2.3;
    groundPlane.receiveShadow = true;
    scene.add(groundPlane);

    // Ground Shadow Disc for Tilted Ring
    const shadowDiscGeo = new THREE.RingGeometry(3.6, 4.4, 64);
    const shadowDiscMat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const shadowRing = new THREE.Mesh(shadowDiscGeo, shadowDiscMat);
    shadowRing.rotation.x = -Math.PI / 2;
    shadowRing.position.y = -2.28;
    scene.add(shadowRing);

    // 4. Create Curved 3D Photo Mesh Array using Custom Shaders
    const textureLoader = new THREE.TextureLoader();
    const group = new THREE.Group();
    scene.add(group);

    const cardGroupList: THREE.Group[] = [];
    const count = Math.min(FRAMES.length, 12);
    const cardWidth = 1.65;
    const cardHeight = 1.48;
    const radius = 4.2;

    const scatterOffsets = Array.from({ length: count }, (_, i) => ({
      x: ((i % 4) - 1.5) * 2.2 + Math.sin(i * 3.7) * 0.4,
      y: (Math.floor(i / 4) - 1) * 1.6 + Math.cos(i * 2.1) * 0.3,
      z: Math.sin(i * 1.5) * 1.8,
      rx: Math.sin(i * 2.5) * 0.25,
      ry: Math.cos(i * 1.7) * 0.3,
      rz: Math.sin(i * 0.9) * 0.15,
    }));

    for (let i = 0; i < count; i++) {
      const frameData = FRAMES[i];
      const cardSubGroup = new THREE.Group();

      const texture = textureLoader.load(px(frameData.image.src, 800));
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;

      const planeGeo = new THREE.PlaneGeometry(cardWidth, cardHeight, 32, 1);

      const shaderMat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uRadius: { value: radius },
          uBendAmount: { value: 1.0 },
          uOpacity: { value: 1.0 },
          uBorderColor: { value: new THREE.Color(0xffffff) },
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(planeGeo, shaderMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      cardSubGroup.add(mesh);

      cardSubGroup.userData = { frame: frameData, index: i, shaderMat };
      group.add(cardSubGroup);
      cardGroupList.push(cardSubGroup);
    }

    // 5. 2D/3D Kinetic Inertial Drag & Momentum + Interactive Pinch/Wheel Zoom
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let currentRotationH = 0;
    let targetRotationH = 0;
    let currentRotationV = 0;
    let targetRotationV = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;
    let initialPinchDistance = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      velocityX = 0;
      velocityY = 0;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseParallaxX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.35;
      mouseParallaxY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.18;

      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      const axis = dragAxisRef.current;

      if (axis === "horizontal" || axis === "free") {
        velocityX = deltaX * 0.005;
        targetRotationH += velocityX;
      }
      if (axis === "vertical" || axis === "free") {
        velocityY = deltaY * 0.004;
        targetRotationV = Math.max(-0.8, Math.min(0.8, targetRotationV + velocityY));
      }

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      initialPinchDistance = 0;
    };

    // Wheel: Rotates or Zooms in Free Focal Mode
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // If user holds Ctrl/Cmd or is in Free zoom mode, wheel zooms in/out
      if (e.ctrlKey || e.metaKey || focalChoice === "free") {
        const zoomDelta = e.deltaY * 0.15;
        setCustomFocalMm((prev) => {
          const next = Math.max(14, Math.min(200, Math.round(prev - zoomDelta)));
          return next;
        });
      } else {
        const axis = dragAxisRef.current;
        if (axis === "horizontal" || axis === "free") {
          velocityX = -e.deltaY * 0.0006;
          targetRotationH += velocityX;
        } else if (axis === "vertical") {
          velocityY = -e.deltaY * 0.0004;
          targetRotationV = Math.max(-0.8, Math.min(0.8, targetRotationV + velocityY));
        }
      }
    };

    // Touch Support with 2-Finger Pinch-to-Zoom
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDistance = Math.hypot(dx, dy);
      } else if (e.touches.length === 1) {
        isDragging = true;
        velocityX = 0;
        velocityY = 0;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialPinchDistance > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.hypot(dx, dy);
        const diff = currentDistance - initialPinchDistance;

        if (Math.abs(diff) > 2) {
          setFocalChoice("free");
          setCustomFocalMm((prev) => {
            const next = Math.max(14, Math.min(200, Math.round(prev + diff * 0.25)));
            return next;
          });
          initialPinchDistance = currentDistance;
        }
      } else if (isDragging && e.touches[0]) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        const axis = dragAxisRef.current;

        if (axis === "horizontal" || axis === "free") {
          velocityX = deltaX * 0.005;
          targetRotationH += velocityX;
        }
        if (axis === "vertical" || axis === "free") {
          velocityY = deltaY * 0.004;
          targetRotationV = Math.max(-0.8, Math.min(0.8, targetRotationV + velocityY));
        }

        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    // Raycaster for Clicking 3D Cards
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(group.children, true);
      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.frame && obj.parent) {
          obj = obj.parent;
        }
        if (obj?.userData?.frame) {
          setSelectedFrame(obj.userData.frame);
        }
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);
    container.addEventListener("click", onClick);

    // 6. 60FPS Multi-POV Spatial Render Loop with Horizontal & Vertical Drag
    let animId: number;
    let cameraTargetY = 1.6;
    let cameraTargetZ = 8.5;
    let cameraTargetRotX = -0.16;
    let groupTargetTiltX = 0;
    let groupTargetTiltZ = 0;
    let floatingTime = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      floatingTime += 0.015;

      // Update Lighting Atmosphere in real-time
      const atmosConfig = ATMOSPHERES[atmosphereRef.current];
      ambientLight.intensity += (atmosConfig.ambient - ambientLight.intensity) * 0.08;
      mainLight.color.setHex(atmosConfig.keyColor);
      mainLight.intensity += (atmosConfig.keyIntensity - mainLight.intensity) * 0.08;
      softFill.color.setHex(atmosConfig.fillColor);
      softFill.intensity += (atmosConfig.fillIntensity - softFill.intensity) * 0.08;

      if (autoRotateRef.current && !isDragging) {
        targetRotationH -= 0.0028;
      }

      if (!isDragging) {
        velocityX *= 0.94;
        velocityY *= 0.94;
        targetRotationH += velocityX;
        targetRotationV = Math.max(-0.8, Math.min(0.8, targetRotationV + velocityY));
      }

      currentRotationH += (targetRotationH - currentRotationH) * 0.09;
      currentRotationV += (targetRotationV - currentRotationV) * 0.09;

      const mode = viewModeRef.current;
      const baseTiltRad = (16 * Math.PI) / 180;

      // 12-POV Camera & Spatial Orientations
      if (mode === "ring") {
        cameraTargetY = 1.3 + currentRotationV * 2.5;
        cameraTargetZ = 8.3;
        cameraTargetRotX = -baseTiltRad * 0.6 - currentRotationV * 0.3;
        groupTargetTiltX = baseTiltRad * 0.85 + currentRotationV;
        groupTargetTiltZ = 0;
        shadowRing.visible = false;
      } else if (mode === "arc") {
        cameraTargetY = 0.2 + currentRotationV * 2.0;
        cameraTargetZ = 6.2;
        cameraTargetRotX = -currentRotationV * 0.2;
        groupTargetTiltX = currentRotationV * 0.5;
        groupTargetTiltZ = 0;
        shadowRing.visible = false;
      } else if (mode === "coverflow") {
        cameraTargetY = 0.05 + currentRotationV * 1.8;
        cameraTargetZ = 5.8;
        cameraTargetRotX = 0.05 - currentRotationV * 0.2;
        groupTargetTiltX = currentRotationV * 0.4;
        groupTargetTiltZ = 0;
        shadowRing.visible = false;
      } else if (mode === "tilted") {
        cameraTargetY = 1.8 + currentRotationV * 2.2;
        cameraTargetZ = 8.6;
        cameraTargetRotX = -0.22 - currentRotationV * 0.3;
        groupTargetTiltX = 0.62 + currentRotationV;
        groupTargetTiltZ = -0.42;
        shadowRing.visible = true;
      } else if (mode === "helix") {
        cameraTargetY = 0.5 + currentRotationV * 2.5;
        cameraTargetZ = 7.8;
        cameraTargetRotX = -0.05 - currentRotationV * 0.2;
        groupTargetTiltX = 0.15 + currentRotationV * 0.6;
        groupTargetTiltZ = 0;
        shadowRing.visible = false;
      } else if (mode === "sphere") {
        cameraTargetY = 0.4 + currentRotationV * 3.0;
        cameraTargetZ = 8.2;
        cameraTargetRotX = -currentRotationV * 0.3;
        groupTargetTiltX = 0.2 + currentRotationV;
        groupTargetTiltZ = 0;
        shadowRing.visible = false;
      } else if (mode === "tunnel") {
        cameraTargetY = currentRotationV * 2.0;
        cameraTargetZ = 6.8;
        cameraTargetRotX = -currentRotationV * 0.3;
        groupTargetTiltX = currentRotationV * 0.5;
        groupTargetTiltZ = 0;
        shadowRing.visible = false;
      } else if (mode === "scatter") {
        cameraTargetY = 0.2 + currentRotationV * 2.2;
        cameraTargetZ = 7.2;
        cameraTargetRotX = -currentRotationV * 0.2;
        groupTargetTiltX = currentRotationV * 0.5;
        groupTargetTiltZ = 0;
        shadowRing.visible = false;
      } else if (mode === "vortex") {
        cameraTargetY = 2.4 + currentRotationV * 2.5;
        cameraTargetZ = 7.6;
        cameraTargetRotX = -0.35 - currentRotationV * 0.3;
        groupTargetTiltX = 0.4 + currentRotationV;
        groupTargetTiltZ = 0;
        shadowRing.visible = false;
      } else if (mode === "wave") {
        cameraTargetY = 0.3 + currentRotationV * 2.0;
        cameraTargetZ = 6.8;
        cameraTargetRotX = -currentRotationV * 0.2;
        groupTargetTiltX = 0.1 + currentRotationV * 0.5;
        groupTargetTiltZ = 0;
        shadowRing.visible = false;
      } else if (mode === "cube") {
        cameraTargetY = 0.8 + currentRotationV * 2.2;
        cameraTargetZ = 7.5;
        cameraTargetRotX = -0.12 - currentRotationV * 0.3;
        groupTargetTiltX = 0.2 + currentRotationV;
        groupTargetTiltZ = 0.1;
        shadowRing.visible = false;
      } else if (mode === "salon") {
        cameraTargetY = 0.4 + currentRotationV * 2.0;
        cameraTargetZ = 7.0;
        cameraTargetRotX = -0.05 - currentRotationV * 0.2;
        groupTargetTiltX = currentRotationV * 0.4;
        groupTargetTiltZ = 0;
        shadowRing.visible = false;
      }

      // Smooth Camera & Parallax Interpolation
      camera.position.y += (cameraTargetY + mouseParallaxY - camera.position.y) * 0.06;
      camera.position.z += (cameraTargetZ - camera.position.z) * 0.06;
      camera.position.x += (mouseParallaxX * 2.2 - camera.position.x) * 0.06;
      camera.rotation.x += (cameraTargetRotX - camera.rotation.x) * 0.06;

      group.rotation.x += (groupTargetTiltX - group.rotation.x) * 0.06;
      group.rotation.z += (groupTargetTiltZ - group.rotation.z) * 0.06;

      // Position & Rotate Bent Cards per active mode
      cardGroupList.forEach((card, idx) => {
        const shader = (card.children[0] as THREE.Mesh)?.material as THREE.ShaderMaterial;
        if (shader?.uniforms?.uRadius) {
          shader.uniforms.uRadius.value = radius;
          shader.uniforms.uBendAmount.value =
            mode === "ring" || mode === "tilted" || mode === "helix" || mode === "tunnel" || mode === "vortex" || mode === "salon"
              ? 1.0
              : 0.3;
        }

        if (mode === "ring" || mode === "tilted") {
          const angle = (idx / count) * Math.PI * 2 + currentRotationH;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          card.position.set(x, 0, z);
          card.rotation.set(0, angle + Math.PI, 0);
          card.scale.set(1, 1, 1);
        } else if (mode === "arc") {
          const normIdx = (idx - count / 2) * 0.35 + (currentRotationH % (Math.PI * 2)) * 0.45;
          const x = normIdx * 1.85;
          const z = -Math.cos(normIdx * 0.4) * 2.8 + 2.8;
          card.position.set(x, 0, z);
          card.rotation.set(0, -normIdx * 0.35, 0);
          card.scale.set(1, 1, 1);
        } else if (mode === "coverflow") {
          const offset = idx - ((-currentRotationH * 2) % count);
          const absOffset = Math.abs(offset);
          const x = offset * 1.2;
          const z = -absOffset * 0.88;
          const rotY = offset > 0.1 ? -0.85 : offset < -0.1 ? 0.85 : 0;
          card.position.set(x, 0, z);
          card.rotation.set(0, rotY, 0);
          const scale = absOffset < 0.6 ? 1.28 : 0.92;
          card.scale.set(scale, scale, scale);
        } else if (mode === "helix") {
          const angle = (idx / count) * Math.PI * 4 + currentRotationH;
          const y = (idx - count / 2) * 0.42;
          const x = Math.sin(angle) * (radius * 0.85);
          const z = Math.cos(angle) * (radius * 0.85);
          card.position.set(x, y, z);
          card.rotation.set(0, angle + Math.PI, 0.08);
          card.scale.set(0.95, 0.95, 0.95);
        } else if (mode === "sphere") {
          const phi = Math.acos(-1 + (2 * idx) / count);
          const theta = Math.sqrt(count * Math.PI) * phi + currentRotationH;
          const x = radius * 0.95 * Math.cos(theta) * Math.sin(phi);
          const y = radius * 0.75 * Math.sin(theta) * Math.sin(phi);
          const z = radius * 0.95 * Math.cos(phi);
          card.position.set(x, y, z);
          card.lookAt(0, 0, 0);
          card.rotateY(Math.PI);
          card.scale.set(0.85, 0.85, 0.85);
        } else if (mode === "tunnel") {
          const tunnelAngle = (idx / count) * Math.PI * 2 + currentRotationH;
          const depthZ = -((idx % 4) * 2.2) + ((currentRotationH * 3) % 8.8) - 2.0;
          const x = Math.sin(tunnelAngle) * 2.8;
          const y = Math.cos(tunnelAngle) * 2.0;
          card.position.set(x, y, depthZ);
          card.rotation.set(0, 0, -tunnelAngle);
          card.scale.set(0.9, 0.9, 0.9);
        } else if (mode === "scatter") {
          const offset = scatterOffsets[idx];
          const floatY = Math.sin(floatingTime + idx) * 0.15;
          const floatRot = Math.cos(floatingTime * 0.8 + idx) * 0.08;
          card.position.set(offset.x, offset.y + floatY, offset.z);
          card.rotation.set(offset.rx + floatRot, offset.ry + currentRotationH * 0.2, offset.rz);
          card.scale.set(1, 1, 1);
        } else if (mode === "vortex") {
          const t = idx / count;
          const angle = t * Math.PI * 6 + currentRotationH;
          const vortexRadius = 1.2 + t * 3.2;
          const y = (t - 0.5) * 2.8 - 0.4;
          const x = Math.sin(angle) * vortexRadius;
          const z = Math.cos(angle) * vortexRadius;
          card.position.set(x, y, z);
          card.rotation.set(-0.35, angle + Math.PI, 0.2);
          card.scale.set(0.75 + t * 0.35, 0.75 + t * 0.35, 0.75 + t * 0.35);
        } else if (mode === "wave") {
          const normIdx = (idx - count / 2) * 0.32 + (currentRotationH % (Math.PI * 2)) * 0.4;
          const x = normIdx * 1.85;
          const y = Math.sin(normIdx * 2.0 + floatingTime) * 0.8;
          const z = -Math.cos(normIdx * 0.8) * 1.2;
          card.position.set(x, y, z);
          card.rotation.set(Math.cos(normIdx * 2.0) * 0.3, -normIdx * 0.2, 0);
          card.scale.set(0.95, 0.95, 0.95);
        } else if (mode === "cube") {
          const face = Math.floor(idx / 3);
          const sub = (idx % 3) - 1;
          const cubeDim = 2.4;
          let cx = 0, cy = 0, cz = 0, ry = 0;
          if (face === 0) { cx = sub * 1.6; cy = 0; cz = cubeDim; ry = 0; }
          else if (face === 1) { cx = cubeDim; cy = 0; cz = sub * 1.6; ry = Math.PI / 2; }
          else if (face === 2) { cx = sub * 1.6; cy = 0; cz = -cubeDim; ry = Math.PI; }
          else { cx = -cubeDim; cy = 0; cz = sub * 1.6; ry = -Math.PI / 2; }
          
          const angle = currentRotationH;
          const rotX = cx * Math.cos(angle) - cz * Math.sin(angle);
          const rotZ = cx * Math.sin(angle) + cz * Math.cos(angle);
          card.position.set(rotX, cy + sub * 0.2, rotZ);
          card.rotation.set(0, ry + angle, 0);
          card.scale.set(0.9, 0.9, 0.9);
        } else if (mode === "salon") {
          const tier = idx % 2 === 0 ? 0.9 : -0.9;
          const col = Math.floor(idx / 2);
          const angle = (col / 6) * Math.PI * 1.4 - Math.PI * 0.7 + currentRotationH * 0.5;
          const x = Math.sin(angle) * 4.6;
          const z = Math.cos(angle) * 4.6 - 1.2;
          card.position.set(x, tier, z);
          card.rotation.set(0, angle + Math.PI, 0);
          card.scale.set(0.92, 0.92, 0.92);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || (isFullscreen ? window.innerHeight : 650);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
      container.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isFullscreen, focalChoice, customFocalMm]);

  return (
    <div
      ref={containerWrapperRef}
      className={`relative w-full select-none transition-all duration-500 ${
        isFullscreen
          ? "fixed inset-0 z-[300] bg-[#0c0d0f] w-screen h-screen p-0 m-0 overflow-hidden"
          : "max-w-6xl mx-auto py-10 px-4 sm:px-8 md:px-12"
      }`}
    >
      <div
        className={`flex flex-col justify-between transition-colors duration-500 ${
          isFullscreen
            ? "w-full h-full p-4 sm:p-6 bg-transparent relative"
            : "p-4 sm:p-8 rounded-3xl border hairline bg-gradient-to-b from-[#f8fafc]/95 via-[#f1f5f9]/85 to-[#e2e8f0]/95 dark:from-[#131417]/95 dark:via-[#0f1013]/90 dark:to-[#090a0d]/95 shadow-2xl backdrop-blur-md overflow-hidden"
        }`}
      >
        {/* Top Header Controls Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-3 border-b hairline text-[9px] font-mono z-20 bg-[var(--bg)]/70 backdrop-blur-md p-3 rounded-2xl">
          <div>
            <div className="flex items-center gap-2.5 text-[var(--accent)] font-bold tracking-widest uppercase">
              <Orbit size={16} className="animate-spin duration-3000" />
              <span>SPATIAL 3D PHOTO RIBBON · 12-FORMATION EXPEDITION</span>
            </div>
            <h2 className="display text-2xl sm:text-3xl mt-0.5">Spatial 3D Exhibition</h2>
          </div>

          {/* Quick Studio Presets */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Drag Axis Selector: Horizontal / Vertical / Free */}
            <div className="flex items-center gap-1 bg-[var(--bg)]/90 p-1 rounded-xl border hairline shadow-xs">
              <span className="text-[8px] font-bold opacity-50 px-1">AXIS</span>
              <button
                onClick={() => setDragAxis("horizontal")}
                className={`px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase transition-all flex items-center gap-1 ${
                  dragAxis === "horizontal"
                    ? "bg-[var(--fg)] text-[var(--bg)] shadow-xs"
                    : "opacity-60 hover:opacity-100"
                }`}
                title="Drag horizontally only"
              >
                <MoveHorizontal size={11} />
                <span>HORIZON</span>
              </button>
              <button
                onClick={() => setDragAxis("vertical")}
                className={`px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase transition-all flex items-center gap-1 ${
                  dragAxis === "vertical"
                    ? "bg-[var(--fg)] text-[var(--bg)] shadow-xs"
                    : "opacity-60 hover:opacity-100"
                }`}
                title="Drag vertically only"
              >
                <MoveVertical size={11} />
                <span>VERTICAL</span>
              </button>
              <button
                onClick={() => setDragAxis("free")}
                className={`px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase transition-all flex items-center gap-1 ${
                  dragAxis === "free"
                    ? "bg-[var(--fg)] text-[var(--bg)] shadow-xs"
                    : "opacity-60 hover:opacity-100"
                }`}
                title="Free 360° Omnidirectional Drag"
              >
                <Move size={11} />
                <span>FREE</span>
              </button>
            </div>

            {/* Lighting Atmosphere Switcher */}
            <div className="flex items-center gap-1 bg-[var(--bg)]/90 p-1 rounded-xl border hairline shadow-xs">
              {(["studio", "midnight", "golden", "tungsten"] as const).map((atm) => {
                const Icon = ATMOSPHERES[atm].icon;
                return (
                  <button
                    key={atm}
                    onClick={() => setAtmosphere(atm)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      atmosphere === atm
                        ? "bg-[var(--fg)] text-[var(--bg)]"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    title={ATMOSPHERES[atm].name}
                  >
                    <Icon size={13} />
                  </button>
                );
              })}
            </div>

            {/* Focal Length Optics Switcher with FREE Zoom Slider */}
            <div className="flex items-center gap-1 bg-[var(--bg)]/90 p-1 rounded-xl border hairline shadow-xs">
              <Camera size={12} className="text-[var(--accent)] ml-1" />
              {(["24mm", "50mm", "85mm", "free"] as const).map((fl) => (
                <button
                  key={fl}
                  onClick={() => setFocalChoice(fl)}
                  className={`px-2 py-1 rounded text-[8px] font-bold uppercase transition-colors flex items-center gap-0.5 ${
                    focalChoice === fl
                      ? "bg-[var(--fg)] text-[var(--bg)] shadow-xs"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {fl === "free" ? <ZoomIn size={10} className="mr-0.5" /> : null}
                  <span>{fl === "free" ? "FREE" : fl}</span>
                </button>
              ))}

              {/* Free Custom Zoom Range Slider */}
              {focalChoice === "free" && (
                <div className="flex items-center gap-1.5 px-2 border-l hairline animate-in fade-in zoom-in-95 duration-150">
                  <input
                    type="range"
                    min="14"
                    max="200"
                    step="1"
                    value={customFocalMm}
                    onChange={(e) => setCustomFocalMm(Number(e.target.value))}
                    className="w-16 h-1.5 accent-[var(--accent)] cursor-pointer"
                  />
                  <span className="text-[8px] font-bold min-w-[32px] text-[var(--accent)]">
                    {customFocalMm}mm
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setAutoRotate((p) => !p)}
              className="px-3 py-2 rounded-xl border hairline bg-[var(--bg)]/90 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors flex items-center gap-1.5 font-bold shadow-xs"
              title="Toggle Rotation"
            >
              {autoRotate ? <Pause size={12} /> : <Play size={12} />}
              <span>{autoRotate ? "PAUSE" : "ORBIT"}</span>
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 rounded-xl border border-[var(--accent)] bg-[var(--accent)] text-black font-bold uppercase transition-transform hover:scale-105 shadow-lg flex items-center gap-1.5"
            >
              {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              <span>{isFullscreen ? "EXIT FULLSCREEN" : "FULLSCREEN"}</span>
            </button>
          </div>
        </div>

        {/* 12-POV Mode Switcher Horizontal Scrollable Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b hairline z-20 bg-[var(--bg)]/60 backdrop-blur-md px-2 rounded-xl my-2">
          {MODES.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setViewMode(m.id as ViewMode)}
                className={`shrink-0 px-3 py-1.5 rounded-lg font-bold uppercase text-[8.5px] font-mono transition-all shadow-xs flex items-center gap-1.5 ${
                  viewMode === m.id
                    ? "bg-[var(--fg)] text-[var(--bg)] scale-105 shadow-md"
                    : "bg-[var(--bg)]/80 border hairline opacity-70 hover:opacity-100 hover:border-[var(--accent)]"
                }`}
              >
                <Icon size={11} className={viewMode === m.id ? "text-[var(--accent)]" : ""} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D WebGL Canvas Viewport - Truly Fullscreen Edge to Edge */}
        <div
          className={`relative w-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing ${
            isFullscreen
              ? "absolute inset-0 w-full h-full z-10"
              : "h-[540px] sm:h-[640px] rounded-2xl bg-gradient-to-b from-[#e2e8f0]/40 via-[#cbd5e1]/30 to-[#94a3b8]/30 dark:from-[#0d0e12]/60 dark:via-[#090a0d]/60 dark:to-[#040507]/80 border hairline shadow-inner my-2"
          }`}
        >
          {/* Three.js Canvas Mount */}
          <div ref={mountRef} className="w-full h-full" />

          {/* POV Mode Tag */}
          <div className="absolute top-4 left-4 bg-[var(--bg)]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border hairline text-[9px] font-mono pointer-events-none flex items-center gap-2 shadow-md z-30">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-bold uppercase tracking-wider">
              {MODES.find((m) => m.id === viewMode)?.desc}
            </span>
          </div>

          {/* Drag Axis & Optics Badge */}
          <div className="absolute top-4 right-4 bg-[var(--bg)]/90 backdrop-blur-md px-3 py-1.5 rounded-full border hairline text-[8.5px] font-mono pointer-events-none flex items-center gap-1.5 shadow-md z-30">
            <Sparkles size={11} className="text-[var(--accent)]" />
            <span className="font-bold uppercase">
              {focalChoice === "free" ? `${customFocalMm}mm FREE ZOOM` : focalChoice} · {ATMOSPHERES[atmosphere].name}
            </span>
          </div>

          {/* Orbit Navigation Hint */}
          <div className="absolute bottom-4 left-4 bg-[var(--bg)]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border hairline text-[9px] font-mono pointer-events-none flex items-center gap-2 shadow-md z-30">
            <Compass size={13} className="text-[var(--accent)]" />
            <span>
              {dragAxis === "horizontal"
                ? "DRAG HORIZONTALLY TO SPIN"
                : dragAxis === "vertical"
                ? "DRAG VERTICALLY TO TILT PITCH"
                : "FREE 360° DRAG"} · PINCH/WHEEL TO ZOOM · CLICK TO INSPECT
            </span>
          </div>

          {/* Quick Zoom In/Out Floating Controls */}
          <div className="absolute bottom-4 right-4 bg-[var(--bg)]/90 backdrop-blur-md p-1 rounded-xl border hairline flex items-center gap-1 shadow-md z-30 font-mono text-[9px]">
            <button
              onClick={() => {
                setFocalChoice("free");
                setCustomFocalMm((prev) => Math.max(14, prev - 10));
              }}
              className="p-1.5 rounded-lg hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors font-bold flex items-center gap-1"
              title="Zoom Out (Wider)"
            >
              <span>−</span>
              <span className="text-[8px] opacity-70">WIDE</span>
            </button>
            <span className="text-[8px] font-bold px-1 text-[var(--accent)] min-w-[32px] text-center">
              {focalChoice === "free" ? `${customFocalMm}mm` : focalChoice}
            </span>
            <button
              onClick={() => {
                setFocalChoice("free");
                setCustomFocalMm((prev) => Math.min(200, prev + 10));
              }}
              className="p-1.5 rounded-lg hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors font-bold flex items-center gap-1"
              title="Zoom In (Telephoto)"
            >
              <span>+</span>
              <span className="text-[8px] opacity-70">TELE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Frame Inspection Lightbox Modal */}
      {selectedFrame && (
        <div
          onClick={() => setSelectedFrame(null)}
          className="fixed inset-0 z-[350] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10 select-none animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[var(--panel)] border hairline rounded-2xl overflow-hidden p-5 md:p-8 shadow-2xl text-[var(--fg)] animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b hairline pb-4 mb-4">
              <div>
                <span className="meta !text-[8.5px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
                  3D EXHIBITION PLATE · {selectedFrame.frameNo}
                </span>
                <h3 className="display text-2xl sm:text-3xl mt-0.5">
                  {selectedFrame.image.alt.split(",")[0]}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFrame(null)}
                className="p-2 rounded-full border hairline hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-black bg-black shadow-2xl mb-4">
              <img
                src={px(selectedFrame.image.src, 1600)}
                alt={selectedFrame.image.alt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[9px] font-mono border-t hairline pt-4 opacity-80">
              <div>
                <span className="opacity-50 block">PROJECT</span>
                <span className="font-semibold uppercase">{selectedFrame.project}</span>
              </div>
              <div>
                <span className="opacity-50 block">DATE</span>
                <span className="font-semibold">{selectedFrame.date}</span>
              </div>
              <div>
                <span className="opacity-50 block">LOCATION</span>
                <span className="font-semibold">{selectedFrame.location}</span>
              </div>
              <div>
                <span className="opacity-50 block">CAMERA & OPTICS</span>
                <span className="font-semibold">{selectedFrame.camera}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
