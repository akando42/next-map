const { schedule } = require('@netlify/functions')

// To learn about scheduled functions and supported cron extensions,
// see: https://ntl.fyi/sched-func
module.exports.handler = schedule('* * * * *', async (event) => {
  const eventBody = JSON.parse(event.body)
  const next_run = new Date(eventBody.next_run)
  console.log(`Next function run at ${next_run}.`)

  return {
    statusCode: 200,
  }
})
