export function usePorter(followers, setFollowers) {
  function exportData() {
    const json = JSON.stringify(followers, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `followers-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result)
          if (!Array.isArray(parsed))
            throw new Error("El archivo no contiene un array válido")
          setFollowers(parsed)
          resolve(parsed.length)
        } catch (err) {
          reject(err.message)
        }
      }
      reader.readAsText(file)
    })
  }

  return { exportData, importData }
}
