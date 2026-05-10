const { spawn } = require('child_process')
const os = require('os')
const qrcode = require('qrcode-terminal')

function getLocalIP() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return 'localhost'
}

const ip = getLocalIP()
const port = process.env.PORT || 3000
const url = `http://${ip}:${port}`

function printBanner() {
  process.stdout.write('\n')
  process.stdout.write('  \x1b[1;34m╔══════════════════════════════════════╗\x1b[0m\n')
  process.stdout.write('  \x1b[1;34m║\x1b[0m     \x1b[1mSir Azan Coaching Center\x1b[0m         \x1b[1;34m║\x1b[0m\n')
  process.stdout.write('  \x1b[1;34m╠══════════════════════════════════════╣\x1b[0m\n')
  process.stdout.write(`  \x1b[1;34m║\x1b[0m  Local:   \x1b[36mhttp://localhost:${port}\x1b[0m         \x1b[1;34m║\x1b[0m\n`)
  process.stdout.write(`  \x1b[1;34m║\x1b[0m  Mobile:  \x1b[32m${url}\x1b[0m  \x1b[1;34m║\x1b[0m\n`)
  process.stdout.write('  \x1b[1;34m╠══════════════════════════════════════╣\x1b[0m\n')
  process.stdout.write('  \x1b[1;34m║\x1b[0m  Scan QR code to open on your phone  \x1b[1;34m║\x1b[0m\n')
  process.stdout.write('  \x1b[1;34m╚══════════════════════════════════════╝\x1b[0m\n')
  process.stdout.write('\n')
  qrcode.generate(url, { small: true })
}

printBanner()

const child = spawn('npx', ['next', 'dev', '--hostname', '0.0.0.0'], {
  stdio: ['inherit', 'pipe', 'inherit'],
  shell: true,
  env: { ...process.env, PORT: String(port) },
})

child.stdout.on('data', (data) => {
  const output = data.toString()
  process.stdout.write(output)
  if (output.includes('Local:') || output.includes('localhost')) {
    process.stdout.write('\n')
    process.stdout.write('  \x1b[1;32m═══════════════════════════════════════\x1b[0m\n')
    process.stdout.write(`  \x1b[1;32m  Open on phone:\x1b[0m \x1b[4;36m${url}\x1b[0m\n`)
    process.stdout.write('  \x1b[1;32m═══════════════════════════════════════\x1b[0m\n')
    process.stdout.write('\n')
    qrcode.generate(url, { small: true })
  }
})

process.on('SIGINT', () => {
  child.kill('SIGINT')
  process.exit()
})

child.on('close', (code) => {
  process.exit(code)
})
