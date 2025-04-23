import fs from 'fs'
import path from 'path'

export const writeEnvFile = (config: Record<string, string>) => {
  const envPath = path.resolve(process.cwd(), '.env')
  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')

  fs.writeFileSync(envPath, envContent)
}

export const checkEnvFile = () => {
  const envFilePath = path.resolve(process.cwd(), '.env')

  if (fs.existsSync(envFilePath)) {
    console.log('.env file exists at:', envFilePath)
    return true
  } else {
    console.log('.env file does not exist.')
    return false
  }
}
