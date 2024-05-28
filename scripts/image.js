import { GlGui } from './gui'
import { GlRenderer } from './renderer'

const app = document.getElementById('app')
const canvas = document.createElement('canvas')
app.appendChild(canvas)

const gui = new GlGui()
const renderer = new GlRenderer(canvas, gui)
