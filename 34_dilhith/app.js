document.addEventListener('DOMContentLoaded', () => {
    const cs34_dino = document.querySelector('.cs34_dino')
    const cs34_grid = document.querySelector('.cs34_grid')
    const cs34_body = document.querySelector('cs34_body')
    const cs34_alert = document.getElementById('cs34_alert')
    let cs34_isJumping = false
    let cs34_gravity = 0.9
    let cs34_isGameOver = false
    
    function cs34_control(e) {
      if (e.keyCode === 32) {
        if (!cs34_isJumping) {
          cs34_isJumping = true
          cs34_jump()
        }
      }
    }
    document.addEventListener('keyup', cs34_control)
    
    let cs34_position = 0
    function cs34_jump() {
      let cs34_count = 0
      let cs34_timerId = setInterval(function () {
        //move down
        if (cs34_count === 15) {
          clearInterval(cs34_timerId)
          let cs34_downTimerId = setInterval(function () {
            if (cs34_count === 0) {
              clearInterval(cs34_downTimerId)
              cs34_isJumping = false
            }
            cs34_position -= 5
            cs34_count--
            cs34_position = cs34_position * cs34_gravity
            cs34_dino.style.bottom = cs34_position + 'px'
          },20)
    
        }
        //move up
        cs34_position +=30
        cs34_count++
        cs34_position = cs34_position * cs34_gravity
        cs34_dino.style.bottom = cs34_position + 'px'
      },20)
    }
    
    function cs34_generateObstacles() {
      let cs34_randomTime = Math.random() * 4000
      let cs34_obstaclePosition = 1000
      const cs34_obstacle = document.createElement('div')
      if (!cs34_isGameOver) cs34_obstacle.classList.add('cs34_obstacle')
      cs34_grid.appendChild(cs34_obstacle)
      cs34_obstacle.style.left = cs34_obstaclePosition + 'px'
    
      let cs34_timerId = setInterval(function() {
        if (cs34_obstaclePosition > 0 && cs34_obstaclePosition < 60 && cs34_position < 60) {
          clearInterval(cs34_timerId)
          cs34_alert.innerHTML = 'Game Over'
          cs34_isGameOver = true
          //remove all children
          /*cs34_body.removeChild(cs34_body.firstChild)
          while (cs34_grid.firstChild) {
            cs34_grid.removeChild(cs34_grid.lastChild)
          }*/
          
        }
        cs34_obstaclePosition -=10
        cs34_obstacle.style.left = cs34_obstaclePosition + 'px'
      },20)
      if (!cs34_isGameOver) setTimeout(cs34_generateObstacles, cs34_randomTime)
    }
    cs34_generateObstacles()
    })