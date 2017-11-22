const { Client } = require('pg')

var sample = {

  run: async () => {
    const client = new Client()
    await client.connect()
    client.query('Select "hello world";', (err, res) => {
      console.log(res)
    });
    await client.end();
  }

}
module.exports = sample;
