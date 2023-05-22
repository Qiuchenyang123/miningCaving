import { Model, Source } from 'ly_three'
import LyGroup from 'ly_three/packages/base/LyGroup'
import gsap from 'gsap'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import eventHub from '../utils/eventHub'
import * as THREE from 'three'
import Tooltip3D from 'ly_three/packages/mesh/Tooltip3D/Tooltip3D'
import { useCaveLayerStore } from '../stores/caveLayer'

let caveLayerStore

class CaveThreeControl {
	constructor(options) {
		this.$options = options
		this.initial()
		eventHub.on('initLayers', (layers) => {
			this.$options.layers = layers
			this.showDetail()
		})
		eventHub.on('setLayers', (layers) => {
			this.$options.layers = layers
		})
		caveLayerStore = useCaveLayerStore()
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

		this.$camera.position.set(-0, 240, 300)

		this.once = true
		this.group = new LyGroup()
		this.detailGroup = new LyGroup()
		this.cavingGroup = new LyGroup()
		this.cavingHoleGroup = new LyGroup()
		this.data = {
			modelList: []
		}
		this.originalTexturesMap = {}
		this.rentTexturesMap = {}
		this.rentLayerMap = {}

		scene.add(this.group)
		scene.add(this.detailGroup)
		scene.add(this.cavingGroup)
		scene.add(this.cavingHoleGroup)

		// 添加坐标辅助
		Source.Source.addAxesHelper({ scene })
		// 添加控制
		this.control = Source.Controller.orbitControls({ camera, canvas, targetSet: { x: 0, y: 0, z: 0 }})

		const light = new THREE.AmbientLight(0xffffff, 1)
		// light.position.set( 30, 30, 30 );
		scene.add(light)
		/* const textureLoader = new THREE.TextureLoader()
		const grassMap = textureLoader.load('http://182.92.151.43:20000/three/textures/ground.jpg')
		const mtlLoader = new MTLLoader()
		const objLoader = new OBJLoader()
		mtlLoader.load('http://182.92.151.43:20000/three/OBJ/rocale/005.mtl', material => {
			// mtlLoader.load('./geology/models/005.mtl', material => {
			material.preload()
			material.materials['wire_088144225'].map = grassMap
			material.materials['wire_088144225'].color = new THREE.Color('#fff')
			objLoader.setMaterials(material)
			objLoader.loadAsync('http://182.92.151.43:20000/three/OBJ/rocale/005.obj')
				// objLoader.loadAsync( './geology/models/005.obj')
				.then(group => {
					const scene = group
					scene.scale.set(0.01, 0.01, 0.01)
					scene.position.set(0, 0, 0)
					// group.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 4)
					this.group.add(scene)
				})
		})*/

		const fbxLoader = new GLTFLoader()
		fbxLoader.load('http://182.92.151.43:20000/three/glb/stone_lightblack.glb', object => {
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
		/* this.raycaster = new THREE.Raycaster()
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
		document.getElementById('main-three-container').addEventListener('mousedown', handleMouseDown)*/
		this.textures = []
		this.textLoader = new THREE.TextureLoader()
		for (let i = 1; i < 9; i++) {
			const map = this.textLoader.load(`./ground/textures/granites/granites_0${i}.jpg`)
			this.textures.push(map)
			this.originalTexturesMap[`granites_0${i}`] = map
		}
		// this.luomaoTexture = this.textLoader.load('http://182.92.151.43:20000/three/textures/pebbles_37.jpg')
		// this.luomaoTexture.wrapS = THREE.RepeatWrapping
		// this.luomaoTexture.wrapT = THREE.RepeatWrapping

		this.tooltipControl = new Tooltip3D(this.$scene)
		// this.showDetail()
	}
	showDetail() {
		eventHub.emit('showDetail')
		eventHub.emit('showCavingControl')
		this.group.visible = false
		this.detailGroup.visible = true
		this.cavingGroup.visible = true
		this.cavingHoleGroup.visible = true
		if (this.once) {
			const layers = this.$options.layers.slice(0).reverse()
			console.log('layers', layers)
			const textures = this.textures
			let currentHeight = 0
			this.texturesMap = {}
			const maxWidth = this.$options.maxWidth
			const layerOffset = [3, 3, 3, 3, 3, 3, 3, 3]
			for (let i = 0; i < layers.length; i++) {
				const layer = layers[i]
				const mesh = this.addGround({
					width: maxWidth, height: layer.height, depth: layer.width, texture: textures[i],
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
					this.cavingHoleGroup.clear()
					this.addCaveHole({
						width: maxWidth + 0.1, height: layer.height - 0.2, depth: layer.height, color: 'rgb(186,184,185)',
						position: { x: 0, y: currentHeight + 0.1, z: 20 }
					})
					this.addCaveHole({
						width: maxWidth + 0.1, height: layer.height - 0.2, depth: layer.height, color: 'rgb(186,184,185)',
						position: { x: 0, y: currentHeight + 0.1, z: -20 }
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
					<h3>${layerData.groundLayer}</h3>
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
		this.cavingHoleGroup.visible && this.cavingHoleGroup.add(mesh)
	}
	imitateCaving() {
		const data = caveLayerStore.caveData
		this.group.visible = false
		this.detailGroup.visible = true
		this.cavingGroup.visible = true
		this.cavingGroup.clear()
		const activeKey = '42_16cm'
		const { distance, caveLayerList } = data
		const hollowLayer = this.detailGroup.findByCode(activeKey)
		const { layerProperty, position } = hollowLayer
		const maxWidth = this.$options.maxWidth
		// 挖空distance
		this.addEmptyLineSpace({ width: distance, height: layerProperty.height, depth: layerProperty.width, position: { x: position.x + (maxWidth - distance) / 2, y: position.y, z: position.z }})
		this.addRestSolumLayer({ width: maxWidth - distance, height: layerProperty.height, depth: layerProperty.width, position: { x: position.x - distance / 2, y: position.y, z: position.z }, activeKey, cer: layerProperty.cer })
		this.cavingHoleGroup.clear()
		this.addCaveHole({
			width: maxWidth - distance + 0.1, height: layerProperty.height - 0.2, depth: layerProperty.height, color: 'rgb(186,184,185)',
			position: { x: 0, y: position.y + 0.1, z: 20 }
		})
		this.addCaveHole({
			width: maxWidth - distance + 0.1, height: layerProperty.height - 0.2, depth: layerProperty.height, color: 'rgb(186,184,185)',
			position: { x: position.x - distance / 2, y: position.y + 0.1, z: -20 }
		})

		hollowLayer.visible = false
		let currentHeight = 0
		// 坍塌
		layerProperty.aboveList.forEach(key => {
			const solumData = caveLayerList.find(item => item.code === key)
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
						blockList, height: layerProperty.height, depth: layerProperty.width, texture: this.texturesMap[layerProperty.code],
						position: { x: 0, y: position.y, z: 0 },
						solumData
					})
					this.addRestSolumLayer({ width: maxWidth - currentWidth, height: layerProperty.height, depth: layerProperty.width, position: { x: position.x - currentWidth / 2, y: position.y, z: position.z }, activeKey: layerProperty.code })
				} else {
					const cerHeight = layerProperty.height * layerProperty.cer
					this.addRestSolumLayer({ width: maxWidth - distance, height: layerProperty.height, depth: layerProperty.width, position: { x: position.x - distance / 2, y: position.y, z: position.z }, activeKey: layerProperty.code })
					this.addEmptyLineSpace({ width: Number(distance), height: layerProperty.height, depth: layerProperty.width, position: { x: position.x + (maxWidth - distance) / 2, y: position.y, z: position.z }})
					this.addCavingGround_luomao({
						width: Number(distance), height: cerHeight, depth: layerProperty.width,
						position: { x: position.x + (maxWidth - distance) / 2, y: currentHeight + cerHeight / 2, z: position.z },
						top: position.y + layerProperty.height / 2
					})
					currentHeight += cerHeight
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
	addCavingGround_laoding({ blockList, height, depth, texture, position, solumData }) {
		let currentWidth = 0
		const maxWidth = this.$options.maxWidth
		const depthOffset = [-(solumData.e / 2 + solumData.d / 2), 0, (solumData.e / 2 + solumData.d / 2)]
		const depthList = [solumData.d, solumData.e, solumData.d]
		const rotationList = [solumData.dr, 0, -solumData.dr]
		const positionOffset = [-solumData.offsetHeight1, -solumData.offsetHeight2, -solumData.offsetHeight3]
		for (let j = 0; j < blockList.length; j++) {
			const width = blockList[j]
			currentWidth += width
			const currentWidthOffset = maxWidth / 2 - currentWidth + width / 2
			for (let i = 0; i < 3; i++) {
				const geometry = new THREE.BoxGeometry(width, height, depthList[i])
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
		const { width, height, depth, position, top } = params
		// 加石块
		const { max, min } = this.stone.children[0].geometry.boundingBox
		let scale = 8
		let yD
		let xD
		let zD
		let loopY
		let loopX
		let loopZ
		while (true) {
			yD = (max.y - min.y) * scale
			xD = (max.x - min.x) * scale
			zD = (max.z - min.z) * scale
			loopY = Math.floor(height / yD)
			loopX = Math.floor(width / xD)
			loopZ = Math.floor(depth / zD)
			if (loopY * loopX * loopZ) {
				break
			}
			scale /= 2
		}

		for (let i = 0; i < loopY; i++) {
			for (let j = 1; j < loopX; j++) {
				for (let k = 0; k < loopZ; k++) {
					this.addStone({
						scale,
						min: maxWidth / 2 - width,
						top,
						depth,
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
	addStone({ scale, position, min, top, depth }) {
		// console.log(327, this.containerGeometry)
		// const container = this.cavingContainer
		// const { max, min } = container.geometry.boundingBox
		const maxWidth = this.$options.maxWidth
		if (position.x > maxWidth / 2 || position.x < min) return false
		let mesh = this.stone.clone()
		mesh.scale.set(scale, scale, scale)
		mesh.position.set(position.x + (Math.random() - 0.5) * 0.5, position.y + (Math.random() - 0.5) * 0.5, position.z + (Math.random() - 0.5) * 0.5)
		mesh.rotation.set((Math.random() - 0.5) * 0.1, position.y + (Math.random() - 0.5) * 0.1, position.z + (Math.random() - 0.5) * 0.1)
		const boundingBox = mesh.children[0].geometry.boundingBox
		const stoneMax = boundingBox.max
		const stoneMin = boundingBox.min
		const stoneHeight = stoneMax.y - stoneMin.y
		const stoneWidth = stoneMax.z - stoneMin.z
		if (((mesh.position.y + stoneHeight / 2) > top || (mesh.position.y - stoneHeight / 2) < 0) || ((mesh.position.z + stoneWidth / 2) > depth / 2 || (mesh.position.z + stoneWidth / 2) < -depth / 2)) {
			mesh = null
			return false
		}
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
