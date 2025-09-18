(() => {
  const els = document.querySelectorAll<HTMLElement>(".your-3d")
  els.forEach(el => {
    const params = new URLSearchParams({
      model: el.dataset.model || "",
      color: el.dataset.color || "",
      size:  el.dataset.size  || "",
      bg:    el.dataset.bg    || "studio",
      light: el.dataset.light || "soft"
    })
    const iframe = document.createElement("iframe")
    iframe.src = `http://localhost:3000/viewer?${params}` // Loveable will replace with viewer origin
    iframe.allow = "xr-spatial-tracking; fullscreen"
    iframe.style.width = "100%"; iframe.style.height = "600px"; iframe.style.border = "0"
    el.replaceWith(iframe)
  })
})()
