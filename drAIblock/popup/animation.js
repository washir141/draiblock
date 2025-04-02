// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x0066ff, 2);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create random floating shapes
const shapes = [];
const geometries = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.TetrahedronGeometry(1),
    new THREE.OctahedronGeometry(1),
    new THREE.IcosahedronGeometry(1)
];

for (let i = 0; i < 20; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshPhongMaterial({
        color: 0x0040a3,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        -20 - Math.random() * 30
    );

    mesh.scale.setScalar(5 + Math.random() * 8);
    shapes.push(mesh);
    scene.add(mesh);
}

// Create stars (white dots)
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff, 
    size: 0.18,   
    transparent: true 
});

const starVertices = [];
for (let i = 0; i < 500; i++) {  // Increase the number of stars
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 20;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    shapes.forEach(mesh => {
        mesh.rotation.x += 0.0007;
        mesh.rotation.y += 0.0009;
        mesh.position.y += Math.sin(Date.now() * 0.001) * 0.005;
    });

    stars.rotation.y += 0.0003;  // Slight movement for the stars

    renderer.render(scene, camera);
}

animate();
