export function DeskAccessories({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pen holder */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 0.9, 16]} />
        <meshStandardMaterial color="#3a3f47" metalness={0.3} roughness={0.6} />
      </mesh>
      {[-0.12, 0, 0.14].map((x, i) => (
        <mesh key={i} position={[x, 0.75, 0]} rotation={[0, 0, x * 0.6]}>
          <cylinderGeometry args={[0.03, 0.03, 1.1, 8]} />
          <meshStandardMaterial color={i === 1 ? '#e0e0e0' : '#1c8bff'} metalness={0.4} roughness={0.4} />
        </mesh>
      ))}
      {/* Small stacked books */}
      <group position={[2.2, -0.3, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.6, 0.25, 1.1]} />
          <meshStandardMaterial color="#8a5a44" roughness={0.7} />
        </mesh>
        <mesh position={[0.1, 0.25, 0.05]}>
          <boxGeometry args={[1.4, 0.22, 1]} />
          <meshStandardMaterial color="#3d5a80" roughness={0.7} />
        </mesh>
      </group>
    </group>
  )
}
