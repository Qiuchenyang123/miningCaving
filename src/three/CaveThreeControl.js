import { Model, Source } from 'ly_three'
import LyGroup from 'ly_three/packages/base/LyGroup'
import gsap from 'gsap'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import eventHub from '../utils/eventHub'
import * as THREE from 'three'
import Tooltip3D from 'ly_three/packages/mesh/Tooltip3D/Tooltip3D'

class CaveThreeControl {
	constructor(options) {
		this.$options = options
		this.initial()
	}
	initial() {
		const container = document.getElementById(this.$options.container)
		const width = container.clientWidth
		const height = container.clientHeight
		const renderFns = this.$options.renderOnce ? [this.$options.renderOnce] : []
		// 创建场景已默认添加环境光
		const { scene, camera, canvas, renderer } = Source.Source.init({
			domId: this.$options.id,
			width,
			height,
			renderFrequency: renderFns,
			background: '#000',
			ifInitCss3DRenderer: true,
			css3DRendererOptions: { width, height, options: { domId: 'three-css-3d-container' }}
		})
		this.$scene = scene
		this.$camera = camera
		this.$canvas = canvas
		this.$renderer = renderer

		this.$camera.position.set(-0, 40, 100)

		this.once = true
		this.group = new LyGroup()
		this.detailGroup = new LyGroup()
		this.cavingGroup = new LyGroup()
		this.data = {
			modelList: []
		}
		this.originalTexturesMap = {}
		this.rentTexturesMap = {}
		this.rentLayerMap = {}

		scene.add(this.group)
		scene.add(this.detailGroup)
		scene.add(this.cavingGroup)

		// 添加坐标辅助
		Source.Source.addAxesHelper({ scene })
		// 添加控制
		this.control = Source.Controller.orbitControls({ camera, canvas, targetSet: { x: 0, y: 0, z: 0 }})

		const light = new THREE.AmbientLight(0xffffff, 1)
		// light.position.set( 30, 30, 30 );
		scene.add(light)
		const textureLoader = new THREE.TextureLoader()
		const grassMap = textureLoader.load('http://minio.lingyizhilian.top:20005/threemodel/textures/ground.jpg')
		const mtlLoader = new MTLLoader()
		const objLoader = new OBJLoader()
		mtlLoader.load('http://minio.lingyizhilian.top:20005/threemodel/OBJ/rocale/005.mtl', material => {
			// mtlLoader.load('./geology/models/005.mtl', material => {
			material.preload()
			material.materials['wire_088144225'].map = grassMap
			material.materials['wire_088144225'].color = new THREE.Color('#fff')
			objLoader.setMaterials(material)
			objLoader.loadAsync('http://minio.lingyizhilian.top:20005/threemodel/OBJ/rocale/005.obj')
				// objLoader.loadAsync( './geology/models/005.obj')
				.then(group => {
					const scene = group
					scene.scale.set(0.01, 0.01, 0.01)
					scene.position.set(0, 0, 0)
					// group.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 4)
					this.group.add(scene)
				})
		})

		const fbxLoader = new GLTFLoader()
		fbxLoader.load('./stone/stone_normal/stone2.glb', object => {
			const { scene } = object
			// scene.scale.set(50, 50, 50)
			this.stone = scene
			// const { scene } = gltf
			/* object.traverse(function(obj) {
				if (obj instanceof THREE.Mesh) {
					obj.material.emissive = new THREE.Color(1, 1, 1)
					obj.material.emissiveIntensity = 1
					obj.material.emissiveMap = obj.material.map
				}
			})*/
		})
		this.raycaster = new THREE.Raycaster()
		const mouse = new THREE.Vector2()// 创建二维平面
		let time
		const handleClick = (e) => {
			const currentTime = Date.now()
			if (currentTime - time > 300) return false

			mouse.x = e.clientX / renderer.domElement.clientWidth * 2 - 1
			mouse.y = -(e.clientY / renderer.domElement.clientHeight * 2) + 1
			// 以camera为z坐标，确定所点击物体的3D空间位置
			this.raycaster.setFromCamera(mouse, camera)
			// 确定所点击位置上的物体数量
			const intersects = this.raycaster.intersectObjects(scene.children)
			if (intersects.length) {
				const selected = intersects[0]
				if (selected.object && selected.object.isMesh && selected.object.name.indexOf('002') > -1) {
					this.showDetail()
				}
			}
		}
		const handleMouseDown = () => {
			time = Date.now()
		}

		document.getElementById('main-three-container').addEventListener('click', handleClick)
		document.getElementById('main-three-container').addEventListener('mousedown', handleMouseDown)
		this.textures = []
		this.textLoader = new THREE.TextureLoader()
		for (let i = 1; i < 9; i++) {
			const map = this.textLoader.load(`./ground/textures/granites/granites_0${i}.jpg`)
			this.textures.push(map)
			this.originalTexturesMap[`granites_0${i}`] = map
		}
		this.luomaoTexture = this.textLoader.load('http://minio.lingyizhilian.top:20005/threemodel/textures/pebbles_37.jpg')
		this.luomaoTexture.wrapS = THREE.RepeatWrapping
		this.luomaoTexture.wrapT = THREE.RepeatWrapping

		this.tooltipControl = new Tooltip3D(this.$scene)
	}
	showDetail() {
		eventHub.emit('showDetail')
		eventHub.emit('showCavingControl')
		this.group.visible = false
		this.detailGroup.visible = true
		this.cavingGroup.visible = true
		if (this.once) {
			const layers = this.$options.layers
			const textures = this.textures
			let currentHeight = 0
			this.texturesMap = {}
			const maxWidth = this.$options.maxWidth
			const layerOffset = [3.4, 3, 3, 3.5, 3]
			for (let i = 0; i < layers.length; i++) {
				const layer = layers[i]
				const mesh = this.addGround({
					width: maxWidth, height: layer.height, depth: 30, texture: textures[i],
					position: { x: 0, y: currentHeight, z: 0 }
				})
				this.texturesMap[layer.code] = textures[i]
				mesh.code = layer.code
				mesh.layerProperty = layer
				const { position } = mesh
				const cloneMesh = { position: new THREE.Vector3(position.x - maxWidth / 2, position.y - layerOffset[i], position.z), scale: new THREE.Vector3(15, 15, 15) }
				// console.log(154, cloneMesh, mesh)
				// cloneMesh.scale.set(10, 10, 10)
				this.addTooltip3D(cloneMesh, layer)

				if (i === 0) {
					this.addCaveHole({
						width: 120, height: layer.height - 0.2, depth: layer.height, color: 'rgb(186,184,185)',
						position: { x: 20, y: currentHeight + 0.1, z: 6 }
					})
					this.addCaveHole({
						width: 120, height: layer.height - 0.2, depth: layer.height, color: 'rgb(186,184,185)',
						position: { x: 20, y: currentHeight + 0.1, z: -6 }
					})
				} else {
					this.rentLayerMap[`granites_0${i + 1}`] = mesh
				}
				currentHeight += layer.height
			}
		}
		this.once = false
	}
	addTooltip3D(target, layerData) {
		const options = {
			element: `
                        <div class="elementContent">
                            <h3>${layerData.name}</h3>
                        </div>
                    `,
			parentClass: [],
			eventActive: true,
			eventType: 'click',
			code: layerData.code,
			eventCallback: () => {
				// tooltipControl.removeTagByCode('test_123')
			}
		}
		this.tooltipControl.createTag(target, options)
	}
	backHome() {
		this.group.visible = true
		this.detailGroup.visible = false
		this.cavingGroup.visible = false
	}
	addGround({ width, height, depth, texture, position }) {
		const geometry = new THREE.BoxGeometry(width, height, depth)
		const material = new THREE.MeshBasicMaterial({
			map: texture
		})
		const mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(position.x, position.y + height / 2, position.z)
		this.detailGroup.visible && this.detailGroup.add(mesh)
		return mesh
	}
	addCaveHole({ width, height, depth, color, position }) {
		const geometry = new THREE.BoxGeometry(width, height, depth)
		const material = new THREE.MeshBasicMaterial({
			color
		})
		const mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(position.x, position.y + height / 2, position.z)
		this.detailGroup.visible && this.detailGroup.add(mesh)
	}
	imitateCaving(data) {
		this.group.visible = false
		this.detailGroup.visible = true
		this.cavingGroup.visible = true
		this.cavingGroup.clear()
		const { distance, solumMap, activeKey } = data
		const hollowLayer = this.detailGroup.findByCode(activeKey)
		const { layerProperty, position } = hollowLayer
		const maxWidth = this.$options.maxWidth
		const textures = this.textures
		// 挖空distance
		this.addEmptyLineSpace({ width: distance, height: layerProperty.height, depth: 30, position: { x: position.x + (maxWidth - distance) / 2, y: position.y, z: position.z }})
		this.addRestSolumLayer({ width: maxWidth - distance, height: layerProperty.height, depth: 30, position: { x: position.x - distance / 2, y: position.y, z: position.z }, activeKey })

		hollowLayer.visible = false
		// 坍塌
		layerProperty.aboveList.forEach(key => {
			const solumData = solumMap[key]
			const layer = this.detailGroup.findByCode(key)
			const { layerProperty, position } = layer
			if (solumData.caving) {
				if (solumData.cavingType === 'laoding') {
					const C0 = Number(solumData.C0)
					const C1 = Number(solumData.C1)
					let currentWidth = 0
					let once = true
					const blockList = []
					while (currentWidth < Number(distance)) {
						if (once) {
							currentWidth += C0
							once = false
							blockList.push(C0)
						} else {
							currentWidth += C1
							blockList.push(C1)
						}
					}
					this.addCavingGround_laoding({
						blockList, height: layerProperty.height, depth: 30, texture: this.texturesMap[layerProperty.code],
						position: { x: 0, y: position.y, z: 0 },
						solumData
					})
					this.addRestSolumLayer({ width: maxWidth - currentWidth, height: layerProperty.height, depth: 30, position: { x: position.x - currentWidth / 2, y: position.y, z: position.z }, activeKey: layerProperty.code })
				} else {
					this.addRestSolumLayer({ width: maxWidth - distance, height: layerProperty.height, depth: 30, position: { x: position.x - distance / 2, y: position.y, z: position.z }, activeKey: layerProperty.code })
					this.addEmptyLineSpace({ width: Number(distance), height: layerProperty.height, depth: 30, position: { x: position.x + (maxWidth - distance) / 2, y: position.y, z: position.z }})
					this.addCavingGround_luomao({
						width: Number(distance), height: layerProperty.height, depth: 30,
						position: { x: position.x + (maxWidth - distance) / 2, y: position.y, z: position.z }
					})
				}
				layer.visible = false
			} else {
				layer.visible = true
			}
		})
	}
	addEmptyLineSpace({ width, height, depth, position }) {
		const emptyGeometry = new THREE.BoxGeometry(width, height, depth)
		const edges = new THREE.EdgesGeometry(emptyGeometry)
		const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }))
		line.position.copy(position)
		this.cavingGroup.add(line)
	}
	addRestSolumLayer({ width, height, depth, position, activeKey }) {
		const restGeometry = new THREE.BoxGeometry(width, height, depth)
		const material = new THREE.MeshBasicMaterial({
			map: this.texturesMap[activeKey]
		})
		const restMesh = new THREE.Mesh(restGeometry, material)
		restMesh.position.copy(position)
		this.cavingGroup.visible && this.cavingGroup.add(restMesh)
	}
	addCavingGround_laoding({ blockList, height, depth, texture, position }) {
		let currentWidth = 0
		const maxWidth = this.$options.maxWidth
		const depthOffset = [-depth / 1.5 / 2, 0, depth / 1.5 / 2]
		const rotationList = [0.1, 0, -0.1]
		const positionOffset = [0, -0.4, 0]
		for (let j = 0; j < blockList.length; j++) {
			const width = blockList[j]
			currentWidth += width
			const currentWidthOffset = maxWidth / 2 - currentWidth + width / 2
			for (let i = 0; i < 3; i++) {
				const geometry = new THREE.BoxGeometry(width, height, depth / 3)
				const material = new THREE.MeshBasicMaterial({
					map: texture
					// color: '#1b9cc4'
				})
				const mesh = new THREE.Mesh(geometry, material)
				const edges = new THREE.EdgesGeometry(geometry)
				const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }))

				mesh.position.set(currentWidthOffset, position.y + positionOffset[i], position.z + depthOffset[i])
				mesh.rotation.set(rotationList[i], 0, 0)
				line.position.copy(mesh.position)
				line.rotation.copy(mesh.rotation)
				this.cavingGroup.add(mesh)
				this.cavingGroup.add(line)
			}
		}
	}
	addCavingGround_luomao(params) {
		const maxWidth = this.$options.maxWidth
		const { width, height, depth, position } = params
		// 加石块
		const { max, min } = this.stone.children[0].geometry.boundingBox
		const scale = 15
		const yD = (max.y - min.y) * scale
		const xD = (max.x - min.x) * scale
		const zD = (max.z - min.z) * scale
		const loopY = Math.floor(height / yD)
		const loopX = Math.floor(width / xD)
		const loopZ = Math.floor(depth / zD)
		for (let i = 0; i < loopY; i++) {
			for (let j = 1; j < loopX; j++) {
				for (let k = 0; k < loopZ; k++) {
					this.addStone({
						scale,
						min: maxWidth / 2 - width,
						position: {
							y: position.y + (i - Math.floor(loopY / 2)) * (yD) * 1.1,
							x: position.x + (j - Math.floor(loopX / 2)) * (xD) * 1.1,
							z: position.z + (k - Math.floor(loopZ / 2)) * zD * 1.1
						}
					})
				}
			}
		}
	}
	addStone({ scale, position, min }) {
		// console.log(327, this.containerGeometry)
		// const container = this.cavingContainer
		// const { max, min } = container.geometry.boundingBox
		const maxWidth = this.$options.maxWidth
		if (position.x > maxWidth / 2 || position.x < min) return false
		const mesh = this.stone.clone()
		mesh.scale.set(scale, scale, scale)
		mesh.position.set(position.x + (Math.random() - 0.5) * 0.5, position.y + (Math.random() - 0.5) * 0.5, position.z + (Math.random() - 0.5) * 0.5)
		mesh.rotation.set((Math.random() - 0.5) * 0.1, position.y + (Math.random() - 0.5) * 0.1, position.z + (Math.random() - 0.5) * 0.1)
		this.cavingGroup.add(mesh)
	}
	startCaving(distance, level) {

	}
	cavingComplete() {

	}
	rockFormationShake(mesh, completeFn) {

	}
	cavingRecover() {

	}
	fitResize() {
		const change = () => {
			this.$camera.aspect = window.innerWidth / window.innerHeight
			this.$camera.updateProjectionMatrix()
			this.$renderer.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', change)
	}
}

export default CaveThreeControl
