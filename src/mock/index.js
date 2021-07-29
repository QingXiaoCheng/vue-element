import Mock from 'mockjs'

import menu from './menu.json'

const Random = Mock.Random  
const produceNewsData = function () {
  let newsList = []
  for (let i = 0; i < 20; i++) {
    let newNewsObject = {
      title: Random.ctitle(), 
      content: Random.cparagraph(), 
      createdTime: Random.date()  
    }
    newsList.push(newNewsObject)
  }

  return newsList
}
 


Mock.mock("/mock/menu", 'get', menu)