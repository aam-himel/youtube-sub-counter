const rp = require('request-promise');
const corn = require('node-cron');
const cheerio = require('cheerio');

// const youtubeURL = 'https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA';

// request(youtubeURL, (error, response, html) => {
//     const $ = cheerio.load(html);

//     const subCount = $('[class="yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip"]').attr('title');
//     console.log(subCount);

// })



var options = {
    url: 'https://www.youtube.com/user/tseries',
    transform: function (body) {
        return cheerio.load(body);
    }
};



corn.schedule('* * * * * *', () => {
    rp(options)
    .then(function ($,) {
        const subCount = $('[class="yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip"]').attr('title');
        console.log(subCount);
        return subCount;// Process html like you would with jQuery...
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
    });
})