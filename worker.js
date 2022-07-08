importScripts("https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js");

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide();
  await self.pyodide.loadPackage(["numpy", "pytz"]);
}
let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (message) => {
  await pyodideReadyPromise;
  // const { id, python, ... context} = event.data;
  // for (const key of Object.keys(context)) {
  //   self[key] = context[key];
  // }
  const python = message.data[0] + "+" + message.data[1]; //create python func that adds 2 numbers

  try {
    //await self.pyodide.loadPackagesFromImports(python);
    let results = await self.pyodide.runPythonAsync(python);
    self.postMessage( results );
  } catch (error) {
    self.postMessage ({ error: error.message, id })
  }
};
