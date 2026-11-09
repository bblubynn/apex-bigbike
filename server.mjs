import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const types = { html:'text/html; charset=utf-8', css:'text/css; charset=utf-8', js:'text/javascript; charset=utf-8' };
http.createServer(async (req,res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  const name = path === '/' ? 'index.html' : path.slice(1);
  if (!['index.html','style.css','app.js'].includes(name)) {res.writeHead(404); res.end('Not found'); return;}
  try {res.writeHead(200, {'Content-Type':types[name.split('.').pop()]}); res.end(await readFile(resolve(name)));}
  catch {res.writeHead(500);res.end('Server error');}
}).listen(3000, '127.0.0.1', () => console.log('APEX preview: http://127.0.0.1:3000'));
