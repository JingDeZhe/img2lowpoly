import * as THREE from 'three'

const app = document.querySelector('#app')
export class GlRenderer {
  /**
   * @param {import('./gui').GlGui} gui
   */
  constructor(gui) {
    this.gui = gui
    this.init()
  }

  init() {
    const renderer = new THREE.WebGLRenderer()
    app.appendChild(renderer.domElement)
    renderer.setSize(window.innerWidth, window.innerHeight)

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    this.renderer = renderer
    this.initEvents()
  }

  initEvents() {
    this.gui.on('changeImage', this.changeImage)
  }

  changeImage(url) {
    console.log(url)
  }
}
