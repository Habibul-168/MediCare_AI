import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const FloatingMolecule = ({ position, color }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <Sphere args={[0.3, 16, 16]}>
        <meshStandardMaterial color={color} />
      </Sphere>
      <Torus args={[0.5, 0.1, 8, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} wireframe />
      </Torus>
    </group>
  )
}

const MedicalCross = () => {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <Box args={[2, 0.4, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" />
      </Box>
      <Box args={[0.4, 2, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" />
      </Box>
    </group>
  )
}

const MedicalScene = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="h-96 w-full"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        <MedicalCross />
        
        <FloatingMolecule position={[-3, 2, 0]} color="#10b981" />
        <FloatingMolecule position={[3, -1, 0]} color="#f59e0b" />
        <FloatingMolecule position={[2, 2, -2]} color="#ef4444" />
        <FloatingMolecule position={[-2, -2, 2]} color="#8b5cf6" />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </motion.div>
  )
}

export default MedicalScene