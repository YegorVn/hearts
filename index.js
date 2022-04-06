window.onload = () => {
	const draw = () => {
		const amt = 10
		let score = 0

		const getRandomValue = (min, max) => {
			return Math.floor(Math.random() * (max - min) + min)
		}
		
		const appendItems = (amt) => {
			for(let i = 1; i <= amt; i++){
			document.getElementById("heart-block").innerHTML += `
				<div class="heart-block__wrapper">
					<img src="./img.svg" alt="" class="heart-block__el 
					heart-block__el_animation" id='${i+"h"}'/>
				</div>
			`
			}
		}
		

		const appendAnim = (amt, score) => {
			const counter = document.getElementById('counter')
			const waveCreator = (score, amt, amtOfCompleted) => {
				console.log('waveCreator')
				const delay = Array.from({length: amt}, i => getRandomValue(2,11))
				const duration = Array.from({length: amt}, i => getRandomValue(2,11))
				for(let i = 1; i <= amt; i++){
					console.log('cycle starts')
					const target = document.getElementById(i + "h")
					target.classList.add("heart-block__el_animation")
					target.style.content = 'url("./img.svg")'
					target.style.animationDuration = duration[i - 1] + 's';
					target.style.animationDelay = delay[i - 1] + 's';
					target.parentNode.style.marginTop = getRandomValue(3,20) + '%';
					target.addEventListener("click", () => {
						target.style.content = 'url("./explode.gif")'
						target.classList.remove("heart-block__el_animation")
						target.classList.add("heart-block__el_explode-animation")
						score += 1
						counter.innerHTML = "Очки: " + score
					})
					target.addEventListener('animationend', function checkIfCompleted(e){
						e.preventDefault()
						amtOfCompleted+=1; 
						console.log(score)
						if(target.classList.contains('heart-block__el_animation') && score > 0){
							score-=1
							counter.innerHTML = "Очки: " + score
						}

						if(amtOfCompleted === amt) {
							for(let n = 1; n <= amt; n++){
								const remove_target = document.getElementById(n + "h")
								remove_target.removeEventListener('animationend', checkIfCompleted)
								remove_target.classList.remove("heart-block__el_explode-animation")
								remove_target.classList.remove("heart-block__el_animation")
								void remove_target.offsetWidth;
							}
							waveCreator(score, amt, 0)
						}
					})
				}
			}
			waveCreator(score, amt, 0)
		}
		appendItems(amt)
		appendAnim(amt, score)
	}

	draw()
}
