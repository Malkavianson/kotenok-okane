import axios from 'axios';
console.clear();

// const parseRes = res => res.json();

const Api = {
    getData: async () => {
        let newData = [];
        const allData = await axios.get('https://loteriascaixa-api.herokuapp.com/api/lotofacil');
        allData.data.forEach(({ concurso, data, dezenas }) => {
            const j = {
                concurso,
                data,
                dezenas,
            };
            newData.push(j);
        });

        // console.log("getData")
        // console.log(typeof newData)
        // console.log(newData)
        return newData;
    },

    splitData: (data, cycle) => {
        let newData = [];
        let dt = [];
        for (let i = 0; i < data.length; i++) {
            if (dt.length < cycle) {
                dt.push(data[i]);
            } else {
                newData.push(dt);
                dt = [];
            }
        }
        // console.log(newData)
        return newData;
    },

    spliceData: (data, period) => {
        const splicedData = [...data];
        splicedData.splice(period);

        // console.log('splicedData');
        // console.log(typeof splicedData);
        // console.log(splicedData);
        return splicedData;
    },

    iterateData: (data) => {
        let iteratedData = [];
        data.forEach((e) => {
            e.dezenas.forEach((e) => {
                iteratedData.push(parseInt(e));
            });
        });
        iteratedData.sort();

        // console.log('iteratedData');
        // console.log(typeof iteratedData);
        // console.log(iteratedData);
        return iteratedData;
    },

    counterData: (data) => {
        let countedObjectData = {};
        data.forEach((e) => {
            countedObjectData[e] = (countedObjectData[e] || 0) + 1;
        });
        let countedData = Object.entries(countedObjectData);

        // console.log('Counted Data');
        // console.log(typeof countedData);
        // console.log(countedData);
        return countedData;
    },

    balanceData: (data, period) => {
        let balancedData = [...data];
        balancedData.forEach((e) => {
            const r = e[1] / period;
            e.push(r);
        });

        // console.log("balancedData")
        // console.log(typeof balancedData)
        // console.log(balancedData)
        return balancedData;
    },

    sortData: (data, n, f) => {
        let newData = [...data];
        newData.sort(([a, b, c], [d, e, f]) => f - c).splice(n);
        switch (f) {
            case 'ratio':
                newData.sort(([a, b, c], [d, e, f]) => f - c);
                break;
            case 'counts':
                newData.sort(([a, b, c], [d, e, f]) => e - b);
                break;
            case 'number':
                newData.sort(([a, b, c], [d, e, f]) => a - d);
                break;
            default:
                break;
        }

        // console.log("newData")
        // console.log(typeof newData)
        // console.log(newData)
        return newData;
    },

    // const test: (data) => {
    // let arr = [...data].reverse();
    // // console.log(arr)

    // let arr2 = [];
    // let arr3 = [];

    // for (let d of arr) {
    //     d.dezenas.forEach((e) => {
    //         if (arr2.length === 25) {
    //             arr3.push(d.concurso);
    //             arr2 = [];
    //         } else if (!arr2.includes(e)) {
    //             arr2.push(e);
    //         }
    //     });
    // }
    // console.log(arr2.length);

    // let arr2 = [...arr[0].dezenas];
    // arr2.push(arr[0].dezenas);
    // console.log(arr3.reverse());
    // console.log(arr2.sort());
    // };

};

// let filter = 'ratio'; //"counts" | "ratio" | "number"
// let results = [20, 40, 60, 80, 100];

// const init = async (periods, numbers, filter) => {
//     const allData = await Api.getData();

//     // let testing = test(allData);

//     // console.log("AllData")
//     // console.log(`typeof allData: ${typeof allData}`);
//     // console.log(`allData.length: ${allData.length}`);

//     for (let period of periods) {
//         // for (let i = 1; i < allData.length; i++) {
//         period = period > allData.length ? allData.length : period;
//         // let period = i
//         let splicedData = Api.spliceData(allData, period);
//         let iteratedData = Api.iterateData(splicedData);
//         let countedData = Api.counterData(iteratedData);
//         let balancedData = Api.balanceData(countedData, period);
//         let sortedData = Api.sortData(balancedData, numbers, filter);

//         console.log('Period');
//         console.log(period);
//         console.log('Final game');
//         console.table(sortedData);
//     }
// }

// init(results, 25, filter);


export default Api;