const axios = require('axios');
const cheerio = require('cheerio');

const webpage = 'https://news.ycombinator.com/';

const scrap = (url) => {
	return axios.get(url);
};

const parseHTML = (html) => {
	return new Promise((resolve, reject) => {
		data = [];
		const $ = cheerio.load(html);
		$('table.itemlist tr td:nth-child(3)').each((i, elem) => {
			data.push({
				title: $(elem).find('a.storylink').text(),
				link: $(elem).find('a.storylink').attr('href')
			});
		});
		resolve(data);
	});
};

scrap(webpage).then(response => {
	parseHTML(response.data).then(data => {
		console.log(JSON.stringify(data));
	}).catch(err => {
		console.log(err);
	});
})
.catch(err => {
	console.log(err);
});;
