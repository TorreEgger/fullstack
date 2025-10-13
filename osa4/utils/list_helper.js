const dummy = (blogs) => {
  return 1
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
//https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet#node-sovellusten-testaaminen
const totalLikes = (blogs) => {
  const reducer = (sum, currentValue) => {
    return sum + currentValue.likes
  }

  return blogs.reduce(reducer, 0)
  /*
  let sum = 0

  for(let i = 0; i<blogs.length; i++) {
    sum += blogs[i].likes
  }
  return sum
  */
}


module.exports = {
  dummy,
  totalLikes,
}