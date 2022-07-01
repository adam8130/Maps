const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const banqiaoUs = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=25.009503163115806&tr_latitude=25.023386644409157&bl_longitude=121.46268593742066&tr_longitude=121.50135266257935&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=30&currency=USD&open_now=false&lunit=km&lang=en_US'

const taipeiTw = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=24.665761778209546&tr_latitude=25.372591595387235&bl_longitude=120.96521576483485&tr_longitude=122.00342377264735&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=30&currency=TWD&open_now=false&lunit=km&lang=zh_TW'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6109d48420msh1dd2a70cfb93d08p1b5e5djsn8a29f63fedf8',
		'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
	}
}

// currency = TWD
// open_now = false
// lunit = km
// lang = zh_TW

fetch(taipeiTw, options)
	.then(res => res.blob())
    .then(blob => {
        // Create blob link to download
        console.log(blob);
        const url = window.URL.createObjectURL( new Blob([blob]) )
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',`File.json`
        )
        // Append to html link element page
        document.body.appendChild(link)
        link.click();
        link.parentNode.removeChild(link)
      })
	.catch(err => console.error(err))