import fs from 'node:fs';
import vm from 'node:vm';

const file = new URL('../public/admin/index.php', import.meta.url);
const source = fs.readFileSync(file, 'utf8');
const match = source.match(/<script>([\s\S]*?)<\/script>/);
if (!match) throw new Error('Admin script block was not found.');
const javascript = match[1].replace('<?=json_encode($api)?>', JSON.stringify('/api/v1'));
new vm.Script(javascript, { filename: 'admin-inline.js' });
console.log('Admin JavaScript syntax OK');
