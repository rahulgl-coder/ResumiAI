


//   import React, { useEffect, useRef, useState } from 'react';
//   import {
//     motion,
//     useMotionValue,
//     useSpring,
//     useTransform,
//     useAnimationFrame,
//   } from 'framer-motion';

//   function Card() {
//         const containerRef = useRef(null);
//         const isDragging = useRef(false);
//         const holeRef = useRef(null);

//         const x = useMotionValue(0);
//         const y = useMotionValue(0);
//         const springX = useSpring(x, { stiffness: 200, damping: 25 });
//         const springY = useSpring(y, { stiffness: 180, damping: 22 });

//         const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
//         const rotateY = useTransform(x, [-300, 0, 300], [6, 0, -6]);

//         const [holeCoords, setHoleCoords] = useState({ x: 0, y: 0 });

//         useAnimationFrame(() => {
//           if (holeRef.current && containerRef.current) {
//             const holeRect = holeRef.current.getBoundingClientRect();
//             const containerRect = containerRef.current.getBoundingClientRect();

//             const x = holeRect.left + holeRect.width / 2 - containerRect.left;
//             const y = holeRect.top + holeRect.height / 2 - containerRect.top;

//             setHoleCoords({ x, y });
//           }
//         });

//         const ropeCurve = useTransform([springX, springY], ([sx, sy]) => {
//           if (!containerRef.current) return '';

//           const width = containerRef.current.offsetWidth;
//           const startX = width / 2;
//           const startY = 0; // Align with ceiling hook

//           const endX = holeCoords.x;
//           const endY = holeCoords.y;

//           const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
//           const sag = Math.max(40, Math.pow(distance, 0.65) * 0.5); // Enhanced rubber band effect

//           const midX = (startX + endX) / 2;
//           const midY = (startY + endY) / 2 + sag;

//           return `M${startX},${startY} Q${midX},${midY} ${endX},${endY}`;
//         });

//         const ropeThickness = useTransform([springX, springY], ([sx, sy]) => {
//           const distance = Math.sqrt(sx ** 2 + sy ** 2);
//           return Math.max(2, 5 - (distance / 150) * 0.7); // Adjusted for smoother scaling
//         });

//         // useAnimationFrame((time) => {
//         //   if (!isDragging.current) {
//         //     x.set(Math.sin(time * 0.0006) * 4);
//         //     y.set(Math.sin(time * 0.0008) * 3);
//         //   }
//         // });
//         useAnimationFrame((time) => {
//   if (!isDragging.current) {
//     rawX.set(Math.sin(time * 0.0006) * 4);
//     rawY.set(Math.sin(time * 0.0008) * 3);
//   }
// });

//         useEffect(() => {
//           const handleMouseUp = () => {
//             if (isDragging.current) {
//               isDragging.current = false;
//               x.set((Math.random() - 0.5) * 5);
//               y.set((Math.random() - 0.5) * 5);
//               setTimeout(() => {
//                 x.set(0);
//                 y.set(0);
//               }, 150); // Faster return for elastic feel
//             }
//           };

//           const handleMouseMove = (e) => {
//             if (isDragging.current) {
//               const rect = containerRef.current.getBoundingClientRect();
//               const centerX = rect.left + rect.width / 2;
//               const centerY = rect.top + 150;

//               const targetX = e.clientX - centerX;
//               const targetY = e.clientY - centerY;

//               const maxDistance = 300; // Increased for more freedom
//               const distance = Math.sqrt(targetX ** 2 + targetY ** 2);
//               const ratio = distance > maxDistance ? maxDistance / distance : 1;

//               x.set(targetX * ratio);
//               y.set(targetY * ratio);
//             }
//           };

//           window.addEventListener('mouseup', handleMouseUp);
//           window.addEventListener('mousemove', handleMouseMove);
//           window.addEventListener('touchend', handleMouseUp);

//           return () => {
//             window.removeEventListener('mouseup', handleMouseUp);
//             window.removeEventListener('mousemove', handleMouseMove);
//             window.removeEventListener('touchend', handleMouseUp);
//           };
//         }, []);

//         return (
//           <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
//             <div style={{
//               position: 'absolute',
//               top: 0,
//               left: '50%',
//               transform: 'translateX(-50%)',
//               width: 20,
//               height: 20,
//               backgroundColor: '#333',
//               borderRadius: '50%',
//               border: '1px solid #222',
//               boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.2)',
//               zIndex: 3
//             }} />
//           <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
//   <defs>
//     <filter id="ropeShadow">
//       <feDropShadow dx="2" dy="2" stdDeviation="1" floodOpacity="0.3" />
//     </filter>
//   </defs>

//   {/* Solid black rope */}
//   <motion.path
//     d={ropeCurve}
//     fill="none"
//     stroke="#000000"
//     strokeWidth={ropeThickness}
//     strokeLinecap="round"
//     filter="url(#ropeShadow)"
//   />

//   {/* Optional dashed shadow rope (dark grey dashed) */}
//   <motion.path
//     d={ropeCurve}
//     fill="none"
//     stroke="#333"
//     strokeWidth="1"
//     opacity="0.4"
//     strokeDasharray="3,6"
//   />
// </svg>

//             {/* <motion.div
//               drag
//               dragElastic={0.4} // Increased elasticity
//               dragConstraints={{ left: -200, right: 200, top: -100, bottom: 250 }}
//               onDragStart={() => (isDragging.current = true)}
//               style={{
//                 position: 'absolute',
//                 top: 180, // Adjusted to center vertically
//                 left: '46%',
//                 transform: 'translateX(-50%)',
//                 width: 200,
//                 height: 300,
//                 x: springX,
//                 y: springY,
//                 rotate,
//                 rotateY,
//                 backgroundColor: '#fff',
//                 borderRadius: 15,
//                 padding: 20,
//                 textAlign: 'center',
//                 boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
//                 userSelect: 'none',
//                 cursor: 'grab',
//                 zIndex: 2
//               }}
//             >
//               <div ref={holeRef} style={{
//                 position: 'absolute',
//                 top: 8,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: 10,
//                 height: 10,
//                 border: '2px solid #888',
//                 borderRadius: '50%',
//                 boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
//                 backgroundColor: 'white',
//                 zIndex: 5,
//               }}>
//                 <div style={{
//                   width: 8,
//                   height: 8,
//                   backgroundColor: '#654321',
//                   borderRadius: '50%',
//                   border: '1px solid #4a2c17',
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%, -50%)',
//                 }} />
//               </div>
//               <img
//                 src="https://i.pravatar.cc/100?img=3"
//                 alt="Rahul"
//                 style={{
//                   width: 85,
//                   height: 85,
//                   borderRadius: '50%',
//                   objectFit: 'cover',
//                   marginBottom: 8,
//                   marginTop: 15,
//                   border: '3px solid #e0e0e0',
//                   boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                 }}
//               />
//               <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.2rem', fontWeight: 600, color: '#333' }}>Rahul G L</h3>
//               <p style={{ fontSize: '0.9rem', color: '#666' }}>Full Stack Developer</p>
//               <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 8 }}>
//                 <p style={{ fontFamily: 'monospace' }}>ID: #DEV001</p>
//                 <p style={{ fontStyle: 'bold' ,color:"#222" }}>Need a Desired Job!! JOIN US</p>
//               </div>
//             </motion.div> */}

//               <motion.div
//             drag
//             dragElastic={0.4}
//             dragConstraints={{ left: -200, right: 200, top: -100, bottom: 250 }}
//             onDragStart={() => (isDragging.current = true)}
//             style={{
//               position: 'absolute',
//               top: 180,
//               left: '46%',
//               transform: 'translateX(-50%)',
//               width: 200,
//               height: 300,
//               x,
//               y,
//               rotate,
//               rotateY,
//               background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
//               borderRadius: 15,
//               padding: 20,
//               textAlign: 'center',
//               boxShadow: '0 15px 35px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)',
//               userSelect: 'none',
//               cursor: 'grab',
//               zIndex: 2,
//               border: '1px solid rgba(255,255,255,0.5)',
//             }}
//             whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
//             whileTap={{ cursor: 'grabbing' }}
//           >
//             <div ref={holeRef} style={{
//               position: 'absolute',
//               top: 8,
//               left: '50%',
//               transform: 'translateX(-50%)',
//               width: 10,
//               height: 10,
//               border: '2px solid #888',
//               borderRadius: '50%',
//               boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.1)',
//               backgroundColor: 'white',
//               zIndex: 5,
//             }}>
//               <div style={{
//                 width: 8,
//                 height: 8,
//                 backgroundColor: '#654321',
//                 borderRadius: '50%',
//                 border: '1px solid #4a2c17',
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//               }} />
//             </div>
//             <img
//               src="https://i.pravatar.cc/100?img=3"
//               alt="Rahul"
//               style={{
//                 width: 85,
//                 height: 85,
//                 borderRadius: '50%',
//                 objectFit: 'cover',
//                 marginBottom: 8,
//                 marginTop: 15,
//                 border: '3px solid #e0e0e0',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//               }}
//             />
//             <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.2rem', fontWeight: 600, color: '#333', fontFamily: 'Arial, sans-serif' }}>Rahul G L</h3>
//             <p style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'Arial, sans-serif' }}>Full Stack Developer</p>
//             <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 8 }}>
//               <p style={{ fontFamily: 'monospace' }}>ID: #DEV001</p>
//               <p style={{ fontWeight: 'bold', color: '#222' }}>Need a Desired Job!! JOIN US</p>
//             </div>
//             <div style={{
//               position: 'absolute',
//               bottom: 10,
//               left: 20,
//               right: 20,
//               height: 20,
//               background: 'repeating-linear-gradient(45deg, #ddd, #ddd 5px, #ccc 5px, #ccc 10px)',
//               borderRadius: 5,
//               opacity: 0.7,
//             }} />
//           </motion.div>
//           </div>
//         );
//       };

//   export default Card;


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   motion,
//   useMotionValue,
//   useSpring,
//   useTransform,
//   useAnimationFrame,
// } from 'framer-motion';

// function Card() {
//   const containerRef = useRef(null);
//   const isDragging = useRef(false);
//   const holeRef = useRef(null);

//   // 👉 Raw motion values
//   const rawX = useMotionValue(0);
//   const rawY = useMotionValue(0);

//   // 👉 Spring smoothing
//   const springX = useSpring(rawX, { stiffness: 200, damping: 25 });
//   const springY = useSpring(rawY, { stiffness: 180, damping: 22 });

//   const rotate = useTransform(springX, [-300, 0, 300], [-15, 0, 15]);
//   const rotateY = useTransform(springX, [-300, 0, 300], [6, 0, -6]);

//   const [holeCoords, setHoleCoords] = useState({ x: 0, y: 0 });

//   useAnimationFrame((time) => {
//     if (!isDragging.current) {
//       rawX.set(Math.sin(time * 0.0006) * 4);
//       rawY.set(Math.sin(time * 0.0008) * 3);
//     }
//   });

//   useEffect(() => {
//     const handleMouseUp = () => {
//       if (isDragging.current) {
//         isDragging.current = false;
//         rawX.set((Math.random() - 0.5) * 5);
//         rawY.set((Math.random() - 0.5) * 5);
//         setTimeout(() => {
//           rawX.set(0);
//           rawY.set(0);
//         }, 150);
//       }
//     };

//     const handleMouseMove = (e) => {
//       if (isDragging.current) {
//         const rect = containerRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + 150;

//         const targetX = e.clientX - centerX;
//         const targetY = e.clientY - centerY;

//         const maxDistance = 300;
//         const distance = Math.sqrt(targetX ** 2 + targetY ** 2);
//         const ratio = distance > maxDistance ? maxDistance / distance : 1;

//         rawX.set(targetX * ratio);
//         rawY.set(targetY * ratio);
//       }
//     };

//     window.addEventListener('mouseup', handleMouseUp);
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('touchend', handleMouseUp);

//     return () => {
//       window.removeEventListener('mouseup', handleMouseUp);
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('touchend', handleMouseUp);
//     };
//   }, []);

//   useAnimationFrame(() => {
//     if (holeRef.current && containerRef.current) {
//       const holeRect = holeRef.current.getBoundingClientRect();
//       const containerRect = containerRef.current.getBoundingClientRect();

//       const x = holeRect.left + holeRect.width / 2 - containerRect.left;
//       const y = holeRect.top + holeRect.height / 2 - containerRect.top;

//       setHoleCoords({ x, y });
//     }
//   });

//   const ropeCurve = useTransform([springX, springY], ([sx, sy]) => {
//     if (!containerRef.current) return '';

//     const width = containerRef.current.offsetWidth;
//     const startX = width / 2;
//     const startY = 0;

//     const endX = holeCoords.x;
//     const endY = holeCoords.y;

//     const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
//     const sag = Math.max(40, Math.pow(distance, 0.65) * 0.5);

//     const midX = (startX + endX) / 2;
//     const midY = (startY + endY) / 2 + sag;

//     return `M${startX},${startY} Q${midX},${midY} ${endX},${endY}`;
//   });

//   const ropeThickness = useTransform([springX, springY], ([sx, sy]) => {
//     const distance = Math.sqrt(sx ** 2 + sy ** 2);
//     return Math.max(2, 5 - (distance / 150) * 0.7);
//   });

//   return (
//     <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
//       {/* Hook circle */}
//       <div style={{
//         position: 'absolute',
//         top: 0,
//         left: '50%',
//         transform: 'translateX(-50%)',
//         width: 20,
//         height: 20,
//         backgroundColor: '#333',
//         borderRadius: '50%',
//         border: '1px solid #222',
//         boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.2)',
//         zIndex: 3
//       }} />

//       {/* Rope */}
//       <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
//         <defs>
//           <filter id="ropeShadow">
//             <feDropShadow dx="2" dy="2" stdDeviation="1" floodOpacity="0.3" />
//           </filter>
//         </defs>
//         <motion.path
//           d={ropeCurve}
//           fill="none"
//           stroke="#000000"
//           strokeWidth={ropeThickness}
//           strokeLinecap="round"
//           filter="url(#ropeShadow)"
//         />
//         <motion.path
//           d={ropeCurve}
//           fill="none"
//           stroke="#333"
//           strokeWidth="1"
//           opacity="0.4"
//           strokeDasharray="3,6"
//         />
//       </svg>

//       {/* ID Card */}
//       <motion.div
//         drag
//         dragElastic={0.4}
//         dragConstraints={{ left: -200, right: 200, top: -100, bottom: 250 }}
//         onDragStart={() => (isDragging.current = true)}
//         style={{
//           position: 'absolute',
//           top: 180,
//           left: '46%',
//           transform: 'translateX(-50%)',
//           width: 200,
//           height: 300,
//           x: springX,
//           y: springY,
//           rotate,
//           rotateY,
//           background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
//           borderRadius: 15,
//           padding: 20,
//           textAlign: 'center',
//           boxShadow: '0 15px 35px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)',
//           userSelect: 'none',
//           cursor: 'grab',
//           zIndex: 2,
//           border: '1px solid rgba(255,255,255,0.5)',
//         }}
//         whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
//         whileTap={{ cursor: 'grabbing' }}
//       >
//         <div ref={holeRef} style={{
//           position: 'absolute',
//           top: 8,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           width: 10,
//           height: 10,
//           border: '2px solid #888',
//           borderRadius: '50%',
//           boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.1)',
//           backgroundColor: 'white',
//           zIndex: 5,
//         }}>
//           <div style={{
//             width: 8,
//             height: 8,
//             backgroundColor: '#654321',
//             borderRadius: '50%',
//             border: '1px solid #4a2c17',
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//           }} />
//         </div>

//         <img
//           src="https://i.pravatar.cc/100?img=3"
//           alt="Rahul"
//           style={{
//             width: 85,
//             height: 85,
//             borderRadius: '50%',
//             objectFit: 'cover',
//             marginBottom: 8,
//             marginTop: 15,
//             border: '3px solid #e0e0e0',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//           }}
//         />
//         <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.2rem', fontWeight: 600, color: '#333', fontFamily: 'Arial, sans-serif' }}>Rahul G L</h3>
//         <p style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'Arial, sans-serif' }}>Full Stack Developer</p>
//         <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 8 }}>
//           <p style={{ fontFamily: 'monospace' }}>ID: #DEV001</p>
//           <p style={{ fontWeight: 'bold', color: '#222' }}>Need a Desired Job!! JOIN US</p>
//         </div>

//         <div style={{
//           position: 'absolute',
//           bottom: 10,
//           left: 20,
//           right: 20,
//           height: 20,
//           background: 'repeating-linear-gradient(45deg, #ddd, #ddd 5px, #ccc 5px, #ccc 10px)',
//           borderRadius: 5,
//           opacity: 0.7,
//         }} />
//       </motion.div>
//     </div>
//   );
// }

// export default Card;

// import React, { useEffect, useRef, useState } from 'react';
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// function Card() {
//   const containerRef = useRef(null);
//   const dragRef = useRef(null);
//   const isDragging = useRef(false);
//   const holeRef = useRef(null);

//   // Motion values and springs
//   const rawX = useMotionValue(0);
//   const rawY = useMotionValue(0);
//   const springX = useSpring(rawX, { stiffness: 200, damping: 25 });
//   const springY = useSpring(rawY, { stiffness: 180, damping: 22 });

//   // Rotation transforms
//   const rotate = useTransform(springX, [-300, 0, 300], [-15, 0, 15]);
//   const rotateY = useTransform(springX, [-300, 0, 300], [6, 0, -6]);

//   const [holeCoords, setHoleCoords] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const updateHoleCoords = () => {
//       if (holeRef.current && containerRef.current) {
//         const holeRect = holeRef.current.getBoundingClientRect();
//         const containerRect = containerRef.current.getBoundingClientRect();

//         const x = holeRect.left + holeRect.width / 2 - containerRect.left;
//         const y = holeRect.top + holeRect.height / 2 - containerRect.top;

//         setHoleCoords({ x, y });
//       }
//     };

//     updateHoleCoords();
//     window.addEventListener('resize', updateHoleCoords);

//     return () => {
//       window.removeEventListener('resize', updateHoleCoords);
//     };
//   }, []);

//   useEffect(() => {
//     let isMounted = true;

//     const handleMouseUp = (e) => {
//       if (isMounted && isDragging.current) {
//         isDragging.current = false;
//         rawX.set((Math.random() - 0.5) * 5);
//         rawY.set((Math.random() - 0.5) * 5);
//         setTimeout(() => {
//           if (isMounted && !isDragging.current) {
//             rawX.set(0);
//             rawY.set(0);
//           }
//         }, 150);
//       }
//     };

//     const throttle = (func, limit) => {
//       let inThrottle;
//       return (...args) => {
//         if (!inThrottle) {
//           func(...args);
//           inThrottle = true;
//           setTimeout(() => (inThrottle = false), limit);
//         }
//       };
//     };

//     const handleMouseMove = throttle((e) => {
//       if (isMounted && isDragging.current && containerRef.current) {
//         const rect = containerRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + 150;

//         const targetX = e.clientX - centerX;
//         const targetY = e.clientY - centerY;

//         const maxDistance = 300;
//         const distance = Math.sqrt(targetX ** 2 + targetY ** 2);
//         const ratio = distance > maxDistance ? maxDistance / distance : 1;

//         rawX.set(targetX * ratio);
//         rawY.set(targetY * ratio);
//       }
//     }, 16);

//     const dragElement = dragRef.current;
//     if (dragElement) {
//       dragElement.addEventListener('mouseup', handleMouseUp, { passive: true });
//       dragElement.addEventListener('mousemove', handleMouseMove, { passive: true });
//       dragElement.addEventListener('touchend', handleMouseUp, { passive: true });
//     }

//     return () => {
//       isMounted = false;
//       if (dragElement) {
//         dragElement.removeEventListener('mouseup', handleMouseUp);
//         dragElement.removeEventListener('mousemove', handleMouseMove);
//         dragElement.removeEventListener('touchend', handleMouseUp);
//       }
//     };
//   }, []);

//   return (
//     <div ref={containerRef} style={{ position: 'relative', width: '400px', height: '500px' }}>
//       <motion.div
//         ref={dragRef}
//         drag
//         dragElastic={0.4}
//         dragConstraints={{ left: -200, right: 200, top: -100, bottom: 250 }}
//         dragPropagation // Allow clicks to pass through unless dragging
//         onDragStart={() => {
//           isDragging.current = true;
//           console.log('Card: Drag started');
//         }}
//         onClick={(e) => {
//           if (!isDragging.current) e.stopPropagation();
//           console.log('Card: Clicked, isDragging:', isDragging.current);
//         }}
//         style={{
//           position: 'absolute',
//           top: 180,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           width: 200,
//           height: 300,
//           x: springX,
//           y: springY,
//           rotate,
//           rotateY,
//           background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
//           borderRadius: 15,
//           padding: 20,
//           textAlign: 'center',
//           boxShadow: '0 15px 35px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)',
//           userSelect: 'none',
//           cursor: 'grab',
//           zIndex: 2,
//           border: '1px solid rgba(255,255,255,0.5)',
//         }}
//         whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
//         whileTap={{ cursor: 'grabbing' }}
//       >
//         <div
//           ref={holeRef}
//           style={{
//             position: 'absolute',
//             top: 8,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             width: 10,
//             height: 10,
//             border: '2px solid #888',
//             borderRadius: '50%',
//             backgroundColor: 'white',
//             zIndex: 5,
//           }}
//         />
//         <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.2rem', fontWeight: 600 }}>
//           Test Card
//         </h3>
//       </motion.div>
//     </div>
//   );
// }

// export default Card;

// import React, { useEffect, useRef, useState } from 'react';
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// function Card() {
//   const containerRef = useRef(null);
//   const dragRef = useRef(null);
//   const isDragging = useRef(false);
//   const holeRef = useRef(null);
//   const ropeAnchorRef = useRef(null);

//   // Motion values and springs
//   const rawX = useMotionValue(0);
//   const rawY = useMotionValue(0);
//   const springX = useSpring(rawX, { stiffness: 200, damping: 25 });
//   const springY = useSpring(rawY, { stiffness: 180, damping: 22 });

//   // Rotation transforms
//   const rotate = useTransform(springX, [-300, 0, 300], [-15, 0, 15]);
//   const rotateY = useTransform(springX, [-300, 0, 300], [6, 0, -6]);

//   // Rope effect: anchor point and hole coordinates
//   const [holeCoords, setHoleCoords] = useState({ x: 0, y: 0 });
//   const [anchorCoords, setAnchorCoords] = useState({ x: 0, y: 0 });

//   // Update hole and anchor coordinates
//   useEffect(() => {
//     const updateCoords = () => {
//       if (holeRef.current && containerRef.current && ropeAnchorRef.current) {
//         const holeRect = holeRef.current.getBoundingClientRect();
//         const anchorRect = ropeAnchorRef.current.getBoundingClientRect();
//         const containerRect = containerRef.current.getBoundingClientRect();

//         const holeX = holeRect.left + holeRect.width / 2 - containerRect.left;
//         const holeY = holeRect.top + holeRect.height / 2 - containerRect.top;
//         const anchorX = anchorRect.left + anchorRect.width / 2 - containerRect.left;
//         const anchorY = anchorRect.top + anchorRect.height / 2 - containerRect.top;

//         setHoleCoords({ x: holeX, y: holeY });
//         setAnchorCoords({ x: anchorX, y: anchorY });
//       }
//     };

//     updateCoords();
//     window.addEventListener('resize', updateCoords);

//     return () => {
//       window.removeEventListener('resize', updateCoords);
//     };
//   }, []);

//   // Event listeners for drag
//   useEffect(() => {
//     let isMounted = true;

//     const handleMouseUp = (e) => {
//       if (isMounted && isDragging.current) {
//         isDragging.current = false;
//         rawX.set((Math.random() - 0.5) * 5);
//         rawY.set((Math.random() - 0.5) * 5);
//         setTimeout(() => {
//           if (isMounted && !isDragging.current) {
//             rawX.set(0);
//             rawY.set(0);
//           }
//         }, 150);
//       }
//     };

//     const throttle = (func, limit) => {
//       let inThrottle;
//       return (...args) => {
//         if (!inThrottle) {
//           func(...args);
//           inThrottle = true;
//           setTimeout(() => (inThrottle = false), limit);
//         }
//       };
//     };

//     const handleMouseMove = throttle((e) => {
//       if (isMounted && isDragging.current && containerRef.current) {
//         const rect = containerRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + 150;

//         const targetX = e.clientX - centerX;
//         const targetY = e.clientY - centerY;

//         const maxDistance = 300;
//         const distance = Math.sqrt(targetX ** 2 + targetY ** 2);
//         const ratio = distance > maxDistance ? maxDistance / distance : 1;

//         rawX.set(targetX * ratio);
//         rawY.set(targetY * ratio);
//       }
//     }, 16);

//     const dragElement = dragRef.current;
//     if (dragElement) {
//       dragElement.addEventListener('mouseup', handleMouseUp, { passive: true });
//       dragElement.addEventListener('mousemove', handleMouseMove, { passive: true });
//       dragElement.addEventListener('touchend', handleMouseUp, { passive: true });
//     }

//     return () => {
//       isMounted = false;
//       if (dragElement) {
//         dragElement.removeEventListener('mouseup', handleMouseUp);
//         dragElement.removeEventListener('mousemove', handleMouseMove);
//         dragElement.removeEventListener('touchend', handleMouseUp);
//       }
//     };
//   }, []);

//   return (
//     <div ref={containerRef} style={{ position: 'relative', width: '400px', height: '500px' }}>
//       {/* Rope anchor point */}
//       <div
//         ref={ropeAnchorRef}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           width: 10,
//           height: 10,
//           backgroundColor: '#888',
//           borderRadius: '50%',
//           zIndex: 1,
//         }}
//       />
//       {/* Rope SVG */}
//       <svg
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           zIndex: 1,
//           pointerEvents: 'none',
//         }}
//       >
//         <line
//           x1={anchorCoords.x}
//           y1={anchorCoords.y}
//           x2={holeCoords.x}
//           y2={holeCoords.y}
//           stroke="#888"
//           strokeWidth="2"
//         />
//       </svg>
//       {/* Draggable card */}
//       <motion.div
//         ref={dragRef}
//         drag
//         dragElastic={0.4}
//         dragConstraints={{ left: -200, right: 200, top: -100, bottom: 250 }}
//         dragPropagation
//         onDragStart={() => {
//           isDragging.current = true;
//           console.log('Card: Drag started');
//         }}
//         onClick={(e) => {
//           if (!isDragging.current) e.stopPropagation();
//           console.log('Card: Clicked, isDragging:', isDragging.current);
//         }}
//         style={{
//           position: 'absolute',
//           top: 180,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           width: 200,
//           height: 300,
//           x: springX,
//           y: springY,
//           rotate,
//           rotateY,
//           background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
//           borderRadius: 15,
//           padding: 20,
//           textAlign: 'center',
//           boxShadow: '0 15px 35px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)',
//           userSelect: 'none',
//           cursor: 'grab',
//           zIndex: 2,
//           border: '1px solid rgba(255,255,255,0.5)',
//         }}
//         whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
//         whileTap={{ cursor: 'grabbing' }}
//       >
//         <div
//           ref={holeRef}
//           style={{
//             position: 'absolute',
//             top: 8,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             width: 10,
//             height: 10,
//             border: '2px solid #888',
//             borderRadius: '50%',
//             backgroundColor: 'white',
//             zIndex: 5,
//           }}
//         />
//         <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.2rem', fontWeight: 600 }}>
//           Resume Card
//         </h3>
//       </motion.div>
//     </div>
//   );
// }

// export default Card;