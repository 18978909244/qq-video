console.log(1)

const sleep = (time)=> {
    return new Promise((resolve) => setTimeout(resolve, time));
}

(async ()=> {
    await sleep(1000);
    console.log('promise now')
})();