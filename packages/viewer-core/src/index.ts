// Placeholder. Loveable will implement loaders, PMREM, presets, etc.
export type ViewerOptions = {
  modelUrl: string
  background?: 'studio'|'transparent'|'gradient'
  lighting?: 'soft'|'hard'|'hdr'
}

export function createViewer(container: HTMLElement, opts: ViewerOptions) {
  // TODO: implement Three.js scene creation and GLTF loading
  container.innerHTML = `<div style="padding:12px;border:1px dashed #aaa">Viewer placeholder for ${opts.modelUrl}</div>`
}
