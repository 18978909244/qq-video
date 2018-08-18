const axios = require('axios')
const parseString = require('xml2js').parseString;

const baseUrl = 'https://h5vv.video.qq.com/getinfo?'
const hlUrl = 'http://vv.video.qq.com/getinfo?'
const getHlUrl='http://vv.video.qq.com/getkey?'

const fetchVideo = (vid) => {
    let params = {
        "otype": "xml",
        "guid": "b9a639401758a1a2b205bb1c41aaa01d",
        "platform": "11001",
        "host": "m.v.qq.com",
        "sphttps": "1",
        "vid": vid
    }
    let paramsArr = [].concat(baseUrl);
    for (var key in params) {
        paramsArr.push('' + key + '=' + params[key]);
    }
    var url = paramsArr.join('&');
    console.log(url)
    return axios.get(url)
}

const fetchHl = (vid)=>{
    let params = {
        "otype": "xml",
        "vid": vid
    }
    let paramsArr = [].concat(hlUrl);
    for (var key in params) {
        paramsArr.push('' + key + '=' + params[key]);
    }
    var url = paramsArr.join('&');
    console.log(url)
    return axios.get(url)
}

const fetchHlVideo = (vid,id) =>{
    let params = {
        "otype": "xml",
        "format": id,
        "vid": vid,
        "vt":150,
        "charge":0,
        "filename":vid+'.p701.1.mp4',
        "platform":11
    }
    let paramsArr = [].concat(getHlUrl);
    console.log(paramsArr)
    for (var key in params) {
        paramsArr.push('' + key + '=' + params[key]);
    }
    var url = paramsArr.join('&');
    console.log(url)
    return axios.get(url)
}
fetchHl('q0552vpne5p')
    .then(data=>{
        parseString(data.data, function (err, result) {
            let host = 'https://ugcbsy.qq.com/'
            // console.log(result.root.fl[0].fi)
            let fi = result.root.fl[0].fi
            let id = fi[fi.length-1].id[0]
            
            fetchHlVideo('q0552vpne5p',id)
                .then(data1=>{
                    // console.log(data1)
                    parseString(data1.data,function(err,result1){
                        console.log(result1)
                        let host = 'https://ugcbsy.qq.com/'
                        let filename = result1.root.filename[0]
                        let vkey=result1.root.key[0]
                        console.log(`${host}${filename}?vkey=${vkey}`)
                    })
                })
        })
    })

// fetchVideo('q0552vpne5p')
//     .then(data => {
//         parseString(data.data, function (err, result) {
//             var vl = result.root.vl
//             var host = 'https://ugcbsy.qq.com/'
//             var filename = vl[0].vi[0].fn[0]
//             var fvkey = vl[0].vi[0].fvkey[0]
//             console.dir(result.root.fl[0].fi[1])
//             // console.log(`${host}${filename}?vkey=${fvkey}`)
//         });
//     })


// (async function(){
//     let data = await fetchVideo('q0552vpne5p')
//     console.log(data)
// })()