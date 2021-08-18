const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

function getAuthToken() {
  return process.argv?.[2] ?? '';
}

async function getNodePackages() {
  const packagesFolder = path.resolve(__dirname, '..', './packages/');
  const packagesSubDirs = await fs.promises.readdir(packagesFolder);
  const nodePackagesPromise = await Promise.all(packagesSubDirs.map(async (subFolder) => {
    try {
      await fs.promises.access(path.join(packagesFolder, subFolder, 'package.json'), fs.constants.R_OK);
    } catch (error) {
      return false; // file does not exist or is not readable
    }
    return subFolder;
  }));
  return nodePackagesPromise.filter((row) => row && typeof row.valueOf() === 'string' && row.length > 0);
}

function getSonarProjectKey(projectName) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:9000/api/components/search?qualifiers=TRK&q=${projectName}`, { method: 'GET', auth: `${getAuthToken()}:` }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`problem with request.  returned status code: ${res.statusCode}`));
        return;
      }
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(new Error(`problem parsing request response: ${e.message}`));
          console.error(e.message);
        }
      });
    });
    req.on('error', (e) => {
      reject(new Error(`problem with request: ${e.message}`));
    });
    req.end();
  });
}

// jscpd:ignore-start
async function createSonarProject(projectName) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:9000/api/projects/create?name=${projectName}&project=${projectName}`, { method: 'POST', auth: `${getAuthToken()}:` }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`problem with request.  returned status code: ${res.statusCode}`));
        return;
      }
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(new Error(`problem parsing request response: ${e.message}`));
        }
      });
    });
    req.on('error', (e) => {
      reject(new Error(`problem with request: ${e.message}`));
    });
    req.end();
  });
}
// jscpd:ignore-end

function startSonarsourceScan(folderPath, sonarProjectName, sonarProjectKey) {
  const sonarConfigFile = `sonar.projectKey=${sonarProjectKey}\nsonar.projectName=${sonarProjectName}`;
  const sonarConfigFilePath = path.join(folderPath, 'sonar-project.properties');
  fs.writeFileSync(sonarConfigFilePath, sonarConfigFile, (err) => {
    if (err) {
      console.error('write sonarsource/sonar-scanner-cli config error: ', err);
    }
  });
  const sonarHostUrl = 'http://host.docker.internal:9000';
  const passedCommand = `docker run --rm -e SONAR_HOST_URL="${sonarHostUrl}" -e SONAR_LOGIN="${getAuthToken()}" -v "${folderPath}:/usr/src" sonarsource/sonar-scanner-cli`;
  cp.execSync(passedCommand, {
    stdio: [0, 1, 2],
    env: process.env,
    cwd: folderPath,
  });
  try {
    fs.rmSync(sonarConfigFilePath);
  } catch (err) {
    console.error('error trying to delete sonarsource/sonar-scanner-cli config file: ', err);
  }
  try {
    fs.rmSync(path.join(folderPath, '.scannerwork'), { force: true, recursive: true });
  } catch (err) {
    console.error('error trying to delete sonarsource/sonar-scanner-cli .scannerwork folder: ', err);
  }
  return null;
}

async function handleSonarqubeScan(projectName) {
  const getProjectKeyResponse = await getSonarProjectKey(projectName);
  let sonarProjectKey = getProjectKeyResponse?.components?.[0]?.key ?? '';
  if (!sonarProjectKey || typeof sonarProjectKey.valueOf() !== 'string' || sonarProjectKey.length === 0) {
    const createSonarProjectResponse = await createSonarProject(projectName);
    sonarProjectKey = createSonarProjectResponse?.project?.key;
  }
  const folderPath = path.resolve(__dirname, '..', './packages/', projectName);
  startSonarsourceScan(folderPath, projectName, sonarProjectKey);
}

(async () => {
  const authToken = getAuthToken();
  if (!authToken || typeof authToken.valueOf() !== 'string' || authToken.length === 0) {
    console.log('authToken is not set');
    return;
  }
  const nodePackages = await getNodePackages();
  for (let j = 0; j < nodePackages.length; j += 1) {
    // eslint-disable-next-line no-await-in-loop
    await handleSonarqubeScan(nodePackages[j]);
  }
})();
