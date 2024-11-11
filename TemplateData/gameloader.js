function setLoaderText()
{
    const loaderTitle = document.querySelector("#loader-title");
    const loaderContent = document.querySelector("#loader-content");

    const textList = [
      ['PLACE NFT IN THE GAME', 'NFTs generate liquid resources that can be converted into MRT tokens'],
      ['UPGRADE YOUR NFT\'s LEVEL', 'The higher your asset\'s level, the greater it\'s productivity and storage capacity'],
      ['UPGRADE NFT to the 10th LEVEL', 'Level 10 asset is up to 101% more profitable than 1st level'],
      ['LEVEL 10 NFT UNLOCKS MINTING', 'You can generate a new NFT having of a couple of existing Level 10 NFTs'],
      ['INVITE FRIENDS, DEVELOP YOUR TEAM', 'Get rewards from NFTs purchases and resources generation in your team']
    ];

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    var r = getRandomInt(5);
    var texts = textList[r];

    loaderTitle.textContent = texts[0];
    loaderContent.textContent = texts[1];
}

function checkAPI()
{
    return $.get('https://dev-api.ageofmars.dev/v1/system');
}

function checkPlayer() {
    return $.ajax({
        url: "https://dev-api.ageofmars.dev/v1/auth/test",
        headers: {"Authorization": "Bearer " + window['_api-token']}
    });
}

function authorization()
{
    return $.ajax({url:'https://dev-auth.ageofmars.dev/play', type: 'post', xhrFields: {withCredentials: true}})
        .done((res, status, xhr) => 
        {
            let accessToken = res.accessToken;
            let refresh = xhr.getResponseHeader("x-refresh-token");
            if(!accessToken || !refresh){
                throw new Error('Bad authorization');
            }
            window['_is-authorized'] = true;
            window['_api-token'] = accessToken;
            window['_api-refresh-token'] = refresh;
            return 1;
        })
        .catch(function (error) 
        {
            window['_is-authorized'] = false;
            return Promise.resolve(1);
        });
}

function isAuthorized()
{
    return window['_is-authorized'];
}
