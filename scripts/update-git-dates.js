const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

const projects = [
  { id: "JobRadar", localPath: "../JobRadar", repo: "Crazy4elovek66/JobRadar", defaultDate: "07.2026" },
  { id: "Twitch AI Viewers", localPath: "../twitch-ai-fixed", repo: "Crazy4elovek66/TwitchChatAi", defaultDate: "05.2026" },
  { id: "Aura.net", localPath: "../Aura.net", repo: "Crazy4elovek66/aura-net", defaultDate: "07.2026" },
  { id: "ProfitCheck", localPath: "../ProfitCheck", repo: "Crazy4elovek66/ProfitCheck", defaultDate: "04.2026" },
  { id: "AutoClip", localPath: "../CryptOS", repo: "Crazy4elovek66/AutoClip", defaultDate: "05.2026" },
  { id: "Магия Бабушки", localPath: "../Magic", repo: "Crazy4elovek66/BabushkaMagicBot", defaultDate: "07.2026" }
];

const outputPath = path.join(__dirname, '..', 'src', 'data', 'project-commits.json');

// Load existing cache if exists
let cache = {};
if (fs.existsSync(outputPath)) {
  try {
    cache = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  } catch (e) {
    console.warn('Failed to parse existing cache:', e.message);
  }
}

function getLocalGitDate(localPath) {
  const absolutePath = path.resolve(__dirname, '..', localPath);
  if (fs.existsSync(path.join(absolutePath, '.git'))) {
    try {
      const date = execSync(`git -C "${absolutePath}" log -1 --format=%cd --date=format:"%m.%Y"`, { encoding: 'utf8' }).trim();
      if (date && /^\d{2}\.\d{4}$/.test(date)) {
        return date;
      }
    } catch (e) {
      // ignore git errors
    }
  }
  return null;
}

function getGitHubCommitDate(repo) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${repo}/commits?per_page=1`,
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js-Commit-Date-Checker'
      },
      timeout: 3000
    };

    const req = https.get(options, (res) => {
      if (res.statusCode !== 200) {
        resolve(null);
        return;
      }
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const commits = JSON.parse(body);
          if (commits && commits.length > 0 && commits[0].commit && commits[0].commit.committer) {
            const dateStr = commits[0].commit.committer.date; // e.g. "2026-07-08T12:34:56Z"
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
              const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
              const yyyy = date.getUTCFullYear();
              resolve(`${mm}.${yyyy}`);
              return;
            }
          }
        } catch (e) {
          // parse error
        }
        resolve(null);
      });
    });

    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
  });
}

async function run() {
  const result = {};

  for (const proj of projects) {
    let date = getLocalGitDate(proj.localPath);
    
    if (date) {
      console.log(`[Git Local] Checked ${proj.id}: ${date}`);
    } else {
      // Try GitHub API
      console.log(`[Git Local] ${proj.id} not found locally or git failed, trying GitHub API...`);
      date = await getGitHubCommitDate(proj.repo);
      if (date) {
        console.log(`[GitHub API] Checked ${proj.id}: ${date}`);
      } else if (cache[proj.id]) {
        date = cache[proj.id];
        console.log(`[Cache] Loaded ${proj.id}: ${date}`);
      } else {
        date = proj.defaultDate;
        console.log(`[Fallback] Default for ${proj.id}: ${date}`);
      }
    }
    result[proj.id] = date;
  }

  // Write to json file
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`Saved commit dates to ${outputPath}`);
}

run();
