const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

//https://www.reddit.com/r/react/comments/p9a9od/how_to_create_a_env_file/
//käytin edellisen osan middlewareja näitä tehtäviä varten

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})