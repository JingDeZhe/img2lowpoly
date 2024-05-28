import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { FreiChenShader } from 'three/addons/shaders/FreiChenShader.js'
import { CopyShader } from 'three/addons/shaders/CopyShader.js'
import { runFn } from './utils'

export class GlRenderer {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {import('./gui').GlGui} gui
   */
  constructor(canvas, gui) {
    this.canvas = canvas
    this.gui = gui
    this.init()
  }

  init() {
    this._rendererSize = null
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true })
    this.renderer.setClearColor(0x0)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(
      -this.canvas.width / 2,
      this.canvas.width / 2,
      this.canvas.height / 2,
      -this.canvas.height / 2,
      0,
      10
    )
    this.camera.position.set(0, 0, 5)
    this.scene.add(this.camera)

    const composer = new EffectComposer(this.renderer)

    const renderPass = new RenderPass(this.scene, this.camera)
    const edgeShader = new ShaderPass(FreiChenShader)
    const copyShader = new ShaderPass(CopyShader)
    copyShader.renderToScreen = true

    composer.addPass(renderPass)
    composer.addPass(edgeShader)
    composer.addPass(copyShader)

    this.initEvents()
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })

    this.gui.on('changeImage', this.changeImage)
  }

  changeImage(url) {
    const size = getRendererSize()
    const loader = new THREE.TextureLoader()
    loader.load(url, (texture) => {
      const imgMesh = new THREE.Mesh(new THREE.PlaneGeometry(), new THREE.MeshBasicMaterial({}))
    })
  }

  getRendererSize() {
    if (this._rendererSize) return this._rendererSize

    const { width: iw, height: ih } = this.srcImage
    const { width: cw, height: ch } = this.canvas

    const rendererSize = {
      w: cw,
      h: ch,
      ow: 0,
      oh: 0,
    }
    /**
     * If the aspect ratio of the image is greater than the canvas aspect ratio, it is centered vertically,
     * otherwise horizontally.
     */
    if (iw / ih > cw / ch) {
    }
  }

  changeImage(imagePath, cb) {
    this.imagePath = imagePath
    this._rendererSize = null
    this.clear()
    this.preRender(cb)
  }

  preRender(cb) {
    this.srcImage = new Image()
    this.srcImage.src = this.imagePath

    this.srcImage.onload = () => {
      const { width, height } = this.srcImage
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(this.srcImage, 0, 0, width, height)
      this.srcPixel = ctx.getImageData(0, 0, width, height).data
      this.render()
      runFn(cb)
    }
  }

  render() {
    this.clear()
  }
  clear() {}
}
