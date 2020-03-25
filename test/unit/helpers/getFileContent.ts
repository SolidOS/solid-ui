import { readFile } from 'fs'

export async function getFileContent (filePath: string): Promise<string> {
  return new Promise((resolve, reject) => readFile(filePath, 'utf-8', (err, data) => {
    if (err) return reject(err)
    resolve(data)
  }))
}
