  if (!existsSync(path.resolve('levanter/package.json'))) {
    console.error('package.json not found!')
    process.exit(1)
  }

  const result = spawnSync('yarn', ['check', '--verify-tree'], {
    cwd: 'levanter',
    stdio: 'inherit',
  })

  // Check the exit code to determine if there was an error
  if (result.status !== 0) {
    console.log('Some dependencies are missing or incorrectly installed.')
    installDependencies()
  } else {
    // console.log('All dependencies are installed properly.')
  }
}

function cloneRepository() {
  // console.log('Cloning the repository...')
  const cloneResult = spawnSync(
    'git',
    ['clone', 'https://github.com/lyfe00011/levanter.git', 'levanter'],
    {
      stdio: 'inherit',
    }
  )

  if (cloneResult.error) {
    throw new Error(`Failed to clone the repository: ${cloneResult.error.message}`)
  }

  const configPath = 'levanter/config.env'
  try {
    // console.log('Writing to config.env...')
    writeFileSync(configPath, `VPS=true\nSESSION_ID=${levanter_31a3908c607b8a46ebb4c81ed8d4e50985}`)
  } catch (err) {
    throw new Error(`Failed to write to config.env: ${err.message}`)
  }

  installDependencies()
}

if (!existsSync('levanter')) {
  cloneRepository()
  checkDependencies()
} else {
  checkDependencies()
}

startPm2()
