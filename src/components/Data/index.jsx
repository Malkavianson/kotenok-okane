import "./index.css";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Api from "../../helpers/api.mjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Data = () => {
  const [dataList, setDataList] = useState([]);
  const [labelsZoom, setlLabelsZoom] = useState(25);
  const [dataCycles, setDataCycles] = useState(20);
  const [dataLabels, setDataLabels] = useState(["1", "2", "3", "4", "5"]);
  const labelsLenght = (data, step) => {
    let labels = [];
    for (let i = 0; i < data.length; i += step) {
      labels.push(i.toString());
    }
    return labels;
  };

  const init = async (cycle, numbers, filter) => {
    let num = {};
    let allGames = [];

    const allData = await Api.getData();
    const splitedData = Api.splitData(allData, cycle);
    const labels = labelsLenght(splitedData, labelsZoom);
    setDataLabels(labels);
    for (let data of splitedData) {
      // console.log(data);
      let dataLength = data.length;
      let splicedData = Api.spliceData(data, dataLength);
      let iteratedData = Api.iterateData(splicedData);
      let countedData = Api.counterData(iteratedData);
      let balancedData = Api.balanceData(countedData, dataLength);
      let sortedData = Api.sortData(balancedData, numbers, filter);
      // console.table(sortedData);
      allGames.push(sortedData);
    }

    allGames.forEach((e) => {
      e.forEach(([a, b, c]) => {
        let arr = Boolean(num[a]) ? [...num[a]] : [];
        arr.push(c);
        num[a] = arr;
      });
    });
    // console.log(num);
    return num;
  };

  const res = async () => {
    let filter = "ratio"; //"counts" | "ratio" | "number"
    let numbers = 25;
    let cycle = dataCycles;
    const data = await init(cycle, numbers, filter);
    // console.log(data);
    setDataList(data);
  };

  const dataset = (list) => {
    let data = [];
    Object.keys(list).forEach((e) => {
      let dataseted = {
        id: e,
        label: e,
        data: list[e],
        borderWidth: 2,
        borderColor: [
          `rgb(${
            Math.round(Math.random() * 200) + e * Math.round(Math.random() * 5)
          },${
            Math.round(Math.random() * 200) + e * Math.round(Math.random() * 5)
          },${
            Math.round(Math.random() * 200) + e * Math.round(Math.random() * 5)
          })`,
        ],
      };
      data.push(dataseted);
    });
    // console.log(data)
    // console.log(typeof data)
    return data;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
  };

  useEffect(() => {
    dataset(dataList);
    res();
  }, [labelsZoom,dataCycles]);

  return (
    <div className="Data">
      <Line
        options={options}
        data={{
          labels: dataLabels,
          datasets: dataset(dataList),
        }}
      />
      <div>
        <span className="title" id="zoom__title">
          Zoom
        </span>
        <button
          id="ZoomIn"
          className="Zoom__button"
          onClick={() => {
            setlLabelsZoom(labelsZoom + 5);
          }}
        >
          +
        </button>
        <span className="Zoom__button">{labelsZoom}</span>
        <button
          id="ZoomOut"
          className="Zoom__button"
          onClick={() => {
            setlLabelsZoom(labelsZoom - 5);
          }}
        >
          -
        </button>
        <input
          type="number"
          className="Zoom__button"
          id="inputZoom"
          onChange={(e) => setlLabelsZoom(e.target.value)}
          value={labelsZoom}
        />
      </div>
      <div>
        <span className="title" id="zoom__title">
          Ciclos
        </span>
        <button
          id="ZoomIn"
          className="Zoom__button"
          onClick={() => {
            setDataCycles(dataCycles + 1);
          }}
        >
          +
        </button>
        <span className="Zoom__button">{dataCycles}</span>
        <button
          id="ZoomOut"
          className="Zoom__button"
          onClick={() => {
            setDataCycles(dataCycles - 1);
          }}
        >
          -
        </button>
        <input
          type="number"
          className="Zoom__button"
          id="inputCycles"
          onChange={(e) => setDataCycles(e.target.value)}
          value={dataCycles}
        />
      </div>
    </div>
  );
};

export default Data;
