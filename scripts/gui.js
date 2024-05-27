import * as dat from 'dat.gui'
import mitt from 'mitt'

export class GlGui {
  constructor() {
    this.emitter = mitt()

    const gui = new dat.GUI({ name: 'Main GUI' })

    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0]
      if (!file) return
      readFileAsURL(file, (url) => {
        this.emitter.emit('changeImage', url)
      })
    })

    const info = {
      uploadImage: function () {
        fileInput.click()
      },
    }

    gui.add(info, 'uploadImage').name('Upload Image')
  }

  on(name, handler) {
    this.emitter.on(name, handler)
  }
}

function readFileAsURL(file, fn) {
  const reader = new FileReader()
  reader.onloadend = () => {
    fn(reader.result)
  }
  reader.readAsDataURL(file)
}
