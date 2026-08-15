import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Component to draw the connection lines between nodes
function ConnectionLines({ nodes, links }) {
  const lineGeometry = useMemo(() => {
    const points = [];
    links.forEach(([fromId, toId]) => {
      const fromNode = nodes.find(n => n.id === fromId);
      const toNode = nodes.find(n => n.id === toId);
      if (fromNode && toNode) {
        points.push(new THREE.Vector3(...fromNode.pos));
        points.push(new THREE.Vector3(...toNode.pos));
      }
    });
    
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [nodes, links]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#4facfe" opacity={0.15} transparent linewidth={1} />
    </lineSegments>
  );
}

// Component representing animated data packets moving along the links
function DataPacket({ fromNode, toNode, delay }) {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    // Cycle progress from 0 to 1 based on time and delay
    const time = clock.getElapsedTime() * 0.8 + delay;
    const progress = (time % 1.0);
    
    const start = new THREE.Vector3(...fromNode.pos);
    const end = new THREE.Vector3(...toNode.pos);
    
    // Interpolate position
    meshRef.current.position.lerpVectors(start, end, progress);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#00f2fe" opacity={0.8} transparent />
    </mesh>
  );
}

// Interactive Node Sphere
function Node({ node, isSelected, onClick }) {
  const meshRef = useRef();
  const color = isSelected ? '#00f2fe' : node.color || '#8a2be2';
  const size = isSelected ? 0.28 : 0.2;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // Idle bobbing/pulsing animation
    const scale = 1 + Math.sin(clock.getElapsedTime() * 2 + node.pos[0]) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh 
      position={node.pos} 
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick(node);
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={isSelected ? 1.5 : 0.4}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

// Main Network Topology Scene
function NetworkTopology({ selectedNodeId, onSelectNode }) {
  // Define our 3D system architecture layout
  const nodes = useMemo(() => [
    { id: 'lb', label: 'Load Balancer', pos: [0, 1.8, 0], color: '#4facfe', info: 'Custom C++ consistent hashing LB' },
    { id: 'srv1', label: 'Auth Service', pos: [-2, -0.2, -0.5], color: '#bd00ff', info: 'Java Spring Security auth handler' },
    { id: 'srv2', label: 'Order Engine', pos: [0, -0.2, 0.5], color: '#bd00ff', info: 'C++ low-latency matching engine' },
    { id: 'srv3', label: 'Notify Worker', pos: [2, -0.2, -0.5], color: '#bd00ff', info: 'Java distributed worker node' },
    { id: 'cache', label: 'Redis Cache', pos: [1.2, -1.8, 0], color: '#39ff14', info: 'Distributed in-memory cluster' },
    { id: 'db_primary', label: 'MySQL Primary', pos: [-1.2, -1.8, -0.5], color: '#00f2fe', info: 'Replicated persistent transactional DB' },
    { id: 'db_replica', label: 'MySQL Replica', pos: [-2.5, -1.8, 0.5], color: '#00f2fe', info: 'Read replica, synced via binlog' }
  ], []);

  const links = useMemo(() => [
    ['lb', 'srv1'],
    ['lb', 'srv2'],
    ['lb', 'srv3'],
    ['srv1', 'db_primary'],
    ['srv2', 'db_primary'],
    ['srv2', 'cache'],
    ['srv3', 'cache'],
    ['srv1', 'cache'],
    ['db_primary', 'db_replica']
  ], []);

  // Generate packet delays to make them stream asynchronously
  const packets = useMemo(() => {
    return links.flatMap(([fromId, toId]) => {
      const fromNode = nodes.find(n => n.id === fromId);
      const toNode = nodes.find(n => n.id === toId);
      if (!fromNode || !toNode) return [];
      
      // Return 2 packets for each line with different delays
      return [
        { fromNode, toNode, delay: Math.random() },
        { fromNode, toNode, delay: Math.random() + 0.5 }
      ];
    });
  }, [nodes, links]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0.5} fade speed={1.5} />
      
      <ConnectionLines nodes={nodes} links={links} />
      
      {packets.map((packet, idx) => (
        <DataPacket key={`p-${idx}`} fromNode={packet.fromNode} toNode={packet.toNode} delay={packet.delay} />
      ))}
      
      {nodes.map((node) => (
        <Node 
          key={node.id} 
          node={node} 
          isSelected={selectedNodeId === node.id}
          onClick={(n) => onSelectNode(n.id)} 
        />
      ))}
    </>
  );
}

export default function SystemCanvas({ selectedNodeId, onSelectNode }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '350px', position: 'relative' }}>
      {/* Interaction Hint */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        pointerEvents: 'none',
        zIndex: 10,
        fontSize: '11px',
        fontFamily: 'var(--mono)',
        color: 'var(--text-muted)',
        background: 'rgba(5, 7, 15, 0.6)',
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        [DRAG TO ROTATE // CLICK NODE TO INSPECT]
      </div>
      
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true }}
      >
        <NetworkTopology selectedNodeId={selectedNodeId} onSelectNode={onSelectNode} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          maxDistance={8}
          minDistance={3}
        />
      </Canvas>
    </div>
  );
}
