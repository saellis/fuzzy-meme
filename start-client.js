const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'ttr', shell: true };
require('child_process').spawn('npm', args, opts);
