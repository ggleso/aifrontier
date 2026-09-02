import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
  { encoding: 'utf8' },
)
  .split('\0')
  .filter(Boolean);

const patterns = [
  { name: 'private key', expression: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'GitHub token', expression: /gh[pousr]_[A-Za-z0-9_]{30,}/ },
  { name: 'AWS access key', expression: /AKIA[0-9A-Z]{16}/ },
  { name: 'Slack token', expression: /xox[baprs]-[A-Za-z0-9-]{10,}/ },
];

const findings = [];
for (const file of files) {
  if (file === 'package-lock.json') continue;
  let content;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  for (const pattern of patterns) {
    if (pattern.expression.test(content)) findings.push(`${file}: ${pattern.name}`);
  }
}

if (findings.length > 0) {
  console.error(`Potential secrets found:\n${findings.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Secret scan passed (${String(files.length)} files checked).`);
}
